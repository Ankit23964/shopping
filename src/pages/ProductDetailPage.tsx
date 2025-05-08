import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, RefreshCcw, ShieldCheck } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchProductById, fetchProducts } from '../store/slices/productSlice';
import { addToLocalCart } from '../store/slices/cartSlice';
import Button from '../components/common/Button';
import ProductGrid from '../components/products/ProductGrid';
import ProductQuickView from '../components/products/ProductQuickView';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { product, products, loading } = useAppSelector((state) => state.products);
  const { isQuickViewOpen } = useAppSelector((state) => state.ui);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      dispatch(fetchProductById(productId));
      
      // Reset current image when product changes
      setCurrentImageIndex(0);
      setQuantity(1);
    }
  }, [dispatch, id]);

  useEffect(() => {
    // Load related products
    if (product) {
      dispatch(fetchProducts({ limit: 8, skip: 0 }));
    }
  }, [dispatch, product]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && product && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToLocalCart({ ...product,  }));
    }
  };

  // Get related products (by same category, excluding current product)
  const relatedProducts = products.filter(
    (p) => product && p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  if (loading && !product) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product && !loading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const discountedPrice = product
    ? Math.round(product.price * (1 - product.discountPercentage / 100) * 100) / 100
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900">{product?.title}</span>
      </nav>

      {product && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
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
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.title}</h1>
                <div className="flex items-center mt-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex items-baseline">
                <h2 className="text-3xl font-semibold text-primary-600">${discountedPrice.toFixed(2)}</h2>
                {product.discountPercentage > 0 && (
                  <>
                    <p className="ml-3 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</p>
                    <span className="ml-3 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                      {Math.round(product.discountPercentage)}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="border-t border-b py-4">
                <div className="prose prose-sm max-w-none text-gray-600">
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Availability:</span>
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Category:</span>
                  <Link
                    to={`/category/${product.category}`}
                    className="text-primary-600 hover:text-primary-700 capitalize"
                  >
                    {product.category.replace('-', ' ')}
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-3">
                    Quantity:
                  </label>
                  <div className="flex rounded-md">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={product.stock === 0}
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
                      disabled={product.stock === 0}
                    />
                    <button
                      type="button"
                      className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                      onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                      disabled={product.stock === 0}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    className="flex-1"
                    leftIcon={<ShoppingCart size={16} />}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<Heart size={16} />}
                  >
                    Add to Wishlist
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm text-gray-600">Free shipping</span>
                </div>
                <div className="flex items-center">
                  <RefreshCcw className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm text-gray-600">30-day returns</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm text-gray-600">Secure checkout</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button className="border-primary-600 text-primary-600 py-4 px-1 border-b-2 font-medium text-sm">
                  Product Details
                </button>
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm">
                  Reviews
                </button>
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm">
                  Shipping
                </button>
              </nav>
            </div>
            <div className="py-6">
              <div className="prose prose-sm sm:prose max-w-none text-gray-500">
                <h3>Product Specifications</h3>
                <table className="min-w-full divide-y divide-gray-300">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50">Brand</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{product.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50">Category</td>
                      <td className="py-3 px-4 text-sm text-gray-600 capitalize">{product.category.replace('-', ' ')}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50">Rating</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{product.rating.toFixed(1)}/5</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50">Stock</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{product.stock} units</td>
                    </tr>
                  </tbody>
                </table>

                <h3>Product Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </>
      )}

      {isQuickViewOpen && <ProductQuickView />}
    </div>
  );
};

export default ProductDetailPage;