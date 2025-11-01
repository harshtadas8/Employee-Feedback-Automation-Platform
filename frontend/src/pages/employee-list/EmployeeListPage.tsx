import { Typography, Box } from '@mui/material';
import EmployeeTable from '../../components/employeeList/EmployeeTable';
import { mockEmployees } from '../../data/mockData';

const EmployeeListPage = () => {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Employee List
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse and search for employees to view their profiles and engagement statistics
        </Typography>
      </Box>
      
      <EmployeeTable employees={mockEmployees} />
    </Box>
  );
};

export default EmployeeListPage; 