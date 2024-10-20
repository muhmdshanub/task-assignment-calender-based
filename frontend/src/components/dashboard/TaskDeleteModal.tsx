// src/components/dashboard/DeleteTaskModal.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface DeleteTaskModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  taskName:  string;  
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ open, onClose, onDelete, taskName }) => {
  const handleDelete = () => {
    onDelete(); // Call the onDelete function with the task ID
    onClose(); // Close the modal after deletion
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete the task "{taskName}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskModal;
