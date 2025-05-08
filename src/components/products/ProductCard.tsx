import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addToLocalCart } from '../../store/slices/cartSlice';
import { openQuickView } from '../../store/slices/uiSlice';
import Badge from '../common/Badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToLocalCart(product));
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(openQuickView(product.id));
  };

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="group relative animate-fade-in">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Product actions */}
        <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-primary-50 transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={16} className="text-gray-600" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-primary-50 transition-colors"
            aria-label="Quick view"
            onClick={handleQuickView}
          >
            <Eye size={16} className="text-gray-600" />
          </button>
        </div>
        
        {/* Discount badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute left-4 top-4">
            <Badge variant="primary" size="md">
              {Math.round(product.discountPercentage)}% OFF
            </Badge>
          </div>
        )}
        
        {/* Add to cart button */}
        <div className="absolute inset-x-0 bottom-0 opacity-0 transition-all transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            className="flex w-full items-center justify-center bg-primary-600 text-white py-2 px-4 font-medium transition-colors hover:bg-primary-700"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{product.brand}</p>
          <div className="flex items-center">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="mt-1 text-base font-medium text-gray-900 line-clamp-1">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="mt-1 flex items-center">
          <p className="font-semibold text-gray-900">${discountedPrice.toFixed(2)}</p>
          {product.discountPercentage > 0 && (
            <p className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;