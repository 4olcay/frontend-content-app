import React, { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import ContentList from './components/ContentList';
import { contentApi } from './services/api';
import { Content, ContentFilters, PaginationMeta } from './types/content';

const App: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const defaultFilters: ContentFilters = {
    limit: 5,
    offset: 0,
    sort_by: 'score',
    sort_order: 'desc',
  };
  const [filters, setFilters] = useState<ContentFilters>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchContents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await contentApi.getContents(filters);
      setContents(response.data);
      // Meta bilgisini her zaman kaydet, sadece offset 0'da değil
      if (response.meta) {
        setMeta(response.meta);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch contents');
      console.error('Error fetching contents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, [filters.type, filters.sort_by, filters.sort_order, filters.limit, filters.offset, filters.search]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFiltersChange = (newFilters: ContentFilters) => {
    setFilters(newFilters);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchQuery.toLowerCase().trim(), offset: 0 }));
  };

  const handleClear = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
    setContents([]);
    setMeta(undefined);
  };

  const hasActiveFilters = () => {
    return !!(
      searchQuery ||
      filters.search ||
      filters.type ||
      filters.provider ||
      filters.published_from ||
      filters.published_to ||
      filters.sort_by !== 'score' ||
      filters.sort_order !== 'desc'
    );
  };

  const handlePageChange = (page: number) => {
    const newFilters = {
      ...filters,
      offset: (page - 1) * (filters.limit || 5),
    };
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <FilterBar
            filters={filters}
            searchQuery={searchQuery}
            onFiltersChange={handleFiltersChange}
            onSearchQueryChange={handleSearchQueryChange}
            onSearch={handleSearch}
            onClear={handleClear}
            hasActiveFilters={hasActiveFilters()}
          />

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Hata</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ContentList
              contents={contents}
              meta={meta}
              onPageChange={handlePageChange}
            />
          )}

          {!loading && contents.length === 0 && !error && (
            <div className="bg-white dark:bg-background-dark/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-500">search_off</span>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">İçerik bulunamadı</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Arama kriterlerinizi veya filtrelerinizi değiştirmeyi deneyin
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;