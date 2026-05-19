// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'search_result_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$SearchResultModel {

 String get id; String get title; String? get docRelationTo; dynamic get docValue;
/// Create a copy of SearchResultModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SearchResultModelCopyWith<SearchResultModel> get copyWith => _$SearchResultModelCopyWithImpl<SearchResultModel>(this as SearchResultModel, _$identity);

  /// Serializes this SearchResultModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SearchResultModel&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.docRelationTo, docRelationTo) || other.docRelationTo == docRelationTo)&&const DeepCollectionEquality().equals(other.docValue, docValue));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,title,docRelationTo,const DeepCollectionEquality().hash(docValue));

@override
String toString() {
  return 'SearchResultModel(id: $id, title: $title, docRelationTo: $docRelationTo, docValue: $docValue)';
}


}

/// @nodoc
abstract mixin class $SearchResultModelCopyWith<$Res>  {
  factory $SearchResultModelCopyWith(SearchResultModel value, $Res Function(SearchResultModel) _then) = _$SearchResultModelCopyWithImpl;
@useResult
$Res call({
 String id, String title, String? docRelationTo, dynamic docValue
});




}
/// @nodoc
class _$SearchResultModelCopyWithImpl<$Res>
    implements $SearchResultModelCopyWith<$Res> {
  _$SearchResultModelCopyWithImpl(this._self, this._then);

  final SearchResultModel _self;
  final $Res Function(SearchResultModel) _then;

/// Create a copy of SearchResultModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? title = null,Object? docRelationTo = freezed,Object? docValue = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,docRelationTo: freezed == docRelationTo ? _self.docRelationTo : docRelationTo // ignore: cast_nullable_to_non_nullable
as String?,docValue: freezed == docValue ? _self.docValue : docValue // ignore: cast_nullable_to_non_nullable
as dynamic,
  ));
}

}


/// Adds pattern-matching-related methods to [SearchResultModel].
extension SearchResultModelPatterns on SearchResultModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _SearchResultModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _SearchResultModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _SearchResultModel value)  $default,){
final _that = this;
switch (_that) {
case _SearchResultModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _SearchResultModel value)?  $default,){
final _that = this;
switch (_that) {
case _SearchResultModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String title,  String? docRelationTo,  dynamic docValue)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SearchResultModel() when $default != null:
return $default(_that.id,_that.title,_that.docRelationTo,_that.docValue);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String title,  String? docRelationTo,  dynamic docValue)  $default,) {final _that = this;
switch (_that) {
case _SearchResultModel():
return $default(_that.id,_that.title,_that.docRelationTo,_that.docValue);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String title,  String? docRelationTo,  dynamic docValue)?  $default,) {final _that = this;
switch (_that) {
case _SearchResultModel() when $default != null:
return $default(_that.id,_that.title,_that.docRelationTo,_that.docValue);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SearchResultModel implements SearchResultModel {
  const _SearchResultModel({required this.id, required this.title, this.docRelationTo, this.docValue});
  factory _SearchResultModel.fromJson(Map<String, dynamic> json) => _$SearchResultModelFromJson(json);

@override final  String id;
@override final  String title;
@override final  String? docRelationTo;
@override final  dynamic docValue;

/// Create a copy of SearchResultModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SearchResultModelCopyWith<_SearchResultModel> get copyWith => __$SearchResultModelCopyWithImpl<_SearchResultModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SearchResultModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SearchResultModel&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.docRelationTo, docRelationTo) || other.docRelationTo == docRelationTo)&&const DeepCollectionEquality().equals(other.docValue, docValue));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,title,docRelationTo,const DeepCollectionEquality().hash(docValue));

@override
String toString() {
  return 'SearchResultModel(id: $id, title: $title, docRelationTo: $docRelationTo, docValue: $docValue)';
}


}

/// @nodoc
abstract mixin class _$SearchResultModelCopyWith<$Res> implements $SearchResultModelCopyWith<$Res> {
  factory _$SearchResultModelCopyWith(_SearchResultModel value, $Res Function(_SearchResultModel) _then) = __$SearchResultModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String title, String? docRelationTo, dynamic docValue
});




}
/// @nodoc
class __$SearchResultModelCopyWithImpl<$Res>
    implements _$SearchResultModelCopyWith<$Res> {
  __$SearchResultModelCopyWithImpl(this._self, this._then);

  final _SearchResultModel _self;
  final $Res Function(_SearchResultModel) _then;

/// Create a copy of SearchResultModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? title = null,Object? docRelationTo = freezed,Object? docValue = freezed,}) {
  return _then(_SearchResultModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,docRelationTo: freezed == docRelationTo ? _self.docRelationTo : docRelationTo // ignore: cast_nullable_to_non_nullable
as String?,docValue: freezed == docValue ? _self.docValue : docValue // ignore: cast_nullable_to_non_nullable
as dynamic,
  ));
}


}

// dart format on
