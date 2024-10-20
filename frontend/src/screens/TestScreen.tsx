import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { Box, Typography, TextField, Grid } from '@mui/material';

const CustomCalendar: React.FC = () => {
  const [year, setYear] = useState<number>(dayjs().year()); // Initialize with current year
  const [month, setMonth] = useState<number>(dayjs().month() + 1); // Initialize with current month (0-based index)
  const [day, setDay] = useState<number>(dayjs().date()); // Initialize with current day

  // Create a Dayjs object from the year, month, and day states
  const dateValue = dayjs(`${year}-${month}-${day}`);

  // Update year, month, and day when the calendar value changes
  const handleDateChange = (newValue: any) => {
    setYear(newValue.year());
    setMonth(newValue.month() + 1); // Month is 0-based in Dayjs
    setDay(newValue.date());
  };

  // Handle input changes for year, month, and day
  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value, 10);
    if (!isNaN(newYear)) {
      setYear(newYear);
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    if (!isNaN(newMonth) && newMonth >= 1 && newMonth <= 12) {
      setMonth(newMonth);
      setDay(1);
    }
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDay = parseInt(event.target.value, 10);
    if (!isNaN(newDay) && newDay >= 1 && newDay <= dayjs(`${year}-${month}`).daysInMonth()) {
      setDay(newDay);
    } else {
      setDay(1);
    }
  };

  // Generate days of the month
  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = dayjs(`${year}-${month}`).daysInMonth();
    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  };

  // Get days for the selected month and year
  const daysInSelectedMonth = getDaysInMonth(year, month);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 1,
        height: '100vh', // Allow height to adjust based on content
        boxSizing: 'border-box', // Include padding/border in width/height
        overflowY: 'auto',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={dateValue} // Pass the Dayjs object to the calendar
          onChange={handleDateChange} // Control the selected date
          views={['year', 'month', 'day']} // Allow selecting year, month, and day
          showDaysOutsideCurrentMonth // Show days outside the current month
          fixedWeekNumber={6} // Ensure the calendar always has 6 weeks
          sx={{
            width: '100%', // Full width to fit container
            height: '100%', // Full height to fit container
          }}
        />
      </LocalizationProvider>

      {/* Input fields for year, month, and day */}
      <Box sx={{ marginTop: '1rem' }}>
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={handleYearChange}
          sx={{ marginRight: '1rem' }}
        />
        <TextField
          label="Month"
          type="number"
          value={month}
          onChange={handleMonthChange}
          sx={{ marginRight: '1rem' }}
        />
        <TextField
          label="Day"
          type="number"
          value={day}
          onChange={handleDayChange}
        />
      </Box>

      {/* Display the selected year, month, and day */}
      <Typography variant="h6" sx={{ marginTop: '1rem' }}>
        Selected Date: {dateValue.format('YYYY-MM-DD')} {/* Display formatted date */}
      </Typography>

      {/* Days of the month table */}
      <Box sx={{ marginTop: '1rem' }}>
        <Typography variant="h6">Days in {dayjs(`${year}-${month}`).format('MMMM YYYY')}:</Typography>
        <Grid container spacing={1}>
          {daysInSelectedMonth.map((day) => (
            <Grid item xs={1} key={day}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '40px', // Fixed height for each day box
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#f5f5f5',
                }}
              >
                {day}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CustomCalendar;
