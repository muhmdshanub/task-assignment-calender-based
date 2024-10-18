// src/screens/DashboardScreen.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you can handle the logout logic, clearing auth tokens, etc.
    console.log('Logging out');
    navigate('/');
  };

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
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default DashboardScreen;
