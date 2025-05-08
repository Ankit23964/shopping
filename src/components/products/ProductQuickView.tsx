import React, { useEffect, useState } from 'react';
import { X, ShoppingCart, Heart, Star } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { closeQuickView } from '../../store/slices/uiSlice';
import { addToLocalCart } from '../../store/slices/cartSlice';
import { fetchProductById } from '../../store/slices/productSlice';
import Button from '../common/Button';

const ProductQuickView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { quickViewProductId } = useAppSelector((state) => state.ui);
  const { product, loading } = useAppSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (quickViewProductId) {
      dispatch(fetchProductById(quickViewProductId));
    }
  }, [dispatch, quickViewProductId]);

  const handleClose = () => {
    dispatch(closeQuickView());
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToLocalCart(product));
      dispatch(closeQuickView());
    }
  };

  useEffect(() => {
    // Add escape key listener
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  if (!product && !loading) return null;

  const discountedPrice = product 
    ? Math.round(product.price * (1 - product.discountPercentage / 100) * 100) / 100
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      ></div>
      
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-4xl w-full animate-fade-in">
          <button
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 z-10"
            onClick={handleClose}
          >
            <X size={24} />
          </button>
          
          {loading ? (
            <div className="p-8 flex justify-center items-center h-96">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2.5"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Images */}
              <div className="bg-gray-100 p-4">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`aspect-square overflow-hidden rounded border-2 ${
                        index === currentImageIndex ? 'border-primary-600' : 'border-transparent'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`Product view ${index + 1}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{product.brand}</span>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-900">{product.title}</h2>
                
                <div className="mt-3 flex items-end">
                  <p className="text-2xl font-semibold text-primary-600">${discountedPrice.toFixed(2)}</p>
                  {product.discountPercentage > 0 && (
                    <>
                      <p className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</p>
                      <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                        {Math.round(product.discountPercentage)}% OFF
                      </span>
                    </>
                  )}
                </div>
                
                <p className="mt-4 text-gray-600">{product.description}</p>
                
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-900 mb-2">Stock: {product.stock} available</p>
                </div>
                
                {/* Add to Cart */}
                <div className="mt-6 flex-grow flex flex-col justify-end">
                  <div className="flex items-center mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-3">
                      Quantity:
                    </label>
                    <div className="flex rounded-md">
                      <button
                        type="button"
                        className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        className="block w-16 text-center border-gray-300 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        max={product.stock}
                      />
                      <button
                        type="button"
                        className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                        onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="primary"
                      className="flex-1"
                      leftIcon={<ShoppingCart size={16} />}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      leftIcon={<Heart size={16} />}
                    >
                      Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">Product not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;