import React from 'react';

const LoadingProductCard: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-lg bg-gray-200"></div>
      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-3 w-1/5 bg-gray-200 rounded"></div>
      </div>
      <div className="mt-2 h-4 w-4/5 bg-gray-200 rounded"></div>
      <div className="mt-2 h-4 w-1/4 bg-gray-200 rounded"></div>
    </div>
  );
};

export default LoadingProductCard;