// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'blog_post_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_BlogPostModel _$BlogPostModelFromJson(Map<String, dynamic> json) =>
    _BlogPostModel(
      id: json['id'] as String,
      title: json['title'] as String,
      slug: json['slug'] as String,
      excerpt: json['excerpt'] as String?,
      contentHtml: json['contentHtml'] as String?,
      author: json['author'] as String?,
      featuredImage: json['featuredImage'] as String?,
      publishedAt: json['publishedAt'] == null
          ? null
          : DateTime.parse(json['publishedAt'] as String),
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
    );

Map<String, dynamic> _$BlogPostModelToJson(_BlogPostModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'slug': instance.slug,
      'excerpt': instance.excerpt,
      'contentHtml': instance.contentHtml,
      'author': instance.author,
      'featuredImage': instance.featuredImage,
      'publishedAt': instance.publishedAt?.toIso8601String(),
      'createdAt': instance.createdAt?.toIso8601String(),
    };
