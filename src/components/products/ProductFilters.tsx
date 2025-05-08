import React, { useState } from 'react';
import { Sliders, ChevronDown, X } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setFilters, clearFilters } from '../../store/slices/productSlice';
import Button from '../common/Button';

const ProductFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, filters } = useAppSelector((state) => state.products);
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    category: filters.category || '',
    priceRange: filters.priceRange || { min: 0, max: 2000 },
    rating: filters.rating || 0,
    brand: filters.brand || '',
    sort: filters.sort || 'newest',
  });

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const resetFilters = () => {
    setLocalFilters({
      category: '',
      priceRange: { min: 0, max: 2000 },
      rating: 0,
      brand: '',
      sort: 'newest',
    });
    dispatch(clearFilters());
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    setLocalFilters({
      ...localFilters,
      priceRange: {
        ...localFilters.priceRange,
        [type]: numValue,
      },
    });
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  // Popular brands (in reality would come from API)
  const popularBrands = ['Apple', 'Samsung', 'OPPO', 'Huawei', 'Microsoft Surface', 'Infinix', 'HP Pavilion'];

  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6">
      {/* Mobile Filters Button */}
      <div className="md:hidden p-4">
        <Button
          variant="outline"
          className="w-full"
          leftIcon={<Sliders className="h-4 w-4" />}
          rightIcon={<ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
          onClick={toggleFilters}
        >
          Filters & Sorting
        </Button>
      </div>

      {/* Filters Content */}
      <div
        className={`
          md:block
          ${isOpen ? 'block' : 'hidden'}
          transition-all duration-200 ease-in-out
        `}
      >
        <div className="md:grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x">
          {/* Categories */}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <div className="flex items-center">
                <input
                  id="category-all"
                  type="radio"
                  name="category"
                  checked={localFilters.category === ''}
                  onChange={() => setLocalFilters({ ...localFilters, category: '' })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
                  All Categories
                </label>
              </div>
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category}`}
                    type="radio"
                    name="category"
                    value={category}
                    checked={localFilters.category === category}
                    onChange={() => setLocalFilters({ ...localFilters, category })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="ml-2 text-sm text-gray-700 capitalize"
                  >
                    {String(category).replace('-', ' ')} {/* Ensuring category is a string */}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="min-price" className="block text-sm text-gray-700 mb-1">
                    Min ($)
                  </label>
                  <input
                    type="number"
                    id="min-price"
                    min="0"
                    value={localFilters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="max-price" className="block text-sm text-gray-700 mb-1">
                    Max ($)
                  </label>
                  <input
                    type="number"
                    id="max-price"
                    min="0"
                    value={localFilters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
            <div className="space-y-2">
              {[0, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <input
                    id={`rating-${rating}`}
                    type="radio"
                    name="rating"
                    checked={localFilters.rating === rating}
                    onChange={() => setLocalFilters({ ...localFilters, rating })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700">
                    {rating === 0 ? (
                      'All Ratings'
                    ) : (
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                        <span className="ml-1">& Up</span>
                      </div>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Brand</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <div className="flex items-center">
                <input
                  id="brand-all"
                  type="radio"
                  name="brand"
                  checked={localFilters.brand === ''}
                  onChange={() => setLocalFilters({ ...localFilters, brand: '' })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="brand-all" className="ml-2 text-sm text-gray-700">
                  All Brands
                </label>
              </div>
              {popularBrands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    id={`brand-${brand}`}
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={localFilters.brand === brand}
                    onChange={() => setLocalFilters({ ...localFilters, brand })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
            <div className="space-y-2">
              {[ 
                { value: 'newest', label: 'Newest' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
                { value: 'rating', label: 'Rating' },
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`sort-${option.value}`}
                    type="radio"
                    name="sort"
                    checked={localFilters.sort === option.value}
                    onChange={() => setLocalFilters({ ...localFilters, sort: option.value as any })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`sort-${option.value}`} className="ml-2 text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t p-4 flex justify-between">
          <Button
            variant="outline"
            leftIcon={<X className="h-4 w-4" />}
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
          <Button
            variant="primary"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
