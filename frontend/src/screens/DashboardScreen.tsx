// src/screens/DashboardScreen.tsx
import React from 'react';
import { Box, Typography, } from '@mui/material';
//import { useNavigate } from 'react-router-dom';

const DashboardScreen: React.FC = () => {
  

  

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexGrow={1} // Allow the content to expand naturally
      padding={3} // Adds some padding
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      
    </Box>
  );
};

export default DashboardScreen;
