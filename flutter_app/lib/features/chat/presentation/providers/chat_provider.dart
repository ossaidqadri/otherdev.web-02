import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../data/datasources/sse_client.dart';
import '../../data/models/chat_message_model.dart';
import '../../data/repositories/chat_repository.dart';

part 'chat_provider.g.dart';

@riverpod
ChatRepository chatRepository(Ref ref) {
  final repo = ChatRepository();
  ref.onDispose(() => repo.dispose());
  return repo;
}

/// Builds request body maps from ChatMessageModel list
List<Map<String, dynamic>> _buildRequestMessages(List<ChatMessageModel> messages) {
  return messages.map((msg) {
    final parts = <Map<String, dynamic>>[
      {'type': 'text', 'text': msg.content},
    ];
    return {
      'role': msg.role,
      'parts': parts,
    };
  }).toList();
}

@riverpod
class ChatMessages extends _$ChatMessages {
  @override
  FutureOr<List<ChatMessageModel>> build() async => [];

  void addMessage(ChatMessageModel message) {
    state = AsyncValue.data([...state.value ?? [], message]);
  }

  void addAssistantChunk(String chunk) {
    final current = state.value ?? [];
    if (current.isEmpty) return;
    final last = current.last;
    if (last.role != 'assistant') {
      addMessage(ChatMessageModel(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        role: 'assistant',
        content: chunk,
        timestamp: DateTime.now(),
      ));
    } else {
      final updated = last.copyWith(content: last.content + chunk);
      final index = current.length - 1;
      final updatedList = [...current];
      updatedList[index] = updated;
      state = AsyncValue.data(updatedList);
    }
  }

  void clearMessages() {
    state = const AsyncValue.data([]);
  }
}

@riverpod
Stream<ChatEvent> chatStream(Ref ref, List<ChatMessageModel> messages) {
  if (messages.isEmpty) return const Stream.empty();
  final repo = ref.watch(chatRepositoryProvider);
  final requestMessages = _buildRequestMessages(messages);
  return repo.sendMessage(requestMessages);
}
