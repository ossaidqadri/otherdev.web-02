import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../shared/data/api/endpoints.dart';
import '../../../work/data/models/work_item_model.dart';
import '../../../work/presentation/providers/work_provider.dart';

class PortfolioDetailPage extends ConsumerWidget {
  const PortfolioDetailPage({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final detailAsync = ref.watch(workDetailProvider(slug));

    return Scaffold(
      appBar: AppBar(title: const Text('Project')),
      body: detailAsync.when(
        data: (item) => _WorkDetailBody(item: item),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(child: Text('Error: $err')),
      ),
    );
  }
}

class _WorkDetailBody extends StatelessWidget {
  const _WorkDetailBody({required this.item});
  final WorkItemModel item;

  @override
  Widget build(BuildContext context) {
    final imageUrl = Uri.parse('${Endpoints.baseUrl}${item.image}').toString();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: AspectRatio(
              aspectRatio: 16 / 9,
              child: Image.network(
                imageUrl,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stack) => Container(
                  color: Colors.grey[300],
                  child: const Icon(Icons.image_not_supported, size: 48),
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            item.title,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 8),
          Text('${item.year}', style: Theme.of(context).textTheme.bodySmall),
          const SizedBox(height: 16),
          Text(item.description),
          if (item.url != null) ...[
            const SizedBox(height: 16),
            Text('Visit: ${item.url}'),
          ],
          if (item.media != null && (item.media as List).isNotEmpty) ...[
            const SizedBox(height: 24),
            Text('Gallery', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 12),
            SizedBox(
              height: 200,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: (item.media as List).length,
                separatorBuilder: (context, _) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final mediaUrl = Uri.parse(
                    '${Endpoints.baseUrl}${(item.media as List)[index]}',
                  ).toString();
                  return ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Image.network(
                      mediaUrl,
                      width: 280,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stack) => Container(
                        width: 280,
                        color: Colors.grey[300],
                        child: const Icon(Icons.image_not_supported),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ],
      ),
    );
  }
}