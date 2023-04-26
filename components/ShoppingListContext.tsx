// ShoppingListContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ingredient } from './contextobject';

export interface ShoppingListContextValues {
  shoppingList: Ingredient[];
  addItem: (item: Ingredient) => void;
  updateItem: (updatedItem: Ingredient) => void;
  removeItem: (id: string) => void;
  toggleItemSelected: (id: string) => void;
  removeSelectedItemsFromShoppingList: (selectedItems: Set<string>) => void;
}

const ShoppingListContext = createContext<ShoppingListContextValues>({
  shoppingList: [],
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
  toggleItemSelected: () => {},
  removeSelectedItemsFromShoppingList: () => {},
});

interface ShoppingListContextProviderProps {
  children: React.ReactNode;
}

const ShoppingListContextProvider: React.FC<ShoppingListContextProviderProps> = ({
  children,
}) => {
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);

  const addItem = (item: Ingredient) => {
    setShoppingList((prevList) => {
      const newList = [...prevList, item];
      localStorage.setItem('shoppingList', JSON.stringify(newList));
      return newList;
    });
  };

  const updateItem = (updatedItem: Ingredient) => {
    setShoppingList((prevList) => {
      const newList = prevList.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      localStorage.setItem('shoppingList', JSON.stringify(newList));
      return newList;
    });
  };

  const removeItem = (id: string) => {
    setShoppingList((prevList) => {
      const newList = prevList.filter((item) => item.id !== id);
      localStorage.setItem('shoppingList', JSON.stringify(newList));
      return newList;
    });
  };

  const toggleItemSelected = (id: string) => {
    setShoppingList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeSelectedItemsFromShoppingList = (selectedItems: Set<string>) => {
    setShoppingList((prevShoppingList) => {
      const newShoppingList = prevShoppingList.filter(
        (item) => !selectedItems.has(item.id)
      );
      localStorage.setItem('shoppingList', JSON.stringify(newShoppingList));
      return newShoppingList;
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShoppingList(JSON.parse(localStorage.getItem('shoppingList') || '[]'));
    }
  }, []);

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        addItem,
        updateItem,
        removeItem,
        toggleItemSelected,
        removeSelectedItemsFromShoppingList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

const useShoppingListContext = () => useContext(ShoppingListContext);

export { ShoppingListContextProvider, useShoppingListContext };
