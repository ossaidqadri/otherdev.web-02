import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:go_router/go_router.dart';
import '../providers/blog_provider.dart';

class BlogPostPage extends ConsumerWidget {
  const BlogPostPage({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final postAsync = ref.watch(blogPostProvider(slug));

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/blog'),
        ),
        title: const Text('Blog'),
      ),
      body: postAsync.when(
        data: (post) {
          final displayDate = post.publishedAt != null
              ? _formatDate(post.publishedAt)
              : (post.createdAt != null ? _formatDate(post.createdAt) : '');

          return SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  post.title,
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    if (post.author != null) ...[
                      Text(
                        post.author!,
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      const SizedBox(width: 8),
                    ],
                    if (displayDate.isNotEmpty)
                      Text(
                        displayDate,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: Theme.of(context).colorScheme.outline,
                            ),
                      ),
                  ],
                ),
                const SizedBox(height: 24),
                if (post.featuredImage != null)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 24),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.network(
                        post.featuredImage!,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => const SizedBox.shrink(),
                      ),
                    ),
                  ),
                if (post.contentHtml != null)
                  Html(
                    data: post.contentHtml!,
                    style: {
                      'body': Style(
                        fontSize: FontSize(16),
                        lineHeight: LineHeight(1.6),
                      ),
                      'pre': Style(
                        backgroundColor: Colors.grey.shade100,
                        padding: HtmlPaddings.all(12),
                      ),
                      'code': Style(
                        backgroundColor: Colors.grey.shade100,
                        fontFamily: 'monospace',
                        fontSize: FontSize(14),
                      ),
                    },
                  )
                else
                  Text(post.excerpt ?? ''),
                const SizedBox(height: 48),
                TextButton(
                  onPressed: () => context.go('/blog'),
                  child: const Text('← Back to blog'),
                ),
              ],
            ),
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(child: Text('Error: $err')),
      ),
    );
  }

  String _formatDate(DateTime? date) {
    if (date == null) return '';
    return '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  }
}