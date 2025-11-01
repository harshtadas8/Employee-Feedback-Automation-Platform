import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
  Collapse,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MoodIcon from "@mui/icons-material/Mood";
import ForumIcon from "@mui/icons-material/Forum";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DailyReportIcon from "@mui/icons-material/Equalizer";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Drawer width
const drawerWidth = 260;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // console.log("isMobile", isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openReports, setOpenReports] = useState(
    location.pathname.includes("/reports")
  );
  const [openAI, setOpenAI] = useState(location.pathname.includes("/ai-bot"));

  const toggleMobileDrawer = () => {
    setMobileOpen(!mobileOpen);
    console.log("toggleMobileDrawer");
  };

  const handleReportsClick = () => {
    setOpenReports(!openReports);
  };

  const handleAIClick = () => {
    setOpenAI(!openAI);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const drawerContent = (
    <Box>
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleMobileDrawer}
          sx={{
            position: "absolute",
            top: -8,
            right: -5,
            zIndex: 9999,
          }}
          className="toggle-drawer-button"
        >
          <ClearIcon />
        </IconButton>
      )}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ bgcolor: theme.palette.primary.main, mr: 1, borderRadius: 0 }}
          >
            <SmartToyIcon />
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Vibemeter
          </Typography>
        </Box>
      </Box>

      <List component="nav" sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            selected={location.pathname === "/dashboard"}
            onClick={() => handleNavigation("/dashboard")}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: `${theme.palette.primary.main}22`,
              },
              "&.Mui-selected:hover": {
                backgroundColor: `${theme.palette.primary.main}44`,
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon
                color={
                  location.pathname === "/dashboard" ? "primary" : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                fontWeight:
                  location.pathname === "/dashboard" ? "bold" : "normal",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            selected={location.pathname.includes("/employees")}
            onClick={() => handleNavigation("/employees")}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: `${theme.palette.primary.main}22`,
              },
              "&.Mui-selected:hover": {
                backgroundColor: `${theme.palette.primary.main}44`,
              },
            }}
          >
            <ListItemIcon>
              <PeopleIcon
                color={
                  location.pathname.includes("/employees")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Employees"
              primaryTypographyProps={{
                fontWeight: location.pathname.includes("/employees")
                  ? "bold"
                  : "normal",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            selected={location.pathname.includes("/upload-data")}
            onClick={() => handleNavigation("/upload-data")}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: `${theme.palette.primary.main}22`,
              },
              "&.Mui-selected:hover": {
                backgroundColor: `${theme.palette.primary.main}44`,
              },
            }}
          >
            <ListItemIcon>
              <CloudUploadIcon
                color={
                  location.pathname.includes("/upload-data")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Upload Data"
              primaryTypographyProps={{
                fontWeight: location.pathname.includes("/upload-data")
                  ? "bold"
                  : "normal",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleReportsClick}
            selected={location.pathname.includes("/reports")}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: `${theme.palette.primary.main}22`,
              },
              "&.Mui-selected:hover": {
                backgroundColor: `${theme.palette.primary.main}44`,
              },
            }}
          >
            <ListItemIcon>
              <AssessmentIcon
                color={
                  location.pathname.includes("/reports") ? "primary" : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Reports"
              primaryTypographyProps={{
                fontWeight: location.pathname.includes("/reports")
                  ? "bold"
                  : "normal",
              }}
            />
            {openReports ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname.includes("/reports/vibemeter")}
                onClick={() => handleNavigation("/reports/vibemeter")}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}22`,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: `${theme.palette.primary.main}44`,
                  },
                }}
              >
                <ListItemIcon>
                  <MoodIcon
                    color={
                      location.pathname.includes("/reports/vibemeter")
                        ? "primary"
                        : "inherit"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Vibemeter Reports"
                  primaryTypographyProps={{
                    fontWeight: location.pathname.includes("/reports/vibemeter")
                      ? "bold"
                      : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname.includes("/reports/analytics")}
                onClick={() => handleNavigation("/reports/analytics")}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}22`,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: `${theme.palette.primary.main}44`,
                  },
                }}
              >
                <ListItemIcon>
                  <AnalyticsIcon
                    color={
                      location.pathname.includes("/reports/analytics")
                        ? "primary"
                        : "inherit"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Analytics"
                  primaryTypographyProps={{
                    fontWeight: location.pathname.includes("/reports/analytics")
                      ? "bold"
                      : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname.includes("/reports/daily-reports")}
                onClick={() => handleNavigation("/reports/daily-reports")}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}22`,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: `${theme.palette.primary.main}44`,
                  },
                }}
              >
                <ListItemIcon>
                  <DailyReportIcon
                    color={
                      location.pathname.includes("/reports/daily-reports")
                        ? "primary"
                        : "inherit"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Daily Reports"
                  primaryTypographyProps={{
                    fontWeight: location.pathname.includes(
                      "/reports/daily-reports"
                    )
                      ? "bold"
                      : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* <ListItem disablePadding>
          <ListItemButton 
            onClick={handleAIClick} 
            selected={location.pathname.includes('/ai-bot')}
            sx={{ 
              borderRadius: 1, 
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: `${theme.palette.primary.main}22`,
              },
              "&.Mui-selected:hover": {
                backgroundColor: `${theme.palette.primary.main}44`,
              },
            }}
          >
            <ListItemIcon>
              <SmartToyIcon
                color={
                  location.pathname.includes("/ai-bot") ? "primary" : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="AI Bot"
              primaryTypographyProps={{
                fontWeight: location.pathname.includes("/ai-bot")
                  ? "bold"
                  : "normal",
              }}
            />
            {openAI ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={openAI} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname.includes(
                  "/ai-bot/conversation-templates"
                )}
                onClick={() =>
                  handleNavigation("/ai-bot/conversation-templates")
                }
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}22`,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: `${theme.palette.primary.main}44`,
                  },
                }}
              >
                <ListItemIcon>
                  <ForumIcon
                    color={
                      location.pathname.includes(
                        "/ai-bot/conversation-templates"
                      )
                        ? "primary"
                        : "inherit"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Conversation Templates"
                  primaryTypographyProps={{
                    fontWeight: location.pathname.includes(
                      "/ai-bot/conversation-templates"
                    )
                      ? "bold"
                      : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname.includes("/ai-bot/settings")}
                onClick={() => handleNavigation("/ai-bot/settings")}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}22`,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: `${theme.palette.primary.main}44`,
                  },
                }}
              >
                <ListItemIcon>
                  <SettingsIcon
                    color={
                      location.pathname.includes("/ai-bot/settings")
                        ? "primary"
                        : "inherit"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Bot Settings"
                  primaryTypographyProps={{
                    fontWeight: location.pathname.includes("/ai-bot/settings")
                      ? "bold"
                      : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse> */}

        <Divider sx={{ my: 2 }} />

        {/* <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/settings'}
            onClick={() => handleNavigation('/settings')}
            sx={{ 
              borderRadius: 1,
              "&.Mui-selected": {
                backgroundColor: `${theme.palette.primary.main}22`,
              },
              "&.Mui-selected:hover": {
                backgroundColor: `${theme.palette.primary.main}44`,
              },
            }}
          >
            <ListItemIcon>
              <SettingsIcon
                color={
                  location.pathname === "/settings" ? "primary" : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                fontWeight:
                  location.pathname === "/settings" ? "bold" : "normal",
              }}
            />
          </ListItemButton>
        </ListItem> */}
      </List>
    </Box>
  );
  // If mobile, don't render permanent drawer
  // if (isMobile) {
  //   return null;
  // }

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleMobileDrawer}
          sx={{ position: "absolute", top: 8, left: 16, zIndex: 9999 }}
          className="toggle-drawer-button"
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? toggleMobileDrawer : undefined}
        sx={{
          width: isMobile ? "auto" : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "auto" : drawerWidth,
            boxSizing: "border-box",
            border: "none",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
            backgroundColor: theme.palette.background.paper,
          },
          zIndex: isMobile ? 9999 : 1,
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
