import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Heart, 
  LogOut,
  ChevronDown,
  Star,
  Gift,
  Sparkles,
  Crown,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import CartDropdown from './CartDropdown';
import QuickSearch from './QuickSearch';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, isAuthenticated, logout } = useAuthStore();
  const { itemCount, toggleCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const navigate = useNavigate();

  const categoryStructure = {
    'Maquillage': {
      icon: Sparkles,
      subcategories: {
        'Visage': [
          { name: 'Fond de teint', path: '/products?category=foundation&subcategory=liquid' },
          { name: 'Anticernes', path: '/products?category=concealer' },
          { name: 'Poudres', path: '/products?category=powder' },
          { name: 'Blush', path: '/products?category=blush' },
          { name: 'Highlighter', path: '/products?category=highlighter' },
          { name: 'Bronzer', path: '/products?category=bronzer' }
        ],
        'Yeux': [
          { name: 'Palettes Fards', path: '/products?category=eyeshadow&subcategory=palette' },
          { name: 'Fards Individuels', path: '/products?category=eyeshadow&subcategory=single' },
          { name: 'Mascara', path: '/products?category=mascara' },
          { name: 'Eyeliner', path: '/products?category=eyeliner' },
          { name: 'Sourcils', path: '/products?category=brow' },
          { name: 'Primer Yeux', path: '/products?category=eyeprimer' }
        ],
        'Lèvres': [
          { name: 'Rouge à Lèvres', path: '/products?category=lipstick&subcategory=matte' },
          { name: 'Gloss', path: '/products?category=lipstick&subcategory=gloss' },
          { name: 'Baume à Lèvres', path: '/products?category=lipbalm' },
          { name: 'Liner à Lèvres', path: '/products?category=lipliner' },
          { name: 'Liquid Lipstick', path: '/products?category=lipstick&subcategory=liquid' }
        ]
      }
    },
    'Soins': {
      icon: Crown,
      subcategories: {
        'Visage': [
          { name: 'Nettoyants', path: '/products?category=skincare&subcategory=cleanser' },
          { name: 'Sérums', path: '/products?category=skincare&subcategory=serum' },
          { name: 'Hydratants', path: '/products?category=skincare&subcategory=moisturizer' },
          { name: 'Masques', path: '/products?category=skincare&subcategory=mask' },
          { name: 'Exfoliants', path: '/products?category=skincare&subcategory=exfoliant' },
          { name: 'Protection Solaire', path: '/products?category=skincare&subcategory=sunscreen' }
        ],
        'Anti-âge': [
          { name: 'Sérums Anti-âge', path: '/products?category=skincare&tags=anti-aging' },
          { name: 'Crèmes Lift', path: '/products?category=skincare&tags=lifting' },
          { name: 'Contour des Yeux', path: '/products?category=skincare&subcategory=eyecare' },
          { name: 'Treatments Premium', path: '/products?category=skincare&tags=luxury' }
        ],
        'Corps': [
          { name: 'Hydratants Corps', path: '/products?category=bodycare&subcategory=moisturizer' },
          { name: 'Gommages', path: '/products?category=bodycare&subcategory=scrub' },
          { name: 'Huiles', path: '/products?category=bodycare&subcategory=oil' }
        ]
      }
    },
    'Nouveautés': {
      icon: Star,
      subcategories: {
        'Cette Semaine': [
          { name: 'Dernières Arrivées', path: '/products?tags=new&sort=newest' },
          { name: 'Éditions Limitées', path: '/products?tags=limited-edition' },
          { name: 'Exclusivités Web', path: '/products?tags=exclusive' }
        ],
        'Collections': [
          { name: 'Collection Automne', path: '/products?collection=autumn' },
          { name: 'Holiday Collection', path: '/products?collection=holiday' },
          { name: 'Collaborations', path: '/products?tags=collaboration' }
        ]
      }
    },
    'Offres': {
      icon: Gift,
      subcategories: {
        'Promotions': [
          { name: 'Jusqu\'à -50%', path: '/products?sale=true&discount=50' },
          { name: 'Black Week', path: '/products?collection=blackweek' },
          { name: 'Dernière Chance', path: '/products?tags=lastchance' }
        ],
        'Coffrets': [
          { name: 'Coffrets Maquillage', path: '/products?category=sets&type=makeup' },
          { name: 'Coffrets Soins', path: '/products?category=sets&type=skincare' },
          { name: 'Coffrets Cadeaux', path: '/products?category=sets&type=gift' }
        ]
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleCategoryHover = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const handleCategoryLeave = () => {
    setTimeout(() => setActiveCategory(null), 150);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-lg">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="hidden lg:flex items-center justify-between py-2 text-sm border-b border-gray-100">
            <div className="flex items-center space-x-6 text-gray-600">
              <span className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Livraison gratuite dès 50€</span>
              </span>
              <span>Retours gratuits sous 30 jours</span>
              <span>Service client 7j/7</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              <Link to="/help" className="hover:text-yellow-600 transition-colors">Aide</Link>
              <Link to="/contact" className="hover:text-yellow-600 transition-colors">Contact</Link>
              <Link to="/stores" className="hover:text-yellow-600 transition-colors">Nos Boutiques</Link>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-xl shadow-lg">
                <span className="text-white font-bold text-xl font-playfair">YB</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-playfair font-bold gradient-gold-text">
                  YASIRA BEAUTY
                </span>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Luxury Cosmetics
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {Object.entries(categoryStructure).map(([categoryName, categoryData]) => (
                <div
                  key={categoryName}
                  className="relative group"
                  onMouseEnter={() => handleCategoryHover(categoryName)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-yellow-600 transition-colors duration-300 font-medium py-2">
                    <categoryData.icon className="w-4 h-4" />
                    <span>{categoryName}</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  
                  {/* Mega Menu */}
                  <AnimatePresence>
                    {activeCategory === categoryName && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mega-menu"
                        onMouseEnter={() => setActiveCategory(categoryName)}
                        onMouseLeave={() => setActiveCategory(null)}
                      >
                        <div className="category-menu">
                          {Object.entries(categoryData.subcategories).map(([subCategoryName, items]) => (
                            <div key={subCategoryName} className="category-section">
                              <h3 className="category-title">{subCategoryName}</h3>
                              <div className="space-y-1">
                                {items.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    className="mega-menu-item"
                                    onClick={() => setActiveCategory(null)}
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Rechercher parmi 400+ produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="input-luxury w-full pl-12 pr-4"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </form>
              
              {/* Quick Search Dropdown */}
              <AnimatePresence>
                {isSearchOpen && searchQuery && (
                  <QuickSearch 
                    query={searchQuery} 
                    onClose={() => setIsSearchOpen(false)}
                    onSelect={() => setIsSearchOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-3 text-gray-600 hover:text-red-500 transition-colors hover-lift rounded-xl"
              >
                <Heart className="w-6 h-6" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-3 text-gray-600 hover:text-yellow-600 transition-colors hover-lift rounded-xl"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {itemCount > 0 && (
                    <span className="cart-badge">{itemCount}</span>
                  )}
                </button>
                
                {/* Cart Dropdown */}
                <AnimatePresence>
                  {isCartOpen && (
                    <CartDropdown onClose={() => setIsCartOpen(false)} />
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative">
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 p-3 text-gray-600 hover:text-yellow-600 transition-colors hover-lift rounded-xl"
                    >
                      <img
                        src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full border-2 border-yellow-400"
                      />
                      <span className="hidden sm:block font-medium text-gray-700">{user?.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50"
                        >
                          <div className="p-4 border-b border-gray-100">
                            <div className="font-semibold text-gray-800">{user?.name}</div>
                            <div className="text-sm text-gray-500">{user?.email}</div>
                          </div>
                          <div className="py-2">
                            <Link
                              to="/profile"
                              className="block px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Mon Profil
                            </Link>
                            <Link
                              to="/orders"
                              className="block px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Mes Commandes
                            </Link>
                            <Link
                              to="/wishlist"
                              className="block px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Ma Wishlist
                            </Link>
                            {user?.role === 'admin' && (
                              <Link
                                to="/admin"
                                className="block px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                Administration
                              </Link>
                            )}
                            <hr className="my-2 border-gray-100" />
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
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
                    className="flex items-center space-x-2 btn-luxury"
                  >
                    <User className="w-4 h-4" />
                    <span>Connexion</span>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 text-gray-600 hover:text-yellow-600 transition-colors rounded-xl"
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
                className="input-luxury w-full pl-12 pr-4"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-6">
                <nav className="space-y-4">
                  {Object.entries(categoryStructure).map(([categoryName, categoryData]) => (
                    <div key={categoryName} className="space-y-2">
                      <div className="flex items-center space-x-2 font-semibold text-gray-800 py-2">
                        <categoryData.icon className="w-5 h-5 text-yellow-600" />
                        <span>{categoryName}</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        {Object.entries(categoryData.subcategories).map(([subCategoryName, items]) => (
                          <div key={subCategoryName}>
                            <div className="font-medium text-gray-600 text-sm py-1">{subCategoryName}</div>
                            {items.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                className="block text-gray-500 hover:text-yellow-600 transition-colors py-1 pl-4 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Overlay for mega menu */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={() => setActiveCategory(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;