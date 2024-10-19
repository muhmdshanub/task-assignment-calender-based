// src/types/apiResponses.ts
export interface ErrorApiResponse {
    success: boolean;
    message: string;
    stack?: string; // Optional, as it may not always be included in the response
  }
  