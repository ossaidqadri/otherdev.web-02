import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:flutter_app/features/chat/presentation/pages/chat_page.dart';

void main() {
  group('ChatPage integration', () {
    Widget buildChatPage() {
      return ProviderScope(
        child: MaterialApp(
          home: const ChatPage(),
        ),
      );
    }

    testWidgets('shows empty state on load', (tester) async {
      await tester.pumpWidget(buildChatPage());
      await tester.pumpAndSettle();

      expect(find.byIcon(Icons.chat_bubble_outline), findsOneWidget);
      expect(find.text('Ask me anything about Other Dev'), findsOneWidget);
    });

    testWidgets('appBar shows Chat title', (tester) async {
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

    testWidgets('send button is present', (tester) async {
      await tester.pumpWidget(buildChatPage());
      await tester.pumpAndSettle();

      expect(find.byIcon(Icons.send), findsOneWidget);
    });
  });
}