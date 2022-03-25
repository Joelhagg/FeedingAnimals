import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import './App.css';

import { NavComponent } from './components/Nav/NavComponent';
import Main from './components/Main/Main'
import Animal from './components/Animal/Animal';


function App() {
  
  return (
    <>
      <NavComponent></NavComponent>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/animal/:AnimalId' element={<Animal />} />
          </Routes>
    </>
  );
}

export default App;