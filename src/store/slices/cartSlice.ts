import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, Product } from '../../types';
import { getUserCart, addToCart, updateCartItem } from '../../services/api';

interface CartState {
  items: CartItem[];
  total: number;
  discountedTotal: number;
  totalQuantity: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  discountedTotal: 0,
  totalQuantity: 0,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await getUserCart(userId);
    } catch (error) {
      return rejectWithValue('Failed to fetch cart');
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (
    { userId, productId, quantity }: { userId: number; productId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      return await addToCart(userId, productId, quantity);
    } catch (error) {
      return rejectWithValue('Failed to add item to cart');
    }
  }
);

export const updateItemInCart = createAsyncThunk(
  'cart/updateItemInCart',
  async (
    {
      cartId,
      productId,
      quantity,
    }: { cartId: number; productId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      return await updateCartItem(cartId, productId, quantity);
    } catch (error) {
      return rejectWithValue('Failed to update item in cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Local cart operations for demo purposes (without API calls)
    addToLocalCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.quantity * existingItem.price;
        existingItem.discountedPrice = existingItem.total * (1 - existingItem.discountPercentage / 100);
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          total: product.price,
          discountPercentage: product.discountPercentage,
          discountedPrice: product.price * (1 - product.discountPercentage / 100),
          thumbnail: product.thumbnail,
        });
      }

      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + item.total, 0);
      state.discountedTotal = state.items.reduce((total, item) => total + item.discountedPrice, 0);
    },
    removeFromLocalCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + item.total, 0);
      state.discountedTotal = state.items.reduce((total, item) => total + item.discountedPrice, 0);
    },
    updateLocalCartItem: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
        item.total = item.price * quantity;
        item.discountedPrice = item.total * (1 - item.discountPercentage / 100);
      }

      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + item.total, 0);
      state.discountedTotal = state.items.reduce((total, item) => total + item.discountedPrice, 0);
    },
    clearLocalCart: (state) => {
      state.items = [];
      state.total = 0;
      state.discountedTotal = 0;
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.discountedTotal = action.payload.discountedTotal;
        state.totalQuantity = action.payload.totalQuantity;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.discountedTotal = action.payload.discountedTotal;
        state.totalQuantity = action.payload.totalQuantity;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateItemInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemInCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.discountedTotal = action.payload.discountedTotal;
        state.totalQuantity = action.payload.totalQuantity;
      })
      .addCase(updateItemInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addToLocalCart, removeFromLocalCart, updateLocalCartItem, clearLocalCart } =
  cartSlice.actions;
export default cartSlice.reducer;