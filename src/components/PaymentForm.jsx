import React, { useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';

const PaymentForm = ({ total, onPaymentSuccess, onPaymentError }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    zipCode: ''
  });

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      if (formattedValue.length > 5) return;
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) return;
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validateCard = () => {
    const errors = {};
    
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 16) {
      errors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!cardData.expiryDate || cardData.expiryDate.length < 5) {
      errors.expiryDate = 'Please enter a valid expiry date';
    }
    
    if (!cardData.cvv || cardData.cvv.length < 3) {
      errors.cvv = 'Please enter a valid CVV';
    }
    
    if (!cardData.nameOnCard.trim()) {
      errors.nameOnCard = 'Please enter the name on card';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'card') {
      const errors = validateCard();
      if (Object.keys(errors).length > 0) {
        setPaymentStatus({ type: 'error', message: 'Please check your card details' });
        return;
      }
    }

    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        const paymentResult = {
          transactionId: `TXN_${Date.now()}`,
          amount: total,
          method: paymentMethod,
          status: 'completed',
          timestamp: new Date().toISOString()
        };
        
        setPaymentStatus({ type: 'success', message: 'Payment successful!' });
        onPaymentSuccess(paymentResult);
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error) {
      setPaymentStatus({ type: 'error', message: error.message });
      onPaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'unknown';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Lock className="w-5 h-5 text-green-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Secure Payment</h3>
      </div>

      {paymentStatus && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          paymentStatus.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {paymentStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          )}
          <span className={`text-sm ${
            paymentStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {paymentStatus.message}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Method
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                paymentMethod === 'card'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Credit/Debit Card</div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                paymentMethod === 'paypal'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-6 h-6 mx-auto mb-2 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">
                PP
              </div>
              <div className="text-sm font-medium">PayPal</div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('apple')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                paymentMethod === 'apple'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-6 h-6 mx-auto mb-2 bg-black rounded text-white flex items-center justify-center text-xs font-bold">
                🍎
              </div>
              <div className="text-sm font-medium">Apple Pay</div>
            </button>
          </div>
        </div>

        {/* Card Details */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleCardInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <div className="absolute right-3 top-2.5">
                  {getCardType(cardData.cardNumber) === 'visa' && (
                    <span className="text-xs font-bold text-blue-600">VISA</span>
                  )}
                  {getCardType(cardData.cardNumber) === 'mastercard' && (
                    <span className="text-xs font-bold text-red-600">MC</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardData.expiryDate}
                  onChange={handleCardInputChange}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                name="nameOnCard"
                value={cardData.nameOnCard}
                onChange={handleCardInputChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={cardData.zipCode}
                onChange={handleCardInputChange}
                placeholder="12345"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )}

        {/* Other Payment Methods */}
        {paymentMethod === 'paypal' && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              You will be redirected to PayPal to complete your payment securely.
            </p>
          </div>
        )}

        {paymentMethod === 'apple' && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-800">
              Use Touch ID or Face ID to pay with Apple Pay.
            </p>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total</span>
            <span className="text-2xl font-bold text-orange-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || paymentStatus?.type === 'success'}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isProcessing || paymentStatus?.type === 'success'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="loading-spinner mr-2"></div>
              Processing Payment...
            </div>
          ) : paymentStatus?.type === 'success' ? (
            'Payment Completed'
          ) : (
            `Pay $${total.toFixed(2)}`
          )}
        </button>
      </form>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center text-sm text-gray-600">
          <Lock className="w-4 h-4 mr-2" />
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;