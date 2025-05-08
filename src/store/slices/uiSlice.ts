import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isCartOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProductId: number | null;
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
  notifications: Notification[];
  isLoading: boolean;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

const initialState: UIState = {
  isCartOpen: false,
  isQuickViewOpen: false,
  quickViewProductId: null,
  isMenuOpen: false,
  isSearchOpen: false,
  searchQuery: '',
  notifications: [],
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openQuickView: (state, action: PayloadAction<number>) => {
      state.isQuickViewOpen = true;
      state.quickViewProductId = action.payload;
    },
    closeQuickView: (state) => {
      state.isQuickViewOpen = false;
      state.quickViewProductId = null;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = Date.now().toString();
      state.notifications.push({ ...action.payload, id });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  toggleCart,
  openQuickView,
  closeQuickView,
  toggleMenu,
  toggleSearch,
  setSearchQuery,
  addNotification,
  removeNotification,
  setLoading,
} = uiSlice.actions;
export default uiSlice.reducer;