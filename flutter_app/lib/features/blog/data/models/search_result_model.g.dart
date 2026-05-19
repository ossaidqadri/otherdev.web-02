// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'search_result_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_SearchResultModel _$SearchResultModelFromJson(Map<String, dynamic> json) =>
    _SearchResultModel(
      id: json['id'] as String,
      title: json['title'] as String,
      docRelationTo: json['docRelationTo'] as String?,
      docValue: json['docValue'],
    );

Map<String, dynamic> _$SearchResultModelToJson(_SearchResultModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'docRelationTo': instance.docRelationTo,
      'docValue': instance.docValue,
    };
