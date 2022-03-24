import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import './App.css';

import { NavComponent } from './components/Nav/NavComponent';
import About from './components/About/About'
import Main from './components/Main/Main'


function App() {
  
  return (
    <>
      <NavComponent></NavComponent>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/about/:aboutId' element={<About />} />
          </Routes>
    </>
  );
}

export default App;