import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Avatar, Box, Chip, Typography, TablePagination, TextField,
  InputAdornment, IconButton, Card, CardContent, TableSortLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import { Employee, VibeZone } from '../../types/employee';

interface EmployeeTableProps {
  employees: Employee[];
}

type SortField = 'name' | 'department' | 'position' | 'lastVibe';
type SortOrder = 'asc' | 'desc';

const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('lastVibe');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  const getVibeColor = (vibe?: VibeZone): string => {
    switch (vibe) {
      case 'Frustrated': return '#ff4d4f';
      case 'Sad': return '#faad14';
      case 'Okay': return '#1890ff';
      case 'Happy': return '#52c41a';
      case 'Excited': return '#722ed1';
      default: return '#d9d9d9';
    }
  };
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  
  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const vibeOrder = { 'Frustrated': 1, 'Sad': 2, 'Okay': 3, 'Happy': 4, 'Excited': 5, undefined: 0 };
    
    if (sortField === 'lastVibe') {
      const vibeA = vibeOrder[a.lastVibe as VibeZone] || 0;
      const vibeB = vibeOrder[b.lastVibe as VibeZone] || 0;
      return sortOrder === 'asc' ? vibeA - vibeB : vibeB - vibeA;
    } else {
      const valueA = a[sortField].toLowerCase();
      const valueB = b[sortField].toLowerCase();
      return sortOrder === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  });
  
  // Paginate employees
  const paginatedEmployees = sortedEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2">
            Employee List
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650 }} aria-label="employee table">
            <TableHead>
              <TableRow>
                <TableCell>Profile</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'name'}
                    direction={sortField === 'name' ? sortOrder : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'department'}
                    direction={sortField === 'department' ? sortOrder : 'asc'}
                    onClick={() => handleSort('department')}
                  >
                    Department
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'position'}
                    direction={sortField === 'position' ? sortOrder : 'asc'}
                    onClick={() => handleSort('position')}
                  >
                    Position
                  </TableSortLabel>
                </TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'lastVibe'}
                    direction={sortField === 'lastVibe' ? sortOrder : 'asc'}
                    onClick={() => handleSort('lastVibe')}
                  >
                    Latest Mood
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedEmployees.map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Avatar src={employee.profileImage} alt={employee.name}>
                      {employee.name.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" fontWeight="medium">
                      {employee.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {employee.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.manager}</TableCell>
                  <TableCell>
                    <Chip
                      label={employee.lastVibe || 'Unknown'}
                      size="small"
                      sx={{
                        backgroundColor: `${getVibeColor(employee.lastVibe)}20`,
                        color: getVibeColor(employee.lastVibe),
                        fontWeight: 'bold',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/employees/${employee.id}`} style={{ textDecoration: 'none' }}>
                      <Chip
                        label="View Details"
                        clickable
                        color="primary"
                        size="small"
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              
              {paginatedEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No employees found matching your search.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeTable; 