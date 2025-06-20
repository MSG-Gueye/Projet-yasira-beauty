import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package,
  DollarSign,
  Eye,
  Star,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for dashboard
  const stats = [
    {
      title: 'Chiffre d\'affaires',
      value: '€45,231',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Commandes',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Clients',
      value: '8,429',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      title: 'Produits',
      value: '412',
      change: '+2.1%',
      trend: 'up',
      icon: Package,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
  ];

  const recentOrders = [
    {
      id: 'YB-2024001',
      customer: 'Marie Dubois',
      total: 89.50,
      status: 'En cours',
      date: '2024-12-15',
    },
    {
      id: 'YB-2024002', 
      customer: 'Sophie Martin',
      total: 125.99,
      status: 'Livrée',
      date: '2024-12-15',
    },
    {
      id: 'YB-2024003',
      customer: 'Emma Laurent',
      total: 67.25,
      status: 'Expédiée',
      date: '2024-12-14',
    },
    {
      id: 'YB-2024004',
      customer: 'Julie Petit',
      total: 234.80,
      status: 'En attente',
      date: '2024-12-14',
    },
  ];

  const topProducts = [
    {
      name: 'Velvet Matte Lipstick',
      sales: 156,
      revenue: '€4,508',
      image: 'https://images.unsplash.com/photo-1617422275563-4cf1103e7d60?w=50&h=50&fit=crop',
    },
    {
      name: 'Golden Hour Palette',
      sales: 89,
      revenue: '€4,714',
      image: 'https://images.unsplash.com/photo-1589782431746-713d84eef3c4?w=50&h=50&fit=crop',
    },
    {
      name: 'Luxury Anti-Aging Serum',
      sales: 45,
      revenue: '€4,049',
      image: 'https://images.unsplash.com/photo-1704118549325-81cad2f39ab7?w=50&h=50&fit=crop',
    },
    {
      name: 'Flawless Foundation',
      sales: 78,
      revenue: '€3,353',
      image: 'https://images.unsplash.com/photo-1519668963014-2308b08e5e9b?w=50&h=50&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-playfair font-bold text-white mb-2">
              Dashboard <span className="gradient-gold-text">Admin</span>
            </h1>
            <p className="text-gray-400">
              Vue d'ensemble de votre boutique YASIRA BEAUTY
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { title: 'Ajouter Produit', link: '/admin/products', icon: Package },
              { title: 'Voir Commandes', link: '/admin/orders', icon: ShoppingBag },
              { title: 'Gérer Clients', link: '/admin/users', icon: Users },
              { title: 'Analytics', link: '/admin/analytics', icon: TrendingUp },
            ].map(({ title, link, icon: Icon }) => (
              <Link
                key={title}
                to={link}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-yellow-400 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-400/10 p-2 rounded-lg group-hover:bg-yellow-400/20 transition-colors">
                    <Icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span className="text-white font-medium">{title}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Commandes Récentes</h2>
                <Link
                  to="/admin/orders"
                  className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                >
                  Voir toutes →
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="text-white font-medium">{order.id}</h3>
                          <p className="text-gray-400 text-sm">{order.customer}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-semibold">€{order.total}</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Livrée'
                          ? 'bg-green-900 text-green-300'
                          : order.status === 'En cours'
                          ? 'bg-blue-900 text-blue-300'
                          : order.status === 'Expédiée'
                          ? 'bg-purple-900 text-purple-300'
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Produits Populaires</h2>
                <Link
                  to="/admin/products"
                  className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                >
                  Gérer produits →
                </Link>
              </div>

              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{product.name}</h3>
                      <p className="text-gray-400 text-sm">{product.sales} vendus</p>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-semibold">{product.revenue}</div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>#{index + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Analytics */}
          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Aperçu Analytique</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">4.8</div>
                <div className="text-gray-400 text-sm">Note moyenne</div>
                <div className="flex justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">89%</div>
                <div className="text-gray-400 text-sm">Taux de satisfaction</div>
                <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                  <div className="bg-yellow-400 h-2 rounded-full w-[89%]"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">2.4</div>
                <div className="text-gray-400 text-sm">Temps de visite moyen (min)</div>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">+15% ce mois</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;