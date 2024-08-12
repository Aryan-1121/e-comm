// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}


interface Coupon {
  id: number;
  code: string;
  discount: number;
}

interface CartState {
  items: CartItem[];
  appliedCoupons: Coupon[];
  availableCoupons: Coupon[];
}
// interface CartState {
//   items: Array<{ id: number; title: string; price: number; quantity: number; image: string }>;
//   appliedCoupons: Array<{ id: number; code: string; discount: number }>;
//   availableCoupons: Array<{ id: number; code: string; discount: number }>;
// }
const initialState: CartState = {
  items: [],
  appliedCoupons: [],
  availableCoupons: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = []; // Clears all items in the cart
      state.appliedCoupons = []; //clear applied coupons
    },

    updateItemQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },

    applyCoupon(state, action: PayloadAction<Coupon>) {
      const totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      const maxCoupons = totalPrice > 1200 ? 2 : 1;

      if (state.appliedCoupons.length < maxCoupons) {
        state.appliedCoupons.push(action.payload);
      }
    },
    removeCoupon(state, action: PayloadAction<number>) {
      state.appliedCoupons = state.appliedCoupons.filter(coupon => coupon.id !== action.payload);
    },
    setAvailableCoupons(state, action: PayloadAction<Coupon[]>) {
      state.availableCoupons = action.payload;
    },


  },
});

export const { addItemToCart, removeItemFromCart, clearCart, updateItemQuantity, applyCoupon, removeCoupon, setAvailableCoupons } = cartSlice.actions;

export const fetchCoupons = () => async (dispatch: any) => {
  try {
    const response = await axios.get('/coupons.json');
    dispatch(setAvailableCoupons(response.data));
  } catch (error) {
    console.error("Failed to fetch coupons", error);
  }
};

export default cartSlice.reducer;
