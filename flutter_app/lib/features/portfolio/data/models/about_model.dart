import 'package:freezed_annotation/freezed_annotation.dart';

part 'about_model.freezed.dart';
part 'about_model.g.dart';

@freezed
abstract class AboutModel with _$AboutModel {
  const AboutModel._();
  const factory AboutModel({
    required String heroImage,
    required String heroImageAlt,
    required String aboutLabel,
    required String aboutTextPlain,
    required String clientsLabel,
    required List<AboutClientModel> clientsDesktop,
    required List<AboutClientModel> clientsMobile,
    required String foundingDate,
    required String foundingYear,
    required List<AboutFounderModel> founders,
    AboutSeoModel? seo,
  }) = _AboutModel;

  factory AboutModel.fromJson(Map<String, dynamic> json) =>
      _$AboutModelFromJson(json);
}

@freezed
abstract class AboutClientModel with _$AboutClientModel {
  const factory AboutClientModel({
    required String id,
    required String name,
    String? url,
  }) = _AboutClientModel;

  factory AboutClientModel.fromJson(Map<String, dynamic> json) =>
      _$AboutClientModelFromJson(json);
}

@freezed
abstract class AboutFounderModel with _$AboutFounderModel {
  const factory AboutFounderModel({required String name}) = _AboutFounderModel;

  factory AboutFounderModel.fromJson(Map<String, dynamic> json) =>
      _$AboutFounderModelFromJson(json);
}

@freezed
abstract class AboutSeoModel with _$AboutSeoModel {
  const factory AboutSeoModel({
    AboutSeoMetaModel? meta,
  }) = _AboutSeoModel;

  factory AboutSeoModel.fromJson(Map<String, dynamic> json) =>
      _$AboutSeoModelFromJson(json);
}

@freezed
abstract class AboutSeoMetaModel with _$AboutSeoMetaModel {
  const factory AboutSeoMetaModel({
    String? title,
    String? description,
    AboutSeoImageModel? image,
  }) = _AboutSeoMetaModel;

  factory AboutSeoMetaModel.fromJson(Map<String, dynamic> json) =>
      _$AboutSeoMetaModelFromJson(json);
}

@freezed
abstract class AboutSeoImageModel with _$AboutSeoImageModel {
  const factory AboutSeoImageModel({required String url}) = _AboutSeoImageModel;

  factory AboutSeoImageModel.fromJson(Map<String, dynamic> json) =>
      _$AboutSeoImageModelFromJson(json);
}