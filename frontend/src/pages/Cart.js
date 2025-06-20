import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

const Cart = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const shippingCost = total > 50 ? 0 : 5.99;
  const tax = total * 0.20; // 20% TVA
  const finalTotal = total + shippingCost + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-gray-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-400 mb-8">
              Découvrez notre collection de produits cosmétiques premium
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
              <span>Commencer mes achats</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-white mb-2">
            Mon <span className="gradient-gold-text">Panier</span>
          </h1>
          <p className="text-gray-400">
            {itemCount} article{itemCount > 1 ? 's' : ''} dans votre panier
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900 rounded-2xl border border-gray-800 p-6"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            <Link
                              to={`/product/${item.id}`}
                              className="hover:text-yellow-400 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-yellow-400 text-sm font-medium">{item.brand}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Product Options */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.selectedColor && (
                          <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                            {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                            {item.selectedSize}
                          </span>
                        )}
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-700 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-white font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-yellow-400 font-bold text-lg">
                            €{(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-gray-400 text-sm">
                              €{item.price} chacun
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart */}
            <div className="flex justify-between items-center pt-4">
              <Link
                to="/products"
                className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
              >
                ← Continuer mes achats
              </Link>
              <button
                onClick={clearCart}
                className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Vider le panier</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-6">
                Résumé de la commande
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sous-total ({itemCount} articles)</span>
                  <span className="text-white">€{total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Livraison</span>
                  <span className="text-white">
                    {shippingCost === 0 ? (
                      <span className="text-green-400">Gratuite</span>
                    ) : (
                      `€${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">TVA (20%)</span>
                  <span className="text-white">€{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      €{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              {total < 50 && (
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 mb-6">
                  <p className="text-yellow-400 text-sm">
                    Ajoutez €{(50 - total).toFixed(2)} pour bénéficier de la livraison gratuite
                  </p>
                  <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
              >
                <span>Passer la commande</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Security Info */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Paiement 100% sécurisé</span>
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  Vos données sont protégées par cryptage SSL
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-playfair font-bold text-white mb-8">
            Vous pourriez aussi <span className="gradient-gold-text">aimer</span>
          </h2>
          <div className="text-center text-gray-400">
            <p>Suggestions de produits bientôt disponibles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;