import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../components/RecipeProvider";
import Notification from "./Notification";

interface RecipeSuggestionsProps {
  recipeSuggestions?: string | string[];
  mood?: string;
}

const RecipeSuggestions: React.FC<RecipeSuggestionsProps> = ({ recipeSuggestions, mood }) => {
  const { savedRecipes, saveRecipe } = useContext(RecipeContext);
  const [showNotification, setShowNotification] = useState(false);

  const [localRecipeSuggestions, setLocalRecipeSuggestions] = useState<string[]>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedRecipeSuggestions = JSON.parse(localStorage.getItem("recipeSuggestions") || "[]");
      return storedRecipeSuggestions;
    }
    return [];
  });

  useEffect(() => {
    if (recipeSuggestions) {
      if (Array.isArray(recipeSuggestions)) {
        setLocalRecipeSuggestions(recipeSuggestions);
      } else {
        setLocalRecipeSuggestions([recipeSuggestions]);
      }
    }
  }, [recipeSuggestions]);

  useEffect(() => {
    if (localRecipeSuggestions.length > 0) {
      localStorage.setItem("recipeSuggestions", JSON.stringify(localRecipeSuggestions));
    }
  }, [localRecipeSuggestions]);

  let paragraphs: string[] = [];

  if (localRecipeSuggestions.length > 0) {
    paragraphs = localRecipeSuggestions.flatMap((s) => s.split("\n\n"));
  } else if (Array.isArray(recipeSuggestions)) {
    paragraphs = recipeSuggestions.flatMap((s) => s.split("\n\n"));
  } else {
    paragraphs = recipeSuggestions?.split("\n\n") || [];
  }

  const handleSaveRecipe = (recipe: string) => {
    saveRecipe(recipe);
    setShowNotification(true);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {!localRecipeSuggestions.length && !recipeSuggestions ? (
  <>
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-200 relative">
    <p className="text-gray-600 mb-2 font-bold">
      add ingredients to pantry then click generate recipes for suggestions
    </p>
  </div>
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-200 relative">
  <p className="text-gray-600 mb-2 font-bold">
    the ai is small brain, it may give some wonky recipes. just click the button again to get a new ones
    </p>
    </div>
    </>
) : (
  paragraphs.map((paragraph, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-200 relative">
            {mood && <h2 className="text-lg font-bold mb-2">{`${mood} Recipe`}</h2>}
            {paragraph.split("\n").map((line, i) => (
              <p key={i} className={`text-gray-600 mb-2 ${i === 0 ? 'font-bold' : ''}`}>
                {line}
              </p>
            ))}
  
            {savedRecipes.includes(paragraph) ? (
              <button
                disabled
                className="bg-gray-500 text-white font-bold py-2 px-4 mt-4 rounded-lg transition duration-200 absolute bottom-1 right-1"
              >
                Saved
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-lg transition duration-200 absolute bottom-1 right-1"
                onClick={() => handleSaveRecipe(paragraph)}
              >
                Save Recipe
              </button>
            )}
            {showNotification && (
              <Notification onClose={closeNotification} />
            )}
          </div>
        ))
      ) }
    </div>
  );
  
  
};

export default RecipeSuggestions;
