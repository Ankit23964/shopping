import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { toggleCart } from '../../store/slices/uiSlice';
import { updateLocalCartItem, removeFromLocalCart } from '../../store/slices/cartSlice';
import Button from '../common/Button';

const CartDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, total, discountedTotal, totalQuantity } = useAppSelector((state) => state.cart);

  const handleClose = () => {
    dispatch(toggleCart());
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateLocalCartItem({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromLocalCart(id));
  };

  return (
    <div className="absolute top-full right-0 mt-1 w-screen max-w-sm bg-white shadow-lg rounded-lg z-50 overflow-hidden animate-slide-down">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-medium text-lg flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5 text-primary-600" /> 
          Shopping Cart ({totalQuantity})
        </h3>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handleClose}
          aria-label="Close cart"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button variant="primary" onClick={handleClose}>
            Start Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="max-h-96 overflow-y-auto p-4">
            {items.map((item) => (
              <div key={item.id} className="flex py-4 border-b last:border-0">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        <Link
                          to={`/product/${item.id}`}
                          onClick={handleClose}
                          className="hover:text-primary-600"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${item.discountedPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center border rounded-md">
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="flex justify-between text-sm mb-1">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium text-gray-900">${total.toFixed(2)}</p>
            </div>
            {total !== discountedTotal && (
              <div className="flex justify-between text-sm mb-1">
                <p className="text-gray-500">Discount</p>
                <p className="font-medium text-green-600">
                  -${(total - discountedTotal).toFixed(2)}
                </p>
              </div>
            )}
            <div className="flex justify-between font-medium text-base my-2">
              <p>Total</p>
              <p>${discountedTotal.toFixed(2)}</p>
            </div>
            <div className="mt-4 space-y-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={handleClose}
              >
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleClose}
              >
                View Cart
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;