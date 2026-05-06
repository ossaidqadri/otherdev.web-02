// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'work_item_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$WorkItemModel {

 String get id; String get title; String get slug; String get image; String get description; String? get url; List<String>? get media; int get year; String? get downloadUrl;
/// Create a copy of WorkItemModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$WorkItemModelCopyWith<WorkItemModel> get copyWith => _$WorkItemModelCopyWithImpl<WorkItemModel>(this as WorkItemModel, _$identity);

  /// Serializes this WorkItemModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is WorkItemModel&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.image, image) || other.image == image)&&(identical(other.description, description) || other.description == description)&&(identical(other.url, url) || other.url == url)&&const DeepCollectionEquality().equals(other.media, media)&&(identical(other.year, year) || other.year == year)&&(identical(other.downloadUrl, downloadUrl) || other.downloadUrl == downloadUrl));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,title,slug,image,description,url,const DeepCollectionEquality().hash(media),year,downloadUrl);

@override
String toString() {
  return 'WorkItemModel(id: $id, title: $title, slug: $slug, image: $image, description: $description, url: $url, media: $media, year: $year, downloadUrl: $downloadUrl)';
}


}

/// @nodoc
abstract mixin class $WorkItemModelCopyWith<$Res>  {
  factory $WorkItemModelCopyWith(WorkItemModel value, $Res Function(WorkItemModel) _then) = _$WorkItemModelCopyWithImpl;
@useResult
$Res call({
 String id, String title, String slug, String image, String description, String? url, List<String>? media, int year, String? downloadUrl
});




}
/// @nodoc
class _$WorkItemModelCopyWithImpl<$Res>
    implements $WorkItemModelCopyWith<$Res> {
  _$WorkItemModelCopyWithImpl(this._self, this._then);

  final WorkItemModel _self;
  final $Res Function(WorkItemModel) _then;

/// Create a copy of WorkItemModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? title = null,Object? slug = null,Object? image = null,Object? description = null,Object? url = freezed,Object? media = freezed,Object? year = null,Object? downloadUrl = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,image: null == image ? _self.image : image // ignore: cast_nullable_to_non_nullable
as String,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,url: freezed == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String?,media: freezed == media ? _self.media : media // ignore: cast_nullable_to_non_nullable
as List<String>?,year: null == year ? _self.year : year // ignore: cast_nullable_to_non_nullable
as int,downloadUrl: freezed == downloadUrl ? _self.downloadUrl : downloadUrl // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

}


/// Adds pattern-matching-related methods to [WorkItemModel].
extension WorkItemModelPatterns on WorkItemModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _WorkItemModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _WorkItemModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _WorkItemModel value)  $default,){
final _that = this;
switch (_that) {
case _WorkItemModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _WorkItemModel value)?  $default,){
final _that = this;
switch (_that) {
case _WorkItemModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String title,  String slug,  String image,  String description,  String? url,  List<String>? media,  int year,  String? downloadUrl)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _WorkItemModel() when $default != null:
return $default(_that.id,_that.title,_that.slug,_that.image,_that.description,_that.url,_that.media,_that.year,_that.downloadUrl);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String title,  String slug,  String image,  String description,  String? url,  List<String>? media,  int year,  String? downloadUrl)  $default,) {final _that = this;
switch (_that) {
case _WorkItemModel():
return $default(_that.id,_that.title,_that.slug,_that.image,_that.description,_that.url,_that.media,_that.year,_that.downloadUrl);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String title,  String slug,  String image,  String description,  String? url,  List<String>? media,  int year,  String? downloadUrl)?  $default,) {final _that = this;
switch (_that) {
case _WorkItemModel() when $default != null:
return $default(_that.id,_that.title,_that.slug,_that.image,_that.description,_that.url,_that.media,_that.year,_that.downloadUrl);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _WorkItemModel extends WorkItemModel {
  const _WorkItemModel({required this.id, required this.title, required this.slug, required this.image, required this.description, this.url, final  List<String>? media, required this.year, this.downloadUrl}): _media = media,super._();
  factory _WorkItemModel.fromJson(Map<String, dynamic> json) => _$WorkItemModelFromJson(json);

@override final  String id;
@override final  String title;
@override final  String slug;
@override final  String image;
@override final  String description;
@override final  String? url;
 final  List<String>? _media;
@override List<String>? get media {
  final value = _media;
  if (value == null) return null;
  if (_media is EqualUnmodifiableListView) return _media;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(value);
}

@override final  int year;
@override final  String? downloadUrl;

/// Create a copy of WorkItemModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$WorkItemModelCopyWith<_WorkItemModel> get copyWith => __$WorkItemModelCopyWithImpl<_WorkItemModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$WorkItemModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _WorkItemModel&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.image, image) || other.image == image)&&(identical(other.description, description) || other.description == description)&&(identical(other.url, url) || other.url == url)&&const DeepCollectionEquality().equals(other._media, _media)&&(identical(other.year, year) || other.year == year)&&(identical(other.downloadUrl, downloadUrl) || other.downloadUrl == downloadUrl));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,title,slug,image,description,url,const DeepCollectionEquality().hash(_media),year,downloadUrl);

@override
String toString() {
  return 'WorkItemModel(id: $id, title: $title, slug: $slug, image: $image, description: $description, url: $url, media: $media, year: $year, downloadUrl: $downloadUrl)';
}


}

/// @nodoc
abstract mixin class _$WorkItemModelCopyWith<$Res> implements $WorkItemModelCopyWith<$Res> {
  factory _$WorkItemModelCopyWith(_WorkItemModel value, $Res Function(_WorkItemModel) _then) = __$WorkItemModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String title, String slug, String image, String description, String? url, List<String>? media, int year, String? downloadUrl
});




}
/// @nodoc
class __$WorkItemModelCopyWithImpl<$Res>
    implements _$WorkItemModelCopyWith<$Res> {
  __$WorkItemModelCopyWithImpl(this._self, this._then);

  final _WorkItemModel _self;
  final $Res Function(_WorkItemModel) _then;

/// Create a copy of WorkItemModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? title = null,Object? slug = null,Object? image = null,Object? description = null,Object? url = freezed,Object? media = freezed,Object? year = null,Object? downloadUrl = freezed,}) {
  return _then(_WorkItemModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,image: null == image ? _self.image : image // ignore: cast_nullable_to_non_nullable
as String,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,url: freezed == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String?,media: freezed == media ? _self._media : media // ignore: cast_nullable_to_non_nullable
as List<String>?,year: null == year ? _self.year : year // ignore: cast_nullable_to_non_nullable
as int,downloadUrl: freezed == downloadUrl ? _self.downloadUrl : downloadUrl // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}


}

// dart format on
