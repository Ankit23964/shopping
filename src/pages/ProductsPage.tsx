import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchProducts, fetchFilteredProducts, fetchCategories } from '../store/slices/productSlice';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import ProductQuickView from '../components/products/ProductQuickView';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, filters, total, limit, skip } = useAppSelector((state) => state.products);
  const { isQuickViewOpen } = useAppSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchCategories());
    
    if (Object.keys(filters).length > 0) {
      dispatch(fetchFilteredProducts({ filters, limit: 12, skip: 0 }));
    } else {
      dispatch(fetchProducts({ limit: 12, skip: 0 }));
    }
  }, [dispatch, JSON.stringify(filters)]);

  const loadMore = () => {
    const newSkip = skip + limit;
    
    if (Object.keys(filters).length > 0) {
      dispatch(fetchFilteredProducts({ filters, limit, skip: newSkip }));
    } else {
      dispatch(fetchProducts({ limit, skip: newSkip }));
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            <p className="mt-1 text-gray-500">Browse our collection of premium products</p>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-gray-500">
            Showing {products.length} of {total} products
          </p>
        </div>

        <ProductFilters />

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
      </div>

      {isQuickViewOpen && <ProductQuickView />}
    </div>
  );
};

export default ProductsPage;