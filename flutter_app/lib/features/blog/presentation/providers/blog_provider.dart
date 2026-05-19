import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../data/models/blog_post_model.dart';
import '../../data/models/search_result_model.dart';
import '../../data/repositories/blog_repository.dart';
import '../../../../shared/data/api/api_client.dart';

part 'blog_provider.g.dart';

@riverpod
BlogRepository blogRepository(Ref ref) => BlogRepository(apiClient: ApiClient());

@riverpod
Future<List<BlogPostModel>> blogList(Ref ref) async {
  final repo = ref.watch(blogRepositoryProvider);
  return repo.getPosts();
}

@riverpod
Future<BlogPostModel> blogPost(Ref ref, String slug) async {
  final repo = ref.watch(blogRepositoryProvider);
  return repo.getPost(slug);
}

@riverpod
Future<List<SearchResultModel>> blogSearch(Ref ref, String query) async {
  final repo = ref.watch(blogRepositoryProvider);
  return repo.search(query);
}