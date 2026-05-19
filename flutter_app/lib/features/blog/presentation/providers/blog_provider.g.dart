// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'blog_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(blogRepository)
const blogRepositoryProvider = BlogRepositoryProvider._();

final class BlogRepositoryProvider
    extends $FunctionalProvider<BlogRepository, BlogRepository, BlogRepository>
    with $Provider<BlogRepository> {
  const BlogRepositoryProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'blogRepositoryProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$blogRepositoryHash();

  @$internal
  @override
  $ProviderElement<BlogRepository> $createElement($ProviderPointer pointer) =>
      $ProviderElement(pointer);

  @override
  BlogRepository create(Ref ref) {
    return blogRepository(ref);
  }

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(BlogRepository value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<BlogRepository>(value),
    );
  }
}

String _$blogRepositoryHash() => r'41976743a024a4113d0152561caf41afbcfa2f91';

@ProviderFor(blogList)
const blogListProvider = BlogListProvider._();

final class BlogListProvider
    extends
        $FunctionalProvider<
          AsyncValue<List<BlogPostModel>>,
          List<BlogPostModel>,
          FutureOr<List<BlogPostModel>>
        >
    with
        $FutureModifier<List<BlogPostModel>>,
        $FutureProvider<List<BlogPostModel>> {
  const BlogListProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'blogListProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$blogListHash();

  @$internal
  @override
  $FutureProviderElement<List<BlogPostModel>> $createElement(
    $ProviderPointer pointer,
  ) => $FutureProviderElement(pointer);

  @override
  FutureOr<List<BlogPostModel>> create(Ref ref) {
    return blogList(ref);
  }
}

String _$blogListHash() => r'ad3a5819a069bcce34b19b782078969e2d518df1';

@ProviderFor(blogPost)
const blogPostProvider = BlogPostFamily._();

final class BlogPostProvider
    extends
        $FunctionalProvider<
          AsyncValue<BlogPostModel>,
          BlogPostModel,
          FutureOr<BlogPostModel>
        >
    with $FutureModifier<BlogPostModel>, $FutureProvider<BlogPostModel> {
  const BlogPostProvider._({
    required BlogPostFamily super.from,
    required String super.argument,
  }) : super(
         retry: null,
         name: r'blogPostProvider',
         isAutoDispose: true,
         dependencies: null,
         $allTransitiveDependencies: null,
       );

  @override
  String debugGetCreateSourceHash() => _$blogPostHash();

  @override
  String toString() {
    return r'blogPostProvider'
        ''
        '($argument)';
  }

  @$internal
  @override
  $FutureProviderElement<BlogPostModel> $createElement(
    $ProviderPointer pointer,
  ) => $FutureProviderElement(pointer);

  @override
  FutureOr<BlogPostModel> create(Ref ref) {
    final argument = this.argument as String;
    return blogPost(ref, argument);
  }

  @override
  bool operator ==(Object other) {
    return other is BlogPostProvider && other.argument == argument;
  }

  @override
  int get hashCode {
    return argument.hashCode;
  }
}

String _$blogPostHash() => r'1ee8bcc20c757f114f989198404f3d5debadf634';

final class BlogPostFamily extends $Family
    with $FunctionalFamilyOverride<FutureOr<BlogPostModel>, String> {
  const BlogPostFamily._()
    : super(
        retry: null,
        name: r'blogPostProvider',
        dependencies: null,
        $allTransitiveDependencies: null,
        isAutoDispose: true,
      );

  BlogPostProvider call(String slug) =>
      BlogPostProvider._(argument: slug, from: this);

  @override
  String toString() => r'blogPostProvider';
}

@ProviderFor(blogSearch)
const blogSearchProvider = BlogSearchFamily._();

final class BlogSearchProvider
    extends
        $FunctionalProvider<
          AsyncValue<List<SearchResultModel>>,
          List<SearchResultModel>,
          FutureOr<List<SearchResultModel>>
        >
    with
        $FutureModifier<List<SearchResultModel>>,
        $FutureProvider<List<SearchResultModel>> {
  const BlogSearchProvider._({
    required BlogSearchFamily super.from,
    required String super.argument,
  }) : super(
         retry: null,
         name: r'blogSearchProvider',
         isAutoDispose: true,
         dependencies: null,
         $allTransitiveDependencies: null,
       );

  @override
  String debugGetCreateSourceHash() => _$blogSearchHash();

  @override
  String toString() {
    return r'blogSearchProvider'
        ''
        '($argument)';
  }

  @$internal
  @override
  $FutureProviderElement<List<SearchResultModel>> $createElement(
    $ProviderPointer pointer,
  ) => $FutureProviderElement(pointer);

  @override
  FutureOr<List<SearchResultModel>> create(Ref ref) {
    final argument = this.argument as String;
    return blogSearch(ref, argument);
  }

  @override
  bool operator ==(Object other) {
    return other is BlogSearchProvider && other.argument == argument;
  }

  @override
  int get hashCode {
    return argument.hashCode;
  }
}

String _$blogSearchHash() => r'f980b6c950cac1ce73cbd7aa12e828d36cb878b8';

final class BlogSearchFamily extends $Family
    with $FunctionalFamilyOverride<FutureOr<List<SearchResultModel>>, String> {
  const BlogSearchFamily._()
    : super(
        retry: null,
        name: r'blogSearchProvider',
        dependencies: null,
        $allTransitiveDependencies: null,
        isAutoDispose: true,
      );

  BlogSearchProvider call(String query) =>
      BlogSearchProvider._(argument: query, from: this);

  @override
  String toString() => r'blogSearchProvider';
}
