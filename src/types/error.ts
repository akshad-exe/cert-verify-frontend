// Shared error types for API error handling
export interface ApiError {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Helper function to safely cast errors
export const castError = (err: unknown): ApiError => {
  return err as ApiError;
}; 