import React, { useContext, useState } from "react";
import { RecipeContext } from "../components/RecipeProvider";
import ConfirmationDialog from "./Confirmation";

const RecipeSave: React.FC = () => {
  const { savedRecipes, removeRecipe } = useContext(RecipeContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [recipeToRemove, setRecipeToRemove] = useState("");

  const handleRemoveRecipe = (recipe: string) => {
    setRecipeToRemove(recipe);
    setShowConfirmation(true);
  };
  

  const confirmRemoveRecipe = () => {
    removeRecipe(recipeToRemove);
    setShowConfirmation(false);
  };

  const cancelRemoveRecipe = () => {
    setShowConfirmation(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = savedRecipes.filter((recipe) =>
    recipe.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg mb-4 w-full"
          placeholder="Search for a saved recipe"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {filteredRecipes.map((recipe, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-200 relative"
        >
            {recipe.split("\n").map((line, i) => (
              <p key={i} className={`text-gray-600 mb-2 ${i === 0 ? 'font-bold' : ''}`}>
                {line}
              </p>
            ))}
          <button
            onClick={() => handleRemoveRecipe(recipe)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 absolute bottom-1 right-1"
          >
            Remove Recipe
          </button>
          {showConfirmation && recipeToRemove === recipe && (
            <ConfirmationDialog
              confirmRemoveRecipe={confirmRemoveRecipe}
              cancelRemoveRecipe={cancelRemoveRecipe}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeSave;
