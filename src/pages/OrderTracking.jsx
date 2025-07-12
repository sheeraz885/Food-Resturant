import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, CheckCircle, Truck, MapPin, Phone, Mail } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

const OrderTracking = () => {
  const location = useLocation();
  const { orders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Get order ID from URL params
  const urlParams = new URLSearchParams(location.search);
  const orderId = urlParams.get('orderId');

  useEffect(() => {
    if (orderId) {
      const order = orders.find(o => o.id === parseInt(orderId));
      if (order) {
        setSelectedOrder(order);
      }
    } else if (orders.length > 0) {
      setSelectedOrder(orders[0]);
    }
  }, [orderId, orders]);

  const getStatusSteps = (status) => {
    const steps = [
      { key: 'pending', label: 'Order Received', icon: CheckCircle },
      { key: 'preparing', label: 'Preparing', icon: Clock },
      { key: 'ready', label: 'Ready for Pickup/Delivery', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle }
    ];

    const statusOrder = ['pending', 'preparing', 'ready', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      isCompleted: index <= currentIndex,
      isActive: index === currentIndex
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedTime = (status) => {
    const estimates = {
      pending: '5-10 minutes',
      preparing: '20-30 minutes',
      ready: '5-10 minutes',
      delivered: 'Completed'
    };
    return estimates[status] || 'Unknown';
  };

  if (!selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h2>
          <p className="text-gray-600">You don't have any orders to track yet.</p>
        </div>
      </div>
    );
  }

  const statusSteps = getStatusSteps(selectedOrder.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Tracking</h1>
          
          {/* Order Selection */}
          {orders.length > 1 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Order
              </label>
              <select
                value={selectedOrder.id}
                onChange={(e) => {
                  const order = orders.find(o => o.id === parseInt(e.target.value));
                  setSelectedOrder(order);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {orders.map(order => (
                  <option key={order.id} value={order.id}>
                    Order #{order.id} - ${order.total.toFixed(2)} - {formatDate(order.orderDate)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Order ID:</span> #{selectedOrder.id}</p>
                <p><span className="font-medium">Order Date:</span> {formatDate(selectedOrder.orderDate)}</p>
                <p><span className="font-medium">Total:</span> ${selectedOrder.total.toFixed(2)}</p>
                <p><span className="font-medium">Delivery Type:</span> {selectedOrder.deliveryType}</p>
                <p><span className="font-medium">Estimated Time:</span> {getEstimatedTime(selectedOrder.status)}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Customer:</span> {selectedOrder.customerName}</p>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-600">{selectedOrder.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Status</h3>
            <div className="relative">
              {statusSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.key} className="flex items-center mb-8 last:mb-0">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      step.isCompleted 
                        ? 'bg-green-500 border-green-500' 
                        : step.isActive 
                        ? 'bg-orange-500 border-orange-500' 
                        : 'bg-gray-200 border-gray-300'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        step.isCompleted || step.isActive ? 'text-white' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className={`font-medium ${
                        step.isCompleted || step.isActive ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </h4>
                      {step.isActive && (
                        <p className="text-sm text-orange-600 mt-1">
                          Currently in progress...
                        </p>
                      )}
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div className={`absolute left-6 w-0.5 h-8 mt-12 ${
                        step.isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`} style={{ top: `${(index * 8) + 3}rem` }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
            <div className="space-y-3">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <span className="text-gray-600 ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-800">Call Us</p>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-800">Email Support</p>
                  <p className="text-sm text-gray-600">support@deliciousbites.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;