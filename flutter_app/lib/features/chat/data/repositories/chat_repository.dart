import 'package:http/http.dart' as http;

import '../datasources/sse_client.dart';
import '../../../../shared/data/api/endpoints.dart';

class ChatRepository {
  ChatRepository({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;

  /// Sends a chat message stream and returns the SSE event stream.
  ///
  /// [messages] is a list of message maps in the format:
  /// ```
  /// {
  ///   'role': 'user' | 'assistant',
  ///   'parts': [{'type': 'text', 'text': '...'}]
  /// }
  /// ```
  Stream<ChatEvent> sendMessage(
    List<Map<String, dynamic>> messages, {
    String? chatId,
  }) {
    return openSseStream(
      client: _client,
      messages: messages,
      baseUrl: Endpoints.baseUrl,
      chatId: chatId,
    );
  }

  void dispose() {
    _client.close();
  }
}
