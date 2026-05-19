import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../data/models/about_model.dart';
import '../../data/repositories/about_repository.dart';
import '../../../../shared/data/api/api_client.dart';

part 'about_provider.g.dart';

@riverpod
AboutRepository aboutRepository(Ref ref) => AboutRepository(apiClient: ApiClient());

@riverpod
Future<AboutModel> aboutContent(Ref ref) async {
  final repo = ref.watch(aboutRepositoryProvider);
  return repo.getAbout();
}