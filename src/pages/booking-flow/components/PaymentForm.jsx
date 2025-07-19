import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PaymentForm = ({ onNext, onBack, paymentData, setPaymentData, totalAmount }) => {
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { value: 'upi', label: 'UPI Payment', icon: 'Smartphone' },
    { value: 'card', label: 'Credit/Debit Card', icon: 'CreditCard' },
    { value: 'netbanking', label: 'Net Banking', icon: 'Building2' },
    { value: 'wallet', label: 'Digital Wallet', icon: 'Wallet' }
  ];

  const upiApps = [
    { value: 'gpay', label: 'Google Pay' },
    { value: 'phonepe', label: 'PhonePe' },
    { value: 'paytm', label: 'Paytm' },
    { value: 'bhim', label: 'BHIM UPI' },
    { value: 'other', label: 'Other UPI App' }
  ];

  const banks = [
    { value: 'sbi', label: 'State Bank of India' },
    { value: 'hdfc', label: 'HDFC Bank' },
    { value: 'icici', label: 'ICICI Bank' },
    { value: 'axis', label: 'Axis Bank' },
    { value: 'kotak', label: 'Kotak Mahindra Bank' },
    { value: 'other', label: 'Other Banks' }
  ];

  const wallets = [
    { value: 'paytm', label: 'Paytm Wallet' },
    { value: 'mobikwik', label: 'MobiKwik' },
    { value: 'freecharge', label: 'FreeCharge' },
    { value: 'amazonpay', label: 'Amazon Pay' }
  ];

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!paymentData.method) {
      newErrors.method = 'Please select a payment method';
    }

    if (paymentData.method === 'upi') {
      if (!paymentData.upiId?.trim()) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!/^[\w.-]+@[\w.-]+$/.test(paymentData.upiId)) {
        newErrors.upiId = 'Please enter a valid UPI ID';
      }
    }

    if (paymentData.method === 'card') {
      if (!paymentData.cardNumber?.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (!paymentData.expiryDate?.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }

      if (!paymentData.cvv?.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }

      if (!paymentData.cardholderName?.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }
    }

    if (paymentData.method === 'netbanking' && !paymentData.bank) {
      newErrors.bank = 'Please select your bank';
    }

    if (paymentData.method === 'wallet' && !paymentData.walletType) {
      newErrors.walletType = 'Please select a wallet';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        onNext();
      }, 3000);
    }
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ');
    }
    return value;
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="CreditCard" size={20} className="text-primary" />
        <h2 className="text-xl font-semibold text-text-primary">Payment Details</h2>
      </div>

      {/* Amount Summary */}
      <div className="bg-muted p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-text-primary">Total Amount</span>
          <span className="text-2xl font-bold text-primary">{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <label
                key={method.value}
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  paymentData.method === method.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={paymentData.method === method.value}
                  onChange={(e) => handleInputChange('method', e.target.value)}
                  className="sr-only"
                />
                <Icon name={method.icon} size={20} className="text-primary" />
                <span className="font-medium text-text-primary">{method.label}</span>
              </label>
            ))}
          </div>
          {errors.method && <p className="text-error text-sm mt-1">{errors.method}</p>}
        </div>

        {/* UPI Payment Form */}
        {paymentData.method === 'upi' && (
          <div className="space-y-4">
            <Input
              label="UPI ID"
              type="text"
              placeholder="yourname@upi"
              value={paymentData.upiId || ''}
              onChange={(e) => handleInputChange('upiId', e.target.value)}
              error={errors.upiId}
              required
            />
            <Select
              label="UPI App (Optional)"
              options={upiApps}
              value={paymentData.upiApp || ''}
              onChange={(value) => handleInputChange('upiApp', value)}
              placeholder="Select UPI app"
            />
          </div>
        )}

        {/* Card Payment Form */}
        {paymentData.method === 'card' && (
          <div className="space-y-4">
            <Input
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber || ''}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              error={errors.cardNumber}
              maxLength={19}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                type="text"
                placeholder="MM/YY"
                value={paymentData.expiryDate || ''}
                onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                error={errors.expiryDate}
                maxLength={5}
                required
              />
              <Input
                label="CVV"
                type="password"
                placeholder="123"
                value={paymentData.cvv || ''}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                error={errors.cvv}
                maxLength={4}
                required
              />
            </div>
            
            <Input
              label="Cardholder Name"
              type="text"
              placeholder="Name as on card"
              value={paymentData.cardholderName || ''}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              error={errors.cardholderName}
              required
            />
          </div>
        )}

        {/* Net Banking Form */}
        {paymentData.method === 'netbanking' && (
          <Select
            label="Select Your Bank"
            options={banks}
            value={paymentData.bank || ''}
            onChange={(value) => handleInputChange('bank', value)}
            error={errors.bank}
            placeholder="Choose your bank"
            required
          />
        )}

        {/* Wallet Payment Form */}
        {paymentData.method === 'wallet' && (
          <Select
            label="Select Wallet"
            options={wallets}
            value={paymentData.walletType || ''}
            onChange={(value) => handleInputChange('walletType', value)}
            error={errors.walletType}
            placeholder="Choose wallet"
            required
          />
        )}

        {/* Security Information */}
        <div className="bg-success/10 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-success mb-1">Secure Payment</p>
              <p className="text-text-secondary">
                Your payment information is encrypted and secure. We use industry-standard SSL encryption.
              </p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <Checkbox
          label="I authorize the payment and agree to the payment terms"
          checked={paymentData.paymentTermsAccepted || false}
          onChange={(e) => handleInputChange('paymentTermsAccepted', e.target.checked)}
          required
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
            className="sm:w-auto"
          >
            Back to Details
          </Button>
          
          <Button
            type="submit"
            loading={isProcessing}
            iconName={isProcessing ? undefined : "Lock"}
            iconPosition="left"
            className="sm:w-auto"
            disabled={!paymentData.paymentTermsAccepted}
          >
            {isProcessing ? 'Processing Payment...' : `Pay ${formatCurrency(totalAmount)}`}
          </Button>
        </div>
      </form>

      {/* Payment Gateway Logos */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-text-secondary text-center mb-3">Powered by secure payment gateways</p>
        <div className="flex justify-center items-center space-x-4 opacity-60">
          <div className="text-xs font-medium">Razorpay</div>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <div className="text-xs font-medium">Payu</div>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <div className="text-xs font-medium">CCAvenue</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;