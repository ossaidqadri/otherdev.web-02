import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../data/models/search_result_model.dart';
import '../providers/blog_provider.dart';

class BlogSearchPage extends ConsumerStatefulWidget {
  const BlogSearchPage({super.key});

  @override
  ConsumerState<BlogSearchPage> createState() => _BlogSearchPageState();
}

class _BlogSearchPageState extends ConsumerState<BlogSearchPage> {
  late final TextEditingController _controller;
  String _query = '';

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final searchResults = _query.isEmpty
        ? const AsyncValue<List<SearchResultModel>>.data([])
        : ref.watch(blogSearchProvider(_query));

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/blog'),
        ),
        title: const Text('Search'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _controller,
              decoration: InputDecoration(
                hintText: 'Search posts and projects...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _controller.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _controller.clear();
                          setState(() => _query = '');
                        },
                      )
                    : null,
                border: const OutlineInputBorder(),
              ),
              onChanged: (value) => setState(() => _query = value),
              onSubmitted: (value) => setState(() => _query = value),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: searchResults.when(
                data: (results) {
                  if (_query.isEmpty) {
                    return const Center(
                      child: Text('Enter a search term to find posts and projects.'),
                    );
                  }
                  if (results.isEmpty) {
                    return Text('No results for "$_query"');
                  }
                  return ListView.builder(
                    itemCount: results.length,
                    itemBuilder: (context, index) {
                      final result = results[index];
                      final isBlog = result.docRelationTo == 'blog';
                      final doc = result.docValue as Map<String, dynamic>?;
                      final slug = doc?['slug'] as String?;

                      return Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        child: ListTile(
                          leading: Chip(
                            label: Text(
                              isBlog ? 'Blog' : (result.docRelationTo ?? 'Result'),
                              style: const TextStyle(fontSize: 10),
                            ),
                            padding: EdgeInsets.zero,
                          ),
                          title: Text(result.title),
                          subtitle: doc?['excerpt'] != null
                              ? Text(
                                  doc!['excerpt'] as String,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                )
                              : null,
                          onTap: isBlog && slug != null
                              ? () => context.go('/blog/$slug')
                              : null,
                        ),
                      );
                    },
                  );
                },
                loading: () => const Center(child: CircularProgressIndicator()),
                error: (err, _) => Text('Error: $err'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}