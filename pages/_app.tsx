import { UserProvider } from '@auth0/nextjs-auth0/client';
import { RecipeProvider } from '../components/RecipeProvider';
import { FormContextProvider } from '../components/contextobject';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';


export default function App({ Component, pageProps }: AppProps) {
  return ( 
    
      <FormContextProvider>
        <RecipeProvider>
        <UserProvider>
      <Component {...pageProps} />
      </UserProvider>
        </RecipeProvider>
      </FormContextProvider>
  );
};