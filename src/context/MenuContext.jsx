import React, { createContext, useContext, useReducer, useEffect } from 'react';

const MenuContext = createContext();

const menuReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MENU_ITEMS':
      return {
        ...state,
        menuItems: action.payload,
        loading: false
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'ADD_MENU_ITEM':
      return {
        ...state,
        menuItems: [...state.menuItems, action.payload]
      };
    case 'UPDATE_MENU_ITEM':
      return {
        ...state,
        menuItems: state.menuItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_MENU_ITEM':
      return {
        ...state,
        menuItems: state.menuItems.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};

const initialState = {
  menuItems: [],
  categories: [],
  loading: true
};

export const MenuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  useEffect(() => {
    // Load menu data
    loadMenuData();
  }, []);

  const loadMenuData = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Mock menu data
    const mockMenuItems = [
      {
        id: 1,
        name: 'Margherita Pizza',
        description: 'Fresh tomatoes, mozzarella, basil leaves',
        price: 12.99,
        category: 'Pizza',
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
        isVeg: true,
        isPopular: true,
        cuisine: 'Italian'
      },
      {
        id: 2,
        name: 'Chicken Tikka Masala',
        description: 'Tender chicken in creamy tomato sauce',
        price: 15.99,
        category: 'Main Course',
        image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500',
        isVeg: false,
        isPopular: true,
        cuisine: 'Indian'
      },
      {
        id: 3,
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with parmesan and croutons',
        price: 8.99,
        category: 'Salads',
        image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500',
        isVeg: true,
        isPopular: false,
        cuisine: 'American'
      },
      {
        id: 4,
        name: 'Beef Burger',
        description: 'Juicy beef patty with lettuce, tomato, and cheese',
        price: 13.99,
        category: 'Burgers',
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500',
        isVeg: false,
        isPopular: true,
        cuisine: 'American'
      },
      {
        id: 5,
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with chocolate frosting',
        price: 6.99,
        category: 'Desserts',
        image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
        isVeg: true,
        isPopular: false,
        cuisine: 'International'
      },
      {
        id: 6,
        name: 'Sushi Roll',
        description: 'Fresh salmon and avocado sushi roll',
        price: 11.99,
        category: 'Sushi',
        image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=500',
        isVeg: false,
        isPopular: true,
        cuisine: 'Japanese'
      },
      {
        id: 7,
        name: 'Vegetable Pasta',
        description: 'Fresh vegetables with pasta in garlic sauce',
        price: 10.99,
        category: 'Pasta',
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
        isVeg: true,
        isPopular: false,
        cuisine: 'Italian'
      },
      {
        id: 8,
        name: 'Fish Tacos',
        description: 'Grilled fish with fresh salsa and avocado',
        price: 9.99,
        category: 'Tacos',
        image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=500',
        isVeg: false,
        isPopular: false,
        cuisine: 'Mexican'
      }
    ];

    const mockCategories = [
      'All', 'Pizza', 'Main Course', 'Salads', 'Burgers', 'Desserts', 'Sushi', 'Pasta', 'Tacos'
    ];

    setTimeout(() => {
      dispatch({ type: 'SET_MENU_ITEMS', payload: mockMenuItems });
      dispatch({ type: 'SET_CATEGORIES', payload: mockCategories });
    }, 1000);
  };

  const addMenuItem = (item) => {
    const newItem = { ...item, id: Date.now() };
    dispatch({ type: 'ADD_MENU_ITEM', payload: newItem });
  };

  const updateMenuItem = (item) => {
    dispatch({ type: 'UPDATE_MENU_ITEM', payload: item });
  };

  const deleteMenuItem = (itemId) => {
    dispatch({ type: 'DELETE_MENU_ITEM', payload: itemId });
  };

  const value = {
    menuItems: state.menuItems,
    categories: state.categories,
    loading: state.loading,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};