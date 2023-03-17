import React, { ReactNode, useState } from "react";

interface RecipeProviderProps {
  children: ReactNode;
}

interface RecipeContextProps {
  savedRecipes: string[]; // Define the savedRecipes state
  saveRecipe: (recipe: string) => void; // Define the saveRecipe method
  removeRecipe: (recipe: string) => void;
}

const RecipeContext = React.createContext<RecipeContextProps>({
  savedRecipes: [],
  saveRecipe: () => { },
  removeRecipe: function (recipe: string): void {
    throw new Error("Function not implemented.");
  }
});

const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState<string[]>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
      return savedRecipes;
    } else {
      return [];
    }
  });

  const saveRecipe = (recipe: string) => {
    const updatedRecipes = [...savedRecipes, recipe];
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
    setSavedRecipes(updatedRecipes);
  };

  const recipeContext = {
    savedRecipes,
    saveRecipe,
    removeRecipe: function (recipe: string): void {
      const updatedRecipes = savedRecipes.filter((r) => r !== recipe);
      localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
      setSavedRecipes(updatedRecipes);
    }
  
  };

  return (
    <RecipeContext.Provider value={recipeContext}>
      {children}
    </RecipeContext.Provider>
  );
};


export { RecipeProvider, RecipeContext };
