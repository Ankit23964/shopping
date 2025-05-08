import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsResponse, ProductFilters } from '../../types';
import { getProducts, getProductById, getFilteredProducts, getProductsByCategory } from '../../services/api';

interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  total: number;
  skip: number;
  limit: number;
  filters: ProductFilters;
  categories: string[];
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  newArrivals: [],
  product: null,
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 12,
  filters: {},
  categories: [],
};

// Async thunks for fetching data
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit, skip }: { limit: number; skip: number }, { rejectWithValue }) => {
    try {
      return await getProducts(limit, skip);
    } catch (error: any) {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch (error: any) {
      return rejectWithValue('Failed to fetch product');
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  'products/fetchFilteredProducts',
  async (
    { filters, limit, skip }: { filters: ProductFilters; limit: number; skip: number },
    { rejectWithValue }
  ) => {
    try {
      return await getFilteredProducts(filters, limit, skip);
    } catch (error: any) {
      return rejectWithValue('Failed to fetch filtered products');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (
    { category, limit, skip }: { category: string; limit: number; skip: number },
    { rejectWithValue }
  ) => {
    try {
      return await getProductsByCategory(category, limit, skip);
    } catch (error: any) {
      return rejectWithValue('Failed to fetch products by category');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch categories');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
        
        // Set featured products (for demo, using first 5 products)
        state.featuredProducts = action.payload.products.slice(0, 5);
        
        // Set new arrivals (for demo, using last 5 products)
        state.newArrivals = [...action.payload.products].reverse().slice(0, 5);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
