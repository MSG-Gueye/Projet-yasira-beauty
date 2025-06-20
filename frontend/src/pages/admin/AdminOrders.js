import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Truck, 
  Package,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Mock orders data
  const orders = [
    {
      id: 'YB-2024001',
      customer: {
        name: 'Marie Dubois',
        email: 'marie.dubois@email.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b371?w=40&h=40&fit=crop&crop=face'
      },
      date: '2024-12-15',
      status: 'En cours',
      total: 89.50,
      items: [
        { name: 'Velvet Matte Lipstick', quantity: 2, price: 28.99 },
        { name: 'Glossy Lip Tint', quantity: 1, price: 22.99 }
      ],
      shipping: {
        address: '123 Rue de la Paix, 75001 Paris, France',
        method: 'Standard'
      }
    },
    {
      id: 'YB-2024002',
      customer: {
        name: 'Sophie Martin',
        email: 'sophie.martin@email.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      date: '2024-12-15',
      status: 'Livrée',
      total: 125.99,
      items: [
        { name: 'Golden Hour Palette', quantity: 1, price: 52.99 },
        { name: 'Flawless Foundation', quantity: 1, price: 42.99 }
      ],
      shipping: {
        address: '456 Avenue des Champs, 75008 Paris, France',
        method: 'Express'
      }
    },
    {
      id: 'YB-2024003',
      customer: {
        name: 'Emma Laurent',
        email: 'emma.laurent@email.com',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
      },
      date: '2024-12-14',
      status: 'Expédiée',
      total: 67.25,
      items: [
        { name: 'Hydrating Face Mask', quantity: 1, price: 35.99 },
        { name: 'Precision Eyeliner', quantity: 1, price: 18.99 }
      ],
      shipping: {
        address: '789 Boulevard Saint-Germain, 75006 Paris, France',
        method: 'Standard'
      }
    },
    {
      id: 'YB-2024004',
      customer: {
        name: 'Julie Petit',
        email: 'julie.petit@email.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      date: '2024-12-14',
      status: 'En attente',
      total: 234.80,
      items: [
        { name: 'Luxury Anti-Aging Serum', quantity: 1, price: 89.99 },
        { name: 'Smoky Nights Palette', quantity: 1, price: 48.99 },
        { name: 'Volumizing Mascara', quantity: 2, price: 26.99 }
      ],
      shipping: {
        address: '321 Rue de Rivoli, 75004 Paris, France',
        method: 'Express'
      }
    },
    {
      id: 'YB-2024005',
      customer: {
        name: 'Camille Durand',
        email: 'camille.durand@email.com',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face'
      },
      date: '2024-12-13',
      status: 'Annulée',
      total: 156.75,
      items: [
        { name: 'Radiant Glow Foundation', quantity: 1, price: 38.99 },
        { name: 'Golden Hour Palette', quantity: 1, price: 52.99 }
      ],
      shipping: {
        address: '654 Avenue Montaigne, 75016 Paris, France',
        method: 'Standard'
      }
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'En attente':
        return <Clock className="w-4 h-4" />;
      case 'En cours':
        return <Package className="w-4 h-4" />;
      case 'Expédiée':
        return <Truck className="w-4 h-4" />;
      case 'Livrée':
        return <CheckCircle className="w-4 h-4" />;
      case 'Annulée':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-900 text-yellow-300';
      case 'En cours':
        return 'bg-blue-900 text-blue-300';
      case 'Expédiée':
        return 'bg-purple-900 text-purple-300';
      case 'Livrée':
        return 'bg-green-900 text-green-300';
      case 'Annulée':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
  };

  const statusOptions = ['En attente', 'En cours', 'Expédiée', 'Livrée', 'Annulée'];

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-playfair font-bold text-white mb-2">
              Gestion des <span className="gradient-gold-text">Commandes</span>
            </h1>
            <p className="text-gray-400">
              Gérez et suivez toutes vos commandes ({filteredOrders.length} commandes)
            </p>
          </div>

          {/* Filters */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher par ID, nom client ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="">Tous les statuts</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      className="w-12 h-12 rounded-full border-2 border-yellow-400"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-lg">{order.id}</h3>
                      <p className="text-gray-400">{order.customer.name}</p>
                      <p className="text-gray-500 text-sm">{order.customer.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold text-xl">€{order.total}</div>
                      <div className="text-gray-400 text-sm">{order.date}</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="text-white font-medium mb-3">Articles commandés</h4>
                  <div className="space-y-2">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-center">
                        <span className="text-gray-300">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-yellow-400 font-medium">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="text-white font-medium mb-2">Adresse de livraison</h4>
                  <p className="text-gray-300 text-sm">{order.shipping.address}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Mode de livraison: {order.shipping.method}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>Voir détails</span>
                  </button>
                  
                  {order.status !== 'Livrée' && order.status !== 'Annulée' && (
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition-colors font-medium">
                    <Truck className="w-4 h-4" />
                    <span>Suivi livraison</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucune commande trouvée</p>
              <p className="text-gray-500 text-sm">
                Modifiez vos critères de recherche pour voir plus de résultats
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;