// src/App.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'; // Assuming you have a Header component
import { Box } from '@mui/material';



const App: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ 
        
        boxSizing: 'border-box', // Ensure padding and border are included in height
        padding: '0rem', // Add padding if needed
        overflow: 'hidden', // Prevent overflow
        height:'100%'
      }}
    >
      {/* Header component */}
      <Header />

      {/* Content area */}
      <Box
        display="flex"
        overflow="hidden" // Prevent content from overflowing outside
        sx={{ 
          boxSizing: 'border-box', // Include padding/border in total height
          padding: '0rem', // Padding for inner content
          height:'100%',
          backgroundColor: '#ffffff',
        }}
      >
        <Outlet /> {/* This will render the matched child routes */}
      </Box>
    </Box>
  );
};

export default App;
