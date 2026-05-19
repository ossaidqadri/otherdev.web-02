// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'blog_post_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$BlogPostModel {

 String get id; String get title; String get slug; String? get excerpt; String? get contentHtml; String? get author; String? get featuredImage; DateTime? get publishedAt; DateTime? get createdAt;
/// Create a copy of BlogPostModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$BlogPostModelCopyWith<BlogPostModel> get copyWith => _$BlogPostModelCopyWithImpl<BlogPostModel>(this as BlogPostModel, _$identity);

  /// Serializes this BlogPostModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is BlogPostModel&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.excerpt, excerpt) || other.excerpt == excerpt)&&(identical(other.contentHtml, contentHtml) || other.contentHtml == contentHtml)&&(identical(other.author, author) || other.author == author)&&(identical(other.featuredImage, featuredImage) || other.featuredImage == featuredImage)&&(identical(other.publishedAt, publishedAt) || other.publishedAt == publishedAt)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,title,slug,excerpt,contentHtml,author,featuredImage,publishedAt,createdAt);

@override
String toString() {
  return 'BlogPostModel(id: $id, title: $title, slug: $slug, excerpt: $excerpt, contentHtml: $contentHtml, author: $author, featuredImage: $featuredImage, publishedAt: $publishedAt, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class $BlogPostModelCopyWith<$Res>  {
  factory $BlogPostModelCopyWith(BlogPostModel value, $Res Function(BlogPostModel) _then) = _$BlogPostModelCopyWithImpl;
@useResult
$Res call({
 String id, String title, String slug, String? excerpt, String? contentHtml, String? author, String? featuredImage, DateTime? publishedAt, DateTime? createdAt
});




}
/// @nodoc
class _$BlogPostModelCopyWithImpl<$Res>
    implements $BlogPostModelCopyWith<$Res> {
  _$BlogPostModelCopyWithImpl(this._self, this._then);

  final BlogPostModel _self;
  final $Res Function(BlogPostModel) _then;

/// Create a copy of BlogPostModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? title = null,Object? slug = null,Object? excerpt = freezed,Object? contentHtml = freezed,Object? author = freezed,Object? featuredImage = freezed,Object? publishedAt = freezed,Object? createdAt = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,excerpt: freezed == excerpt ? _self.excerpt : excerpt // ignore: cast_nullable_to_non_nullable
as String?,contentHtml: freezed == contentHtml ? _self.contentHtml : contentHtml // ignore: cast_nullable_to_non_nullable
as String?,author: freezed == author ? _self.author : author // ignore: cast_nullable_to_non_nullable
as String?,featuredImage: freezed == featuredImage ? _self.featuredImage : featuredImage // ignore: cast_nullable_to_non_nullable
as String?,publishedAt: freezed == publishedAt ? _self.publishedAt : publishedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [BlogPostModel].
extension BlogPostModelPatterns on BlogPostModel {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _BlogPostModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _BlogPostModel() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _BlogPostModel value)  $default,){
final _that = this;
switch (_that) {
case _BlogPostModel():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _BlogPostModel value)?  $default,){
final _that = this;
switch (_that) {
case _BlogPostModel() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String title,  String slug,  String? excerpt,  String? contentHtml,  String? author,  String? featuredImage,  DateTime? publishedAt,  DateTime? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _BlogPostModel() when $default != null:
return $default(_that.id,_that.title,_that.slug,_that.excerpt,_that.contentHtml,_that.author,_that.featuredImage,_that.publishedAt,_that.createdAt);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String title,  String slug,  String? excerpt,  String? contentHtml,  String? author,  String? featuredImage,  DateTime? publishedAt,  DateTime? createdAt)  $default,) {final _that = this;
switch (_that) {
case _BlogPostModel():
return $default(_that.id,_that.title,_that.slug,_that.excerpt,_that.contentHtml,_that.author,_that.featuredImage,_that.publishedAt,_that.createdAt);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String title,  String slug,  String? excerpt,  String? contentHtml,  String? author,  String? featuredImage,  DateTime? publishedAt,  DateTime? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _BlogPostModel() when $default != null:
return $default(_that.id,_that.title,_that.slug,_that.excerpt,_that.contentHtml,_that.author,_that.featuredImage,_that.publishedAt,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _BlogPostModel extends BlogPostModel {
  const _BlogPostModel({required this.id, required this.title, required this.slug, this.excerpt, this.contentHtml, this.author, this.featuredImage, this.publishedAt, this.createdAt}): super._();
  factory _BlogPostModel.fromJson(Map<String, dynamic> json) => _$BlogPostModelFromJson(json);

@override final  String id;
@override final  String title;
@override final  String slug;
@override final  String? excerpt;
@override final  String? contentHtml;
@override final  String? author;
@override final  String? featuredImage;
@override final  DateTime? publishedAt;
@override final  DateTime? createdAt;

/// Create a copy of BlogPostModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$BlogPostModelCopyWith<_BlogPostModel> get copyWith => __$BlogPostModelCopyWithImpl<_BlogPostModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$BlogPostModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _BlogPostModel&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.excerpt, excerpt) || other.excerpt == excerpt)&&(identical(other.contentHtml, contentHtml) || other.contentHtml == contentHtml)&&(identical(other.author, author) || other.author == author)&&(identical(other.featuredImage, featuredImage) || other.featuredImage == featuredImage)&&(identical(other.publishedAt, publishedAt) || other.publishedAt == publishedAt)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,title,slug,excerpt,contentHtml,author,featuredImage,publishedAt,createdAt);

@override
String toString() {
  return 'BlogPostModel(id: $id, title: $title, slug: $slug, excerpt: $excerpt, contentHtml: $contentHtml, author: $author, featuredImage: $featuredImage, publishedAt: $publishedAt, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$BlogPostModelCopyWith<$Res> implements $BlogPostModelCopyWith<$Res> {
  factory _$BlogPostModelCopyWith(_BlogPostModel value, $Res Function(_BlogPostModel) _then) = __$BlogPostModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String title, String slug, String? excerpt, String? contentHtml, String? author, String? featuredImage, DateTime? publishedAt, DateTime? createdAt
});




}
/// @nodoc
class __$BlogPostModelCopyWithImpl<$Res>
    implements _$BlogPostModelCopyWith<$Res> {
  __$BlogPostModelCopyWithImpl(this._self, this._then);

  final _BlogPostModel _self;
  final $Res Function(_BlogPostModel) _then;

/// Create a copy of BlogPostModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? title = null,Object? slug = null,Object? excerpt = freezed,Object? contentHtml = freezed,Object? author = freezed,Object? featuredImage = freezed,Object? publishedAt = freezed,Object? createdAt = freezed,}) {
  return _then(_BlogPostModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,excerpt: freezed == excerpt ? _self.excerpt : excerpt // ignore: cast_nullable_to_non_nullable
as String?,contentHtml: freezed == contentHtml ? _self.contentHtml : contentHtml // ignore: cast_nullable_to_non_nullable
as String?,author: freezed == author ? _self.author : author // ignore: cast_nullable_to_non_nullable
as String?,featuredImage: freezed == featuredImage ? _self.featuredImage : featuredImage // ignore: cast_nullable_to_non_nullable
as String?,publishedAt: freezed == publishedAt ? _self.publishedAt : publishedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}

// dart format on
