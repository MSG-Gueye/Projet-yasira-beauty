import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { allProducts } from '../data/products';

const QuickSearch = ({ query, onClose, onSelect }) => {
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Trending searches
  const trendingSearches = [
    'Rouge à lèvres matte',
    'Palette Golden Hour',
    'Fond de teint',
    'Sérum anti-âge',
    'Mascara volumisant'
  ];

  // Recent searches (from localStorage)
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

  useEffect(() => {
    if (query.length >= 2) {
      const filteredProducts = allProducts
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6);
      
      setResults(filteredProducts);

      // Generate suggestions based on query
      const querySuggestions = [
        `${query} matte`,
        `${query} longue tenue`,
        `${query} waterproof`,
        `${query} bio`,
        `${query} luxury`
      ].filter(suggestion => 
        suggestion.toLowerCase() !== query.toLowerCase()
      ).slice(0, 4);
      
      setSuggestions(querySuggestions);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  }, [query]);

  const handleSearchSelect = (searchTerm) => {
    // Save to recent searches
    const updatedRecent = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    onSelect();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-hidden"
    >
      {query.length >= 2 ? (
        <div>
          {/* Search Results */}
          {results.length > 0 && (
            <div>
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Produits</h3>
                <div className="space-y-2">
                  {results.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => handleSearchSelect(product.name)}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">{product.brand}</div>
                      </div>
                      <div className="text-sm font-semibold text-yellow-600">
                        €{product.price}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Suggestions</h3>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <Link
                    key={index}
                    to={`/products?search=${encodeURIComponent(suggestion)}`}
                    onClick={() => handleSearchSelect(suggestion)}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-600"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span>{suggestion}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400 ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* View All Results */}
          <div className="p-4 border-t border-gray-100">
            <Link
              to={`/products?search=${encodeURIComponent(query)}`}
              onClick={() => handleSearchSelect(query)}
              className="flex items-center justify-center space-x-2 w-full py-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
            >
              <span>Voir tous les résultats pour "{query}"</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-4">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Recherches récentes</span>
              </h3>
              <div className="space-y-1">
                {recentSearches.slice(0, 3).map((search, index) => (
                  <Link
                    key={index}
                    to={`/products?search=${encodeURIComponent(search)}`}
                    onClick={() => handleSearchSelect(search)}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-600"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{search}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Tendances</span>
            </h3>
            <div className="space-y-1">
              {trendingSearches.map((search, index) => (
                <Link
                  key={index}
                  to={`/products?search=${encodeURIComponent(search)}`}
                  onClick={() => handleSearchSelect(search)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-600"
                >
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span>{search}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default QuickSearch;