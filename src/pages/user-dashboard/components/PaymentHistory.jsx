import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PaymentHistory = () => {
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const paymentHistory = [
    {
      id: 1,
      pgName: "Sunrise PG for Women",
      amount: "₹12,000",
      type: "Monthly Rent",
      date: "2025-01-15",
      status: "Completed",
      method: "UPI",
      transactionId: "TXN123456789",
      receipt: true
    },
    {
      id: 2,
      pgName: "Sunrise PG for Women",
      amount: "₹2,000",
      type: "Security Deposit",
      date: "2025-01-15",
      status: "Completed",
      method: "Net Banking",
      transactionId: "TXN123456790",
      receipt: true
    },
    {
      id: 3,
      pgName: "Metro Boys Hostel",
      amount: "₹8,500",
      type: "Monthly Rent",
      date: "2025-01-01",
      status: "Completed",
      method: "Credit Card",
      transactionId: "TXN123456791",
      receipt: true
    },
    {
      id: 4,
      pgName: "Green Valley PG",
      amount: "₹11,500",
      type: "Monthly Rent",
      date: "2024-12-15",
      status: "Completed",
      method: "UPI",
      transactionId: "TXN123456792",
      receipt: true
    },
    {
      id: 5,
      pgName: "Green Valley PG",
      amount: "₹11,500",
      type: "Monthly Rent",
      date: "2024-11-15",
      status: "Completed",
      method: "Debit Card",
      transactionId: "TXN123456793",
      receipt: true
    },
    {
      id: 6,
      pgName: "City Center Hostel",
      amount: "₹9,000",
      type: "Monthly Rent",
      date: "2024-10-15",
      status: "Failed",
      method: "UPI",
      transactionId: "TXN123456794",
      receipt: false
    }
  ];

  const periodOptions = [
    { value: 'all', label: 'All Time' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-success bg-success/10';
      case 'Failed':
        return 'text-error bg-error/10';
      case 'Pending':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'UPI':
        return 'Smartphone';
      case 'Credit Card': case'Debit Card':
        return 'CreditCard';
      case 'Net Banking':
        return 'Building2';
      default:
        return 'Wallet';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const displayedPayments = showAll ? paymentHistory : paymentHistory.slice(0, 5);
  const totalAmount = paymentHistory
    .filter(payment => payment.status === 'Completed')
    .reduce((sum, payment) => sum + parseInt(payment.amount.replace('₹', '').replace(',', '')), 0);

  return (
    <div className="bg-card rounded-lg border border-border elevation-1 p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <Icon name="CreditCard" size={20} className="text-primary" />
          Payment History
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-text-secondary">Total Paid</p>
            <p className="font-bold text-primary">₹{totalAmount.toLocaleString('en-IN')}</p>
          </div>
          <Select
            options={periodOptions}
            value={filterPeriod}
            onChange={setFilterPeriod}
            placeholder="Filter by period"
            className="w-40"
          />
        </div>
      </div>

      {paymentHistory.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CreditCard" size={24} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary mb-4">No payment history found</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {displayedPayments.map((payment) => (
              <div key={payment.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-semibold text-text-primary">{payment.pgName}</h3>
                        <p className="text-sm text-text-secondary">{payment.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-lg">{payment.amount}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-text-secondary">Date</p>
                        <p className="font-medium text-text-primary">{formatDate(payment.date)}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Payment Method</p>
                        <div className="flex items-center gap-1">
                          <Icon name={getPaymentMethodIcon(payment.method)} size={14} />
                          <span className="font-medium text-text-primary">{payment.method}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-text-secondary">Transaction ID</p>
                        <p className="font-medium text-text-primary font-mono text-xs">{payment.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Receipt</p>
                        {payment.receipt ? (
                          <Button variant="ghost" size="xs" iconName="Download" iconPosition="left">
                            Download
                          </Button>
                        ) : (
                          <span className="text-xs text-text-secondary">Not Available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {paymentHistory.length > 5 && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                iconName={showAll ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {showAll ? "Show Less" : `Show All ${paymentHistory.length} Transactions`}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;