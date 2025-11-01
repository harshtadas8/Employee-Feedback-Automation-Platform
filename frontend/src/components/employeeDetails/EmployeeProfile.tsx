import { 
  Card, CardContent, Typography, Avatar, 
  Box, Grid, Divider, Chip, useTheme 
} from '@mui/material';
import { 
  Email as EmailIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Mood as MoodIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { Employee, VibeZone } from '../../types/employee';
import { getVibeColor, getVibeZoneColor } from '../../utils/vibeUtils';

interface EmployeeProfileProps {
  employee: Employee;
}

const EmployeeProfile = ({ employee }: EmployeeProfileProps) => {
  const theme = useTheme();
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const renderVibeChip = () => {
    // If there's a vibeZone property, use that for display
    if (employee.lastVibe) {
      return (
        <Chip
          label={employee.lastVibe}
          size="medium"
          icon={<MoodIcon />}
          sx={{
            backgroundColor: `${getVibeZoneColor(employee.lastVibe)}20`,
            color: getVibeZoneColor(employee.lastVibe),
            fontWeight: 'bold',
            mb: 1
          }}
        />
      );
    }
    
    // Otherwise use the vibeScore if available
    if (employee.vibeScore !== undefined) {
      return (
        <Chip
          label={`Score: ${employee.vibeScore.toFixed(1)}`}
          size="medium"
          icon={<MoodIcon />}
          sx={{
            backgroundColor: `${getVibeColor(employee.vibeScore)}20`,
            color: getVibeColor(employee.vibeScore),
            fontWeight: 'bold',
            mb: 1
          }}
        />
      );
    }
    
    // Fallback for when neither is available
    return (
      <Chip
        label="No Data"
        size="medium"
        icon={<MoodIcon />}
        sx={{
          backgroundColor: `${theme.palette.grey[300]}`,
          color: theme.palette.text.secondary,
          fontWeight: 'bold',
          mb: 1
        }}
      />
    );
  };
  
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Avatar 
            src={employee.avatarUrl || employee.profileImage}
            alt={employee.name}
            sx={{ 
              width: 100, 
              height: 100,
              mr: { xs: 0, sm: 3 },
              mb: { xs: 2, sm: 0 }
            }}
          >
            {!employee.avatarUrl && !employee.profileImage && employee.name.charAt(0)}
          </Avatar>
          
          <Box>
            <Typography variant="h5" gutterBottom>
              {employee.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BusinessIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
              <Typography variant="body1" color="text.secondary">
                {employee.title || employee.position || 'No title'} - {employee.department}
              </Typography>
            </Box>
            
            {employee.manager && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  Reports to: {employee.manager}
                </Typography>
              </Box>
            )}
          </Box>
          
          <Box sx={{ 
            ml: { xs: 0, sm: 'auto' }, 
            mt: { xs: 2, sm: 0 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', sm: 'flex-end' }
          }}>
            {renderVibeChip()}
            <Typography variant="caption" color="text.secondary">
              Current Mood
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
              <Typography variant="body1">
                {employee.email}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
              <Typography variant="body1">
                {employee.phone}
              </Typography>
            </Box>
          </Grid>

          {employee.location && (
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body1">
                  {employee.location}
                </Typography>
              </Box>
            </Grid>
          )}
          
          {employee.joinDate && (
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body1">
                  Joined: {formatDate(employee.joinDate)}
                </Typography>
              </Box>
            </Grid>
          )}

          {employee.status && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  label={employee.status.toUpperCase()}
                  color={employee.status === 'active' ? 'success' : employee.status === 'onLeave' ? 'warning' : 'error'}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Employee Status
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmployeeProfile; 