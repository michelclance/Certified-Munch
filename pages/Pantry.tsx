import React from 'react';
import Form from '../components/Form';
import { FormContextProvider } from '../components/contextobject';
import Sidebar from '../components/sidebar';

const Pantry: React.FC = () => {
  return (
    <div>
      <FormContextProvider>
    <Sidebar />
      </FormContextProvider>
    </div>
  );
};

export default Pantry;
