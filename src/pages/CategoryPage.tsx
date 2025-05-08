import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchProductsByCategory } from '../store/slices/productSlice';
import ProductGrid from '../components/products/ProductGrid';
import ProductQuickView from '../components/products/ProductQuickView';

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const categoryTitle = category ? category.replace('-', ' ') : 'All Products'; // Default to 'All Products' if category is undefined or invalid

  const dispatch = useAppDispatch();
  const { products, loading, total, limit, skip } = useAppSelector((state) => state.products);
  const { isQuickViewOpen } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory({ category, limit: 12, skip: 0 }));
    }
  }, [dispatch, category]);

  const loadMore = () => {
    if (category) {
      const newSkip = skip + limit;
      dispatch(fetchProductsByCategory({ category, limit, skip: newSkip }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link to="/categories" className="text-gray-500 hover:text-gray-700">Categories</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900 capitalize">{categoryTitle}</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">{categoryTitle}</h1>
          <p className="mt-1 text-gray-500">
            Browse our collection of {categoryTitle} products
          </p>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-gray-500">
          Showing {products.length} of {total} products
        </p>
      </div>

      <ProductGrid products={products} loading={loading} />

      {products.length < total && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center px-6 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {isQuickViewOpen && <ProductQuickView />}
    </div>
  );
};

export default CategoryPage;
