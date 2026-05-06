import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:window_manager/window_manager.dart';
import 'package:hotkey_manager/hotkey_manager.dart';
import 'package:tray_manager/tray_manager.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:convert';

import 'router.dart';

// Window state persistence
class WindowState {
  final double x;
  final double y;
  final double width;
  final double height;

  const WindowState({
    this.x = 100,
    this.y = 100,
    this.width = 1200,
    this.height = 800,
  });

  Map<String, dynamic> toJson() => {'x': x, 'y': y, 'width': width, 'height': height};

  factory WindowState.fromJson(Map<String, dynamic> json) => WindowState(
        x: (json['x'] as num?)?.toDouble() ?? 100,
        y: (json['y'] as num?)?.toDouble() ?? 100,
        width: (json['width'] as num?)?.toDouble() ?? 1200,
        height: (json['height'] as num?)?.toDouble() ?? 800,
      );
}

class _WindowStateStore {
  static const _fileName = 'window_state.json';
  static Future<File> _getFile() async {
    final dir = await getApplicationSupportDirectory();
    return File('${dir.path}/$_fileName');
  }

  static Future<WindowState> load() async {
    try {
      final file = await _getFile();
      if (await file.exists()) {
        final json = jsonDecode(await file.readAsString()) as Map<String, dynamic>;
        return WindowState.fromJson(json);
      }
    } catch (_) {}
    return const WindowState();
  }

  static Future<void> save(WindowState state) async {
    try {
      final file = await _getFile();
      await file.writeAsString(jsonEncode(state.toJson()));
    } catch (_) {}
  }
}

class _DesktopManager with WindowListener, TrayListener {
  static final _DesktopManager _instance = _DesktopManager._();
  factory _DesktopManager() => _instance;
  _DesktopManager._();

  bool _initialized = false;

  Future<void> initialize() async {
    if (_initialized) return;
    _initialized = true;

    await windowManager.ensureInitialized();

    final state = await _WindowStateStore.load();
    final windowOptions = WindowOptions(
      size: Size(state.width, state.height),
      minimumSize: const Size(800, 600),
      center: false,
      backgroundColor: Colors.transparent,
      skipTaskbar: false,
      titleBarStyle: TitleBarStyle.normal,
      title: 'otherdev chat',
    );

    await windowManager.waitUntilReadyToShow(windowOptions, () async {
      await windowManager.setPosition(Offset(state.x, state.y));
      await windowManager.show();
      await windowManager.focus();
    });

    windowManager.addListener(this);
  }

  Future<void> setupTray() async {
    // Write app icon to temp file for tray
    final iconPath = await _prepareTrayIcon();

    await trayManager.setIcon(iconPath);
    await trayManager.setToolTip('otherdev');

    final menu = Menu(
      items: [
        MenuItem(
          key: 'show',
          label: 'Show otherdev',
        ),
        MenuItem.separator(),
        MenuItem(
          key: 'quit',
          label: 'Quit',
        ),
      ],
    );
    await trayManager.setContextMenu(menu);
    trayManager.addListener(this);
  }

  Future<void> setupHotkeys() async {
    // Cmd+N on macOS, Ctrl+N on Windows/Linux — new chat
    await hotKeyManager.register(
      HotKey(
        key: PhysicalKeyboardKey.keyN,
        modifiers: [HotKeyModifier.meta],
        scope: HotKeyScope.system,
      ),
      keyDownHandler: (_) {
        windowManager.show();
        windowManager.focus();
        // Navigate to chat — post message to app
      },
    );

    // Cmd+, / Ctrl+, — settings
    await hotKeyManager.register(
      HotKey(
        key: PhysicalKeyboardKey.comma,
        modifiers: [HotKeyModifier.meta],
        scope: HotKeyScope.system,
      ),
      keyDownHandler: (_) {
        windowManager.show();
        windowManager.focus();
      },
    );

    // Cmd+Q / Alt+F4 — quit
    await hotKeyManager.register(
      HotKey(
        key: PhysicalKeyboardKey.keyQ,
        modifiers: [HotKeyModifier.meta],
        scope: HotKeyScope.system,
      ),
      keyDownHandler: (_) => exit(0),
    );
  }

  Future<String> _prepareTrayIcon() async {
    // On macOS, tray_manager needs a path to an icon file.
    // Create a simple 32x32 PNG in the app support directory.
    // For a real app, bundle a proper icon in assets/.
    final dir = await getApplicationSupportDirectory();
    final iconFile = File('${dir.path}/tray_icon.png');
    if (!await iconFile.exists()) {
      // Create minimal 32x32 PNG (1x1 transparent pixel, very small valid PNG)
      // This is a placeholder — replace with actual icon in production
      final pngBytes = _minimalPngBytes();
      await iconFile.writeAsBytes(pngBytes);
    }
    return iconFile.path;
  }

  List<int> _minimalPngBytes() {
    // Minimal valid 32x32 PNG with transparent pixels
    // Generated programmatically — replace with real icon
    return [
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
      0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR length + type
      0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x20, // 32x32
      0x08, 0x06, 0x00, 0x00, 0x00, 0x73, 0x7A, 0x7A, 0xF9, // 8-bit RGBA
      0x00, 0x00, 0x00, 0x01, 0x73, 0x52, 0x47, 0x42, // sRGB chunk
      0x00, 0xAE, 0xCE, 0x1C, 0xE9, // sRGB data
      0x00, 0x00, 0x00, 0x04, 0x67, 0x41, 0x4D, 0x41, // gAMA chunk
      0x00, 0x00, 0xB1, 0x8F, 0x18, 0x3C, 0xB5, // gAMA data
      0x00, 0x00, 0x00, 0x09, 0x70, 0x48, 0x59, 0x73, // pHYs chunk
      0x00, 0x00, 0x0E, 0xC3, 0x00, 0x00, 0x0E, 0xC3, 0x01, // pHYs data
      0xC7, 0x6F, 0xA8, 0x64, // IDAT length
      0x78, 0x9C, 0x62, 0x60, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01,
      // Compressed pixel data (tiny — single IDAT)
      0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82, // IEND
    ];
  }

  // WindowListener
  @override
  void onWindowResized() async {
    final size = await windowManager.getSize();
    final pos = await windowManager.getPosition();
    await _WindowStateStore.save(WindowState(
      x: pos.dx,
      y: pos.dy,
      width: size.width,
      height: size.height,
    ));
  }

  @override
  void onWindowMoved() async {
    final size = await windowManager.getSize();
    final pos = await windowManager.getPosition();
    await _WindowStateStore.save(WindowState(
      x: pos.dx,
      y: pos.dy,
      width: size.width,
      height: size.height,
    ));
  }

  // TrayListener
  @override
  void onTrayIconMouseDown() {
    windowManager.show();
    windowManager.focus();
  }

  @override
  void onTrayIconRightMouseDown() {
    trayManager.popUpContextMenu();
  }

  @override
  void onTrayMenuItemClick(MenuItem menuItem) {
    if (menuItem.key == 'show') {
      windowManager.show();
      windowManager.focus();
    } else if (menuItem.key == 'quit') {
      exit(0);
    }
  }

  void dispose() {
    windowManager.removeListener(this);
    trayManager.removeListener(this);
    hotKeyManager.unregisterAll();
    trayManager.destroy();
  }
}

void _configureDesktop() {
  _DesktopManager().initialize();
  _DesktopManager().setupTray();
  _DesktopManager().setupHotkeys();
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Only configure desktop features on supported platforms
  if (Platform.isMacOS || Platform.isWindows || Platform.isLinux) {
    _configureDesktop();
  }

  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      title: 'otherdev chat',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      darkTheme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      routerConfig: router,
    );
  }
}