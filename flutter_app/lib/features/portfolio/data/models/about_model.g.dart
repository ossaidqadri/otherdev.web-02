// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'about_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_AboutModel _$AboutModelFromJson(Map<String, dynamic> json) => _AboutModel(
  heroImage: json['heroImage'] as String,
  heroImageAlt: json['heroImageAlt'] as String,
  aboutLabel: json['aboutLabel'] as String,
  aboutTextPlain: json['aboutTextPlain'] as String,
  clientsLabel: json['clientsLabel'] as String,
  clientsDesktop: (json['clientsDesktop'] as List<dynamic>)
      .map((e) => AboutClientModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  clientsMobile: (json['clientsMobile'] as List<dynamic>)
      .map((e) => AboutClientModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  foundingDate: json['foundingDate'] as String,
  foundingYear: json['foundingYear'] as String,
  founders: (json['founders'] as List<dynamic>)
      .map((e) => AboutFounderModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  seo: json['seo'] == null
      ? null
      : AboutSeoModel.fromJson(json['seo'] as Map<String, dynamic>),
);

Map<String, dynamic> _$AboutModelToJson(_AboutModel instance) =>
    <String, dynamic>{
      'heroImage': instance.heroImage,
      'heroImageAlt': instance.heroImageAlt,
      'aboutLabel': instance.aboutLabel,
      'aboutTextPlain': instance.aboutTextPlain,
      'clientsLabel': instance.clientsLabel,
      'clientsDesktop': instance.clientsDesktop,
      'clientsMobile': instance.clientsMobile,
      'foundingDate': instance.foundingDate,
      'foundingYear': instance.foundingYear,
      'founders': instance.founders,
      'seo': instance.seo,
    };

_AboutClientModel _$AboutClientModelFromJson(Map<String, dynamic> json) =>
    _AboutClientModel(
      id: json['id'] as String,
      name: json['name'] as String,
      url: json['url'] as String?,
    );

Map<String, dynamic> _$AboutClientModelToJson(_AboutClientModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'url': instance.url,
    };

_AboutFounderModel _$AboutFounderModelFromJson(Map<String, dynamic> json) =>
    _AboutFounderModel(name: json['name'] as String);

Map<String, dynamic> _$AboutFounderModelToJson(_AboutFounderModel instance) =>
    <String, dynamic>{'name': instance.name};

_AboutSeoModel _$AboutSeoModelFromJson(Map<String, dynamic> json) =>
    _AboutSeoModel(
      meta: json['meta'] == null
          ? null
          : AboutSeoMetaModel.fromJson(json['meta'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$AboutSeoModelToJson(_AboutSeoModel instance) =>
    <String, dynamic>{'meta': instance.meta};

_AboutSeoMetaModel _$AboutSeoMetaModelFromJson(Map<String, dynamic> json) =>
    _AboutSeoMetaModel(
      title: json['title'] as String?,
      description: json['description'] as String?,
      image: json['image'] == null
          ? null
          : AboutSeoImageModel.fromJson(json['image'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$AboutSeoMetaModelToJson(_AboutSeoMetaModel instance) =>
    <String, dynamic>{
      'title': instance.title,
      'description': instance.description,
      'image': instance.image,
    };

_AboutSeoImageModel _$AboutSeoImageModelFromJson(Map<String, dynamic> json) =>
    _AboutSeoImageModel(url: json['url'] as String);

Map<String, dynamic> _$AboutSeoImageModelToJson(_AboutSeoImageModel instance) =>
    <String, dynamic>{'url': instance.url};
