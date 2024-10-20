import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Tooltip, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import user icon
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../slices/userAuthSlice';
import { useLogoutMutation } from '../slices/apiSlices/authApiSlice';
import ErrorAlertDialog from './ErrorAlertDialog';

const Header: React.FC = () => {
  const userInfo = useSelector((state: any) => state.userAuth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openError, setOpenError] = useState(false);
  const [logout, { isLoading, isError }] = useLogoutMutation(); 
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      
    } catch (error) {
      console.error('Logout failed: ', error);
      setOpenError(true);
    }finally{
      dispatch(userLogout());
      navigate('/');
    }
  };

  const handleCloseErrorDialog = () => {
    setOpenError(false);
  };

  if (!userInfo) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}>
            <Typography variant="h6">Task Manager</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }else{
    return (
      <AppBar position="static">
        <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
          <Link to="/" style={{  color: 'white', textDecoration: 'none' }}>
            <Typography variant="h6">Task Manager</Typography>
          </Link>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userInfo.avatar ? (
                  <Avatar alt={userInfo.name} src={userInfo.avatar} />
                ) : (
                  <Avatar sx={{ bgcolor: 'primary.main' }}> {/* Set background color */}
                    <AccountCircleIcon /> {/* Fallback user icon */}
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              <MenuItem onClick={handleLogout} disabled={isLoading}>
                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        {isError && (
          <ErrorAlertDialog
            open={openError}
            handleClose={handleCloseErrorDialog}
            title={"Failed"}
            message={"There was an error while logging out"}
          />
        )}
      </AppBar>
    );
  }

  
};

export default Header;
