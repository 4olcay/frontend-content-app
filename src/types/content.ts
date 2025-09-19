export interface Content {
  id: string;
  external_id: string;
  title: string;
  type: 'video' | 'article';
  provider: string;
  score: number;
  metrics: ContentMetrics;
  categories: string[];
  published_at: string;
}

export interface ContentMetrics {
  views: number;
  likes: number;
  duration: string | null;
  reading_time: string | null;
  reactions: string | null;
  comments: string | null;
}

export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
  current_page: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ContentFilters {
  search?: string;
  type?: 'video' | 'article';
  provider?: string;
  published_from?: string;
  published_to?: string;
  sort_by?: 'score' | 'published_at' | 'title' | 'created_at';
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
