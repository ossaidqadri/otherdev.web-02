import 'package:freezed_annotation/freezed_annotation.dart';

part 'chat_message_model.freezed.dart';
part 'chat_message_model.g.dart';

@freezed
abstract class ChatMessageModel with _$ChatMessageModel {
  const ChatMessageModel._();
  const factory ChatMessageModel({
    required String id,
    required String role, // 'user' | 'assistant'
    required String content,
    DateTime? timestamp,
    String? toolName,
    Map<String, dynamic>? toolArgs,
  }) = _ChatMessageModel;

  factory ChatMessageModel.fromJson(Map<String, dynamic> json) =>
      _$ChatMessageModelFromJson(json);
}
