
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { Box, Typography, TextField } from '@mui/material';

// Define types for props
interface CustomCalendarProps {
  year: number;
  month: number;
  day: number;
  onDateChange: (newValue: any) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  year,
  month,
  day,
  onDateChange,
}) => {

  // Create a Dayjs object from the year, month, and day
  const dateValue = dayjs(`${year}-${month}-${day}`);


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto', // Allow height to adjust based on content
        boxSizing: 'border-box', // Include padding/border in width/height
        overflowY:'auto',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={dateValue} // Pass the Dayjs object to the calendar
          onChange={onDateChange} // Control the selected date
          views={['year', 'month', 'day']} // Allow selecting year, month, and day
          showDaysOutsideCurrentMonth // Show days outside the current month
          fixedWeekNumber={6} // Ensure the calendar always has 6 weeks
          sx={{
            width: '100%', // Full width to fit container
            height: '100%', // Full height to fit container
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default CustomCalendar;
