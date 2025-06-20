import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Upload,
  X,
  Save
} from 'lucide-react';
import { allProducts } from '../../data/products';

const schema = yup.object().shape({
  name: yup.string().required('Le nom est requis'),
  brand: yup.string().required('La marque est requise'),
  price: yup.number().required('Le prix est requis').min(0, 'Le prix doit être positif'),
  category: yup.string().required('La catégorie est requise'),
  description: yup.string().required('La description est requise'),
  stock: yup.number().required('Le stock est requis').min(0, 'Le stock doit être positif'),
});

const AdminProducts = () => {
  const [products, setProducts] = useState(allProducts.slice(0, 20)); // Show first 20 for demo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      // Populate form with existing product data
      Object.keys(product).forEach(key => {
        setValue(key, product[key]);
      });
    } else {
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    reset();
  };

  const onSubmit = (data) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...p, ...data } : p
      ));
    } else {
      // Add new product
      const newProduct = {
        ...data,
        id: Date.now(),
        rating: 0,
        reviews: 0,
        image: 'https://images.unsplash.com/photo-1617422275563-4cf1103e7d60',
        inStock: data.stock > 0,
        tags: ['new']
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    closeModal();
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const categories = [...new Set(allProducts.map(p => p.category))];

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-white mb-2">
                Gestion des <span className="gradient-gold-text">Produits</span>
              </h1>
              <p className="text-gray-400">
                Gérez votre catalogue de {products.length} produits
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="btn-primary flex items-center space-x-2 mt-4 md:mt-0"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter un produit</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher des produits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="capitalize">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Produit
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Catégorie
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Prix
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <div className="text-white font-medium">{product.name}</div>
                            <div className="text-gray-400 text-sm">{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-300 capitalize">{product.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-yellow-400 font-semibold">€{product.price}</div>
                        {product.originalPrice && (
                          <div className="text-gray-500 text-sm line-through">
                            €{product.originalPrice}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-white">{product.stock || 0}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          product.inStock
                            ? 'bg-green-900 text-green-300'
                            : 'bg-red-900 text-red-300'
                        }`}>
                          {product.inStock ? 'En stock' : 'Rupture'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-gray-400 hover:text-blue-400 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openModal(product)}
                            className="text-gray-400 hover:text-yellow-400 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">Aucun produit trouvé</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Nom du produit</label>
                    <input {...register('name')} className="form-input" />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Marque</label>
                    <input {...register('brand')} className="form-input" />
                    {errors.brand && (
                      <p className="text-red-400 text-sm mt-1">{errors.brand.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Prix (€)</label>
                    <input {...register('price')} type="number" step="0.01" className="form-input" />
                    {errors.price && (
                      <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Catégorie</label>
                    <select {...register('category')} className="form-input">
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(category => (
                        <option key={category} value={category} className="capitalize">
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Stock</label>
                    <input {...register('stock')} type="number" className="form-input" />
                    {errors.stock && (
                      <p className="text-red-400 text-sm mt-1">{errors.stock.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Prix original (optionnel)</label>
                    <input {...register('originalPrice')} type="number" step="0.01" className="form-input" />
                  </div>
                </div>

                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="form-input resize-none"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="form-label">Image du produit</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      Glissez une image ici ou cliquez pour sélectionner
                    </p>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn-secondary flex-1"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingProduct ? 'Mettre à jour' : 'Ajouter'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;