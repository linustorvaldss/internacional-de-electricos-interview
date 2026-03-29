export function normalizeErrorMessage(payload: unknown, status: number): string {
  if (payload && typeof payload === 'object') {
    const maybeMessage = (payload as { message?: unknown }).message;

    if (Array.isArray(maybeMessage)) {
      return maybeMessage.join(', ');
    }

    if (typeof maybeMessage === 'string') {
      return maybeMessage;
    }

    const maybeError = (payload as { error?: unknown }).error;
    if (typeof maybeError === 'string') {
      return maybeError;
    }
  }

  return `Request failed with status ${status}`;
}