# otherdev — Flutter App

A cross-platform Flutter application (iOS, Android, macOS, Windows, Linux) providing AI-powered chat and a portfolio showcase for [otherdev](https://otherdev.com).

## Features

- **AI Chat** — Real-time streaming chat via Server-Sent Events (SSE) to `/api/chat/native`. Supports text chunks, tool calls, and tool results with automatic reconnection (exponential backoff).
- **Portfolio / Work** — Browse portfolio items from `/api/work`, with detail pages and image galleries.
- **Contact Form** — Validated form posting to `/api/contact`.
- **Responsive Navigation** — Adaptive shell: NavigationRail (extended desktop >1024px, compact tablet >800px) or BottomNavigationBar (mobile).
- **Desktop Polish** — Window position/size persistence (`window_manager`), system tray icon with menu (`tray_manager`), global hotkeys: `Ctrl/Cmd+N` (new chat), `Ctrl/Cmd+,` (settings), `Ctrl/Cmd+Q` (quit).

## Architecture

| Layer | Technology |
|---|---|
| State | Riverpod 3 with code generation (`riverpod_generator`) |
| Routing | GoRouter with `StatefulShellRoute.indexedStack` |
| HTTP | Dio with interceptors (auth, error handling, logging) |
| SSE | `http` package + manual W3C SSE parser |
| Local Storage | Hive + `flutter_secure_storage` |
| Serialization | Freezed + `json_serializable` |

## Getting Started

### Prerequisites

- Flutter SDK `^3.11.5`
- Dart SDK `^3.11.5`
- A running backend (default: `https://otherdev.com`)

### Run

```bash
flutter pub get
flutter run
```

### Build

```bash
# Desktop
flutter build macos
flutter build windows
flutter build linux

# Mobile
flutter build ios
flutter build apk
```

### Environment Variables

- `API_BASE_URL` — Backend base URL (default: `https://otherdev.com`)

```bash
flutter run --dart-define=API_BASE_URL=http://localhost:3000
```

## Code Generation

Models and providers use code generation. Run after editing model/provider files:

```bash
dart run build_runner build
```

## Dependencies

| Package | Purpose |
|---|---|
| `flutter_riverpod` | State management |
| `go_router` | Declarative routing |
| `dio` | HTTP client |
| `http` | SSE streaming |
| `hive` / `hive_flutter` | Local storage |
| `flutter_secure_storage` | Secure token storage |
| `window_manager` | Desktop window control |
| `tray_manager` | System tray |
| `hotkey_manager` | Global hotkeys |
| `freezed` / `json_serializable` | Immutable models |

## File Structure

```
lib/
  main.dart                  # Entry point, desktop setup
  router.dart                # GoRouter configuration
  providers.dart             # Global Riverpod providers (theme)
  shared/
    data/api/
      api_client.dart        # Dio client with interceptors
      endpoints.dart         # Route constants
      interceptors/           # Auth, error, logging interceptors
    presentation/widgets/    # Shared widgets (AppShell, LoadingWidget, etc.)
  features/
    auth/presentation/pages/  # SplashPage (redirects to /home — auth disabled)
    blog/presentation/pages/ # Blog listing and detail (placeholder)
    chat/
      data/datasources/sse_client.dart  # SSE parser
      data/models/                      # ChatMessageModel (Freezed)
      data/repositories/                # ChatRepository
      presentation/pages/chat_page.dart # Main chat UI
      presentation/providers/           # ChatMessages, chatStream providers
    contact/presentation/pages/contact_page.dart
    portfolio/presentation/pages/       # Home, About, Portfolio, PortfolioDetail
    settings/presentation/pages/        # Settings (placeholder)
    work/
      data/models/          # WorkItemModel (Freezed)
      data/repositories/
      presentation/providers/
test/
  features/chat/message_bubble_test.dart
  integration/chat_flow_test.dart
  widget_test.dart
```

## Backend API

The app communicates with Next.js API routes:

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/chat/native` | POST | SSE streaming chat (tool-driven AI) |
| `/api/work` | GET | Portfolio items |
| `/api/contact` | POST | Contact form submission |
| `/api/transcribe` | POST | Audio transcription |

See [`web/docs/API_REFERENCE.md`](../web/docs/API_REFERENCE.md) for full API documentation.

## Design

- **Material 3** with dynamic color theming
- Dark/light mode toggle via `ThemeModeNotifier` Riverpod provider
- Desktop-first layout with responsive breakpoints at 800px and 1024px

---

Built by [otherdev](https://otherdev.com) — Digital platforms for pioneering creatives