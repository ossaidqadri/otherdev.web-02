// API route constants

class Endpoints {
  Endpoints._();

  // Base URL — update for local dev vs production
  // Local: 'http://localhost:3000'
  // Production: 'https://otherdev.co'
  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://localhost:3000',
  );

  // Blog
  static const String blogList = '/api/blog';

  static String blogDetail(String slug) => '/api/blog/$slug';

  // Portfolio / Work
  static const String workList = '/api/work';

  static String workDetail(String slug) => '/api/work/$slug';

  // Contact
  static const String contact = '/api/contact';

  // Chat (SSE)
  static const String chatNative = '/api/chat/native';
}