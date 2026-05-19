import 'package:freezed_annotation/freezed_annotation.dart';

part 'search_result_model.freezed.dart';
part 'search_result_model.g.dart';

@freezed
abstract class SearchResultModel with _$SearchResultModel {
  const factory SearchResultModel({
    required String id,
    required String title,
    String? docRelationTo,
    dynamic docValue,
  }) = _SearchResultModel;

  factory SearchResultModel.fromJson(Map<String, dynamic> json) =>
      _$SearchResultModelFromJson(json);
}