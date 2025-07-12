import React, { createContext, useContext, useReducer, useEffect } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        )
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

const initialState = {
  orders: [],
  loading: true
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Mock orders data
    const mockOrders = [
      {
        id: 1,
        customerName: 'John Doe',
        items: [
          { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
          { name: 'Caesar Salad', quantity: 1, price: 8.99 }
        ],
        total: 21.98,
        status: 'preparing',
        orderDate: new Date().toISOString(),
        deliveryType: 'delivery',
        address: '123 Main St, City, State'
      },
      {
        id: 2,
        customerName: 'Jane Smith',
        items: [
          { name: 'Chicken Tikka Masala', quantity: 2, price: 15.99 }
        ],
        total: 31.98,
        status: 'delivered',
        orderDate: new Date(Date.now() - 3600000).toISOString(),
        deliveryType: 'pickup',
        address: 'Pickup at restaurant'
      }
    ];

    setTimeout(() => {
      dispatch({ type: 'SET_ORDERS', payload: mockOrders });
    }, 1000);
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      orderDate: new Date().toISOString(),
      status: 'pending'
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: orderId, status } });
  };

  const value = {
    orders: state.orders,
    loading: state.loading,
    createOrder,
    updateOrderStatus
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};