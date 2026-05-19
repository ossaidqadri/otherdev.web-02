import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'features/blog/presentation/pages/blog_page.dart';
import 'features/blog/presentation/pages/blog_post_page.dart';
import 'features/blog/presentation/pages/blog_search_page.dart';
import 'features/portfolio/presentation/pages/home_page.dart';
import 'features/portfolio/presentation/pages/portfolio_page.dart';
import 'features/portfolio/presentation/pages/portfolio_detail_page.dart';
import 'features/chat/presentation/pages/chat_page.dart';
import 'features/contact/presentation/pages/contact_page.dart';
import 'features/settings/presentation/pages/settings_page.dart';
import 'shared/presentation/widgets/app_shell.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();

final router = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/home',
  routes: [
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
              builder: (context, state) => const HomePage(),
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
        // Work / Portfolio
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/work',
              builder: (context, state) => const PortfolioPage(),
              routes: [
                GoRoute(
                  path: ':slug',
                  builder: (context, state) => PortfolioDetailPage(
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
        // Blog
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/blog',
              builder: (context, state) => const BlogPage(),
              routes: [
                GoRoute(
                  path: 'search',
                  builder: (context, state) => const BlogSearchPage(),
                ),
                GoRoute(
                  path: ':slug',
                  builder: (context, state) => BlogPostPage(
                    slug: state.pathParameters['slug']!,
                  ),
                ),
              ],
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