import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-lg">
                <span className="text-black font-bold text-xl font-playfair">YB</span>
              </div>
              <span className="text-xl font-playfair font-bold gradient-gold-text">
                YASIRA BEAUTY
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Découvrez la beauté luxueuse avec YASIRA BEAUTY. Des produits cosmétiques 
              premium conçus pour révéler votre éclat naturel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Tous les Produits
                </Link>
              </li>
              <li>
                <Link to="/products?category=lipstick" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Rouge à Lèvres
                </Link>
              </li>
              <li>
                <Link to="/products?category=foundation" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Fond de Teint
                </Link>
              </li>
              <li>
                <Link to="/products?category=eyeshadow" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Fards à Paupières
                </Link>
              </li>
              <li>
                <Link to="/products?category=skincare" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Soins de la Peau
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Service Client</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Aide & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Livraison & Retours
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Guide des Tailles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Conditions d'Utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Politique de Confidentialité
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span>123 Avenue de la Beauté, Paris, France</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span>contact@yasirabeauty.com</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-yellow-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium rounded-r-lg hover:shadow-lg transition-all duration-300 text-sm">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} YASIRA BEAUTY. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Mentions Légales
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Cookies
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Plan du Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;