import React, { useState, useEffect, useRef } from 'react';
import { ContentFilters } from '../types/content';

interface FilterBarProps {
  filters: ContentFilters;
  searchQuery: string;
  onFiltersChange: (filters: ContentFilters) => void;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  searchQuery,
  onFiltersChange,
  onSearchQueryChange,
  onSearch,
  onClear,
  hasActiveFilters,
}: FilterBarProps) => {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setShowTypeDropdown(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (key: keyof ContentFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const getTypeLabel = () => {
    if (!filters.type) return 'Tüm Türler';
    return filters.type === 'video' ? 'Video' : 'Makale';
  };

  const getSortLabel = () => {
    switch (filters.sort_by) {
      case 'score': return 'Popülerlik Skoru';
      case 'published_at': return 'Yayın Tarihi';
      case 'title': return 'Başlık';
      default: return 'Popülerlik Skoru';
    }
  };

  return (
    <div className="mb-8">
      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">search</span>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchQueryChange(e.target.value)}
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
          className="w-full h-12 pl-12 pr-4 rounded-lg bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" 
          placeholder="Başlık veya kategori ara" 
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="relative" ref={typeDropdownRef}>
            <button 
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary flex items-center space-x-1 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
            >
              <span>{getTypeLabel()}</span>
              <span className={`material-symbols-outlined text-base transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            
            {showTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      handleFilterChange('type', undefined);
                      setShowTypeDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      !filters.type ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Tüm Türler
                  </button>
                  <button
                    onClick={() => {
                      handleFilterChange('type', 'video');
                      setShowTypeDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      filters.type === 'video' ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Video
                  </button>
                  <button
                    onClick={() => {
                      handleFilterChange('type', 'article');
                      setShowTypeDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      filters.type === 'article' ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Makale
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={sortDropdownRef}>
            <button 
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center space-x-1"
            >
              <span>{getSortLabel()}</span>
              <span className={`material-symbols-outlined text-base transition-transform ${showSortDropdown ? 'rotate-180' : ''}`}>swap_vert</span>
            </button>
            
            {showSortDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      handleFilterChange('sort_by', 'score');
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      filters.sort_by === 'score' ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Popülerlik Skoru
                  </button>
                  <button
                    onClick={() => {
                      handleFilterChange('sort_by', 'published_at');
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      filters.sort_by === 'published_at' ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Yayın Tarihi
                  </button>
                  <button
                    onClick={() => {
                      handleFilterChange('sort_by', 'title');
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      filters.sort_by === 'title' ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Başlık
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onSearch}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Ara
          </button>
          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              Temizle
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;