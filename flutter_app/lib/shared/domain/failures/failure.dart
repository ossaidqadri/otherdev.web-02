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

// Auth failures
final class AuthFailure extends Failure {
  const AuthFailure(this.message);
  final String message;
}

final class UserNotFoundFailure extends AuthFailure {
  const UserNotFoundFailure() : super('User not found');
}

final class InvalidCredentialsFailure extends AuthFailure {
  const InvalidCredentialsFailure() : super('Invalid email or password');
}

// Generic failures
final class UnknownFailure extends Failure {
  const UnknownFailure([this.message]);
  final String? message;
}