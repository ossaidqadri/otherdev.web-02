import 'package:freezed_annotation/freezed_annotation.dart';

part 'work_item_model.freezed.dart';
part 'work_item_model.g.dart';

@freezed
abstract class WorkItemModel with _$WorkItemModel {
  const WorkItemModel._();
  const factory WorkItemModel({
    required String id,
    required String title,
    required String slug,
    required String image,
    required String description,
    String? url,
    List<String>? media,
    required int year,
    String? downloadUrl,
  }) = _WorkItemModel;

  factory WorkItemModel.fromJson(Map<String, dynamic> json) =>
      _$WorkItemModelFromJson(json);
}
