import { useState} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem,
  // Badge,
  useTheme,
  useMediaQuery,
  // CircularProgress,
  // Button
} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import PanelNotifications from './PanelNotifications';
import { useNavigate } from 'react-router-dom';

// interface AlertItem {
//   id: number;
//   type: 'critical' | 'warning' | 'info';
//   title: string;
//   description: string;
//   time: string;
//   priority: string;
// }
interface HeaderProps {
  toggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {

  const navigate = useNavigate();
  // const [alerts, setAlerts] = useState<AlertItem[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {logout}=useAuth();
  // useEffect(() => {
  //   const fetchAlerts = async () => {
  //     try {
  //       const response = await fetch('/alerts.json');
  //       if (!response.ok) throw new Error('Failed to fetch alerts');
  //       const data = await response.json();
  //       // setAlerts(data);
  //     } catch (err) {
  //       // setError(err instanceof Error ? err.message : 'Unknown error');
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };

  //   fetchAlerts();
  // }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setNotificationAnchorEl(event.currentTarget);
  // };

  // const handleNotificationClose = () => {
  //   setNotificationAnchorEl(null);
  // };

  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        width:"100%",
        borderRadius: 0,
        pb: 1,
      }}
    >
      <Toolbar>
        {/* {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )} */}

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: isMobile ? 400 : 600,
            fontSize: isMobile ? 20 : 30,
            marginLeft: isMobile ? 4 : 0,
          }}
        >
          HR Panel
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={toggleTheme}
          aria-label='toggle theme'>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          {/* <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={handleNotificationMenu}
            aria-label="show notifications"
          >
            <Badge badgeContent={alerts.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          
          {/* <Menu
            id="notification-menu"
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
            PaperProps={{
              elevation: 4,
              sx: {
                borderRadius: '12px',
                transform: 'translateX(-10px) translateY(10px)',
                overflow: 'visible',
                '&:before': {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 12,
                  height: 12,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                  boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {loading ? (
              <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} />
              </Box>
            ) : error ? (
              <Box sx={{ p: 2, textAlign: 'center', minWidth: 300 }}>
                <ErrorOutlineIcon color="error" sx={{ fontSize: 40, mb: 1 }} />
                <Typography color="error">{error}</Typography>
                <Button 
                  variant="text" 
                  size="small" 
                  sx={{ mt: 1 }}
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </Box>
            ) : (
              <PanelNotifications alerts={alerts} />
            )}
          </Menu> */}

          <IconButton
            onClick={handleMenu}
            size="large"
            sx={{ ml: 1 }}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            aria-label="account menu"
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            {/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
            <MenuItem onClick={()=>{
              logout();
              navigate('/login')
            }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;