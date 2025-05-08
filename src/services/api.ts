import axios from 'axios';
import { ProductsResponse, Product, Cart, ProductFilters } from '../types';

const API_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product APIs
export const getProducts = async (limit = 12, skip = 0): Promise<ProductsResponse> => {
  const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category: string, limit = 12, skip = 0): Promise<ProductsResponse> => {
  const response = await api.get(`/products/category/${category}?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const searchProducts = async (query: string): Promise<ProductsResponse> => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data;
};

export const getFilteredProducts = async (
  filters: ProductFilters,
  limit = 12,
  skip = 0
): Promise<ProductsResponse> => {
  let url = `/products?limit=${limit}&skip=${skip}`;
  
  if (filters.category) {
    return getProductsByCategory(filters.category, limit, skip);
  }
  
  const response = await api.get(url);
  let products = response.data.products;
  
  // Client-side filtering because DummyJSON has limited filtering capabilities
  if (filters.priceRange) {
    products = products.filter(
      (p: Product) => p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
    );
  }
  
  if (filters.rating) {
    products = products.filter((p: Product) => p.rating >= filters.rating!);
  }
  
  if (filters.brand) {
    products = products.filter((p: Product) => p.brand.toLowerCase() === filters.brand!.toLowerCase());
  }
  
  // Sorting
  if (filters.sort) {
    switch (filters.sort) {
      case 'price-asc':
        products.sort((a: Product, b: Product) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a: Product, b: Product) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a: Product, b: Product) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo purposes, we'll just shuffle them
        products.sort(() => Math.random() - 0.5);
        break;
    }
  }
  
  return {
    products,
    total: products.length,
    skip,
    limit,
  };
};

// Categories APIs
export const getCategories = async (): Promise<string[]> => {
  const response = await api.get('/products/categories');
  return response.data;
};

// Cart APIs
export const getUserCart = async (userId: number): Promise<Cart> => {
  const response = await api.get(`/carts/user/${userId}`);
  return response.data.carts[0] || { products: [] };
};

export const addToCart = async (userId: number, productId: number, quantity: number): Promise<Cart> => {
  const response = await api.post('/carts/add', {
    userId,
    products: [{ id: productId, quantity }],
  });
  return response.data;
};

export const updateCartItem = async (
  cartId: number,
  productId: number,
  quantity: number
): Promise<Cart> => {
  const response = await api.put(`/carts/${cartId}`, {
    products: [{ id: productId, quantity }],
  });
  return response.data;
};

export default api;