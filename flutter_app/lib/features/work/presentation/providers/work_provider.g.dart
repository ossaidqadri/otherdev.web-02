// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'work_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(workRepository)
const workRepositoryProvider = WorkRepositoryProvider._();

final class WorkRepositoryProvider
    extends $FunctionalProvider<WorkRepository, WorkRepository, WorkRepository>
    with $Provider<WorkRepository> {
  const WorkRepositoryProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'workRepositoryProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$workRepositoryHash();

  @$internal
  @override
  $ProviderElement<WorkRepository> $createElement($ProviderPointer pointer) =>
      $ProviderElement(pointer);

  @override
  WorkRepository create(Ref ref) {
    return workRepository(ref);
  }

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(WorkRepository value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<WorkRepository>(value),
    );
  }
}

String _$workRepositoryHash() => r'8ef193ba5365292ccc8790488c8c3172d7e24565';

@ProviderFor(workList)
const workListProvider = WorkListProvider._();

final class WorkListProvider
    extends
        $FunctionalProvider<
          AsyncValue<List<WorkItemModel>>,
          List<WorkItemModel>,
          FutureOr<List<WorkItemModel>>
        >
    with
        $FutureModifier<List<WorkItemModel>>,
        $FutureProvider<List<WorkItemModel>> {
  const WorkListProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'workListProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$workListHash();

  @$internal
  @override
  $FutureProviderElement<List<WorkItemModel>> $createElement(
    $ProviderPointer pointer,
  ) => $FutureProviderElement(pointer);

  @override
  FutureOr<List<WorkItemModel>> create(Ref ref) {
    return workList(ref);
  }
}

String _$workListHash() => r'cd93e7fbf7c7941fa6d5ada627294ed4b735e87e';

@ProviderFor(workDetail)
const workDetailProvider = WorkDetailFamily._();

final class WorkDetailProvider
    extends
        $FunctionalProvider<
          AsyncValue<WorkItemModel>,
          WorkItemModel,
          FutureOr<WorkItemModel>
        >
    with $FutureModifier<WorkItemModel>, $FutureProvider<WorkItemModel> {
  const WorkDetailProvider._({
    required WorkDetailFamily super.from,
    required String super.argument,
  }) : super(
         retry: null,
         name: r'workDetailProvider',
         isAutoDispose: true,
         dependencies: null,
         $allTransitiveDependencies: null,
       );

  @override
  String debugGetCreateSourceHash() => _$workDetailHash();

  @override
  String toString() {
    return r'workDetailProvider'
        ''
        '($argument)';
  }

  @$internal
  @override
  $FutureProviderElement<WorkItemModel> $createElement(
    $ProviderPointer pointer,
  ) => $FutureProviderElement(pointer);

  @override
  FutureOr<WorkItemModel> create(Ref ref) {
    final argument = this.argument as String;
    return workDetail(ref, argument);
  }

  @override
  bool operator ==(Object other) {
    return other is WorkDetailProvider && other.argument == argument;
  }

  @override
  int get hashCode {
    return argument.hashCode;
  }
}

String _$workDetailHash() => r'7ea6be62f6f05637eab7850596fb4a536e2f50e3';

final class WorkDetailFamily extends $Family
    with $FunctionalFamilyOverride<FutureOr<WorkItemModel>, String> {
  const WorkDetailFamily._()
    : super(
        retry: null,
        name: r'workDetailProvider',
        dependencies: null,
        $allTransitiveDependencies: null,
        isAutoDispose: true,
      );

  WorkDetailProvider call(String slug) =>
      WorkDetailProvider._(argument: slug, from: this);

  @override
  String toString() => r'workDetailProvider';
}
