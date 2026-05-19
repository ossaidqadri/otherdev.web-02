// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'about_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(aboutRepository)
const aboutRepositoryProvider = AboutRepositoryProvider._();

final class AboutRepositoryProvider
    extends
        $FunctionalProvider<AboutRepository, AboutRepository, AboutRepository>
    with $Provider<AboutRepository> {
  const AboutRepositoryProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'aboutRepositoryProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$aboutRepositoryHash();

  @$internal
  @override
  $ProviderElement<AboutRepository> $createElement($ProviderPointer pointer) =>
      $ProviderElement(pointer);

  @override
  AboutRepository create(Ref ref) {
    return aboutRepository(ref);
  }

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(AboutRepository value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<AboutRepository>(value),
    );
  }
}

String _$aboutRepositoryHash() => r'8333ae6fd029f210456ba4e173fcd44483f92736';

@ProviderFor(aboutContent)
const aboutContentProvider = AboutContentProvider._();

final class AboutContentProvider
    extends
        $FunctionalProvider<
          AsyncValue<AboutModel>,
          AboutModel,
          FutureOr<AboutModel>
        >
    with $FutureModifier<AboutModel>, $FutureProvider<AboutModel> {
  const AboutContentProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'aboutContentProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$aboutContentHash();

  @$internal
  @override
  $FutureProviderElement<AboutModel> $createElement($ProviderPointer pointer) =>
      $FutureProviderElement(pointer);

  @override
  FutureOr<AboutModel> create(Ref ref) {
    return aboutContent(ref);
  }
}

String _$aboutContentHash() => r'6d14ddf949e2f755457bd23f0812c18b9d19d21a';
