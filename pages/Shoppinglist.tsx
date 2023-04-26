import React from 'react';
import { FormContextProvider } from '../components/contextobject';
import SideBarTwo from '../components/Sidebar-2';
import { ShoppingListContextProvider } from '../components/ShoppingListContext';

const ShoppingList: React.FC = () => {
  return (
    <div>
      <FormContextProvider>
       <ShoppingListContextProvider>
    <SideBarTwo />
    </ShoppingListContextProvider>
      </FormContextProvider>
    </div>
  );
};

export default ShoppingList;
