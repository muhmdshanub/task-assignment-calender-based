import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent

interface TaskModalProps {
  open: boolean;
  selectedDate: string;
  employees: string[];
  onClose: () => void;
  onSubmit: (taskDetails: { date: string; employee: string; taskName: string }) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, selectedDate, employees, onClose, onSubmit }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [taskName, setTaskName] = useState<string>('');

  // Update the event type to SelectChangeEvent<string>
  const handleEmployeeChange = (event: SelectChangeEvent<string>) => {
    setSelectedEmployee(event.target.value);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ date: selectedDate, employee: selectedEmployee, taskName });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add New Task
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* Selected Date (Fixed Field) */}
        <TextField
          label="Selected Date"
          value={selectedDate}
          InputProps={{ readOnly: true }}
          fullWidth
          margin="dense"
        />

        {/* Employee Selection */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Employee</InputLabel>
          <Select value={selectedEmployee} onChange={handleEmployeeChange}>
            {employees.map((employee, index) => (
              <MenuItem key={index} value={employee}>
                {employee}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Task Input */}
        <TextField
          label="Task Name"
          value={taskName}
          onChange={handleTaskNameChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
