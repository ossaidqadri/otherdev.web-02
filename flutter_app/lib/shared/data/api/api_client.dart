import 'dart:async';

import 'package:dio/dio.dart';

import 'endpoints.dart';
import 'interceptors/error_handling_interceptor.dart';
import 'interceptors/logging_interceptor.dart';

class ApiClient {
  ApiClient() {
    _dio = Dio(
      BaseOptions(
        baseUrl: Endpoints.baseUrl,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    )..interceptors.addAll([
        ErrorHandlingInterceptor(),
        LoggingInterceptor(),
      ]);
  }

  late final Dio _dio;

  // GET
  Future<Response<T>> get<T>(
    String path, {
    Map<String, Object?>? queryParameters,
  }) {
    return _dio.get<T>(path, queryParameters: queryParameters);
  }

  // POST
  Future<Response<T>> post<T>(
    String path, {
    Object? data,
    Map<String, Object?>? queryParameters,
  }) {
    return _dio.post<T>(path, data: data, queryParameters: queryParameters);
  }

  // PUT
  Future<Response<T>> put<T>(
    String path, {
    Object? data,
    Map<String, Object?>? queryParameters,
  }) {
    return _dio.put<T>(path, data: data, queryParameters: queryParameters);
  }

  // DELETE
  Future<Response<T>> delete<T>(
    String path, {
    Object? data,
    Map<String, Object?>? queryParameters,
  }) {
    return _dio.delete<T>(path, data: data, queryParameters: queryParameters);
  }

  // SSE stream — for /api/chat/native
  Stream<Response<dynamic>> getStream(
    String path, {
    Object? data,
  }) {
    final controller = StreamController<Response<dynamic>>();
    _dio.post(
      path,
      data: data,
      options: Options(responseType: ResponseType.stream),
    ).then((response) {
      (response.data as Stream<List<int>>).listen(
        (chunk) {
          controller.add(response);
        },
        onError: controller.addError,
        onDone: controller.close,
      );
    }).catchError((e) {
      controller.addError(e);
      controller.close();
    });

    return controller.stream;
  }
}