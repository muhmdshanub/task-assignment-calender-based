// src/App.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'; // Assuming you have a Header component




const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* This will render the matched child routes */}
    </>
  );
};

export default App;
