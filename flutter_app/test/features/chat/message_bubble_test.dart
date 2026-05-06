import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:flutter_app/features/chat/data/models/chat_message_model.dart';
import 'package:flutter_app/features/chat/data/datasources/sse_client.dart';
import 'package:flutter_app/features/chat/presentation/pages/chat_page.dart';

void main() {
  group('ChatPage widget tests', () {
    Widget buildChatPage() {
      return ProviderScope(
        child: MaterialApp(
          home: const ChatPage(),
        ),
      );
    }

    testWidgets('shows empty state when no messages', (tester) async {
      await tester.pumpWidget(buildChatPage());
      await tester.pumpAndSettle();

      expect(find.byIcon(Icons.chat_bubble_outline), findsOneWidget);
      expect(find.text('Ask me anything about Other Dev'), findsOneWidget);
    });

    testWidgets('appBar displays Chat title', (tester) async {
      await tester.pumpWidget(buildChatPage());
      await tester.pumpAndSettle();

      expect(find.text('Chat'), findsOneWidget);
    });

    testWidgets('input field accepts text', (tester) async {
      await tester.pumpWidget(buildChatPage());
      await tester.pumpAndSettle();

      final textField = find.byType(TextField);
      expect(textField, findsOneWidget);

      await tester.enterText(textField, 'Hello AI');
      await tester.pump();

      expect(find.text('Hello AI'), findsOneWidget);
    });

    testWidgets('send button icon is present', (tester) async {
      await tester.pumpWidget(buildChatPage());
      await tester.pumpAndSettle();

      expect(find.byIcon(Icons.send), findsOneWidget);
    });

    testWidgets('submitting empty text does nothing', (tester) async {
      await tester.pumpWidget(buildChatPage());
      await tester.pumpAndSettle();

      await tester.tap(find.byIcon(Icons.send));
      await tester.pump();

      // Still shows empty state (send early-returned on empty text)
      expect(find.byIcon(Icons.chat_bubble_outline), findsOneWidget);
      expect(find.text('Ask me anything about Other Dev'), findsOneWidget);
    });
  });

  group('ChatMessageModel', () {
    test('model can be constructed with required fields', () {
      final msg = ChatMessageModel(
        id: '1',
        role: 'user',
        content: 'Test content',
        timestamp: DateTime.now(),
      );

      expect(msg.id, '1');
      expect(msg.role, 'user');
      expect(msg.content, 'Test content');
    });

    test('fromJson produces correct model', () {
      final json = {
        'id': '42',
        'role': 'assistant',
        'content': 'Hello world',
        'timestamp': '2024-01-01T12:00:00.000Z',
      };

      final msg = ChatMessageModel.fromJson(json);
      expect(msg.id, '42');
      expect(msg.role, 'assistant');
      expect(msg.content, 'Hello world');
    });

    test('toJson produces correct map', () {
      final msg = ChatMessageModel(
        id: '1',
        role: 'user',
        content: 'Test',
        timestamp: DateTime.parse('2024-01-01T00:00:00.000Z'),
      );

      final json = msg.toJson();
      expect(json['id'], '1');
      expect(json['role'], 'user');
      expect(json['content'], 'Test');
    });
  });

  group('ChatEvent sealed hierarchy', () {
    test('TextChunk carries content', () {
      final event = TextChunk('hello');
      expect(event.content, 'hello');
    });

    test('ToolCall carries name and args', () {
      final event = ToolCall('get_weather', {'city': 'NYC'});
      expect(event.name, 'get_weather');
      expect(event.args['city'], 'NYC');
    });

    test('ToolResult carries name and result', () {
      final event = ToolResult('get_weather', 'sunny');
      expect(event.name, 'get_weather');
      expect(event.result, 'sunny');
    });

    test('StreamError carries message', () {
      final event = StreamError('connection failed');
      expect(event.message, 'connection failed');
    });

    test('Done is a terminal event', () {
      final event = Done();
      expect(event, isA<Done>());
    });
  });

  group('buildChatRequestBody', () {
    test('converts messages to request body format', () {
      final result = buildChatRequestBody([
        {'role': 'user', 'parts': [{'type': 'text', 'text': 'Hello'}]},
        {'role': 'assistant', 'parts': [{'type': 'text', 'text': 'Hi'}]},
      ], 'chat-123');

      expect(result['id'], 'chat-123');
      expect(result['supportsArtifacts'], false);
      expect((result['messages'] as List).length, 2);
    });

    test('uses empty string for chatId when null', () {
      final result = buildChatRequestBody([], null);
      expect(result['id'], '');
    });
  });
}