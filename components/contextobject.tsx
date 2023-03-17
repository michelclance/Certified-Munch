import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Ingredient {
  id: string;
  name: string;
  category: string;
}

export interface FormContextValues {
  form: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredientId: string) => void;
}

export const FormContext = createContext({
  form: [] as Array<{ id:string; name: string; category: string }>,
  addIngredient: (ingredient: { id: string; name: string; category: string }) => {},
  removeIngredient: (id: string) => {}
});

interface FormContextProviderProps {
  children: React.ReactNode;
}

const FormContextProvider: React.FC<FormContextProviderProps> = ({ children }) => {
  const [form, setForm] = useState<Array<{ id:string; name: string; category: string }>>([]);

  useEffect(() => {
    setForm(JSON.parse(localStorage.getItem('form') || '[]'));
  }, []);

  const addIngredient = (ingredient: { id: string; name: string; category: string }) => {
    setForm(prevForm => [...prevForm, ingredient]);
    localStorage.setItem('form', JSON.stringify([...form, ingredient]));
  };

  const removeIngredient = (id: string) => {
    setForm(prevForm => {
      const newForm = prevForm.filter(ingredient => ingredient.id !== id);
      localStorage.setItem('form', JSON.stringify(newForm));
      return newForm;
    });
  };
  
  return (
    <FormContext.Provider value={{ form, addIngredient, removeIngredient }}>
      {children}
    </FormContext.Provider>
  );
};

const useFormContext = () => useContext(FormContext);

export { FormContextProvider, useFormContext };

