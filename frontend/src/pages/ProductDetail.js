import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ChevronRight
} from 'lucide-react';
import { allProducts } from '../data/products';
import { useCartStore } from '../store/cartStore';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement du produit...</p>
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
    
    // Optionally show success message or redirect
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
            Accueil
          </Link>
          <span className="text-gray-600">/</span>
          <Link to="/products" className="text-gray-400 hover:text-yellow-400 transition-colors">
            Produits
          </Link>
          <span className="text-gray-600">/</span>
          <Link 
            to={`/products?category=${product.category}`} 
            className="text-gray-400 hover:text-yellow-400 transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-900 rounded-2xl overflow-hidden relative group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
              
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-full transition-colors ${
                    isWishlisted 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Image Navigation */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => 
                      prev === 0 ? productImages.length - 1 : prev - 1
                    )}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => 
                      prev === productImages.length - 1 ? 0 : prev + 1
                    )}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-yellow-400' 
                        : 'border-gray-700 hover:border-gray-600'
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
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-yellow-400 font-medium">{product.brand}</span>
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">
                    {product.rating} ({product.reviews} avis)
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl font-playfair font-bold text-white mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-yellow-400">
                  €{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    €{product.originalPrice}
                  </span>
                )}
              </div>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-white font-medium mb-2">
                    Couleur: <span className="text-yellow-400">{selectedColor}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedColor === color
                            ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
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
                  <h3 className="text-white font-medium mb-2">
                    Taille: <span className="text-yellow-400">{selectedSize}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedSize === size
                            ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
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
                <h3 className="text-white font-medium mb-2">Quantité</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-700 rounded-lg">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-white font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => Math.min(product.stock || 99, prev + 1))}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {product.stock && (
                    <span className="text-gray-400 text-sm">
                      {product.stock} en stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{product.inStock ? 'Ajouter au Panier' : 'Rupture de Stock'}</span>
              </button>
              
              <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Ajouter aux Favoris</span>
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-800 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Truck className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">Livraison gratuite</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <RotateCcw className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">Retours 30 jours</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">Paiement sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-800">
            <nav className="flex space-x-8">
              {['description', 'ingredients', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-yellow-400 text-yellow-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab === 'description' && 'Description'}
                  {tab === 'ingredients' && 'Ingrédients'}
                  {tab === 'reviews' && `Avis (${product.reviews})`}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>
                {product.features && (
                  <div>
                    <h3 className="text-white font-semibold text-xl mb-4">Caractéristiques</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-gray-400 flex items-center space-x-2">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-white font-semibold text-xl mb-4">Liste des Ingrédients</h3>
                {product.ingredients ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.ingredients.map((ingredient, index) => (
                      <div key={index} className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                        <span className="text-yellow-400 font-medium">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">
                    Les informations sur les ingrédients seront bientôt disponibles.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-white font-semibold text-xl">
                    Avis Clients ({product.reviews})
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white font-medium">{product.rating}/5</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Mock reviews */}
                  {[
                    {
                      author: "Marie L.",
                      rating: 5,
                      date: "Il y a 2 jours",
                      comment: "Produit exceptionnel ! La qualité est au rendez-vous et la tenue est parfaite toute la journée."
                    },
                    {
                      author: "Sophie M.",
                      rating: 4,
                      date: "Il y a 1 semaine",
                      comment: "Très satisfaite de mon achat. La couleur correspond parfaitement à mes attentes."
                    }
                  ].map((review, index) => (
                    <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-semibold">
                            {review.author[0]}
                          </div>
                          <div>
                            <div className="text-white font-medium">{review.author}</div>
                            <div className="text-gray-400 text-sm">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-400">{review.comment}</p>
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
            <h2 className="text-3xl font-playfair font-bold text-white mb-8">
              Produits <span className="gradient-gold-text">Similaires</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="product-card group bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 group-hover:text-yellow-400 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 font-bold">
                        €{relatedProduct.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-400 text-sm">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;