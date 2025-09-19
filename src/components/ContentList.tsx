import React from 'react';
import { Content, PaginationMeta } from '../types/content';

interface ContentListProps {
  contents: Content[];
  meta: PaginationMeta | undefined;
  onPageChange: (page: number) => void;
}

const ContentList: React.FC<ContentListProps> = ({
  contents,
  meta,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const formatDuration = (duration: string | null) => {
    if (!duration) return null;
    const seconds = parseInt(duration);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}dk ${remainingSeconds}sn`;
    } else {
      return `${remainingSeconds} sn`;
    }
  };

  const formatReadingTime = (readingTime: string | null) => {
    if (!readingTime) return null;
    return `${readingTime} dk`;
  };

  return (
    <div className="space-y-4">
      {contents.map((content, index) => (
        <div key={content.id} className="bg-white dark:bg-background-dark/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className={`material-symbols-outlined text-primary text-3xl ${
                content.type === 'video' ? 'smart_display' : 'article'
              }`}>
                {content.type === 'video' ? 'smart_display' : 'article'}
              </span>
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {content.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    content.type === 'video' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {content.type === 'video' ? 'Video' : 'Makale'}
                  </span>
                  <div className="flex items-center text-sm text-yellow-500">
                    <span className="material-symbols-outlined text-base">star</span>
                    <span className="ml-1 font-medium">{content.score.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                {content.categories.slice(0, 3).map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  >
                    {category}
                  </span>
                ))}
                {content.categories.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    +{content.categories.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-6 mt-3">
                <div className="flex items-center space-x-1">
                  <span className="material-symbols-outlined text-base">visibility</span>
                  <span>{content.metrics.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="material-symbols-outlined text-base">thumb_up</span>
                  <span>{content.metrics.likes.toLocaleString()}</span>
                </div>
                {content.type === 'video' && content.metrics.duration && (
                  <div className="flex items-center space-x-1">
                    <span className="material-symbols-outlined text-base">timer</span>
                    <span>{formatDuration(content.metrics.duration)}</span>
                  </div>
                )}
                {content.type === 'article' && content.metrics.reading_time && (
                  <div className="flex items-center space-x-1">
                    <span className="material-symbols-outlined text-base">timer</span>
                    <span>{formatReadingTime(content.metrics.reading_time)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {meta && meta.total_pages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav aria-label="Pagination" className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(meta.current_page - 1)}
              disabled={meta.current_page === 1}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            
            {Array.from({ length: Math.min(5, meta.total_pages) }, (_, i) => {
              const pageNum = Math.max(1, meta.current_page - 2) + i;
              if (pageNum > meta.total_pages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    pageNum === meta.current_page
                      ? 'text-white bg-primary'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {meta.total_pages > 5 && (
              <span className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400">...</span>
            )}
            
            {meta.total_pages > 5 && (
              <button
                onClick={() => handlePageChange(meta.total_pages)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {meta.total_pages}
              </button>
            )}

            <button
              onClick={() => handlePageChange(meta.current_page + 1)}
              disabled={meta.current_page === meta.total_pages}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ContentList;