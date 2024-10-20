// src/screens/DashboardScreen.tsx
import React,{useState, useEffect} from 'react';
import { AppBar, Box, Grid, Paper, Typography , Button} from '@mui/material';
import CustomCalendar from '../components/dashboard/CustomCalendar'
import dayjs from 'dayjs';
import CalendarTable from '../components/dashboard/CalendarTable';
import AddIcon from '@mui/icons-material/Add';
import TaskModal from '../components/dashboard/TaskAddModal';
import TaskList from '../components/dashboard/TaskList';
import TaskEditModal from '../components/dashboard/TaskEditModal';
import DeleteTaskModal from '../components/dashboard/TaskDeleteModal';

const DashboardScreen: React.FC = () => {


  // State for year, month, and day
  const [year, setYear] = useState<number>(dayjs().year()); // Initialize with current year
  const [month, setMonth] = useState<number>(dayjs().month() + 1); // Initialize with current month (0-based index)
  const [day, setDay] = useState<number>(dayjs().date()); // Initialize with current day

  // State for first day of month and calendar rows
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(dayjs(`${year}-${month}-01`).day());
  const [daysInMonth, setDaysInMonth] = useState<number>(dayjs(`${year}-${month}`).daysInMonth());
  const [calendarRows, setCalendarRows] = useState<number[][]>([]);

  const employees = ['shan', 'manu', 'arun', 'thakoor', 'alma','Shan', 'Manu','Arun']

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  //states for edit and task modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const defaultTask = {
    date: '',
    taskName: '',
    assignedEmployee: '',
    _id: '',
  };

  const [selectedTask, setSelectedTask] = useState<typeof defaultTask>(defaultTask);

  
  useEffect(()=>{
    // Calculate the selected date and format it as needed
    const date = dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD');
    setSelectedDate(date);
  },[year, month, day,])
  


  // Recalculate firstDayOfMonth, daysInMonth, and calendarRows when year or month changes
  useEffect(() => {
    const newFirstDayOfMonth = dayjs(`${year}-${month}-01`).day();
    const newDaysInMonth = dayjs(`${year}-${month}`).daysInMonth();

    // Generate calendar rows
    const newCalendarRows = () => {
      const rows: number[][] = [];
      let currentRow: number[] = [];

      // Add empty cells until the first day aligns
      for (let i = 0; i < newFirstDayOfMonth; i++) {
        currentRow.push(0); // 0 represents an empty cell
      }

      // Fill in the days of the month
      Array.from({ length: newDaysInMonth }, (_, index) => index + 1).forEach((day) => {
        if (currentRow.length === 7) {
          rows.push(currentRow);
          currentRow = [];
        }
        currentRow.push(day);
      });

      // Push the last row if it has any days left
      if (currentRow.length > 0) {
        while (currentRow.length < 7) {
          currentRow.push(0); // Fill remaining cells with empty spaces
        }
        rows.push(currentRow);
      }

      return rows;
    };

    // Update states
    setFirstDayOfMonth(newFirstDayOfMonth);
    setDaysInMonth(newDaysInMonth);
    setCalendarRows(newCalendarRows());
  }, [year, month]);

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
      setDay(1); // Reset day to 1
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


  const handleDayClick = (selectedDay: number) => {
    setDay(selectedDay);
  };


  const handleOpenAddModal = () => {
    
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddTaskSubmit = (taskDetails: { date: string; employee: string; taskName: string }) => {
    // Sample submit function
    console.log('Task submitted:', taskDetails);
    // Here, you would typically call an API to save the task
  };

  //functions for editing a task
  const handleOpenEditModal = (taskDetails: { date: string; assignedEmployee: string; taskName: string, _id:string }) => {
    
    setSelectedTask(taskDetails)
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedTask(defaultTask)
  };

  const handleEditTaskSubmit = (taskDetails: { date: string; assignedEmployee: string; taskName: string, _id:string }) => {
    // Sample submit function
    console.log('Task Edited:', taskDetails);
    // Here, you would typically call an API to save the task
  };


  //function for deleting a task

  const handleDeleteModalOpen = (taskDetails: { date: string; assignedEmployee: string; taskName: string, _id:string }) => {
    
    setSelectedTask(taskDetails)
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTask(defaultTask)
  };

  const handleDeleteTask = () => {
    // Sample submit function
    console.log('Task Deleted:', selectedTask.taskName, selectedTask._id);
    // Here, you would typically call an API to save the task
  };


  const sampleTasks = [
    { taskName: 'Prepare Report', date: '2024-10-01', assignedEmployee: 'Shan' },
    { taskName: 'Update Website', date: '2024-10-02', assignedEmployee: 'Manu' },
    { taskName: 'Design Mockups', date: '2024-10-03', assignedEmployee: 'Arun' },
    { taskName: 'Prepare Report', date: '2024-10-01', assignedEmployee: 'Shan' },
    { taskName: 'Update Website', date: '2024-10-02', assignedEmployee: 'Manu' },
    { taskName: 'Design Mockups', date: '2024-10-03', assignedEmployee: 'Arun' },
  ];

  
  return (

    <>
    <Box 
      display="flex" 
      flexDirection="column" 
      overflow="hidden" // Prevent content from overflowing outside
      style={{padding:'0.2rem',height:'100%', width:'100%'}}
    >
      {/* AppBar at the top */}
      {/* <AppBar position="static" sx={{ height: '30px', backgroundColor: 'white', border: '1px solid black', marginBottom:'0.2rem' }}>
        <Typography variant="h6" sx={{ color: 'black', padding: '0px',  }}>
          Dashboard
        </Typography>
      </AppBar> */}

      {/* Main Content Area */}
      <Box display="flex"  overflow="hidden" sx={{height:'100%', width:'100%'}}> {/* Use flexGrow to fill remaining height */}
        <Grid container spacing={1}  sx={{  padding:'0', height:'100%' }}>
          {/* First Rectangle (2/12 width) */}
          <Grid item md={3} >
            <Paper
              elevation={1}
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height:'100%',
                boxSizing: 'border-box', 
                padding: 0, 
                backgroundColor: '#ffffff', 
                border: '0px solid black' ,
               
              }}
            >
             
              {/* Content for Rectangle 1 */}
              <CustomCalendar 
                  year={year}
                  month={month}
                  day={day}
                  onDateChange={handleDateChange}
              />

            </Paper>
          </Grid>

          {/* Center Rectangle (8/12 width) */}
          <Grid item xs={8} md={6} sx={{height:'100%', width:'100%'}}>
            <Paper
              elevation={1}
              sx={{ 
                display: 'flex', 
                height:'100%',
                boxSizing: 'border-box', 
                padding: '0rem',
                paddingBottom:'0', 
                backgroundColor: '#ffffff', 
                border: '1px solid black' 
              }}
            >
              {/* Content for Center Rectangle */}
              <CalendarTable year={year} month={month} day={day}
               calendarRows={calendarRows} onDayClick={handleDayClick} 
               handleOpenAddModal={handleOpenAddModal}
               />
              
            </Paper>
          </Grid>

          {/* Third Rectangle (2/12 width) */}
          <Grid item xs={2} md={3} sx={{height:'100%', width:'100%'}}>
            <Paper
              elevation={1}
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                maxHeight: '100%', 
                boxSizing: 'border-box', 
                padding: 0, 
                backgroundColor: '#ffffff', 
                border: '1px solid black' 
              }}
            >
              {/* Content for Rectangle 3 */}
              <Typography variant="subtitle1" sx={{display:'flex',width:'100%', backgroundColor:'#bceef7', marginTop:0, justifyContent:'center', justifyItems:'center'}} >
                Tasks
              </Typography>
              
              {/* add task button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
                <Button
                  variant="contained"
                  onClick={handleOpenAddModal}
                  sx={{
                    backgroundColor: '#00bcd4',
                    borderRadius: '50px', // Keep button shape rounded but allow for text
                    padding: '0.5rem 1.5rem', // Adjust padding for the text
                    textTransform: 'none', // Keep the text as it is (no uppercase)
                    '&:hover': {
                      backgroundColor: '#008c9e', // Change color on hover
                    },
                    display: 'flex',
                    alignItems: 'center', // Align text and icon vertically
                  }}
                >
                  <Typography variant="button" sx={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
                    Add Task
                  </Typography>
                  <AddIcon />
                </Button>
              </Box>


              {/* task list */}
              <Box sx={{height:'100%', overflowY:'auto'}}>
                  <TaskList tasks={sampleTasks} onEdit={handleOpenEditModal}  onDelete={handleDeleteModalOpen}/>
              </Box>

            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>

    <TaskModal
      open={addModalOpen}
      selectedDate={selectedDate}
      employees={employees}
      onClose={handleCloseAddModal}
      onSubmit={handleAddTaskSubmit}
    />

    <TaskEditModal
      open={editModalOpen}

      onClose={handleCloseEditModal}
      employees={employees}
      taskDetails={selectedTask}
      onSubmit={handleEditTaskSubmit}
    />

      <DeleteTaskModal
          open={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteTask}
          taskName={selectedTask.taskName}
        />

    </>
  );
};

export default DashboardScreen;
