import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../data/models/blog_post_model.dart';
import '../providers/blog_provider.dart';

class BlogPage extends ConsumerWidget {
  const BlogPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final postsAsync = ref.watch(blogListProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Blog'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () => context.go('/blog/search'),
            tooltip: 'Search',
          ),
        ],
      ),
      body: postsAsync.when(
        data: (posts) => posts.isEmpty
            ? const Center(child: Text('No posts yet.'))
            : _PostList(posts: posts),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(child: Text('Error: $err')),
      ),
    );
  }
}

class _PostList extends StatelessWidget {
  const _PostList({required this.posts});
  final List<BlogPostModel> posts;

  @override
  Widget build(BuildContext context) {
    final sorted = List<BlogPostModel>.from(posts)
      ..sort((a, b) {
        final dateA = a.publishedAt ?? a.createdAt ?? DateTime(1970);
        final dateB = b.publishedAt ?? b.createdAt ?? DateTime(1970);
        return dateB.compareTo(dateA);
      });

    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: sorted.length,
      separatorBuilder: (_, __) => const Divider(height: 1),
      itemBuilder: (context, index) {
        final post = sorted[index];
        final displayDate = _formatDate(post.publishedAt ?? post.createdAt);

        return ListTile(
          contentPadding: const EdgeInsets.symmetric(vertical: 8),
          title: Text(
            post.title,
            style: Theme.of(context).textTheme.titleMedium,
          ),
          subtitle: post.excerpt != null
              ? Padding(
                  padding: const EdgeInsets.only(top: 4),
                  child: Text(
                    post.excerpt!,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                )
              : null,
          trailing: Text(
            displayDate,
            style: Theme.of(context).textTheme.labelSmall,
          ),
          onTap: () => context.go('/blog/${post.slug}'),
        );
      },
    );
  }

  String _formatDate(DateTime? date) {
    if (date == null) return '';
    return '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  }
}