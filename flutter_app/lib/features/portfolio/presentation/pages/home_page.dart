import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 800),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 48),
                Text(
                  'otherdev',
                  style: theme.textTheme.displayMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    letterSpacing: -1,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Building digital products that matter',
                  style: theme.textTheme.titleLarge?.copyWith(
                    color: theme.colorScheme.primary,
                  ),
                ),
                const SizedBox(height: 32),
                Text(
                  'We build software that helps teams ship faster and users get more done. '
                  'Focused on web and mobile applications with clean architecture and great UX.',
                  style: theme.textTheme.bodyLarge,
                ),
                const SizedBox(height: 48),
                Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: [
                    _NavCard(
                      icon: Icons.chat_bubble_outline,
                      label: 'Chat',
                      description: 'AI-powered chat',
                      onTap: () => context.go('/chat'),
                    ),
                    _NavCard(
                      icon: Icons.work_outline,
                      label: 'Work',
                      description: 'Our portfolio',
                      onTap: () => context.go('/work'),
                    ),
                                        _NavCard(
                      icon: Icons.info_outline,
                      label: 'About',
                      description: 'Who we are',
                      onTap: () => context.go('/about'),
                    ),
                    _NavCard(
                      icon: Icons.email_outlined,
                      label: 'Contact',
                      description: 'Get in touch',
                      onTap: () => context.go('/contact'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _NavCard extends StatelessWidget {
  const _NavCard({
    required this.icon,
    required this.label,
    required this.description,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final String description;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Material(
      color: theme.colorScheme.surfaceContainerHighest,
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          width: 160,
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(icon, size: 28, color: theme.colorScheme.primary),
              const SizedBox(height: 12),
              Text(
                label,
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                description,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.outline,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}