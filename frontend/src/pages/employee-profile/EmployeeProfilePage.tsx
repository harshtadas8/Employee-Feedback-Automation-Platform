import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmployeeProfileHeader from "../../components/employeeDetails/EmployeeProfileHeader";
import EmployeeRadarChart from "../../components/charts/EmployeeRadarChart";
import VibemeterTrendChart from "../../components/charts/VibemeterTrendChart";
import ConversationHistory from "../../components/employeeDetails/ConversationHistory";
import { mockEmployees, mockEmployeeDetails } from "../../data/mockData";
import { Employee, EmployeeDetails } from "../../types/employee";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`employee-tabpanel-${index}`}
      aria-labelledby={`employee-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const EmployeeProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [employeeDetails, setEmployeeDetails] =
    useState<EmployeeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const foundEmployee = mockEmployees.find((emp) => String(emp.id) === id);
      const foundDetails = mockEmployeeDetails.find(
        (emp) => String(emp.id) === id
      );
      console.log(
        "found employee : ",
        foundEmployee,
        "\nfound details : ",
        foundDetails
      );
      setEmployee(foundEmployee || null);
      console.log("employee : ", employee);
      console.log("employee ID : ", id);
      setEmployeeDetails(foundDetails || null);
      setLoading(false);
    }
  }, [id]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    navigate("/employees");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!employee || !employeeDetails) {
    return (
      <Box>
        <Typography variant="h5" color="error">
          Employee not found
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Back to Employee List
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "auto" }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back to Employee List
      </Button>

      <Paper sx={{ mb: 3, p: 3 }}>
        <EmployeeProfileHeader
          employee={employee}
          employeeDetails={employeeDetails}
        />
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="employee tabs"
        >
          <Tab
            label="Overview"
            id="employee-tab-0"
            aria-controls="employee-tabpanel-0"
          />
          <Tab
            label="AI Conversations"
            id="employee-tab-1"
            aria-controls="employee-tabpanel-1"
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Employee Health Metrics
              </Typography>
              <EmployeeRadarChart employee={employeeDetails} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Performance & Development
              </Typography>
              <Box>
                <Typography variant="subtitle1">Strengths</Typography>
                <ul>
                  {employeeDetails.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Areas for Improvement
                </Typography>
                <ul>
                  {employeeDetails.areasForImprovement.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Goals
                </Typography>
                <ul>
                  {employeeDetails.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Vibe Trend
              </Typography>
              <VibemeterTrendChart
                vibeData={employeeDetails.vibeHistory}
                days={90}
              />
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Conversation History
          </Typography>
          <ConversationHistory
            conversations={employeeDetails.aiConversations}
          />
        </Paper>
      </TabPanel>
    </Box>
  );
};

export default EmployeeProfilePage;
