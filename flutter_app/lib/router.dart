import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'features/auth/presentation/pages/splash_page.dart';
import 'features/auth/presentation/pages/login_page.dart';
import 'features/auth/presentation/pages/signup_page.dart';
import 'features/portfolio/presentation/pages/portfolio_page.dart';
import 'features/portfolio/presentation/pages/portfolio_detail_page.dart';
import 'features/blog/presentation/pages/blog_page.dart';
import 'features/blog/presentation/pages/blog_detail_page.dart';
import 'features/chat/presentation/pages/chat_page.dart';
import 'features/contact/presentation/pages/contact_page.dart';
import 'features/settings/presentation/pages/settings_page.dart';
import 'shared/presentation/widgets/app_shell.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();

// TODO: Wire to actual auth state (Firebase Auth)
bool _isAuthenticated = false;

final router = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/',
  redirect: (context, state) {
    final isAuthRoute = state.matchedLocation == '/login' ||
        state.matchedLocation == '/signup';

    if (!_isAuthenticated && !isAuthRoute) {
      return '/login';
    }
    if (_isAuthenticated && isAuthRoute) {
      return '/';
    }
    return null;
  },
  routes: [
    // Auth routes (no shell)
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashPage(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginPage(),
    ),
    GoRoute(
      path: '/signup',
      builder: (context, state) => const SignupPage(),
    ),

    // Authenticated shell with NavigationRail (desktop) / BottomNav (mobile)
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) {
        return AppShell(navigationShell: navigationShell);
      },
      branches: [
        // Home / Portfolio
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/home',
              builder: (context, state) => const PortfolioPage(),
              routes: [
                GoRoute(
                  path: 'work/:slug',
                  builder: (context, state) => PortfolioDetailPage(
                    slug: state.pathParameters['slug']!,
                  ),
                ),
              ],
            ),
          ],
        ),
        // Blog
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/blog',
              builder: (context, state) => const BlogPage(),
              routes: [
                GoRoute(
                  path: ':slug',
                  builder: (context, state) => BlogDetailPage(
                    slug: state.pathParameters['slug']!,
                  ),
                ),
              ],
            ),
          ],
        ),
        // Chat
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/chat',
              builder: (context, state) => const ChatPage(),
            ),
          ],
        ),
        // Contact
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/contact',
              builder: (context, state) => const ContactPage(),
            ),
          ],
        ),
        // Settings
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/settings',
              builder: (context, state) => const SettingsPage(),
            ),
          ],
        ),
      ],
    ),
  ],
  errorBuilder: (context, state) => Scaffold(
    body: Center(
      child: Text('Page not found: ${state.error}'),
    ),
  ),
);