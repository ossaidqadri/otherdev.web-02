import 'package:mongo_dart/mongo_dart.dart' show Db;
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'mongo_client_provider.g.dart';

/// MongoDB Atlas connection string.
/// Format: 'mongodb://host:27017/database' or 'mongodb+srv://host/database'
/// Set via MONGO_CONNECTION_STRING environment variable.
const String _mongoConnectionString = String.fromEnvironment(
  'MONGO_CONNECTION_STRING',
  defaultValue: '',  // Must be set via environment variable
);

/// MongoDB database provider.
/// Connection is created on first access and reused across requests.
@riverpod
Future<Db> mongoDb(Ref ref) async {
  if (_mongoConnectionString.isEmpty) {
    throw StateError('MONGO_CONNECTION_STRING environment variable not set');
  }
  final db = Db(_mongoConnectionString);
  await db.open();
  ref.onDispose(() => db.close());
  return db;
}