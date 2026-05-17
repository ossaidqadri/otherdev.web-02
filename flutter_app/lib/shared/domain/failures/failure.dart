// Sealed failure classes for error handling across the app

sealed class Failure {
  const Failure();
}

// Network failures
final class NetworkFailure extends Failure {
  const NetworkFailure();
}

final class TimeoutFailure extends Failure {
  const TimeoutFailure();
}

// HTTP failures
final class HttpFailure extends Failure {
  const HttpFailure(this.statusCode, [this.message]);
  final int statusCode;
  final String? message;
}

// Generic failures
final class UnknownFailure extends Failure {
  const UnknownFailure([this.message]);
  final String? message;
}