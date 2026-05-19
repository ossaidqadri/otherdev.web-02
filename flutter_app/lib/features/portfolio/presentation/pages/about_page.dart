import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/about_provider.dart';

class AboutPage extends ConsumerWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final aboutAsync = ref.watch(aboutContentProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('About')),
      body: aboutAsync.when(
        data: (about) => SingleChildScrollView(
          padding: const EdgeInsets.all(32),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Hero image
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: AspectRatio(
                  aspectRatio: 9 / 4,
                  child: Image.network(
                    about.heroImage,
                    fit: BoxFit.cover,
                    errorBuilder: (_, __, ___) => Container(
                      color: Colors.grey.shade200,
                      child: const Center(child: Icon(Icons.image, size: 48)),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 32),

              // About label
              Text(
                about.aboutLabel,
                style: Theme.of(context).textTheme.labelMedium?.copyWith(
                      color: Colors.grey.shade600,
                    ),
              ),
              const SizedBox(height: 8),

              // About text
              Text(
                about.aboutTextPlain,
                style: Theme.of(context).textTheme.bodyLarge,
              ),
              const SizedBox(height: 32),

              // Clients
              if (about.clientsDesktop.isNotEmpty) ...[
                Text(
                  about.clientsLabel,
                  style: Theme.of(context).textTheme.labelMedium?.copyWith(
                        color: Colors.grey.shade600,
                      ),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 16,
                  runSpacing: 8,
                  children: about.clientsDesktop
                      .map((client) => Text(
                            client.name,
                            style: Theme.of(context).textTheme.bodyMedium,
                          ))
                      .toList(),
                ),
              ],
              const SizedBox(height: 32),

              // Found
              Text(
                'Founded ${about.foundingDate}',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Colors.grey.shade600,
                    ),
              ),
            ],
          ),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(
          child: Text('Error loading about: $err'),
        ),
      ),
    );
  }
}