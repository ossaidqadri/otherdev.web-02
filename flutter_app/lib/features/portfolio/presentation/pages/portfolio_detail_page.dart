import 'package:flutter/material.dart';

class PortfolioDetailPage extends StatelessWidget {
  const PortfolioDetailPage({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Work: $slug')),
      body: Center(child: Text('Work detail for: $slug')),
    );
  }
}