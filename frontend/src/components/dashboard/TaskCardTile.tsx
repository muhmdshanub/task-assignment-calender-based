import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface TaskCardProps {
  taskName: string;
  date: string;
  assignedEmployee: string;
  onEdit: () => void; 
  onDelete: () => void; 
  isManager : boolean;
}

const TaskCardTile: React.FC<TaskCardProps> = ({ taskName, date, assignedEmployee, onEdit, onDelete , isManager}) => {
  return (
    <Card sx={{ margin: '0.2rem 0', padding: '0', backgroundColor:'#d5d9f5' }}>
      <CardContent sx={{position:'relative'}}>
        {/* Task Name */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', margin:0 }}>
          {taskName}
        </Typography>

        {/* Date and Assigned Employee */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', margin: '0', padding:0,  }}>
          <Typography variant="body2" color="textSecondary" sx={{margin:0, marginRight:'0.5rem'}}>
            {date}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{margin:0}}>
            {assignedEmployee}
          </Typography>

        {/* Action Icons */}
        {
          isManager && (
            <Box sx={{ display: 'flex', flexDirection:'column', position:'absolute' , right:0, top:0}}>
            <IconButton onClick={onEdit} size="small" sx={{ marginLeft: '0.5rem' }}>
              <EditIcon fontSize="small" sx={{color:'#000000'}} />
            </IconButton>
            <IconButton onClick={onDelete} size="small" sx={{ marginLeft: '0.5rem' }}>
              <DeleteIcon fontSize="small" sx={{color:'red'}} />
            </IconButton>
          </Box>
          )
        }
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCardTile;
