// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'about_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$AboutModel {

 String get heroImage; String get heroImageAlt; String get aboutLabel; String get aboutTextPlain; String get clientsLabel; List<AboutClientModel> get clientsDesktop; List<AboutClientModel> get clientsMobile; String get foundingDate; String get foundingYear; List<AboutFounderModel> get founders; AboutSeoModel? get seo;
/// Create a copy of AboutModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$AboutModelCopyWith<AboutModel> get copyWith => _$AboutModelCopyWithImpl<AboutModel>(this as AboutModel, _$identity);

  /// Serializes this AboutModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AboutModel&&(identical(other.heroImage, heroImage) || other.heroImage == heroImage)&&(identical(other.heroImageAlt, heroImageAlt) || other.heroImageAlt == heroImageAlt)&&(identical(other.aboutLabel, aboutLabel) || other.aboutLabel == aboutLabel)&&(identical(other.aboutTextPlain, aboutTextPlain) || other.aboutTextPlain == aboutTextPlain)&&(identical(other.clientsLabel, clientsLabel) || other.clientsLabel == clientsLabel)&&const DeepCollectionEquality().equals(other.clientsDesktop, clientsDesktop)&&const DeepCollectionEquality().equals(other.clientsMobile, clientsMobile)&&(identical(other.foundingDate, foundingDate) || other.foundingDate == foundingDate)&&(identical(other.foundingYear, foundingYear) || other.foundingYear == foundingYear)&&const DeepCollectionEquality().equals(other.founders, founders)&&(identical(other.seo, seo) || other.seo == seo));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,heroImage,heroImageAlt,aboutLabel,aboutTextPlain,clientsLabel,const DeepCollectionEquality().hash(clientsDesktop),const DeepCollectionEquality().hash(clientsMobile),foundingDate,foundingYear,const DeepCollectionEquality().hash(founders),seo);

@override
String toString() {
  return 'AboutModel(heroImage: $heroImage, heroImageAlt: $heroImageAlt, aboutLabel: $aboutLabel, aboutTextPlain: $aboutTextPlain, clientsLabel: $clientsLabel, clientsDesktop: $clientsDesktop, clientsMobile: $clientsMobile, foundingDate: $foundingDate, foundingYear: $foundingYear, founders: $founders, seo: $seo)';
}


}

/// @nodoc
abstract mixin class $AboutModelCopyWith<$Res>  {
  factory $AboutModelCopyWith(AboutModel value, $Res Function(AboutModel) _then) = _$AboutModelCopyWithImpl;
@useResult
$Res call({
 String heroImage, String heroImageAlt, String aboutLabel, String aboutTextPlain, String clientsLabel, List<AboutClientModel> clientsDesktop, List<AboutClientModel> clientsMobile, String foundingDate, String foundingYear, List<AboutFounderModel> founders, AboutSeoModel? seo
});


$AboutSeoModelCopyWith<$Res>? get seo;

}
/// @nodoc
class _$AboutModelCopyWithImpl<$Res>
    implements $AboutModelCopyWith<$Res> {
  _$AboutModelCopyWithImpl(this._self, this._then);

  final AboutModel _self;
  final $Res Function(AboutModel) _then;

/// Create a copy of AboutModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? heroImage = null,Object? heroImageAlt = null,Object? aboutLabel = null,Object? aboutTextPlain = null,Object? clientsLabel = null,Object? clientsDesktop = null,Object? clientsMobile = null,Object? foundingDate = null,Object? foundingYear = null,Object? founders = null,Object? seo = freezed,}) {
  return _then(_self.copyWith(
heroImage: null == heroImage ? _self.heroImage : heroImage // ignore: cast_nullable_to_non_nullable
as String,heroImageAlt: null == heroImageAlt ? _self.heroImageAlt : heroImageAlt // ignore: cast_nullable_to_non_nullable
as String,aboutLabel: null == aboutLabel ? _self.aboutLabel : aboutLabel // ignore: cast_nullable_to_non_nullable
as String,aboutTextPlain: null == aboutTextPlain ? _self.aboutTextPlain : aboutTextPlain // ignore: cast_nullable_to_non_nullable
as String,clientsLabel: null == clientsLabel ? _self.clientsLabel : clientsLabel // ignore: cast_nullable_to_non_nullable
as String,clientsDesktop: null == clientsDesktop ? _self.clientsDesktop : clientsDesktop // ignore: cast_nullable_to_non_nullable
as List<AboutClientModel>,clientsMobile: null == clientsMobile ? _self.clientsMobile : clientsMobile // ignore: cast_nullable_to_non_nullable
as List<AboutClientModel>,foundingDate: null == foundingDate ? _self.foundingDate : foundingDate // ignore: cast_nullable_to_non_nullable
as String,foundingYear: null == foundingYear ? _self.foundingYear : foundingYear // ignore: cast_nullable_to_non_nullable
as String,founders: null == founders ? _self.founders : founders // ignore: cast_nullable_to_non_nullable
as List<AboutFounderModel>,seo: freezed == seo ? _self.seo : seo // ignore: cast_nullable_to_non_nullable
as AboutSeoModel?,
  ));
}
/// Create a copy of AboutModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$AboutSeoModelCopyWith<$Res>? get seo {
    if (_self.seo == null) {
    return null;
  }

  return $AboutSeoModelCopyWith<$Res>(_self.seo!, (value) {
    return _then(_self.copyWith(seo: value));
  });
}
}


/// Adds pattern-matching-related methods to [AboutModel].
extension AboutModelPatterns on AboutModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _AboutModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _AboutModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _AboutModel value)  $default,){
final _that = this;
switch (_that) {
case _AboutModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _AboutModel value)?  $default,){
final _that = this;
switch (_that) {
case _AboutModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String heroImage,  String heroImageAlt,  String aboutLabel,  String aboutTextPlain,  String clientsLabel,  List<AboutClientModel> clientsDesktop,  List<AboutClientModel> clientsMobile,  String foundingDate,  String foundingYear,  List<AboutFounderModel> founders,  AboutSeoModel? seo)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _AboutModel() when $default != null:
return $default(_that.heroImage,_that.heroImageAlt,_that.aboutLabel,_that.aboutTextPlain,_that.clientsLabel,_that.clientsDesktop,_that.clientsMobile,_that.foundingDate,_that.foundingYear,_that.founders,_that.seo);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String heroImage,  String heroImageAlt,  String aboutLabel,  String aboutTextPlain,  String clientsLabel,  List<AboutClientModel> clientsDesktop,  List<AboutClientModel> clientsMobile,  String foundingDate,  String foundingYear,  List<AboutFounderModel> founders,  AboutSeoModel? seo)  $default,) {final _that = this;
switch (_that) {
case _AboutModel():
return $default(_that.heroImage,_that.heroImageAlt,_that.aboutLabel,_that.aboutTextPlain,_that.clientsLabel,_that.clientsDesktop,_that.clientsMobile,_that.foundingDate,_that.foundingYear,_that.founders,_that.seo);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String heroImage,  String heroImageAlt,  String aboutLabel,  String aboutTextPlain,  String clientsLabel,  List<AboutClientModel> clientsDesktop,  List<AboutClientModel> clientsMobile,  String foundingDate,  String foundingYear,  List<AboutFounderModel> founders,  AboutSeoModel? seo)?  $default,) {final _that = this;
switch (_that) {
case _AboutModel() when $default != null:
return $default(_that.heroImage,_that.heroImageAlt,_that.aboutLabel,_that.aboutTextPlain,_that.clientsLabel,_that.clientsDesktop,_that.clientsMobile,_that.foundingDate,_that.foundingYear,_that.founders,_that.seo);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _AboutModel extends AboutModel {
  const _AboutModel({required this.heroImage, required this.heroImageAlt, required this.aboutLabel, required this.aboutTextPlain, required this.clientsLabel, required final  List<AboutClientModel> clientsDesktop, required final  List<AboutClientModel> clientsMobile, required this.foundingDate, required this.foundingYear, required final  List<AboutFounderModel> founders, this.seo}): _clientsDesktop = clientsDesktop,_clientsMobile = clientsMobile,_founders = founders,super._();
  factory _AboutModel.fromJson(Map<String, dynamic> json) => _$AboutModelFromJson(json);

@override final  String heroImage;
@override final  String heroImageAlt;
@override final  String aboutLabel;
@override final  String aboutTextPlain;
@override final  String clientsLabel;
 final  List<AboutClientModel> _clientsDesktop;
@override List<AboutClientModel> get clientsDesktop {
  if (_clientsDesktop is EqualUnmodifiableListView) return _clientsDesktop;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_clientsDesktop);
}

 final  List<AboutClientModel> _clientsMobile;
@override List<AboutClientModel> get clientsMobile {
  if (_clientsMobile is EqualUnmodifiableListView) return _clientsMobile;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_clientsMobile);
}

@override final  String foundingDate;
@override final  String foundingYear;
 final  List<AboutFounderModel> _founders;
@override List<AboutFounderModel> get founders {
  if (_founders is EqualUnmodifiableListView) return _founders;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_founders);
}

@override final  AboutSeoModel? seo;

/// Create a copy of AboutModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$AboutModelCopyWith<_AboutModel> get copyWith => __$AboutModelCopyWithImpl<_AboutModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$AboutModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _AboutModel&&(identical(other.heroImage, heroImage) || other.heroImage == heroImage)&&(identical(other.heroImageAlt, heroImageAlt) || other.heroImageAlt == heroImageAlt)&&(identical(other.aboutLabel, aboutLabel) || other.aboutLabel == aboutLabel)&&(identical(other.aboutTextPlain, aboutTextPlain) || other.aboutTextPlain == aboutTextPlain)&&(identical(other.clientsLabel, clientsLabel) || other.clientsLabel == clientsLabel)&&const DeepCollectionEquality().equals(other._clientsDesktop, _clientsDesktop)&&const DeepCollectionEquality().equals(other._clientsMobile, _clientsMobile)&&(identical(other.foundingDate, foundingDate) || other.foundingDate == foundingDate)&&(identical(other.foundingYear, foundingYear) || other.foundingYear == foundingYear)&&const DeepCollectionEquality().equals(other._founders, _founders)&&(identical(other.seo, seo) || other.seo == seo));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,heroImage,heroImageAlt,aboutLabel,aboutTextPlain,clientsLabel,const DeepCollectionEquality().hash(_clientsDesktop),const DeepCollectionEquality().hash(_clientsMobile),foundingDate,foundingYear,const DeepCollectionEquality().hash(_founders),seo);

@override
String toString() {
  return 'AboutModel(heroImage: $heroImage, heroImageAlt: $heroImageAlt, aboutLabel: $aboutLabel, aboutTextPlain: $aboutTextPlain, clientsLabel: $clientsLabel, clientsDesktop: $clientsDesktop, clientsMobile: $clientsMobile, foundingDate: $foundingDate, foundingYear: $foundingYear, founders: $founders, seo: $seo)';
}


}

/// @nodoc
abstract mixin class _$AboutModelCopyWith<$Res> implements $AboutModelCopyWith<$Res> {
  factory _$AboutModelCopyWith(_AboutModel value, $Res Function(_AboutModel) _then) = __$AboutModelCopyWithImpl;
@override @useResult
$Res call({
 String heroImage, String heroImageAlt, String aboutLabel, String aboutTextPlain, String clientsLabel, List<AboutClientModel> clientsDesktop, List<AboutClientModel> clientsMobile, String foundingDate, String foundingYear, List<AboutFounderModel> founders, AboutSeoModel? seo
});


@override $AboutSeoModelCopyWith<$Res>? get seo;

}
/// @nodoc
class __$AboutModelCopyWithImpl<$Res>
    implements _$AboutModelCopyWith<$Res> {
  __$AboutModelCopyWithImpl(this._self, this._then);

  final _AboutModel _self;
  final $Res Function(_AboutModel) _then;

/// Create a copy of AboutModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? heroImage = null,Object? heroImageAlt = null,Object? aboutLabel = null,Object? aboutTextPlain = null,Object? clientsLabel = null,Object? clientsDesktop = null,Object? clientsMobile = null,Object? foundingDate = null,Object? foundingYear = null,Object? founders = null,Object? seo = freezed,}) {
  return _then(_AboutModel(
heroImage: null == heroImage ? _self.heroImage : heroImage // ignore: cast_nullable_to_non_nullable
as String,heroImageAlt: null == heroImageAlt ? _self.heroImageAlt : heroImageAlt // ignore: cast_nullable_to_non_nullable
as String,aboutLabel: null == aboutLabel ? _self.aboutLabel : aboutLabel // ignore: cast_nullable_to_non_nullable
as String,aboutTextPlain: null == aboutTextPlain ? _self.aboutTextPlain : aboutTextPlain // ignore: cast_nullable_to_non_nullable
as String,clientsLabel: null == clientsLabel ? _self.clientsLabel : clientsLabel // ignore: cast_nullable_to_non_nullable
as String,clientsDesktop: null == clientsDesktop ? _self._clientsDesktop : clientsDesktop // ignore: cast_nullable_to_non_nullable
as List<AboutClientModel>,clientsMobile: null == clientsMobile ? _self._clientsMobile : clientsMobile // ignore: cast_nullable_to_non_nullable
as List<AboutClientModel>,foundingDate: null == foundingDate ? _self.foundingDate : foundingDate // ignore: cast_nullable_to_non_nullable
as String,foundingYear: null == foundingYear ? _self.foundingYear : foundingYear // ignore: cast_nullable_to_non_nullable
as String,founders: null == founders ? _self._founders : founders // ignore: cast_nullable_to_non_nullable
as List<AboutFounderModel>,seo: freezed == seo ? _self.seo : seo // ignore: cast_nullable_to_non_nullable
as AboutSeoModel?,
  ));
}

/// Create a copy of AboutModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$AboutSeoModelCopyWith<$Res>? get seo {
    if (_self.seo == null) {
    return null;
  }

  return $AboutSeoModelCopyWith<$Res>(_self.seo!, (value) {
    return _then(_self.copyWith(seo: value));
  });
}
}


/// @nodoc
mixin _$AboutClientModel {

 String get id; String get name; String? get url;
/// Create a copy of AboutClientModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$AboutClientModelCopyWith<AboutClientModel> get copyWith => _$AboutClientModelCopyWithImpl<AboutClientModel>(this as AboutClientModel, _$identity);

  /// Serializes this AboutClientModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AboutClientModel&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.url, url) || other.url == url));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,url);

@override
String toString() {
  return 'AboutClientModel(id: $id, name: $name, url: $url)';
}


}

/// @nodoc
abstract mixin class $AboutClientModelCopyWith<$Res>  {
  factory $AboutClientModelCopyWith(AboutClientModel value, $Res Function(AboutClientModel) _then) = _$AboutClientModelCopyWithImpl;
@useResult
$Res call({
 String id, String name, String? url
});




}
/// @nodoc
class _$AboutClientModelCopyWithImpl<$Res>
    implements $AboutClientModelCopyWith<$Res> {
  _$AboutClientModelCopyWithImpl(this._self, this._then);

  final AboutClientModel _self;
  final $Res Function(AboutClientModel) _then;

/// Create a copy of AboutClientModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? name = null,Object? url = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,url: freezed == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

}


/// Adds pattern-matching-related methods to [AboutClientModel].
extension AboutClientModelPatterns on AboutClientModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _AboutClientModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _AboutClientModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _AboutClientModel value)  $default,){
final _that = this;
switch (_that) {
case _AboutClientModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _AboutClientModel value)?  $default,){
final _that = this;
switch (_that) {
case _AboutClientModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String name,  String? url)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _AboutClientModel() when $default != null:
return $default(_that.id,_that.name,_that.url);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String name,  String? url)  $default,) {final _that = this;
switch (_that) {
case _AboutClientModel():
return $default(_that.id,_that.name,_that.url);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String name,  String? url)?  $default,) {final _that = this;
switch (_that) {
case _AboutClientModel() when $default != null:
return $default(_that.id,_that.name,_that.url);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _AboutClientModel implements AboutClientModel {
  const _AboutClientModel({required this.id, required this.name, this.url});
  factory _AboutClientModel.fromJson(Map<String, dynamic> json) => _$AboutClientModelFromJson(json);

@override final  String id;
@override final  String name;
@override final  String? url;

/// Create a copy of AboutClientModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$AboutClientModelCopyWith<_AboutClientModel> get copyWith => __$AboutClientModelCopyWithImpl<_AboutClientModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$AboutClientModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _AboutClientModel&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.url, url) || other.url == url));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,url);

@override
String toString() {
  return 'AboutClientModel(id: $id, name: $name, url: $url)';
}


}

/// @nodoc
abstract mixin class _$AboutClientModelCopyWith<$Res> implements $AboutClientModelCopyWith<$Res> {
  factory _$AboutClientModelCopyWith(_AboutClientModel value, $Res Function(_AboutClientModel) _then) = __$AboutClientModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String name, String? url
});




}
/// @nodoc
class __$AboutClientModelCopyWithImpl<$Res>
    implements _$AboutClientModelCopyWith<$Res> {
  __$AboutClientModelCopyWithImpl(this._self, this._then);

  final _AboutClientModel _self;
  final $Res Function(_AboutClientModel) _then;

/// Create a copy of AboutClientModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? name = null,Object? url = freezed,}) {
  return _then(_AboutClientModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,url: freezed == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}


}


/// @nodoc
mixin _$AboutFounderModel {

 String get name;
/// Create a copy of AboutFounderModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$AboutFounderModelCopyWith<AboutFounderModel> get copyWith => _$AboutFounderModelCopyWithImpl<AboutFounderModel>(this as AboutFounderModel, _$identity);

  /// Serializes this AboutFounderModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AboutFounderModel&&(identical(other.name, name) || other.name == name));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,name);

@override
String toString() {
  return 'AboutFounderModel(name: $name)';
}


}

/// @nodoc
abstract mixin class $AboutFounderModelCopyWith<$Res>  {
  factory $AboutFounderModelCopyWith(AboutFounderModel value, $Res Function(AboutFounderModel) _then) = _$AboutFounderModelCopyWithImpl;
@useResult
$Res call({
 String name
});




}
/// @nodoc
class _$AboutFounderModelCopyWithImpl<$Res>
    implements $AboutFounderModelCopyWith<$Res> {
  _$AboutFounderModelCopyWithImpl(this._self, this._then);

  final AboutFounderModel _self;
  final $Res Function(AboutFounderModel) _then;

/// Create a copy of AboutFounderModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? name = null,}) {
  return _then(_self.copyWith(
name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [AboutFounderModel].
extension AboutFounderModelPatterns on AboutFounderModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _AboutFounderModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _AboutFounderModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _AboutFounderModel value)  $default,){
final _that = this;
switch (_that) {
case _AboutFounderModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _AboutFounderModel value)?  $default,){
final _that = this;
switch (_that) {
case _AboutFounderModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String name)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _AboutFounderModel() when $default != null:
return $default(_that.name);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String name)  $default,) {final _that = this;
switch (_that) {
case _AboutFounderModel():
return $default(_that.name);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String name)?  $default,) {final _that = this;
switch (_that) {
case _AboutFounderModel() when $default != null:
return $default(_that.name);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _AboutFounderModel implements AboutFounderModel {
  const _AboutFounderModel({required this.name});
  factory _AboutFounderModel.fromJson(Map<String, dynamic> json) => _$AboutFounderModelFromJson(json);

@override final  String name;

/// Create a copy of AboutFounderModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$AboutFounderModelCopyWith<_AboutFounderModel> get copyWith => __$AboutFounderModelCopyWithImpl<_AboutFounderModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$AboutFounderModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _AboutFounderModel&&(identical(other.name, name) || other.name == name));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,name);

@override
String toString() {
  return 'AboutFounderModel(name: $name)';
}


}

/// @nodoc
abstract mixin class _$AboutFounderModelCopyWith<$Res> implements $AboutFounderModelCopyWith<$Res> {
  factory _$AboutFounderModelCopyWith(_AboutFounderModel value, $Res Function(_AboutFounderModel) _then) = __$AboutFounderModelCopyWithImpl;
@override @useResult
$Res call({
 String name
});




}
/// @nodoc
class __$AboutFounderModelCopyWithImpl<$Res>
    implements _$AboutFounderModelCopyWith<$Res> {
  __$AboutFounderModelCopyWithImpl(this._self, this._then);

  final _AboutFounderModel _self;
  final $Res Function(_AboutFounderModel) _then;

/// Create a copy of AboutFounderModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? name = null,}) {
  return _then(_AboutFounderModel(
name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}


/// @nodoc
mixin _$AboutSeoModel {

 AboutSeoMetaModel? get meta;
/// Create a copy of AboutSeoModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$AboutSeoModelCopyWith<AboutSeoModel> get copyWith => _$AboutSeoModelCopyWithImpl<AboutSeoModel>(this as AboutSeoModel, _$identity);

  /// Serializes this AboutSeoModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AboutSeoModel&&(identical(other.meta, meta) || other.meta == meta));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,meta);

@override
String toString() {
  return 'AboutSeoModel(meta: $meta)';
}


}

/// @nodoc
abstract mixin class $AboutSeoModelCopyWith<$Res>  {
  factory $AboutSeoModelCopyWith(AboutSeoModel value, $Res Function(AboutSeoModel) _then) = _$AboutSeoModelCopyWithImpl;
@useResult
$Res call({
 AboutSeoMetaModel? meta
});


$AboutSeoMetaModelCopyWith<$Res>? get meta;

}
/// @nodoc
class _$AboutSeoModelCopyWithImpl<$Res>
    implements $AboutSeoModelCopyWith<$Res> {
  _$AboutSeoModelCopyWithImpl(this._self, this._then);

  final AboutSeoModel _self;
  final $Res Function(AboutSeoModel) _then;

/// Create a copy of AboutSeoModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? meta = freezed,}) {
  return _then(_self.copyWith(
meta: freezed == meta ? _self.meta : meta // ignore: cast_nullable_to_non_nullable
as AboutSeoMetaModel?,
  ));
}
/// Create a copy of AboutSeoModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$AboutSeoMetaModelCopyWith<$Res>? get meta {
    if (_self.meta == null) {
    return null;
  }

  return $AboutSeoMetaModelCopyWith<$Res>(_self.meta!, (value) {
    return _then(_self.copyWith(meta: value));
  });
}
}


/// Adds pattern-matching-related methods to [AboutSeoModel].
extension AboutSeoModelPatterns on AboutSeoModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _AboutSeoModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _AboutSeoModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _AboutSeoModel value)  $default,){
final _that = this;
switch (_that) {
case _AboutSeoModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _AboutSeoModel value)?  $default,){
final _that = this;
switch (_that) {
case _AboutSeoModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( AboutSeoMetaModel? meta)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _AboutSeoModel() when $default != null:
return $default(_that.meta);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( AboutSeoMetaModel? meta)  $default,) {final _that = this;
switch (_that) {
case _AboutSeoModel():
return $default(_that.meta);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( AboutSeoMetaModel? meta)?  $default,) {final _that = this;
switch (_that) {
case _AboutSeoModel() when $default != null:
return $default(_that.meta);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _AboutSeoModel implements AboutSeoModel {
  const _AboutSeoModel({this.meta});
  factory _AboutSeoModel.fromJson(Map<String, dynamic> json) => _$AboutSeoModelFromJson(json);

@override final  AboutSeoMetaModel? meta;

/// Create a copy of AboutSeoModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$AboutSeoModelCopyWith<_AboutSeoModel> get copyWith => __$AboutSeoModelCopyWithImpl<_AboutSeoModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$AboutSeoModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _AboutSeoModel&&(identical(other.meta, meta) || other.meta == meta));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,meta);

@override
String toString() {
  return 'AboutSeoModel(meta: $meta)';
}


}

/// @nodoc
abstract mixin class _$AboutSeoModelCopyWith<$Res> implements $AboutSeoModelCopyWith<$Res> {
  factory _$AboutSeoModelCopyWith(_AboutSeoModel value, $Res Function(_AboutSeoModel) _then) = __$AboutSeoModelCopyWithImpl;
@override @useResult
$Res call({
 AboutSeoMetaModel? meta
});


@override $AboutSeoMetaModelCopyWith<$Res>? get meta;

}
/// @nodoc
class __$AboutSeoModelCopyWithImpl<$Res>
    implements _$AboutSeoModelCopyWith<$Res> {
  __$AboutSeoModelCopyWithImpl(this._self, this._then);

  final _AboutSeoModel _self;
  final $Res Function(_AboutSeoModel) _then;

/// Create a copy of AboutSeoModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? meta = freezed,}) {
  return _then(_AboutSeoModel(
meta: freezed == meta ? _self.meta : meta // ignore: cast_nullable_to_non_nullable
as AboutSeoMetaModel?,
  ));
}

/// Create a copy of AboutSeoModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$AboutSeoMetaModelCopyWith<$Res>? get meta {
    if (_self.meta == null) {
    return null;
  }

  return $AboutSeoMetaModelCopyWith<$Res>(_self.meta!, (value) {
    return _then(_self.copyWith(meta: value));
  });
}
}


/// @nodoc
mixin _$AboutSeoMetaModel {

 String? get title; String? get description; AboutSeoImageModel? get image;
/// Create a copy of AboutSeoMetaModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$AboutSeoMetaModelCopyWith<AboutSeoMetaModel> get copyWith => _$AboutSeoMetaModelCopyWithImpl<AboutSeoMetaModel>(this as AboutSeoMetaModel, _$identity);

  /// Serializes this AboutSeoMetaModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AboutSeoMetaModel&&(identical(other.title, title) || other.title == title)&&(identical(other.description, description) || other.description == description)&&(identical(other.image, image) || other.image == image));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,title,description,image);

@override
String toString() {
  return 'AboutSeoMetaModel(title: $title, description: $description, image: $image)';
}


}

/// @nodoc
abstract mixin class $AboutSeoMetaModelCopyWith<$Res>  {
  factory $AboutSeoMetaModelCopyWith(AboutSeoMetaModel value, $Res Function(AboutSeoMetaModel) _then) = _$AboutSeoMetaModelCopyWithImpl;
@useResult
$Res call({
 String? title, String? description, AboutSeoImageModel? image
});


$AboutSeoImageModelCopyWith<$Res>? get image;

}
/// @nodoc
class _$AboutSeoMetaModelCopyWithImpl<$Res>
    implements $AboutSeoMetaModelCopyWith<$Res> {
  _$AboutSeoMetaModelCopyWithImpl(this._self, this._then);

  final AboutSeoMetaModel _self;
  final $Res Function(AboutSeoMetaModel) _then;

/// Create a copy of AboutSeoMetaModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? title = freezed,Object? description = freezed,Object? image = freezed,}) {
  return _then(_self.copyWith(
title: freezed == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String?,description: freezed == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String?,image: freezed == image ? _self.image : image // ignore: cast_nullable_to_non_nullable
as AboutSeoImageModel?,
  ));
}
/// Create a copy of AboutSeoMetaModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$AboutSeoImageModelCopyWith<$Res>? get image {
    if (_self.image == null) {
    return null;
  }

  return $AboutSeoImageModelCopyWith<$Res>(_self.image!, (value) {
    return _then(_self.copyWith(image: value));
  });
}
}


/// Adds pattern-matching-related methods to [AboutSeoMetaModel].
extension AboutSeoMetaModelPatterns on AboutSeoMetaModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _AboutSeoMetaModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _AboutSeoMetaModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _AboutSeoMetaModel value)  $default,){
final _that = this;
switch (_that) {
case _AboutSeoMetaModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _AboutSeoMetaModel value)?  $default,){
final _that = this;
switch (_that) {
case _AboutSeoMetaModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String? title,  String? description,  AboutSeoImageModel? image)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _AboutSeoMetaModel() when $default != null:
return $default(_that.title,_that.description,_that.image);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String? title,  String? description,  AboutSeoImageModel? image)  $default,) {final _that = this;
switch (_that) {
case _AboutSeoMetaModel():
return $default(_that.title,_that.description,_that.image);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String? title,  String? description,  AboutSeoImageModel? image)?  $default,) {final _that = this;
switch (_that) {
case _AboutSeoMetaModel() when $default != null:
return $default(_that.title,_that.description,_that.image);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _AboutSeoMetaModel implements AboutSeoMetaModel {
  const _AboutSeoMetaModel({this.title, this.description, this.image});
  factory _AboutSeoMetaModel.fromJson(Map<String, dynamic> json) => _$AboutSeoMetaModelFromJson(json);

@override final  String? title;
@override final  String? description;
@override final  AboutSeoImageModel? image;

/// Create a copy of AboutSeoMetaModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$AboutSeoMetaModelCopyWith<_AboutSeoMetaModel> get copyWith => __$AboutSeoMetaModelCopyWithImpl<_AboutSeoMetaModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$AboutSeoMetaModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _AboutSeoMetaModel&&(identical(other.title, title) || other.title == title)&&(identical(other.description, description) || other.description == description)&&(identical(other.image, image) || other.image == image));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,title,description,image);

@override
String toString() {
  return 'AboutSeoMetaModel(title: $title, description: $description, image: $image)';
}


}

/// @nodoc
abstract mixin class _$AboutSeoMetaModelCopyWith<$Res> implements $AboutSeoMetaModelCopyWith<$Res> {
  factory _$AboutSeoMetaModelCopyWith(_AboutSeoMetaModel value, $Res Function(_AboutSeoMetaModel) _then) = __$AboutSeoMetaModelCopyWithImpl;
@override @useResult
$Res call({
 String? title, String? description, AboutSeoImageModel? image
});


@override $AboutSeoImageModelCopyWith<$Res>? get image;

}
/// @nodoc
class __$AboutSeoMetaModelCopyWithImpl<$Res>
    implements _$AboutSeoMetaModelCopyWith<$Res> {
  __$AboutSeoMetaModelCopyWithImpl(this._self, this._then);

  final _AboutSeoMetaModel _self;
  final $Res Function(_AboutSeoMetaModel) _then;

/// Create a copy of AboutSeoMetaModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? title = freezed,Object? description = freezed,Object? image = freezed,}) {
  return _then(_AboutSeoMetaModel(
title: freezed == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String?,description: freezed == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String?,image: freezed == image ? _self.image : image // ignore: cast_nullable_to_non_nullable
as AboutSeoImageModel?,
  ));
}

/// Create a copy of AboutSeoMetaModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$AboutSeoImageModelCopyWith<$Res>? get image {
    if (_self.image == null) {
    return null;
  }

  return $AboutSeoImageModelCopyWith<$Res>(_self.image!, (value) {
    return _then(_self.copyWith(image: value));
  });
}
}


/// @nodoc
mixin _$AboutSeoImageModel {

 String get url;
/// Create a copy of AboutSeoImageModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$AboutSeoImageModelCopyWith<AboutSeoImageModel> get copyWith => _$AboutSeoImageModelCopyWithImpl<AboutSeoImageModel>(this as AboutSeoImageModel, _$identity);

  /// Serializes this AboutSeoImageModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AboutSeoImageModel&&(identical(other.url, url) || other.url == url));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,url);

@override
String toString() {
  return 'AboutSeoImageModel(url: $url)';
}


}

/// @nodoc
abstract mixin class $AboutSeoImageModelCopyWith<$Res>  {
  factory $AboutSeoImageModelCopyWith(AboutSeoImageModel value, $Res Function(AboutSeoImageModel) _then) = _$AboutSeoImageModelCopyWithImpl;
@useResult
$Res call({
 String url
});




}
/// @nodoc
class _$AboutSeoImageModelCopyWithImpl<$Res>
    implements $AboutSeoImageModelCopyWith<$Res> {
  _$AboutSeoImageModelCopyWithImpl(this._self, this._then);

  final AboutSeoImageModel _self;
  final $Res Function(AboutSeoImageModel) _then;

/// Create a copy of AboutSeoImageModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? url = null,}) {
  return _then(_self.copyWith(
url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [AboutSeoImageModel].
extension AboutSeoImageModelPatterns on AboutSeoImageModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _AboutSeoImageModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _AboutSeoImageModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _AboutSeoImageModel value)  $default,){
final _that = this;
switch (_that) {
case _AboutSeoImageModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _AboutSeoImageModel value)?  $default,){
final _that = this;
switch (_that) {
case _AboutSeoImageModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String url)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _AboutSeoImageModel() when $default != null:
return $default(_that.url);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String url)  $default,) {final _that = this;
switch (_that) {
case _AboutSeoImageModel():
return $default(_that.url);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String url)?  $default,) {final _that = this;
switch (_that) {
case _AboutSeoImageModel() when $default != null:
return $default(_that.url);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _AboutSeoImageModel implements AboutSeoImageModel {
  const _AboutSeoImageModel({required this.url});
  factory _AboutSeoImageModel.fromJson(Map<String, dynamic> json) => _$AboutSeoImageModelFromJson(json);

@override final  String url;

/// Create a copy of AboutSeoImageModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$AboutSeoImageModelCopyWith<_AboutSeoImageModel> get copyWith => __$AboutSeoImageModelCopyWithImpl<_AboutSeoImageModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$AboutSeoImageModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _AboutSeoImageModel&&(identical(other.url, url) || other.url == url));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,url);

@override
String toString() {
  return 'AboutSeoImageModel(url: $url)';
}


}

/// @nodoc
abstract mixin class _$AboutSeoImageModelCopyWith<$Res> implements $AboutSeoImageModelCopyWith<$Res> {
  factory _$AboutSeoImageModelCopyWith(_AboutSeoImageModel value, $Res Function(_AboutSeoImageModel) _then) = __$AboutSeoImageModelCopyWithImpl;
@override @useResult
$Res call({
 String url
});




}
/// @nodoc
class __$AboutSeoImageModelCopyWithImpl<$Res>
    implements _$AboutSeoImageModelCopyWith<$Res> {
  __$AboutSeoImageModelCopyWithImpl(this._self, this._then);

  final _AboutSeoImageModel _self;
  final $Res Function(_AboutSeoImageModel) _then;

/// Create a copy of AboutSeoImageModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? url = null,}) {
  return _then(_AboutSeoImageModel(
url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
