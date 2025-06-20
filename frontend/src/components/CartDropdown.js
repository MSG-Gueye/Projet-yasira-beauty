import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const CartDropdown = ({ onClose }) => {
  const { items, total, updateQuantity, removeItem } = useCartStore();

  const shippingCost = total > 50 ? 0 : 5.99;
  const finalTotal = total + shippingCost;

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50"
      >
        <div className="p-6 text-center">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Votre panier est vide</h3>
          <p className="text-gray-500 text-sm mb-4">Découvrez nos produits cosmétiques premium</p>
          <Link
            to="/products"
            onClick={onClose}
            className="btn-primary w-full"
          >
            Découvrir nos produits
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          Mon panier ({items.length})
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Items */}
      <div className="max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="p-4 border-b border-gray-50 last:border-b-0">
            <div className="flex space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
                <p className="text-xs text-yellow-600">{item.brand}</p>
                
                {/* Options */}
                {(item.selectedColor || item.selectedSize) && (
                  <div className="flex space-x-2 mt-1">
                    {item.selectedColor && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {item.selectedColor}
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {item.selectedSize}
                      </span>
                    )}
                  </div>
                )}

                {/* Quantity and Price */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="px-2 py-1 text-sm font-medium text-gray-800 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">
                      €{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sous-total</span>
            <span className="text-gray-800">€{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Livraison</span>
            <span className="text-gray-800">
              {shippingCost === 0 ? (
                <span className="text-green-600 font-medium">Gratuite</span>
              ) : (
                `€${shippingCost.toFixed(2)}`
              )}
            </span>
          </div>
          <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
            <span className="text-gray-800">Total</span>
            <span className="text-yellow-600">€{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Free Shipping Progress */}
        {total < 50 && (
          <div className="mb-4">
            <div className="text-xs text-gray-600 mb-1">
              Ajoutez €{(50 - total).toFixed(2)} pour la livraison gratuite
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Link
            to="/cart"
            onClick={onClose}
            className="block w-full text-center py-2 px-4 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
          >
            Voir le panier
          </Link>
          <Link
            to="/checkout"
            onClick={onClose}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <span>Commander</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CartDropdown;