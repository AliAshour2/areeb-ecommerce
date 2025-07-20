export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }
  
  export interface RouteApiResponse<T> {
    results: number;
    metadata: {
      currentPage: number;
      numberOfPages: number;
      limit: number;
      nextPage?: number;
    };
    data: T[];
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }
  
  export interface ApiError {
    message: string;
    code?: string;
    errors?: Record<string, string[]>;
  }
  
  export enum LoadingState {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
  }
  
  export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    state: LoadingState;
  }