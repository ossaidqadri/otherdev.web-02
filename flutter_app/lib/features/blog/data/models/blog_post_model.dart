import 'package:freezed_annotation/freezed_annotation.dart';

part 'blog_post_model.freezed.dart';
part 'blog_post_model.g.dart';

@freezed
abstract class BlogPostModel with _$BlogPostModel {
  const BlogPostModel._();
  const factory BlogPostModel({
    required String id,
    required String title,
    required String slug,
    String? excerpt,
    String? contentHtml,
    String? author,
    String? featuredImage,
    DateTime? publishedAt,
    DateTime? createdAt,
  }) = _BlogPostModel;

  factory BlogPostModel.fromJson(Map<String, dynamic> json) =>
      _$BlogPostModelFromJson(json);
}