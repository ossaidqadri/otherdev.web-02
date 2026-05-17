import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

class LoggingInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    debugPrint(
      '=>  ${options.method} ${options.uri}\n'
      '   Headers: ${options.headers}\n'
      '   Body: ${options.data}',
    );
    handler.next(options);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    debugPrint(
      '<=  ${response.statusCode} ${response.requestOptions.uri}\n'
      '   Data: ${response.data}',
    );
    handler.next(response);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    debugPrint(
      '!!  ${err.type} ${err.requestOptions.uri}\n'
      '   Message: ${err.message}',
    );
    handler.next(err);
  }
}