import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Star, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles,
  Heart,
  Eye,
  Gift,
  Crown,
  Zap,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';
import { featuredProducts, categories } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const heroSlides = [
    {
      id: 1,
      title: "NOUVELLE COLLECTION",
      subtitle: "Golden Glow",
      description: "Révélez votre éclat naturel avec notre collection exclusive aux reflets dorés",
      image: "https://images.unsplash.com/photo-1589782431746-713d84eef3c4",
      cta: "Découvrir",
      link: "/products?category=eyeshadow",
      color: "from-yellow-400 to-amber-500"
    },
    {
      id: 2,
      title: "SOINS PREMIUM",
      subtitle: "Luxury Skincare",
      description: "Une routine beauté d'exception avec nos sérums et crèmes aux ingrédients précieux",
      image: "https://images.unsplash.com/photo-1704118549325-81cad2f39ab7",
      cta: "Explorer",
      link: "/products?category=skincare",
      color: "from-rose-400 to-pink-500"
    },
    {
      id: 3,
      title: "MAQUILLAGE",
      subtitle: "Velvet Touch",
      description: "Des textures velours pour des lèvres irrésistiblement douces et colorées",
      image: "https://images.unsplash.com/photo-1617422275563-4cf1103e7d60",
      cta: "Voir Plus",
      link: "/products?category=lipstick",
      color: "from-purple-400 to-indigo-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const handleWishlistToggle = (product) => {
    toggleItem(product);
  };

  const benefits = [
    {
      icon: Truck,
      title: "Livraison Gratuite",
      description: "Dès 50€ d'achat partout en France",
      color: "text-blue-600"
    },
    {
      icon: RotateCcw,
      title: "Retours Gratuits",
      description: "30 jours pour changer d'avis",
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: "Paiement Sécurisé",
      description: "Vos données sont protégées",
      color: "text-purple-600"
    },
    {
      icon: Crown,
      title: "Qualité Premium",
      description: "Cosmétiques haut de gamme certifiés",
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-gradient-cream">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,246,240,0.8)), url('${slide.image}') center/cover`
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-2">
                    <div className={`bg-gradient-to-r ${slide.color} p-2 rounded-full`}>
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium tracking-wide uppercase text-gray-700">
                      {slide.title}
                    </span>
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl font-playfair font-bold text-gray-800 leading-tight">
                    <span className="gradient-gold-text">{slide.subtitle}</span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <Link
                      to={slide.link}
                      className="btn-primary inline-flex items-center justify-center space-x-2"
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/products"
                      className="btn-luxury inline-flex items-center justify-center space-x-2"
                    >
                      <span>Tous les Produits</span>
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-yellow-500 scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 opacity-30">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-xl"
          />
        </div>
        <div className="absolute bottom-40 left-20 opacity-20">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-32 h-32 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full blur-2xl"
          />
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className={`p-3 rounded-xl bg-gray-50 ${benefit.color}`}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-gray-800 mb-6">
              Nos <span className="gradient-gold-text">Univers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explorez notre gamme complète de produits cosmétiques d'exception
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link
                  to={`/products?category=${category.slug}`}
                  className="block relative overflow-hidden rounded-3xl luxury-card hover-lift"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute inset-0 flex items-end p-6">
                    <h3 className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {category.name}
                    </h3>
                  </div>
                  
                  {/* Floating icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-gray-800 mb-6">
              Nos <span className="gradient-gold-text">Bestsellers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les produits les plus adorés par notre communauté
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="product-card group luxury-card overflow-hidden hover-lift"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.originalPrice && (
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        PROMO
                      </div>
                    )}
                    {product.tags?.includes('new') && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        NOUVEAU
                      </div>
                    )}
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlistToggle(product);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Add to Cart */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ajouter au panier</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-600 text-sm font-medium">
                      {product.brand}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-500 text-sm">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-gray-800 font-semibold text-lg mb-2 group-hover:text-yellow-600 transition-colors">
                    <Link to={`/product/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold text-xl">
                        €{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          €{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-yellow-600 hover:text-yellow-700 transition-colors text-sm font-medium flex items-center space-x-1"
                    >
                      <span>Voir Plus</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-luxury inline-flex items-center space-x-2"
            >
              <span>Découvrir Tous nos Produits</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-champagne">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Gift className="w-8 h-8 text-yellow-600" />
                <h2 className="text-4xl font-playfair font-bold text-gray-800">
                  Rejoignez le <span className="gradient-gold-text">Club YASIRA</span>
                </h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Recevez en exclusivité nos nouveautés, conseils beauté et offres privilèges
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300"
              />
              <button className="btn-primary">
                S'abonner
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Offres exclusives</span>
              </div>
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span>Conseils d'experts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="w-4 h-4 text-yellow-500" />
                <span>Cadeaux surprises</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-xs mt-6">
              En vous inscrivant, vous acceptez notre politique de confidentialité
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;