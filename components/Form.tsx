import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import { FormContext,  Ingredient } from '../components/contextobject';
import axios from 'axios';
import { useRouter } from 'next/router';
import Loader from './Loader';


const Form: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mood, setMood] = useState('');
  const { form, addIngredient, removeIngredient } = useContext(FormContext);
  const [newIngredient, setNewIngredient] = useState<Partial<Ingredient>>({
    name: '',
    category: ''
  });
  const categories = ['Baking Ingredients 🍰', 'Fruit 🍎', 'Vegetable 🥕', 'Meat 🍖', 'MeatSub 🍔', 'Dairy 🧀', 'Poultry 🍗', 'Fish 🐟', 'Grain 🌾', 'Herbs & Spice 🌿', 'Condiment 🍯', 'Beverage 🍹', 'Other 🍽️'];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewIngredient({
      ...newIngredient,
      [event.target.name]: event.target.value
    });
  };
  const handleAddIngredient = () => {
    addIngredient({
      id: Date.now().toString(),
      name: newIngredient.name as string,
      category: newIngredient.category as string
    });
    setNewIngredient({ name: '', category: '' });
  };
  const handleRemoveIngredient = (id: string) => {
    console.log('id:', id);
    removeIngredient(id);
  };

  const router = useRouter();
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
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
  <input
    type="text"
    name="name"
    value={newIngredient.name}
    onChange={handleInputChange}
    placeholder="Name"
    className="flex-1 py-2 px-2 md:px-3 border border-gray-400 rounded-lg my-2 sm:my-0"
  />
  <select
    name="category"
    value={newIngredient.category}
    onChange={handleInputChange}
    className="py-2 px-2 md:px-3 border border-gray-400 rounded-lg my-2 sm:my-0"
  >
          <option value="">Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddIngredient}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 my-2 sm:my-0"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center space-x-4 mb-8">
        <select
          name="mood"
          value={mood}
          onChange={(event) => setMood(event.target.value)}
          className="flex-1 py-2 px-3 border border-gray-400 rounded-lg"
        >
          <option value="">Select a mood</option>
          <option value="spicy_and_hearty">🌶️ Spicy and Hearty</option>
          <option value="sweet_and_savory">🍭 Sweet and Savory</option>
          <option value="healthy_and_light">🥗 Healthy and Light</option>
          <option value="quick_and_easy">🏎️ Quick and Easy</option>
          <option value="comfort_food">🍲 Comfort Food</option>
          <option value="fancy">🍾 Fancy</option>
          <option value="kid_friendly">👹 Kid Friendly</option>
          <option value="vegetarian">🥦 Vegetarian</option>
          <option value="vegan">🌱 Vegan</option>
        </select>
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
    {[...new Set(form.map(ingredient => ingredient.category).sort())].map(category => (
      <div key={category} className="bg-white p-4 rounded-lg shadow-md mt-4 md:mt-10 md:w-96 md:px-10">
        <h3 className="text-lg font-bold mb-2">{category}:</h3>
        <ol className="">
          {form
            .filter(ingredient => ingredient.category === category)
            .map((ingredient) => (
              <li className="flex justify-between py-3 px-4 border-b border-gray-100" key={ingredient.id}>
                <span className="text-gray-600 mb-2 text-bold">{ingredient.name}</span>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => handleRemoveIngredient(ingredient.id)}>Remove</button>
              </li>
            ))}
        </ol>
      </div>
    ))}
  </div>
  </div>
  </>
  )
};

export default Form;

