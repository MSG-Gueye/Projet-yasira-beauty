import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Heart, 
  Settings,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const schema = yup.object().shape({
  name: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  phone: yup.string(),
  address: yup.string(),
  city: yup.string(),
  postalCode: yup.string(),
  country: yup.string(),
});

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateProfile, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      postalCode: user?.postalCode || '',
      country: user?.country || 'France',
    },
  });

  const onSubmit = async (data) => {
    const result = await updateProfile(data);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    reset();
    setIsEditing(false);
  };

  // Mock order data
  const mockOrders = [
    {
      id: 'YB-2024001',
      date: '2024-12-15',
      status: 'Livrée',
      total: 125.99,
      items: 3,
    },
    {
      id: 'YB-2024002',
      date: '2024-12-10',
      status: 'En cours',
      total: 89.50,
      items: 2,
    },
    {
      id: 'YB-2024003',
      date: '2024-12-05',
      status: 'Expédiée',
      total: 234.25,
      items: 5,
    },
  ];

  const tabs = [
    { id: 'profile', name: 'Mon Profil', icon: User },
    { id: 'orders', name: 'Mes Commandes', icon: Package },
    { id: 'wishlist', name: 'Favoris', icon: Heart },
    { id: 'settings', name: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-playfair font-bold text-white mb-2">
              Mon <span className="gradient-gold-text">Profil</span>
            </h1>
            <p className="text-gray-400">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                {/* User Info */}
                <div className="text-center mb-6">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                    alt={user?.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-yellow-400"
                  />
                  <h3 className="text-white font-semibold text-lg">{user?.name}</h3>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                  {user?.role === 'admin' && (
                    <span className="inline-block bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-medium mt-2">
                      Administrateur
                    </span>
                  )}
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {tabs.map(({ id, name, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        activeTab === id
                          ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-white">
                        Informations personnelles
                      </h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Modifier</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                            <span>Annuler</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="form-label">Nom complet</label>
                          <div className="relative">
                            <input
                              {...register('name')}
                              disabled={!isEditing}
                              className="form-input pl-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          </div>
                          {errors.name && (
                            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="form-label">Email</label>
                          <div className="relative">
                            <input
                              {...register('email')}
                              disabled={!isEditing}
                              className="form-input pl-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          </div>
                          {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="form-label">Téléphone</label>
                          <div className="relative">
                            <input
                              {...register('phone')}
                              disabled={!isEditing}
                              className="form-input pl-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          </div>
                        </div>

                        <div>
                          <label className="form-label">Pays</label>
                          <select
                            {...register('country')}
                            disabled={!isEditing}
                            className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="France">France</option>
                            <option value="Belgique">Belgique</option>
                            <option value="Suisse">Suisse</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="form-label">Adresse</label>
                          <div className="relative">
                            <input
                              {...register('address')}
                              disabled={!isEditing}
                              className="form-input pl-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          </div>
                        </div>

                        <div>
                          <label className="form-label">Ville</label>
                          <input
                            {...register('city')}
                            disabled={!isEditing}
                            className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="form-label">Code postal</label>
                          <input
                            {...register('postalCode')}
                            disabled={!isEditing}
                            className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                          >
                            <Save className="w-4 h-4" />
                            <span>{isLoading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
                          </button>
                        </div>
                      )}
                    </form>
                  </motion.div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                      Historique des commandes
                    </h2>

                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-2">
                                <h3 className="text-white font-semibold">
                                  Commande {order.id}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  order.status === 'Livrée'
                                    ? 'bg-green-900 text-green-300'
                                    : order.status === 'En cours'
                                    ? 'bg-yellow-900 text-yellow-300'
                                    : 'bg-blue-900 text-blue-300'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <div className="text-gray-400 text-sm">
                                <p>Date: {order.date}</p>
                                <p>{order.items} article{order.items > 1 ? 's' : ''}</p>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0 text-right">
                              <div className="text-yellow-400 font-bold text-lg">
                                €{order.total}
                              </div>
                              <button className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors mt-1">
                                Voir détails →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                      Mes Favoris
                    </h2>
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">
                        Vous n'avez pas encore de produits favoris
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        Parcourez notre catalogue et ajoutez vos produits préférés
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                      Paramètres du compte
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-white font-semibold mb-4">Notifications</h3>
                        <div className="space-y-4">
                          {[
                            { id: 'newsletter', label: 'Newsletter et offres spéciales', checked: true },
                            { id: 'orders', label: 'Mises à jour de commandes', checked: true },
                            { id: 'products', label: 'Nouvelles arrivées de produits', checked: false },
                            { id: 'tips', label: 'Conseils beauté et tutoriels', checked: true },
                          ].map(({ id, label, checked }) => (
                            <label key={id} className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                defaultChecked={checked}
                                className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                              />
                              <span className="text-gray-300">{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-white font-semibold mb-4">Confidentialité</h3>
                        <div className="space-y-4">
                          <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                            Télécharger mes données personnelles
                          </button>
                          <br />
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            Supprimer mon compte
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;