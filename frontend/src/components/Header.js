import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, Heart, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, isAuthenticated, logout } = useAuthStore();
  const { itemCount, toggleCart } = useCartStore();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const menuItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Produits', path: '/products' },
    { name: 'Lipstick', path: '/products?category=lipstick' },
    { name: 'Foundation', path: '/products?category=foundation' },
    { name: 'Eyeshadow', path: '/products?category=eyeshadow' },
    { name: 'Skincare', path: '/products?category=skincare' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-lg">
              <span className="text-black font-bold text-xl font-playfair">YB</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-playfair font-bold gradient-gold-text">
                YASIRA BEAUTY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="relative p-2 text-gray-300 hover:text-yellow-400 transition-colors">
              <Heart className="w-6 h-6" />
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full border-2 border-yellow-400"
                    />
                    <span className="hidden sm:block font-medium">{user?.name}</span>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
                      >
                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Mon Profil
                          </Link>
                          {user?.role === 'admin' && (
                            <Link
                              to="/admin"
                              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Administration
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-red-400 transition-colors flex items-center space-x-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Déconnexion</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Connexion</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gray-900 border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-300 hover:text-yellow-400 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;