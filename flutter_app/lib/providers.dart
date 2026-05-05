// Global Riverpod providers
// Run `dart run build_runner build` to generate *.g.dart files

import 'package:flutter/material.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'providers.g.dart';

// Theme mode notifier — toggles dark/light/system
@riverpod
class ThemeModeNotifier extends _$ThemeModeNotifier {
  @override
  ThemeMode build() => ThemeMode.system;

  void toggle() {
    state = state == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
  }
}

// Theme mode provider (read-only derived)
@riverpod
ThemeMode appThemeMode(Ref ref) => ref.watch(themeModeProvider);