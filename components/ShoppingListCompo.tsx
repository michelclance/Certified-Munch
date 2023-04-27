import React, { useState } from 'react';
import { useFormContext } from '../components/contextobject';
import { useShoppingListContext } from '../components/ShoppingListContext';
import { Ingredient } from '../components/contextobject';
import CategoryDropdown from '../components/CategoryDropdown';
import ListNotification from '../components/S-List-Notification';


const ShoppingList: React.FC = () => {
  const { shoppingList, addItem, removeItem, updateItem, removeSelectedItemsFromShoppingList } = useShoppingListContext();
  const { addIngredientsFromShoppingList } = useFormContext();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showNotification, setShowNotification] = useState(false);

  const handleSelectAll = () => {
    if (selectedItems.size === shoppingList.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(shoppingList.map(item => item.id)));
    }
  };

  const handleSendSelectedItemsToForm = () => {
    const selectedShoppingList = shoppingList.filter(item => selectedItems.has(item.id));
    addIngredientsFromShoppingList(selectedShoppingList);
    setSelectedItems(new Set());
    removeSelectedItemsFromShoppingList(selectedItems);
    setShowNotification(true);
  };

  const handleClearSelectedItems = () => {
    setSelectedItems(new Set());
    removeSelectedItemsFromShoppingList(selectedItems);
  };

  const handleAddItem = () => {
    const newItem: Ingredient = {
      id: Date.now().toString(),
      name: '',
      category: '',
    };
    addItem(newItem);
    localStorage.setItem('shoppingList', JSON.stringify([...shoppingList, newItem]));
  };
  

  return (
    <div className="min-h-screen">
      {showNotification && (
        <ListNotification onClose={() => setShowNotification(false)} />
      )}
      <div className="container mx-auto px-4 sm:px-0 py-10">
        <h1 className="text-2xl sm:text-4xl mb-6 text-center">Shopping List</h1>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <ul className="space-y-2 sm:space-y-4">
            <li className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.size === shoppingList.length}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <label>Select All</label>
            </li>
            {shoppingList.map((item) => (
              <li
                key={item.id}
                className="bg-gray-200 p-2 sm:p-4 rounded-lg flex justify-between items-center space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => {
                      const newSelectedItems = new Set(selectedItems);
                      if (selectedItems.has(item.id)) {
                        newSelectedItems.delete(item.id);
                      } else {
                        newSelectedItems.add(item.id);
                      }
                      setSelectedItems(newSelectedItems);
                    }}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      updateItem({ ...item, name: e.target.value })
                    }
                    placeholder="Item name"
                    className="border p-1 sm:p-2 rounded w-full sm:w-auto"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <CategoryDropdown
                    selectedItem={item.category}
                    onChange={(selectedCategory: string) =>
                      updateItem({ ...item, category: selectedCategory })
                    }
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 ml-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
            <button
              onClick={handleAddItem}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Add Item
            </button>
            <button
              onClick={handleSendSelectedItemsToForm}
              className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Send selected items to Pantry
            </button>
            <button
              onClick={handleClearSelectedItems}
              className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Clear selected items
            </button>
          </div>
        </div>
      </div>
    </div>
  );  
    };

export default ShoppingList;