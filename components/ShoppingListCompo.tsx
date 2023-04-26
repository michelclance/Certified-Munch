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
      <ListNotification
        onClose={() => setShowNotification(false)}
      />
    )}
      <div className="container mx-auto py-10">
        <h1 className="text-4xl mb-6 text-center">Shopping List</h1>
        <div className="bg-white p-6 rounded shadow">
          <ul className="space-y-4">
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
                className="bg-gray-200 p-4 rounded flex justify-between items-center"
              >
                <div className="flex items-center">
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
                    className="border p-2 rounded"
                  />
<CategoryDropdown
  selectedItem={item.category}
    onChange={(selectedCategory: string) =>
    updateItem({ ...item, category: selectedCategory })
  }
/>

                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
   
          <button
            onClick={handleAddItem}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          >
            Add Item
          </button>
          <button
            onClick={handleSendSelectedItemsToForm}
            className="bg-green-500 text-white px-4 mt-4 py-2 rounded"
          >
            Send selected items to Form
          </button>
          <button
            onClick={handleClearSelectedItems}
            className="bg-red-500 text-white mt-4 px-4 py-2 rounded"
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
