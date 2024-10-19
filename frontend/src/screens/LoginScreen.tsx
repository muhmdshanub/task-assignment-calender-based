import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { useLoginMutation } from '../slices/apiSlices/authApiSlice';
import { setUserCredentials } from '../slices/userAuthSlice';
import ErrorAlertDialog from '../components/ErrorAlertDialog';
import LoadingModal from '../components/LoadingModal';
import { ErrorApiResponse } from '../types/apiResponses'; // Import the ErrorApiResponse type

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailWarn, setEmailWarn] = useState(false);
  const [passwordWarn, setPasswordWarn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch userInfo from Redux state
  const { userInfo } = useSelector((state: any) => state.userAuth);

  const [login, { isLoading, isSuccess, data }] = useLoginMutation();

  useEffect(() => {
    // Check if userInfo is already present in Redux (i.e., user is logged in)
    if (userInfo) {
      navigate('/dashboard');
    }

    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess, userInfo, navigate]); // Add userInfo and navigate as dependencies

  // State for error dialog
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorDialogTitle, setErrorDialogTitle] = useState('');
  const [errorDialogMessage, setErrorDialogMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length < 100;
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && password.length <= 50;
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailWarn(true);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordWarn(true);
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setUserCredentials(response));
      setEmail(''); // Clear fields
      setPassword('');
      navigate('/dashboard');
    } catch (error: any) {
      const apiError = error as ErrorApiResponse; // Cast error to ErrorApiResponse
      setErrorDialogOpen(true);
      setErrorDialogTitle('Login Error');
      setErrorDialogMessage(`An error occurred during logging in: ${apiError.message}`);
      console.error(error); // Use console.error for logging errors
    }
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
    setErrorDialogTitle('');
    setErrorDialogMessage('');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ width: '300px' }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => {
            const emailValue = e.target.value;
            setEmail(emailValue);
            setEmailWarn(false);
            if (!validateEmail(emailValue)) {
              setEmailWarn(true);
            }
          }}
          error={emailWarn}
          helperText={emailWarn ? 'Please enter a valid email address' : ''}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => {
            const passwordValue = e.target.value;
            setPassword(passwordValue);
            setPasswordWarn(false);
            if (!validatePassword(passwordValue)) {
              setPasswordWarn(true);
            }
          }}
          error={passwordWarn}
          helperText={passwordWarn ? 'Password must be at least 8 characters long.' : ''}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>

      {errorDialogOpen && (
        <ErrorAlertDialog
          open={errorDialogOpen}
          handleClose={handleCloseErrorDialog}
          title={errorDialogTitle}
          message={errorDialogMessage}
        />
      )}

      {isLoading && <LoadingModal open={true} />}
    </Box>
  );
};

export default LoginScreen;
