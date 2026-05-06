// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'chat_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(chatRepository)
const chatRepositoryProvider = ChatRepositoryProvider._();

final class ChatRepositoryProvider
    extends $FunctionalProvider<ChatRepository, ChatRepository, ChatRepository>
    with $Provider<ChatRepository> {
  const ChatRepositoryProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'chatRepositoryProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$chatRepositoryHash();

  @$internal
  @override
  $ProviderElement<ChatRepository> $createElement($ProviderPointer pointer) =>
      $ProviderElement(pointer);

  @override
  ChatRepository create(Ref ref) {
    return chatRepository(ref);
  }

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(ChatRepository value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<ChatRepository>(value),
    );
  }
}

String _$chatRepositoryHash() => r'76c69ec2360a2dd97c1fc04962e2556394925ce7';

@ProviderFor(ChatMessages)
const chatMessagesProvider = ChatMessagesProvider._();

final class ChatMessagesProvider
    extends $AsyncNotifierProvider<ChatMessages, List<ChatMessageModel>> {
  const ChatMessagesProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'chatMessagesProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$chatMessagesHash();

  @$internal
  @override
  ChatMessages create() => ChatMessages();
}

String _$chatMessagesHash() => r'b69e3087f008a9f6976c19b36d0317f6e99353d7';

abstract class _$ChatMessages extends $AsyncNotifier<List<ChatMessageModel>> {
  FutureOr<List<ChatMessageModel>> build();
  @$mustCallSuper
  @override
  void runBuild() {
    final created = build();
    final ref =
        this.ref
            as $Ref<AsyncValue<List<ChatMessageModel>>, List<ChatMessageModel>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<
                AsyncValue<List<ChatMessageModel>>,
                List<ChatMessageModel>
              >,
              AsyncValue<List<ChatMessageModel>>,
              Object?,
              Object?
            >;
    element.handleValue(ref, created);
  }
}

@ProviderFor(chatStream)
const chatStreamProvider = ChatStreamFamily._();

final class ChatStreamProvider
    extends
        $FunctionalProvider<AsyncValue<ChatEvent>, ChatEvent, Stream<ChatEvent>>
    with $FutureModifier<ChatEvent>, $StreamProvider<ChatEvent> {
  const ChatStreamProvider._({
    required ChatStreamFamily super.from,
    required List<ChatMessageModel> super.argument,
  }) : super(
         retry: null,
         name: r'chatStreamProvider',
         isAutoDispose: true,
         dependencies: null,
         $allTransitiveDependencies: null,
       );

  @override
  String debugGetCreateSourceHash() => _$chatStreamHash();

  @override
  String toString() {
    return r'chatStreamProvider'
        ''
        '($argument)';
  }

  @$internal
  @override
  $StreamProviderElement<ChatEvent> $createElement($ProviderPointer pointer) =>
      $StreamProviderElement(pointer);

  @override
  Stream<ChatEvent> create(Ref ref) {
    final argument = this.argument as List<ChatMessageModel>;
    return chatStream(ref, argument);
  }

  @override
  bool operator ==(Object other) {
    return other is ChatStreamProvider && other.argument == argument;
  }

  @override
  int get hashCode {
    return argument.hashCode;
  }
}

String _$chatStreamHash() => r'4216676b334c112cbad6c84666ab2e211d99633a';

final class ChatStreamFamily extends $Family
    with $FunctionalFamilyOverride<Stream<ChatEvent>, List<ChatMessageModel>> {
  const ChatStreamFamily._()
    : super(
        retry: null,
        name: r'chatStreamProvider',
        dependencies: null,
        $allTransitiveDependencies: null,
        isAutoDispose: true,
      );

  ChatStreamProvider call(List<ChatMessageModel> messages) =>
      ChatStreamProvider._(argument: messages, from: this);

  @override
  String toString() => r'chatStreamProvider';
}
