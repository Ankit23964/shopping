// Product Types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}


export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Category Types
export interface Category {
  name: string;
  image?: string;
}

// Cart Types
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  brand?: string;
  sort?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

// User Types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}