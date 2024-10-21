

import React,{useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// import AddIcon from '@mui/icons-material/Add';
// import TaskModal from './TaskAddModal';
// import dayjs from 'dayjs';


interface CalendarTableProps {
  year: number;
  month: number;
  day: number;
  calendarRows: number[][];
  onDayClick: (selectedDay: number) => void;
  handleOpenAddModal: () => void;
  isManager: boolean;
  taskCountByMonth:{ [date: string]: number } ;

}

const CalendarTable: React.FC<CalendarTableProps> = ({
  year,
  month,
  day,
  calendarRows,
  onDayClick,
   handleOpenAddModal,
   isManager,
   taskCountByMonth,

}) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];



  return (
    <>
        <TableContainer
      component={Paper}
      sx={{
        display: 'flex',
        flexShrink: 1,
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        maxHeight: '100%',
        maxWidth: '100%',
        height:'100%',
        backgroundColor: '#ffffff',
      }}
    >
      <Table
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* Table Head for Days of the Week */}
        <TableHead>
          <TableRow sx={{padding:'0'}}>
            {daysOfWeek.map((day) => (
              <TableCell key={day} align="center" sx={{padding:'0.2rem'}}>
                <Typography variant="subtitle2">{day}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body for the Calendar Days */}
        <TableBody>
          {calendarRows.map((week, rowIndex) => (
            <TableRow key={rowIndex}>
              {week.map((dayInMonth : number, colIndex) => {
                
                // Create the date string in 'YYYY-MM-DD' format
                const dateString = `${year}-${String(month).padStart(2, '0')}-${String(dayInMonth).padStart(2, '0')}`;
                const taskCount = taskCountByMonth[dateString] || 0; // Get the task count or default to 0
                
                return (
                
                  <TableCell
                    key={colIndex}
                    align="center"
                    onClick={() => dayInMonth !== 0 && onDayClick(dayInMonth)}
                    sx={{
                      cursor: dayInMonth !== 0 ? 'pointer' : 'default',
                      backgroundColor: dayInMonth === day ? '#e0f7fa' : 'inherit', // Highlight current day
                      position: 'relative',
                      boxSizing:'border-box',
                      padding:'0',
                      margin:'0',
                    }}
                  >
                    {dayInMonth !== 0 && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',boxSizing:'border-box', padding:'0', margin:'0',  }}>
                        {/* Top right corner add button */}
                       
                       
                        {
                            isManager && (
                              <Box
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                            }}
                            >
                            <AddCircleOutlineIcon
                              fontSize="small"
                              onClick={() => handleOpenAddModal()}
                              sx={{
                                cursor: 'pointer',
                                color: '#66160b', // Example color, adjust as needed
                              }}
                            />
                            </Box>
                            )
                            
                        }
  
                        {/* Day number */}
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {dayInMonth}
                        </Typography>
  
                        {/* Bottom full-width display button */}
                        <Box sx={{ mb: 0,mt:4, backgroundColor:'#f7eceb', width:'95%'  }}>
                          {
                            taskCount > 0 && (
                              <Typography variant="body2"  >
                              {`(${taskCount})`}
                          </Typography>
                            )
                          }
                        </Box>
                        
                      </Box>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* Task Modal
    <TaskModal
    open={addModalOpen}
    selectedDate={selectedDate}
    employees={employees}
    onClose={handleCloseAddModal}
    onSubmit={handleAddTaskSubmit}
  /> */}
    </>
  );
};

export default CalendarTable;
