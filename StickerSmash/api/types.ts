// レスポンスの型

export interface ApiResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
}

export interface SearchImageResult {
  success: boolean;
  results?: {
    painting: any;
    score: number;
  };
  error?: string;
}

export interface SearchTextResult {
  success: boolean;
  results: Array<{
    painting: any;
    score: number;
  }>;
  total_found: number;
  requested_count: number;
  error?: string;
}

export interface ChatSessionResult {
  success: boolean;
  painting?: any;
  greeting?: string;
  error?: string;
}

export interface ChatMessageResult {
  success: boolean;
  ai_response?: string;
  error?: string;
}