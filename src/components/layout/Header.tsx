import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { toggleCart, toggleMenu, toggleSearch } from '../../store/slices/uiSlice';

import CartDropdown from '../cart/CartDropdown';

// Define the Category type
interface Category {
  name: string;
}

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isCartOpen, isMenuOpen } = useAppSelector((state) => state.ui);
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const { categories } = useAppSelector((state) => state.products);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600 flex items-center">
            <ShoppingCart className="mr-2" />
            ShopWave
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary-600 font-medium flex items-center">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {(categories ?? []).slice(0, 8).map((categoryObj: Category) => {
                    const category = categoryObj.name;
                    return (
                      <Link
                        key={category}
                        to={`/category/${category}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                      >
                        {category.replace('-', ' ')}
                      </Link>
                    );
                  })}

                  <Link
                    to="/categories"
                    className="block px-4 py-2 text-sm text-primary-600 font-semibold hover:bg-gray-100"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium">
              Shop
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-primary-600 font-medium">
              Deals
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-700 hover:text-primary-600"
              onClick={() => dispatch(toggleSearch())}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link to="/account" className="text-gray-700 hover:text-primary-600 hidden md:block">
              <User size={20} />
            </Link>
            <button
              className="text-gray-700 hover:text-primary-600 relative"
              onClick={() => dispatch(toggleCart())}
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-primary-600 text-white text-xs rounded-full">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-gray-700"
              onClick={() => dispatch(toggleMenu())}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-down">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => dispatch(toggleMenu())}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => dispatch(toggleMenu())}
              >
                Categories
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => dispatch(toggleMenu())}
              >
                Shop
              </Link>
              <Link
                to="/home"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => dispatch(toggleMenu())}
              >
                Deals
              </Link>
              <Link
                to="/account"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => dispatch(toggleMenu())}
              >
                Account
              </Link>
            </nav>
          </div>
        )}

        {/* Cart Dropdown */}
        {isCartOpen && <CartDropdown />}
      </div>
    </header>
  );
};

export default Header;
