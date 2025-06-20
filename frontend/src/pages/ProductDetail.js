import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  GitCompare,
  MessageCircle,
  ThumbsUp,
  Award,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { allProducts } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useCompareStore } from '../store/compareStore';
import Toast from '../components/Toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { toggleItem: toggleCompare, isInCompare } = useCompareStore();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });
  const [reviews, setReviews] = useState([]);

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      user: "Marie L.",
      rating: 5,
      date: "Il y a 2 jours",
      comment: "Produit exceptionnel ! La qualité est au rendez-vous et la tenue est parfaite toute la journée. Je recommande vivement !",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      user: "Sophie M.",
      rating: 4,
      date: "Il y a 1 semaine",
      comment: "Très satisfaite de mon achat. La couleur correspond parfaitement à mes attentes. Seul petit bémol, l'emballage pourrait être amélioré.",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      user: "Emma D.",
      rating: 5,
      date: "Il y a 2 semaines",
      comment: "Mon produit favori ! Texture parfaite, longue tenue et le résultat est naturel. C'est ma troisième commande.",
      verified: true,
      helpful: 15
    }
  ];

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setReviews(mockReviews);
      if (foundProduct.colors?.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      if (foundProduct.sizes?.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-luxury-white flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      quantity
    };
    addItem(productToAdd, quantity);
    setShowToast({ show: true, message: 'Produit ajouté au panier !', type: 'success' });
  };

  const handleWishlistToggle = () => {
    const added = toggleItem(product);
    setShowToast({ 
      show: true, 
      message: added ? 'Ajouté aux favoris !' : 'Retiré des favoris', 
      type: added ? 'success' : 'info' 
    });
  };

  const handleCompareToggle = () => {
    const result = toggleCompare(product);
    setShowToast({ show: true, message: result.message, type: result.success ? 'success' : 'error' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowToast({ show: true, message: 'Lien copié !', type: 'success' });
    }
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-luxury-white pt-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8 text-gray-600">
          <Link to="/" className="hover:text-yellow-600 transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-yellow-600 transition-colors">
            Produits
          </Link>
          <span>/</span>
          <Link 
            to={`/products?category=${product.category}`} 
            className="hover:text-yellow-600 transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-3xl overflow-hidden relative group luxury-card">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              />
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col space-y-2">
                {product.originalPrice && (
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
                {product.tags?.includes('new') && (
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                    NOUVEAU
                  </div>
                )}
                {product.tags?.includes('bestseller') && (
                  <div className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>BESTSELLER</span>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex flex-col space-y-3">
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
                    isInWishlist(product.id)
                      ? 'bg-red-500 text-white scale-110'
                      : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-red-500 hover:text-white hover:scale-110'
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
                
                <button
                  onClick={handleCompareToggle}
                  className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
                    isInCompare(product.id)
                      ? 'bg-blue-500 text-white scale-110'
                      : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-blue-500 hover:text-white hover:scale-110'
                  }`}
                >
                  <GitCompare className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-3 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setIsZoomed(true)}
                  className="p-3 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>

              {/* Image Navigation */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => 
                      prev === 0 ? productImages.length - 1 : prev - 1
                    )}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => 
                      prev === productImages.length - 1 ? 0 : prev + 1
                    )}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-yellow-400 scale-105 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-600 font-semibold bg-yellow-50 px-3 py-1 rounded-full text-sm">
                  {product.brand}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {product.rating} ({product.reviews} avis)
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl font-playfair font-bold text-gray-800 mb-6">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-yellow-600">
                  €{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    €{product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Économisez €{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            {product.features && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  <span>Points Forts</span>
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Options */}
            <div className="space-y-6">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-gray-800 font-semibold mb-3">
                    Couleur: <span className="text-yellow-600 font-normal">{selectedColor}</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                          selectedColor === color
                            ? 'border-yellow-400 bg-yellow-50 text-yellow-700 shadow-lg scale-105'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-gray-800 font-semibold mb-3">
                    Taille: <span className="text-yellow-600 font-normal">{selectedSize}</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                          selectedSize === size
                            ? 'border-yellow-400 bg-yellow-50 text-yellow-700 shadow-lg scale-105'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-gray-800 font-semibold mb-3">Quantité</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 text-gray-800 font-semibold text-lg min-w-[4rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => Math.min(product.stock || 99, prev + 1))}
                      className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {product.stock && (
                    <span className="text-gray-600 text-sm">
                      {product.stock} en stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 py-4 text-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{product.inStock ? 'Ajouter au Panier' : 'Rupture de Stock'}</span>
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleWishlistToggle}
                  className="btn-luxury flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                  <span>{isInWishlist(product.id) ? 'Dans mes favoris' : 'Ajouter aux favoris'}</span>
                </button>
                
                <button
                  onClick={handleCompareToggle}
                  className="btn-luxury flex items-center justify-center space-x-2"
                >
                  <GitCompare className="w-5 h-5" />
                  <span>Comparer</span>
                </button>
              </div>
            </div>

            {/* Delivery & Service Info */}
            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Livraison gratuite</div>
                    <div className="text-sm text-gray-500">Dès 50€ d'achat</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <RotateCcw className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Retours gratuits</div>
                    <div className="text-sm text-gray-500">30 jours pour changer d'avis</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Paiement sécurisé</div>
                    <div className="text-sm text-gray-500">SSL + 3D Secure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', name: 'Description', icon: Info },
                { id: 'ingredients', name: 'Ingrédients', icon: Sparkles },
                { id: 'reviews', name: `Avis (${reviews.length})`, icon: MessageCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-yellow-400 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {product.description}
                </p>
                {product.features && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Caractéristiques Principales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Composition & Ingrédients</h3>
                {product.ingredients ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.ingredients.map((ingredient, index) => (
                      <div key={index} className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-200">
                        <span className="text-yellow-700 font-semibold">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Les informations détaillées sur les ingrédients seront bientôt disponibles.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Avis Clients ({reviews.length})
                  </h3>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-800 font-semibold text-xl">{product.rating}/5</span>
                    </div>
                    <button className="btn-luxury">
                      Écrire un avis
                    </button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="luxury-card p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {review.user[0]}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-800">{review.user}</span>
                              {review.verified && (
                                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                                  Achat vérifié
                                </span>
                              )}
                            </div>
                            <div className="text-gray-500 text-sm">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">Utile ({review.helpful})</span>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 transition-colors text-sm">
                          Répondre
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-playfair font-bold text-gray-800 mb-8">
              Vous Aimerez <span className="gradient-gold-text">Aussi</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="product-card group luxury-card overflow-hidden hover-lift"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-800 font-semibold mb-2 group-hover:text-yellow-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-600 font-bold">
                        €{relatedProduct.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-500 text-sm">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain rounded-2xl"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      {showToast.show && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default ProductDetail;