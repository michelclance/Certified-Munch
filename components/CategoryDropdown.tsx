import React from 'react';
import { useSelect } from 'downshift';

interface CategoryDropdownProps {
    selectedItem: string;
    onChange: (item: string) => void;
  }

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedItem,
  onChange,
}) => {
  const categories = [
    'Baking Ingredients 🍰',
    'Fruit 🍎',
    'Vegetable 🥕',
    'Meat 🍖',
    'MeatSub 🍔',
    'Dairy 🧀',
    'Poultry 🍗',
    'Fish 🐟',
    'Grain 🌾',
    'Herbs & Spice 🌿',
    'Condiment 🍯',
    'Beverage 🍹',
    'Other 🍽️',
  ];

  const {
    isOpen,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: categories,
    selectedItem,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) onChange(selectedItem);
    },
  });

  return (
    <div className="relative inline-block text-left">
      <button
        {...getToggleButtonProps()}
        className="p-2 rounded ml-6 border border-gray-300"
      >
        {selectedItem || 'Category'}
      </button>
      <ul
        {...getMenuProps()}
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute mt-1 w-64 bg-white rounded shadow-lg z-[1000]`}
      >
        {isOpen &&
          categories.map((category, index) => (
            <li
              key={index}
              {...getItemProps({ item: category, index })}
              className={`${
                highlightedIndex === index ? 'bg-gray-200' : ''
              } p-2 cursor-pointer`}
            >
              {category}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
