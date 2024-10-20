// src/components/dashboard/TaskEditModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs, { Dayjs } from 'dayjs';

import { Employee } from '../../types/employeeUserData';


interface TaskEditModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (taskDetails: { date: string; taskName: string; assignedEmployee: string; _id: string }) => void;
  taskDetails: { date: string; taskName: string; assignedEmployee: string; _id: string };
  employees: Employee[]; // Array of employees for the select field
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({ open, onClose, onSubmit, taskDetails, employees }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs(taskDetails.date));
  const [taskName, setTaskName] = useState(taskDetails.taskName);
  const [assignedEmployee, setAssignedEmployee] = useState(taskDetails.assignedEmployee);

  useEffect(() => {
    // Reset the fields when the modal opens
    if (open) {
      setDate(dayjs(taskDetails.date));
      setTaskName(taskDetails.taskName);
      setAssignedEmployee(taskDetails.assignedEmployee);
    }
  }, [open, taskDetails]);

  const handleSubmit = () => {
    const formattedDate = date?.format('YYYY-MM-DD') || '';
    onSubmit({ date: formattedDate, taskName, assignedEmployee, _id: taskDetails._id });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent sx={{padding:'1rem'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            format="YYYY-MM-DD"
            fullWidth
            sx={{mb:'0.5rem'}}
          />
        </LocalizationProvider>
        <TextField
          label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          sx={{mb:'0.5rem'}}
        />
        <Select
          label="Assigned Employee"
          value={assignedEmployee}
          defaultValue={assignedEmployee}
          onChange={(e) => setAssignedEmployee(e.target.value as string)}
          fullWidth
          sx={{mb:'0.5rem'}}
        >
          {employees.map((employee) => (
            <MenuItem key={employee._id}  value={employee._id}>
              {`${employee.name}${employee.manager ? "":" (Me) "}`}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskEditModal;
