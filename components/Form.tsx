import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import { FormContext, Ingredient } from '../components/contextobject';
import axios from 'axios';
import { useRouter } from 'next/router';
import Loader from './Loader';
import { useCombobox, useSelect } from 'downshift';

const ingredientsList = ['Apple', 'Banana', 'Carrot', 'Beef', 'Chicken', 'Eggs', 'Milk', 'Tomato', 'Onion', 'Bread'];
const ingredientCategoryMap = {
  Apple: 'Fruit 🍎',
  Banana: 'Fruit 🍎',
  Carrot: 'Vegetable 🥕',
  Beef: 'Meat 🍖',
  Chicken: 'Poultry 🍗',
  Eggs: 'Poultry 🍗',
  Milk: 'Dairy 🧀',
  Tomato: 'Vegetable 🥕',
  Onion: 'Vegetable 🥕',
  Bread: 'Grain 🌾',
};

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

const moods = [
  { label: '🌶️ Spicy and Hearty', value: 'spicy_and_hearty' },
  { label: '🍭 Sweet and Savory', value: 'sweet_and_savory' },
  { label: '🥗 Healthy and Light', value: 'healthy_and_light' },
  { label: '🏎️ Quick and Easy', value: 'quick_and_easy' },
  { label: '🍲 Comfort Food', value: 'comfort_food' },
  { label: '🍾 Fancy', value: 'fancy' },
  { label: '👹 Kid Friendly', value: 'kid_friendly' },
  { label: '🥦 Vegetarian', value: 'vegetarian' },
  { label: '🌱 Vegan', value: 'vegan' },
  { label: 'who cares', value: 'default'}
];

const Form: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mood, setMood] = useState('');
  const { form, addIngredient, removeIngredient } = useContext(FormContext);
  const [newIngredient, setNewIngredient] = useState<Partial<Ingredient>>({
    name: '',
    category: '',
  });


  // mood dropdown
  const {
    isOpen: isMoodOpen,
    getMenuProps: getMoodMenuProps,
    getToggleButtonProps: getMoodToggleButtonProps,
    getLabelProps: getMoodLabelProps,
    getItemProps: getMoodItemProps,
    selectedItem: selectedMood,
  } = useSelect({
    items: moods,
    onSelectedItemChange: ({ selectedItem }) => {
      setMood(selectedItem ? selectedItem.value : '');
    },
  });
  

//categories dropdown
  const {
    isOpen: isCategoryOpen,
    getMenuProps: getCategoryMenuProps,
    getToggleButtonProps,
    getLabelProps,
    getItemProps: getCategoryItemProps,
    selectedItem: selectedCategory,
  } = useSelect({
    items: categories,
    onSelectedItemChange: ({ selectedItem }) => {
      setNewIngredient((prevState) => ({
        ...prevState,
        category: selectedItem || '',
      }));
    },
  });
  

//ingredients dropdown
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    reset,
  } = useCombobox({
    items: ingredientsList,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue === '' && selectedItem) {
        reset();
      } else {
        setNewIngredient({ ...newIngredient, name: inputValue || '' });
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      // Set category based on selected ingredient
      setNewIngredient((prevState) => ({
        ...prevState,
        category: ingredientCategoryMap[selectedItem] || '',
      }));
    },
  });

  const handleAddIngredient = () => {
    // Split the input value by comma and trim whitespace
    const ingredients = newIngredient.name.split(',').map(item => item.trim());
  
    // Add each ingredient individually
    ingredients.forEach(ingredientName => {
      if (ingredientName) {
        addIngredient({
          id: Date.now().toString(),
          name: ingredientName,
          category: newIngredient.category || ingredientCategoryMap[ingredientName] || '',
        });
      }
    });
  
    // Reset the input field and the newIngredient state
    setNewIngredient({ name: '', category: '' });
    reset();
  };

  const handleRemoveIngredient = (id: string) => {
    console.log('id:', id);
    removeIngredient(id);
  };

  const router = useRouter();
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    const ingredients = form.map((ingredient) => ingredient.name);
    const response = await axios.post('/api/generate-recipe-suggestions', { ingredients, mood });
    router.push({
      pathname: '/',
      query: { recipeSuggestions: response.data },
    });
  };
    

  return (
    <>
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-center mb-6">Your Pantry</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center space-x-4 mb-8">
          <div className="flex-1">
            <input
              {...getInputProps({
                name: 'name',
                placeholder: 'Name',
                className: 'py-2 px-2 md:px-3 border border-gray-400 rounded-lg my-2 sm:my-0',
              })}
            />
            <ul
              {...getMenuProps()}
              className={`absolute bg-white border border-gray-300 rounded-lg w-full mt-1 z-10 ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              {isOpen &&
                ingredientsList
                  .filter((item) => item.toLowerCase().includes(newIngredient.name.toLowerCase()))
                  .map((item, index) => (
                    <li
                      key={item}
                      {...getItemProps({ item, index })}
                      className={`${
                        highlightedIndex === index ? 'bg-blue-200' : ''
                      } px-2 py-1 cursor-pointer`}
                    >
                      {item}
                    </li>
                  ))}
            </ul>
          </div>
          <div className="relative flex-1">
  <label {...getLabelProps()} className="sr-only">
    Category
  </label>
  <button
    {...getToggleButtonProps({
      className: 'py-2 px-2 md:px-3 border border-gray-400 rounded-lg w-full text-left',
    })}
  >
    {selectedCategory || 'Category'}
  </button>
  <ul
    {...getCategoryMenuProps()}
    className={`absolute bg-white border border-gray-300 rounded-lg w-full mt-1 z-10 ${
      isCategoryOpen ? 'block' : 'hidden'
    }`}
  >
    {isCategoryOpen &&
      categories.map((category, index) => (
        <li
          key={category}
          {...getCategoryItemProps({ item: category, index })}
          className={`px-2 py-1 cursor-pointer`}
        >
          {category}
        </li>
      ))}
  </ul>
</div>
          <button
            onClick={handleAddIngredient}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 my-2 sm:my-0"
          >
            Add
          </button>
        </div>
    <div className="flex flex-col sm:flex-row items-center justify-center space-x-4 mb-8">
    <div className="relative flex-1">
  <label {...getMoodLabelProps()} className="sr-only">
    Mood
  </label>
  <button
    {...getMoodToggleButtonProps({
      className: 'py-2 px-2 md:px-3 border border-gray-400 rounded-lg w-full text-left',
    })}
  >
    {selectedMood ? selectedMood.label : 'Select a mood'}
  </button>
  <ul
    {...getMoodMenuProps()}
    className={`absolute bg-white border border-gray-300 rounded-lg w-full mt-1 z-10 ${
      isMoodOpen ? 'block' : 'hidden'
    }`}
  >
    {isMoodOpen &&
      moods.map((mood, index) => (
        <li
          key={mood.value}
          {...getMoodItemProps({ item: mood, index })}
          className={`px-2 py-1 cursor-pointer`}
        >
          {mood.label}
        </li>
      ))}
  </ul>
</div>

      {isLoading ? (
        <Loader />
      ) : (
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 my-2 sm:my-0"
        >
          Generate Recipes
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-6">
      {[...new Set(form.map((ingredient) => ingredient.category).sort())].map((category) => (
        <div key={category} className="bg-white p-4 rounded-lg shadow-md mt-4 md:mt-10 md:w-96 md:px-10">
          <h3 className="text-lg font-bold mb-2">{category}:</h3>
          <ol className="">
            {form
              .filter((ingredient) => ingredient.category === category)
              .map((ingredient) => (
                <li className="flex justify-between py-3 px-4 border-b border-gray-100" key={ingredient.id}>
                  <span className="text-gray-600 mb-2 text-bold">{ingredient.name}</span>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleRemoveIngredient(ingredient.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ol>
        </div>
      ))}
    </div>
  </div>
</>
  );
};

export default Form;


