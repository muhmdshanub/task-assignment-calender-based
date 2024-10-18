// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}>
          <Typography variant="h6">
            Task Manager
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
