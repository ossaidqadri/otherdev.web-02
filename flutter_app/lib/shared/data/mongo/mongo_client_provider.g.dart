// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'mongo_client_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning
/// MongoDB database provider.
/// Connection is created on first access and reused across requests.

@ProviderFor(mongoDb)
const mongoDbProvider = MongoDbProvider._();

/// MongoDB database provider.
/// Connection is created on first access and reused across requests.

final class MongoDbProvider
    extends $FunctionalProvider<AsyncValue<Db>, Db, FutureOr<Db>>
    with $FutureModifier<Db>, $FutureProvider<Db> {
  /// MongoDB database provider.
  /// Connection is created on first access and reused across requests.
  const MongoDbProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'mongoDbProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$mongoDbHash();

  @$internal
  @override
  $FutureProviderElement<Db> $createElement($ProviderPointer pointer) =>
      $FutureProviderElement(pointer);

  @override
  FutureOr<Db> create(Ref ref) {
    return mongoDb(ref);
  }
}

String _$mongoDbHash() => r'7ece5cfb9d14c9626ab89ac033763da1ba3fa385';
