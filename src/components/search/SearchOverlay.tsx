import React, { useState, useEffect, useRef } from 'react';
import { X, Search as SearchIcon, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleSearch } from '../../store/slices/uiSlice';
import { searchProducts } from '../../services/api';
import { Product } from '../../types';

const SearchOverlay: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the overlay appears
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Add escape key listener
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(toggleSearch());
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [dispatch]);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          const response = await searchProducts(query);
          setResults(response.products);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleClose = () => {
    dispatch(toggleSearch());
  };

  const handleResultClick = (productId: number) => {
    navigate(`/product/${productId}`);
    dispatch(toggleSearch());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      dispatch(toggleSearch());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl animate-slide-down">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Search Products</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleClose}
            aria-label="Close search"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search for products..."
              aria-label="Search"
            />
            {loading && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
              </div>
            )}
          </div>
        </form>
        
        {results.length > 0 && (
          <div className="border-t overflow-y-auto max-h-96">
            <ul className="divide-y divide-gray-200">
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center"
                    onClick={() => handleResultClick(product.id)}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{product.title}</h3>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                      <p className="text-sm font-semibold text-primary-600">${product.price.toFixed(2)}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {query.length >= 2 && !loading && results.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No products found matching "{query}".
          </div>
        )}
        
        <div className="border-t p-4 bg-gray-50 text-center text-sm text-gray-500">
          Press ESC to close or Enter to view all results
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;