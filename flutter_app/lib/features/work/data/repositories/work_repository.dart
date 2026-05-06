import 'package:dio/dio.dart';
import '../../../../shared/data/api/api_client.dart';
import '../../../../shared/data/api/endpoints.dart';
import '../../../../shared/domain/failures/failure.dart';
import '../models/work_item_model.dart';

class WorkRepository {
  WorkRepository({required ApiClient apiClient}) : _apiClient = apiClient;

  final ApiClient _apiClient;

  Future<List<WorkItemModel>> getWorkList() async {
    try {
      final response = await _apiClient.get<List<dynamic>>(Endpoints.workList);
      return (response.data as List<dynamic>)
          .cast<Map<String, dynamic>>()
          .map(WorkItemModel.fromJson)
          .toList();
    } on DioException catch (e) {
      throw _mapToFailure(e);
    }
  }

  Future<WorkItemModel> getWorkDetail(String slug) async {
    try {
      final response = await _apiClient.get<Map<String, dynamic>>(Endpoints.workDetail(slug));
      return WorkItemModel.fromJson(response.data!);
    } on DioException catch (e) {
      throw _mapToFailure(e);
    }
  }

  Failure _mapToFailure(DioException e) {
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return const TimeoutFailure();
      case DioExceptionType.connectionError:
        return const NetworkFailure();
      case DioExceptionType.badResponse:
        return HttpFailure(e.response?.statusCode ?? 0, e.response?.statusMessage);
      default:
        return UnknownFailure(e.message);
    }
  }
}
