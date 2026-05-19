import '../../../../shared/data/api/api_client.dart';
import '../../../../shared/data/api/endpoints.dart';
import '../models/about_model.dart';

class AboutRepository {
  AboutRepository({required ApiClient apiClient}) : _apiClient = apiClient;
  final ApiClient _apiClient;

  Future<AboutModel> getAbout() async {
    final response = await _apiClient.get<Map<String, dynamic>>(Endpoints.about);
    final data = response.data;
    if (data == null) throw Exception('About not found');
    return AboutModel.fromJson(data);
  }
}