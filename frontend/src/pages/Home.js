import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { featuredProducts, categories } from '../data/products';
import { useCartStore } from '../store/cartStore';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCartStore();

  const heroSlides = [
    {
      id: 1,
      title: "NOUVELLE COLLECTION",
      subtitle: "Golden Hour",
      description: "Découvrez notre palette exclusive aux tons dorés et cuivrés pour un look naturellement lumineux",
      image: "https://images.unsplash.com/photo-1589782431746-713d84eef3c4",
      cta: "Découvrir",
      link: "/products?category=eyeshadow"
    },
    {
      id: 2,
      title: "SOINS PREMIUM",
      subtitle: "Luxury Anti-Aging",
      description: "Redéfinissez votre routine beauté avec nos sérums aux particules d'or 24 carats",
      image: "https://images.unsplash.com/photo-1704118549325-81cad2f39ab7",
      cta: "Shop Now",
      link: "/products?category=skincare"
    },
    {
      id: 3,
      title: "ROUGE À LÈVRES",
      subtitle: "Velvet Collection",
      description: "Texture velours longue tenue pour des lèvres irrésistiblement douces",
      image: "https://images.unsplash.com/photo-1617422275563-4cf1103e7d60",
      cta: "Voir Plus",
      link: "/products?category=lipstick"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleAddToCart = (product) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(212,175,55,0.2)), url('${slide.image}') center/cover`
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-medium tracking-wide uppercase">
                      {slide.title}
                    </span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white leading-tight">
                    {slide.subtitle}
                  </h1>
                  
                  <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
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
                      className="btn-secondary inline-flex items-center justify-center space-x-2"
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-yellow-400 scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
              Nos <span className="gradient-gold-text">Catégories</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explorez notre gamme complète de produits cosmétiques premium
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
                  className="block relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 hover:border-yellow-400 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-0 flex items-end p-4">
                    <h3 className="text-white font-semibold text-lg group-hover:text-yellow-400 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
              Produits <span className="gradient-gold-text">Vedettes</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Découvrez nos bestsellers plébiscités par nos clientes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="product-card group bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden">
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
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400 text-sm font-medium">
                      {product.brand}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-400 text-sm">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
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
                    <Link
                      to={`/product/${product.id}`}
                      className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium"
                    >
                      Voir Plus
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Voir Tous les Produits</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-playfair font-bold text-white mb-4">
              Restez <span className="gradient-gold-text">Informée</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Recevez en exclusivité nos nouveautés, conseils beauté et offres spéciales
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              />
              <button className="btn-primary">
                S'abonner
              </button>
            </div>
            
            <p className="text-gray-500 text-sm mt-4">
              En vous inscrivant, vous acceptez notre politique de confidentialité
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;