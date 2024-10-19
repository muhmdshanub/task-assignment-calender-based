import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ErrorAlertDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  message: string;
}

const ErrorAlertDialog: React.FC<ErrorAlertDialogProps> = ({ open, handleClose, title, message }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" color="secondary">{title}</DialogTitle>
    <DialogContent>
      <div id="alert-dialog-description" style={{ color: 'secondary' }}>{message}</div>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary" autoFocus>
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default ErrorAlertDialog;
