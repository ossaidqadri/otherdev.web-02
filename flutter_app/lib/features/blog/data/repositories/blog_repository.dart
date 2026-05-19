import '../../../../shared/data/api/api_client.dart';
import '../../../../shared/data/api/endpoints.dart';
import '../models/blog_post_model.dart';
import '../models/search_result_model.dart';

class BlogRepository {
  BlogRepository({required ApiClient apiClient}) : _apiClient = apiClient;
  final ApiClient _apiClient;

  Future<List<BlogPostModel>> getPosts() async {
    final response = await _apiClient.get<List<dynamic>>(Endpoints.blogList);
    return (response.data as List).cast<Map<String, dynamic>>().map(BlogPostModel.fromJson).toList();
  }

  Future<BlogPostModel> getPost(String slug) async {
    final response = await _apiClient.get<Map<String, dynamic>>(Endpoints.blogPost(slug));
    final data = response.data;
    if (data == null) throw Exception('Post not found');
    return BlogPostModel.fromJson(data);
  }

  Future<List<SearchResultModel>> search(String query) async {
    final response = await _apiClient.get<List<dynamic>>(
      Endpoints.blogSearch,
      queryParameters: {'q': query},
    );
    return (response.data as List).cast<Map<String, dynamic>>().map(SearchResultModel.fromJson).toList();
  }
}