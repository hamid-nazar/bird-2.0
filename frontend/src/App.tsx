import React from 'react';
import "./assets/global.css";

import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { Landing } from './pages/Landing';
import { Theme } from './utils/GlobalInterfaces';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';


const theme:Theme = {
  colors: {
    blue: '#1DA1F2',
    black: '#14171a',
    darkGray: '#657786',
    gray: '#AAB8C2',
    lightGray: '#E1E8ED',
    white: '#F5F8FA',
    error: 'red'
  }
}


const GlobalStyle = createGlobalStyle`
  *{
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
  }
`


export function App() {
  return (
     <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path ="/"  element={<Landing />}/>
        <Route path ="/home" element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}


