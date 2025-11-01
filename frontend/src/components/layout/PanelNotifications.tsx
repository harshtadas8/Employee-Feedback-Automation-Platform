import { Box, Typography, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from '@mui/material/Link';

interface AlertItem {
  id: number;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  priority: string;
}

interface PanelNotificationsProps {
  alerts: AlertItem[];
}

const PanelNotifications = ({ alerts }: PanelNotificationsProps) => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'critical': return <WarningIcon color="error" fontSize="small" />;
      case 'warning': return <PeopleIcon color="warning" fontSize="small" />;
      default: return <EventIcon color="info" fontSize="small" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'high': return '#ff3d00';
      case 'medium': return '#ff9100';
      default: return '#2962ff';
    }
  };

  return (
    <Box sx={{ 
      width: {
        xs: '90vw',  // for mobile/small screens
        sm: 380       // for tablets and above
      },
      
      maxHeight: '70vh',
      overflow: 'auto',
      '&::-webkit-scrollbar': { width: '6px' },
      '&::-webkit-scrollbar-thumb': { 
        backgroundColor: theme => theme.palette.mode === 'dark' ? '#555' : '#ccc',
        borderRadius: '3px'
      }
    }}>
      {/* Header */}
      <Box sx={{ 
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: theme => theme.palette.background.paper,
        position: 'sticky',
        top: 0,
        zIndex: 1
      }}>
        <Typography variant="h6" sx={{ fontWeight: { xs: 450, sm: 600 } }}>Panel Notifications</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Link 
            href="#" 
            underline="hover" 
            sx={{ 
              fontSize: '0.875rem',
              mr: 2,
              color: 'text.secondary'
            }}
          >
            Mark all as read
          </Link>
          <IconButton size="small">
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Notification Items */}
      {alerts.map((alert) => (
        <MenuItem 
          key={alert.id} 
          sx={{
            px: 2,
            py: 1.5,
            borderLeft: `4px solid ${getPriorityColor(alert.priority)}`,
            transition: 'background-color 0.2s ease',
            '&:hover': {
              backgroundColor: theme => theme.palette.action.hover
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: '36px' }}>
            {getIcon(alert.type)}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" fontWeight={500}>
                {alert.title}
              </Typography>
            }
            secondary={
              <>
                <Typography 
                  component="span" 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ display: 'block' }}
                >
                  {alert.description}
                </Typography>
                <Typography 
                  component="span" 
                  variant="caption" 
                  color="text.disabled"
                  sx={{ display: 'block', mt: 0.5 }}
                >
                  {alert.time} • Priority: {alert.priority}
                </Typography>
              </>
            }
          />
          <IconButton edge="end" size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </MenuItem>
      ))}
    </Box>
  );
};

export default PanelNotifications;