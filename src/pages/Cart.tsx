// src/pages/Cart.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { removeItemFromCart, updateItemQuantity, applyCoupon, removeCoupon, fetchCoupons, clearCart } from '../redux/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const appliedCoupons = useSelector((state: RootState) => state.cart.appliedCoupons);
  const availableCoupons = useSelector((state: RootState) => state.cart.availableCoupons);
  const [selectedCoupon, setSelectedCoupon] = useState<string>('');
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleRemove = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(coupon => coupon.code === selectedCoupon);
    if (coupon) {
      dispatch(applyCoupon(coupon));
      setSelectedCoupon('');
    }
  };

  const handleRemoveCoupon = (id: number) => {
    dispatch(removeCoupon(id));
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
  };

  const handleConfirmOrder = () => {
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  const handleCancelOrder = () => {
    setIsPlacingOrder(false);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalDiscount = appliedCoupons.reduce((total, coupon) => total + (totalPrice * coupon.discount) / 100, 0);
  const finalPrice = totalPrice - totalDiscount;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {orderPlaced ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-500 mb-4">Congratulations! Your order has been placed.</h2>
        </div>
      ) : (
        <>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
                <div className="flex space-x-8"> {/* Flex container for side-by-side layout */}
                  <div className="w-2/3"> {/* Cart Items Section */}
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border p-4 mb-4 rounded-lg shadow">
                        <img src={item.image} alt={item.title} className="h-20" />
                        <div>
                          <h2 className="text-xl font-bold">{item.title}</h2>
                          <p>${item.price}</p>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="w-16 p-1 border rounded"
                          />
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                    <h2 className="text-2xl font-bold mt-6">Total Price: ${totalPrice.toFixed(2)}</h2>
                    <h2 className="text-2xl font-bold mt-2">Discount: -${totalDiscount.toFixed(2)}</h2>
                    <h2 className="text-2xl font-bold mt-2">Final Price: ${finalPrice.toFixed(2)}</h2>

                    <div className="mt-6">
                      <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
                      <p>123 Main Street, City, Country</p>

                      {isPlacingOrder ? (
                        <div className="mt-4">
                          <button
                            onClick={handleConfirmOrder}
                            className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={handleCancelOrder}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                          >
                            Cancel Order
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={handlePlaceOrder}
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                          Continue to Place Order
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="w-1/3"> {/* Coupon Section */}
                    <div className="p-4 border rounded-lg shadow">
                      <h3 className="text-xl font-bold mb-4">Apply Coupon</h3>
                      <label className="block text-lg font-bold mb-2" htmlFor="coupon">
                        Select a Coupon:
                      </label>
                      <select
                        id="coupon"
                        value={selectedCoupon}
                        onChange={(e) => setSelectedCoupon(e.target.value)}
                        className="block w-full p-2 border rounded mb-4"
                      >
                        <option value="">Select a coupon</option>
                        {availableCoupons.map(coupon => (
                          <option key={coupon.id} value={coupon.code}>
                            {coupon.code} - {coupon.discount}% off
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-green-500 text-white rounded w-full mb-4"
                        disabled={!selectedCoupon || appliedCoupons.length >= (totalPrice > 1200 ? 2 : 1)}
                      >
                        Apply Coupon
                      </button>

                      <h3 className="text-xl font-bold mb-2">Applied Coupons:</h3>
                      {appliedCoupons.length === 0 && <p>No coupons applied.</p>}
                      {appliedCoupons.map(coupon => (
                        <div key={coupon.id} className="flex items-center justify-between p-2 border rounded mt-2">
                          <span>{coupon.code} - {coupon.discount}% off</span>
                          <button
                            onClick={() => handleRemoveCoupon(coupon.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            )}
          </>
      )}
    </div>
  );
};

export default Cart;
