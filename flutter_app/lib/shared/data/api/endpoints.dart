// API route constants

class Endpoints {
  Endpoints._();

  // Base URL — update for local dev vs production
  // Local: 'http://localhost:3000'
  // Production: 'https://otherdev.com'
  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://otherdev.com',
  );

  // Portfolio / Work
  static const String workList = '/api/work';
  static String workDetail(String slug) => '/api/work/$slug';

  // Blog
  static const String blogList = '/api/blog';
  static String blogPost(String slug) => '/api/blog/$slug';
  static const String blogSearch = '/api/blog/search';

  // About
  static const String about = '/api/about';

  // Contact
  static const String contact = '/api/contact';

  // Chat (SSE)
  static const String chatNative = '/api/chat/native';
}