import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { removeItemFromCart, updateItemQuantity } from '../redux/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default Cart;
