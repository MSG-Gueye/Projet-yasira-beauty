import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  Star, 
  ShoppingBag, 
  ChevronDown, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import { allProducts, categories } from '../data/products';
import { useCartStore } from '../store/cartStore';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const { addItem } = useCartStore();

  // Filter states
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    priceRange: [0, 200],
    rating: 0,
    inStock: false,
    brands: [],
    tags: []
  });

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    setFilters(prev => ({
      ...prev,
      category: category || '',
      search: search || ''
    }));
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Category filter
      if (filters.category && product.category !== filters.category) return false;
      
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!product.name.toLowerCase().includes(searchTerm) &&
            !product.description.toLowerCase().includes(searchTerm) &&
            !product.category.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }
      
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) return false;
      
      // Stock filter
      if (filters.inStock && !product.inStock) return false;
      
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      
      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => 
          product.tags?.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      priceRange: [0, 200],
      rating: 0,
      inStock: false,
      brands: [],
      tags: []
    });
    setSearchParams({});
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const availableBrands = [...new Set(allProducts.map(p => p.brand))];
  const availableTags = [...new Set(allProducts.flatMap(p => p.tags || []))];

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-white mb-4">
            Nos <span className="gradient-gold-text">Produits</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Découvrez notre collection complète de {allProducts.length} produits cosmétiques premium
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white hover:border-yellow-400 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtres</span>
            </button>

            {/* Results count */}
            <div className="text-gray-400">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="featured">Mis en avant</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
                <option value="newest">Plus récents</option>
                <option value="name">Nom A-Z</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-yellow-400 text-black' : 'bg-gray-900 text-gray-400 hover:text-white'} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-yellow-400 text-black' : 'bg-gray-900 text-gray-400 hover:text-white'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-80 space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Filtres</h3>
                <button
                  onClick={clearFilters}
                  className="text-yellow-400 hover:text-yellow-300 text-sm"
                >
                  Effacer tout
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Catégories</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === ''}
                        onChange={() => handleFilterChange('category', '')}
                        className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 focus:ring-yellow-400"
                      />
                      <span className="text-gray-400">Toutes</span>
                    </label>
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === category.slug}
                          onChange={() => handleFilterChange('category', category.slug)}
                          className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 focus:ring-yellow-400"
                        />
                        <span className="text-gray-400">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Prix</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>€0</span>
                      <span>€{filters.priceRange[1]}</span>
                      <span>€200+</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Note minimum</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => handleFilterChange('rating', rating)}
                          className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 focus:ring-yellow-400"
                        />
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                            />
                          ))}
                          <span className="text-gray-400 text-sm">& plus</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* In Stock */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                    />
                    <span className="text-gray-400">En stock uniquement</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {paginatedProducts.length > 0 ? (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`product-card group bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
                      }`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.originalPrice && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            PROMO
                          </div>
                        )}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-yellow-400 text-sm font-medium">
                            {product.brand}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-gray-400 text-sm">{product.rating}</span>
                            <span className="text-gray-500 text-sm">({product.reviews})</span>
                          </div>
                        </div>
                        
                        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                          <Link to={`/product/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        {product.tags && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {product.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-yellow-400 font-bold text-lg">
                              €{product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-gray-500 line-through text-sm">
                                €{product.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              product.inStock 
                                ? 'bg-green-900 text-green-300' 
                                : 'bg-red-900 text-red-300'
                            }`}>
                              {product.inStock ? 'En stock' : 'Rupture'}
                            </span>
                            <Link
                              to={`/product/${product.id}`}
                              className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium"
                            >
                              Voir Plus
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-yellow-400 transition-colors"
                    >
                      Précédent
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === i + 1
                            ? 'bg-yellow-400 text-black'
                            : 'bg-gray-900 border border-gray-700 text-white hover:border-yellow-400'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-yellow-400 transition-colors"
                    >
                      Suivant
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-400 text-xl mb-4">
                  Aucun produit trouvé
                </div>
                <p className="text-gray-500 mb-8">
                  Essayez de modifier vos filtres ou votre recherche
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Effacer les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;