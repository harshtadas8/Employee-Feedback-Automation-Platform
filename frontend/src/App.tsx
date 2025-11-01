import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState, useMemo, useCallback } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import EmployeeListPage from "./pages/employee-list/EmployeeListPage";
import EmployeeProfilePage from "./pages/employee-profile/EmployeeProfilePage";
import VibemeterReportsPage from "./pages/reports/VibemeterReportsPage";
import AnalyticsPage from "./pages/reports/AnalyticsPage";
import DailyReportPage from "./pages/reports/DailyReportPage.tsx";
import UploadEmpData from "./components/dashboard/UploadEmpData";
import EmpMood from "./components/dashboard/EmpMood.tsx";
// import ConversationTemplatesPage from './pages/ai-bot/ConversationTemplatesPage';
// import BotSettingsPage from './pages/ai-bot/BotSettingsPage';
// import SettingsPage from './pages/settings/SettingsPage';

// Create a custom theme
import LoginPage from "./pages/auth/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: "#2196f3",
          },
          secondary: {
            main: "#ff9800",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#f5f5f5",
            paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [mode]
  );
  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace/>
            </ProtectedRoute>
          }/> */}

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout toggleTheme={toggleTheme} />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="employees" element={<EmployeeListPage />} />
              <Route path="employees/:id" element={<EmployeeProfilePage />} />
              <Route
                path="reports/vibemeter"
                element={<VibemeterReportsPage />}
              />
              <Route path="reports/analytics" element={<AnalyticsPage />} />
              <Route
                path="reports/daily-reports"
                element={<DailyReportPage />}
              />
              <Route path="upload-data" element={<UploadEmpData />} />
              <Route path="employee-analysis" element={<EmpMood />} />

              {/* <Route path="ai-bot/conversation-templates" element={<ConversationTemplatesPage />} />
            <Route path="ai-bot/settings" element={<BotSettingsPage />} />
            <Route path="settings" element={<SettingsPage />} /> */}
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
