import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Edit, 
  Trash2, 
  Mail,
  Calendar,
  Shield,
  User,
  Crown
} from 'lucide-react';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b371?w=60&h=60&fit=crop&crop=face',
      role: 'user',
      joinDate: '2024-01-15',
      lastLogin: '2024-12-15',
      totalOrders: 12,
      totalSpent: 567.89,
      status: 'active'
    },
    {
      id: 2,
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      role: 'user',
      joinDate: '2024-02-20',
      lastLogin: '2024-12-14',
      totalOrders: 8,
      totalSpent: 423.56,
      status: 'active'
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@yasira.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      role: 'admin',
      joinDate: '2023-12-01',
      lastLogin: '2024-12-15',
      totalOrders: 0,
      totalSpent: 0,
      status: 'active'
    },
    {
      id: 4,
      name: 'Emma Laurent',
      email: 'emma.laurent@email.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face',
      role: 'user',
      joinDate: '2024-03-10',
      lastLogin: '2024-12-10',
      totalOrders: 15,
      totalSpent: 892.34,
      status: 'active'
    },
    {
      id: 5,
      name: 'Julie Petit',
      email: 'julie.petit@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
      role: 'user',
      joinDate: '2024-04-05',
      lastLogin: '2024-11-28',
      totalOrders: 3,
      totalSpent: 156.78,
      status: 'inactive'
    },
    {
      id: 6,
      name: 'Camille Durand',
      email: 'camille.durand@email.com',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&crop=face',
      role: 'user',
      joinDate: '2024-05-12',
      lastLogin: '2024-12-12',
      totalOrders: 6,
      totalSpent: 298.45,
      status: 'active'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4" />;
      case 'moderator':
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-900 text-red-300';
      case 'moderator':
        return 'bg-blue-900 text-blue-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-900 text-green-300';
      case 'inactive':
        return 'bg-yellow-900 text-yellow-300';
      case 'suspended':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const updateUserRole = (userId, newRole) => {
    console.log(`Updating user ${userId} to role: ${newRole}`);
  };

  const deleteUser = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      console.log(`Deleting user ${userId}`);
    }
  };

  const roleOptions = ['user', 'moderator', 'admin'];

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-white mb-2">
                Gestion des <span className="gradient-gold-text">Utilisateurs</span>
              </h1>
              <p className="text-gray-400">
                Gérez votre communauté de {filteredUsers.length} utilisateurs
              </p>
            </div>
            <button className="btn-primary flex items-center space-x-2 mt-4 md:mt-0">
              <UserPlus className="w-5 h-5" />
              <span>Inviter un utilisateur</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: 'Total Utilisateurs',
                value: users.length.toString(),
                icon: User,
                color: 'text-blue-400',
                bgColor: 'bg-blue-400/10'
              },
              {
                title: 'Utilisateurs Actifs',
                value: users.filter(u => u.status === 'active').length.toString(),
                icon: User,
                color: 'text-green-400',
                bgColor: 'bg-green-400/10'
              },
              {
                title: 'Nouveaux ce mois',
                value: '12',
                icon: UserPlus,
                color: 'text-purple-400',
                bgColor: 'bg-purple-400/10'
              },
              {
                title: 'Administrateurs',
                value: users.filter(u => u.role === 'admin').length.toString(),
                icon: Crown,
                color: 'text-yellow-400',
                bgColor: 'bg-yellow-400/10'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="">Tous les rôles</option>
                  <option value="user">Utilisateur</option>
                  <option value="moderator">Modérateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full border-2 border-yellow-400"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                      <p className="text-gray-400 text-sm flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status === 'active' ? 'Actif' : user.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">Commandes</p>
                    <p className="text-white font-semibold">{user.totalOrders}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">Total dépensé</p>
                    <p className="text-yellow-400 font-semibold">€{user.totalSpent}</p>
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Inscrit le {formatDate(user.joinDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <User className="w-4 h-4" />
                    <span>Dernière connexion: {formatDate(user.lastLogin)}</span>
                  </div>
                </div>

                {/* Actions */}
                {user.role !== 'admin' && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400"
                        >
                          {roleOptions.map(role => (
                            <option key={role} value={role} className="capitalize">
                              {role === 'user' ? 'Utilisateur' : role === 'moderator' ? 'Modérateur' : 'Administrateur'}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg text-sm font-medium transition-colors">
                        Contacter
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Aucun utilisateur trouvé</p>
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

export default AdminUsers;