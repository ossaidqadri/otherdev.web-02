import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../../shared/data/api/api_client.dart';
import '../../data/models/work_item_model.dart';
import '../../data/repositories/work_repository.dart';

part 'work_provider.g.dart';

@riverpod
WorkRepository workRepository(Ref ref) {
  return WorkRepository(apiClient: ApiClient());
}

@riverpod
Future<List<WorkItemModel>> workList(Ref ref) async {
  final repo = ref.watch(workRepositoryProvider);
  return repo.getWorkList();
}

@riverpod
Future<WorkItemModel> workDetail(Ref ref, String slug) async {
  final repo = ref.watch(workRepositoryProvider);
  return repo.getWorkDetail(slug);
}
