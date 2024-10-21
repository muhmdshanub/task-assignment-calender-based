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
import { Employee } from '../../types/employeeUserData';



interface TaskModalProps {
  open: boolean;
  selectedDate: string;
  employees: Employee[];
  onClose: () => void;
  onSubmit: (taskDetails: { date: string; assignedEmployee: string; taskName: string }) => void;
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
    if(selectedDate.trim().length < 1 || taskName.trim.length < 1 || selectedEmployee.trim().length < 1){
      return;
    }
    onSubmit({ date: selectedDate, assignedEmployee: selectedEmployee, taskName });
    setSelectedEmployee('')
    setTaskName('')
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
              <MenuItem key={employee._id} value={employee._id}>
                {`${employee.name}${employee.manager ? "":" (Me) "}`}
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
