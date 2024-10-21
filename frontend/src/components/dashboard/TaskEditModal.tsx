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
import { Task } from '../../types/taskTypes';


interface TaskEditModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (taskDetails: {taskName: string, taskId:string, assignedEmployee: string, date: string}) => void;
  taskDetails: Task;
  employees: Employee[]; // Array of employees for the select field
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({ open, onClose, onSubmit, taskDetails, employees }) => {

  const [dateLocal, setDateLocal] = useState<Dayjs | null>(dayjs(taskDetails.date));
  const [taskNameLocal, setTaskNameLocal] = useState(taskDetails.taskName);
  const [assignedEmployeeLocal, setAssignedEmployeeLocal] = useState(taskDetails.assignedEmployee._id);

 

  useEffect(() => {
    // Reset the fields when the modal opens
    if (open) {
      setDateLocal(dayjs(taskDetails.date));
      setTaskNameLocal(taskDetails.taskName);
      setAssignedEmployeeLocal(taskDetails.assignedEmployee._id);
    }
  }, [open, taskDetails]);

  const handleSubmit = () => {

    if(!dateLocal || taskNameLocal.trim().length < 1 || assignedEmployeeLocal.trim().length < 1){
      return;
    }

    const formattedDate = dateLocal?.format('YYYY-MM-DD') || '';
    onSubmit({ date: formattedDate, taskName : taskNameLocal, assignedEmployee : assignedEmployeeLocal, taskId: taskDetails._id });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent sx={{padding:'1rem'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Date"
            value={dateLocal}
            onChange={(newValue) => setDateLocal(newValue)}
            format="YYYY-MM-DD"
            fullWidth
            sx={{mb:'0.5rem'}}
          />
        </LocalizationProvider>
        <TextField
          label="Task Name"
          value={taskNameLocal}
          onChange={(e) => setTaskNameLocal(e.target.value)}
          fullWidth
          sx={{mb:'0.5rem'}}
        />
        <Select
          label="Assigned Employee"
          value={assignedEmployeeLocal}
          defaultValue={assignedEmployeeLocal}
          onChange={(e) => setAssignedEmployeeLocal(e.target.value as string)}
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
