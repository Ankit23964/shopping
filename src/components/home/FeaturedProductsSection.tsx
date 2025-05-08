import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAppSelector } from '../../hooks/useAppSelector';
import ProductCard from '../products/ProductCard';
import LoadingProductCard from '../products/LoadingProductCard';

const FeaturedProductsSection: React.FC = () => {
  const { featuredProducts, loading } = useAppSelector((state) => state.products);

  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Featured Products</h2>
            <p className="mt-2 text-gray-600">
              Our selection of premium products just for you
            </p>
          </div>
          <Link
            to="/products"
            className="mt-4 sm:mt-0 inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => <LoadingProductCard key={index} />)
            : featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;