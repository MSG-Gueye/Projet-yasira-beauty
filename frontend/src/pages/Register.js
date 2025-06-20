import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .required('Le nom est requis'),
  email: yup
    .string()
    .email('Adresse email invalide')
    .required('L\'email est requis'),
  password: yup
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Le mot de passe est requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmez votre mot de passe'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'Vous devez accepter les conditions d\'utilisation'),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { register: registerUser, loginWithGoogle, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError('');
    setSuccess(false);
    
    const result = await registerUser(data);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const result = await loginWithGoogle();
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-lg">
                <span className="text-black font-bold text-xl font-playfair">YB</span>
              </div>
              <span className="text-2xl font-playfair font-bold gradient-gold-text">
                YASIRA BEAUTY
              </span>
            </Link>
            
            <h2 className="text-3xl font-playfair font-bold text-white mb-2">
              Créer un compte
            </h2>
            <p className="text-gray-400">
              Rejoignez notre communauté beauté premium
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-900/20 border border-green-500/20 rounded-lg p-4 mb-6 flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-sm">
                Compte créé avec succès ! Redirection en cours...
              </span>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center space-x-2"
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-sm">{error}</span>
            </motion.div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="form-label">
                Nom complet
              </label>
              <div className="relative">
                <input
                  {...register('name')}
                  type="text"
                  className="form-input pl-10"
                  placeholder="Votre nom complet"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="form-label">
                Adresse email
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  className="form-input pl-10"
                  placeholder="votre@email.com"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="form-label">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="form-input pl-10 pr-10"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="form-label">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-input pl-10 pr-10"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start space-x-3">
                <input
                  {...register('acceptTerms')}
                  type="checkbox"
                  className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 mt-1"
                />
                <span className="text-gray-400 text-sm leading-relaxed">
                  J'accepte les{' '}
                  <Link to="/terms" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    conditions d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link to="/privacy" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    politique de confidentialité
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-400 text-sm mt-1">{errors.acceptTerms.message}</p>
              )}
            </div>

            {/* Newsletter */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                />
                <span className="text-gray-400 text-sm">
                  Je souhaite recevoir les actualités et offres spéciales par email
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Création du compte...</span>
                </div>
              ) : success ? (
                'Compte créé ✓'
              ) : (
                'Créer mon compte'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Ou s'inscrire avec</span>
              </div>
            </div>

            {/* Google Register */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading || success}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Déjà un compte ?{' '}
              <Link
                to="/login"
                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;