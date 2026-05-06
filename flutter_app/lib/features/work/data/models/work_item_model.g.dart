// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'work_item_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_WorkItemModel _$WorkItemModelFromJson(Map<String, dynamic> json) =>
    _WorkItemModel(
      id: json['id'] as String,
      title: json['title'] as String,
      slug: json['slug'] as String,
      image: json['image'] as String,
      description: json['description'] as String,
      url: json['url'] as String?,
      media: (json['media'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      year: (json['year'] as num).toInt(),
      downloadUrl: json['downloadUrl'] as String?,
    );

Map<String, dynamic> _$WorkItemModelToJson(_WorkItemModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'slug': instance.slug,
      'image': instance.image,
      'description': instance.description,
      'url': instance.url,
      'media': instance.media,
      'year': instance.year,
      'downloadUrl': instance.downloadUrl,
    };
