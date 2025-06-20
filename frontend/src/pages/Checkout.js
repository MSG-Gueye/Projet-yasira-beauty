import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  CreditCard, 
  Lock, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  CheckCircle
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

const schema = yup.object().shape({
  // Shipping Info
  firstName: yup.string().required('Le prénom est requis'),
  lastName: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  phone: yup.string().required('Le téléphone est requis'),
  address: yup.string().required('L\'adresse est requise'),
  city: yup.string().required('La ville est requise'),
  postalCode: yup.string().required('Le code postal est requis'),
  country: yup.string().required('Le pays est requis'),
  
  // Payment Info
  cardNumber: yup.string().required('Le numéro de carte est requis'),
  expiryDate: yup.string().required('La date d\'expiration est requise'),
  cvv: yup.string().required('Le CVV est requis'),
  cardName: yup.string().required('Le nom sur la carte est requis'),
});

const Checkout = () => {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const { items, total, itemCount, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const shippingCost = total > 50 ? 0 : 5.99;
  const tax = total * 0.20;
  const finalTotal = total + shippingCost + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      country: 'France',
    },
  });

  const handleNextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country']
      : ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate order ID
      const newOrderId = `YB-${Date.now()}`;
      setOrderId(newOrderId);
      
      // Clear cart and mark order as complete
      clearCart();
      setOrderComplete(true);
      setStep(3);
      
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-playfair font-bold text-white mb-4">
              Commande Confirmée !
            </h1>
            
            <p className="text-xl text-gray-400 mb-6">
              Merci pour votre commande. Votre numéro de commande est :
            </p>
            
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
              <span className="text-yellow-400 font-bold text-2xl">{orderId}</span>
            </div>
            
            <p className="text-gray-400 mb-8">
              Un email de confirmation a été envoyé à votre adresse email.
              Vous recevrez un autre email avec les informations de suivi une fois votre commande expédiée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/profile')}
                className="btn-primary"
              >
                Voir mes commandes
              </button>
              <button
                onClick={() => navigate('/products')}
                className="btn-secondary"
              >
                Continuer mes achats
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[
              { number: 1, title: 'Livraison', icon: Truck },
              { number: 2, title: 'Paiement', icon: CreditCard },
              { number: 3, title: 'Confirmation', icon: CheckCircle },
            ].map(({ number, title, icon: Icon }) => (
              <div key={number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= number
                    ? 'bg-yellow-400 border-yellow-400 text-black'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {step > number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= number ? 'text-yellow-400' : 'text-gray-400'
                }`}>
                  {title}
                </span>
                {number < 3 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    step > number ? 'bg-yellow-400' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-900 rounded-2xl border border-gray-800 p-8"
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-2xl font-semibold text-white">Adresse de livraison</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Prénom</label>
                      <div className="relative">
                        <input {...register('firstName')} className="form-input pl-10" />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Nom</label>
                      <input {...register('lastName')} className="form-input" />
                      {errors.lastName && (
                        <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Email</label>
                      <div className="relative">
                        <input {...register('email')} type="email" className="form-input pl-10" />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Téléphone</label>
                      <div className="relative">
                        <input {...register('phone')} className="form-input pl-10" />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="form-label">Adresse</label>
                      <input {...register('address')} className="form-input" />
                      {errors.address && (
                        <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Ville</label>
                      <input {...register('city')} className="form-input" />
                      {errors.city && (
                        <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Code postal</label>
                      <input {...register('postalCode')} className="form-input" />
                      {errors.postalCode && (
                        <p className="text-red-400 text-sm mt-1">{errors.postalCode.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="form-label">Pays</label>
                      <select {...register('country')} className="form-input">
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Canada">Canada</option>
                      </select>
                      {errors.country && (
                        <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary mt-8 w-full"
                  >
                    Continuer vers le paiement
                  </button>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-900 rounded-2xl border border-gray-800 p-8"
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <Lock className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-2xl font-semibold text-white">Informations de paiement</h2>
                  </div>

                  {/* Payment Methods */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                      { id: 'card', name: 'Carte bancaire', icon: CreditCard },
                      { id: 'paypal', name: 'PayPal', icon: () => <span className="text-blue-500">PP</span> },
                      { id: 'apple', name: 'Apple Pay', icon: () => <span className="text-white">🍎</span> },
                    ].map(({ id, name, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={`p-4 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                          paymentMethod === id
                            ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="form-label">Numéro de carte</label>
                        <input
                          {...register('cardNumber')}
                          placeholder="1234 5678 9012 3456"
                          className="form-input"
                        />
                        {errors.cardNumber && (
                          <p className="text-red-400 text-sm mt-1">{errors.cardNumber.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">Date d'expiration</label>
                          <input
                            {...register('expiryDate')}
                            placeholder="MM/AA"
                            className="form-input"
                          />
                          {errors.expiryDate && (
                            <p className="text-red-400 text-sm mt-1">{errors.expiryDate.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="form-label">CVV</label>
                          <input
                            {...register('cvv')}
                            placeholder="123"
                            className="form-input"
                          />
                          {errors.cvv && (
                            <p className="text-red-400 text-sm mt-1">{errors.cvv.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="form-label">Nom sur la carte</label>
                        <input {...register('cardName')} className="form-input" />
                        {errors.cardName && (
                          <p className="text-red-400 text-sm mt-1">{errors.cardName.message}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Payment Methods Info */}
                  {paymentMethod !== 'card' && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">
                        {paymentMethod === 'paypal' && 'Vous serez redirigé vers PayPal pour finaliser votre paiement.'}
                        {paymentMethod === 'apple' && 'Utilisez Touch ID ou Face ID pour confirmer votre paiement.'}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          <span>Traitement...</span>
                        </div>
                      ) : (
                        `Payer €${finalTotal.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 sticky top-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Résumé de la commande
                </h3>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Qté: {item.quantity}
                        </p>
                      </div>
                      <span className="text-yellow-400 font-semibold">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-800 pt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sous-total</span>
                    <span className="text-white">€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Livraison</span>
                    <span className="text-white">
                      {shippingCost === 0 ? (
                        <span className="text-green-400">Gratuite</span>
                      ) : (
                        `€${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">TVA</span>
                    <span className="text-white">€{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold text-yellow-400">
                        €{finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;