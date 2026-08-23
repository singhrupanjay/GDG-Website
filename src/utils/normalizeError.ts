interface ErrorResult {
  message: string;
  errorData: unknown;
}

function normalizeError(error: unknown): ErrorResult {
  let message = "An error occurred";
  let errorData = error;

  if (error && typeof error === "object" && "issues" in error) {
    // Zod validation error structure
    message = "Validation failed";
    errorData = (error as { issues?: unknown }).issues || error;
  } else if (error instanceof Error) {
    // Standard JavaScript Error
    message = error.message;
    errorData = error;
  } else {
    // Fallback for primitives or unknown objects
    message = String(error);
  }

  return { message, errorData };
}

export default normalizeError;
