import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;

/// Plain W3C SSE event types returned by /api/chat/native
sealed class ChatEvent {}

final class TextChunk extends ChatEvent {
  final String content;
  TextChunk(this.content);
}

final class ToolCall extends ChatEvent {
  final String name;
  final Map<String, dynamic> args;
  ToolCall(this.name, this.args);
}

final class ToolResult extends ChatEvent {
  final String name;
  final dynamic result;
  ToolResult(this.name, this.result);
}

final class Done extends ChatEvent {
  Done();
}

final class StreamError extends ChatEvent {
  final String message;
  StreamError(this.message);
}

/// Maps messages to the format the backend expects
Map<String, dynamic> buildChatRequestBody(
  List<Map<String, dynamic>> messages,
  String? chatId,
) {
  return {
    'id': chatId ?? '',
    'messages': messages,
    'supportsArtifacts': false,
  };
}

/// Opens a SSE connection to /api/chat/native and yields ChatEvents.
///
/// Reconnects up to [maxRetries] times on network failure with exponential
/// backoff (1s, 2s, 4s).
Stream<ChatEvent> openSseStream({
  required http.Client client,
  required List<Map<String, dynamic>> messages,
  required String baseUrl,
  String? chatId,
  int maxRetries = 3,
}) async* {
  final body = buildChatRequestBody(messages, chatId);

  for (int attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      final response = await client.post(
        Uri.parse('$baseUrl/api/chat/native'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: jsonEncode(body),
      );

      if (response.statusCode != 200) {
        yield StreamError('HTTP ${response.statusCode}: ${response.body}');
        return;
      }

      yield* _parseSseStream(Stream.value(response.bodyBytes));

      return;
    } on http.ClientException catch (e) {
      if (attempt == maxRetries) {
        yield StreamError('Connection failed after $maxRetries retries: $e');
        return;
      }
      await Future.delayed(Duration(seconds: 1 << attempt));
    }
  }
}

/// Parses a byte stream as W3C SSE, yielding ChatEvents.
Stream<ChatEvent> _parseSseStream(Stream<List<int>> byteStream) async* {
  final controller = StreamController<ChatEvent>();
  String buffer = '';

  byteStream.listen(
    (chunk) {
      buffer += utf8.decode(chunk, allowMalformed: true);

      while (buffer.contains('\n\n')) {
        final eventEnd = buffer.indexOf('\n\n');
        final rawEvent = buffer.substring(0, eventEnd);
        buffer = buffer.substring(eventEnd + 2);

        final dataLine = rawEvent.split('\n').firstWhere(
              (line) => line.startsWith('data: '),
              orElse: () => '',
            );
        if (dataLine.isEmpty) continue;

        final payload = dataLine.substring(6);
        if (payload == '[DONE]') {
          controller.add(Done());
          controller.close();
          return;
        }

        try {
          final decoded = jsonDecode(payload) as Map<String, dynamic>;
          switch (decoded['type'] as String) {
            case 'text':
              controller.add(TextChunk(decoded['content'] as String));
            case 'tool':
              controller.add(ToolCall(
                decoded['name'] as String,
                decoded['args'] as Map<String, dynamic>? ?? {},
              ));
            case 'tool-result':
              controller.add(ToolResult(
                decoded['name'] as String,
                decoded['result'],
              ));
            default:
              break;
          }
        } catch (_) {}
      }
    },
    onError: (error) {
      controller.add(StreamError(error.toString()));
      controller.close();
    },
    onDone: () {
      if (buffer.isNotEmpty) {
        final dataLine = buffer.split('\n').firstWhere(
              (line) => line.startsWith('data: '),
              orElse: () => '',
            );
        if (dataLine.isNotEmpty && !dataLine.contains('[DONE]')) {
          try {
            final decoded = jsonDecode(dataLine.substring(6)) as Map<String, dynamic>;
            if (decoded['type'] == 'text') {
              controller.add(TextChunk(decoded['content'] as String));
            }
          } catch (_) {}
        }
      }
      controller.add(Done());
      controller.close();
    },
    cancelOnError: false,
  );

  yield* controller.stream;
}
