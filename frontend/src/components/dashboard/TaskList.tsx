import React from 'react';
import { Box } from '@mui/material';
import TaskCard from './TaskCardTile'; // Import the TaskCard component

interface TaskListProps {
  tasks: { taskName: string; date: string; assignedEmployee: string }[];
  onEdit: (taskDetails: any) => void; // Update type to accept task details
  onDelete: (taskDetails: any) => void; // Update type to accept task details
  isManager: boolean,
}

const TaskList: React.FC<TaskListProps> = ({ tasks , onEdit, onDelete, isManager}) => {
  return (
    <Box
      sx={{
        margin: 0,
        padding: '0.5rem',
        width: '100%',
        overflowY: 'auto', // Enable vertical overflow for scrolling


      }}
    >
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            taskName={task.taskName}
            date={task.date}
            assignedEmployee={task.assignedEmployee}
            onEdit={() => onEdit({ ...task, _id: index.toString() })} // Pass the task details to onEdit
            onDelete={() => onDelete({ ...task, _id: index.toString() })} // Pass the task details to onDelete
            isManager={isManager}
          />
        ))}
    </Box>
  );
};

export default TaskList;
