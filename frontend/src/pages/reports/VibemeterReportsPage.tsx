import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Chip,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VibemeterTrendChart from "../../components/charts/VibemeterTrendChart";
import VibeDistributionChart from "../../components/charts/VibeDistributionChart";
import TeamRadarChart from "../../components/charts/TeamRadarChart";
import EmployeeRadarChart from "../../components/charts/EmployeeRadarChart";
import { mockEmployees, mockEmployeeDetails } from "../../data/mockData";

// Mock vibe response data since it's missing from mockData
const mockVibeResponses = [
  { id: "1", employeeId: "1", timestamp: new Date("2023-05-01"), vibeScore: 7 },
  { id: "2", employeeId: "1", timestamp: new Date("2023-05-08"), vibeScore: 8 },
  { id: "3", employeeId: "1", timestamp: new Date("2023-05-15"), vibeScore: 6 },
  { id: "4", employeeId: "2", timestamp: new Date("2023-05-01"), vibeScore: 9 },
  { id: "5", employeeId: "2", timestamp: new Date("2023-05-08"), vibeScore: 8 },
  { id: "6", employeeId: "2", timestamp: new Date("2023-05-15"), vibeScore: 7 },
  { id: "7", employeeId: "3", timestamp: new Date("2023-05-01"), vibeScore: 5 },
  { id: "8", employeeId: "3", timestamp: new Date("2023-05-08"), vibeScore: 6 },
  { id: "9", employeeId: "3", timestamp: new Date("2023-05-15"), vibeScore: 4 },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reports-tabpanel-${index}`}
      aria-labelledby={`reports-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: 0, py: 3 }}>{children}</Box>}
    </div>
  );
}

const VibemeterReportsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeFrame, setTimeFrame] = useState("30");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTimeFrameChange = (event: SelectChangeEvent) => {
    setTimeFrame(event.target.value);
  };

  // Group employees by department for team metrics
  const departments = [...new Set(mockEmployees.map((emp) => emp.department))];
  const teamMetrics = departments.map((department) => {
    const departmentEmployees = mockEmployees.filter(
      (emp) => emp.department === department
    );

    // Simple average calculations directly from employees using default values
    const teamSize = departmentEmployees.length;
    return {
      department,
      vibeScore: 7,
      engagementScore: 6,
      performanceScore: 7,
      workloadScore: 5,
      rewardScore: 6,
      leaveUtilizedScore: 8,
    };
  });

  return (
    <Box sx={{ p: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            <Typography variant="h5">Vibemeter Reports</Typography>
            <FormControl sx={{ minWidth: 120, marginTop: "15px" }} size="small">
              <InputLabel id="time-frame-label">Time Frame</InputLabel>
              <Select
                labelId="time-frame-label"
                id="time-frame-select"
                value={timeFrame}
                label="Time Frame"
                onChange={handleTimeFrameChange}
              >
                <MenuItem value="7">Last 7 days</MenuItem>
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="90">Last 90 days</MenuItem>
                <MenuItem value="180">Last 6 months</MenuItem>
                <MenuItem value="365">Last year</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="analytics tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              maxWidth: "100%",
              "& .MuiTabs-scroller": {
                scrollBehavior: "smooth",
              },
              "& .MuiTabs-flexContainer": {
                gap: 2,
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Department Analysis" />
            <Tab label="Trend Analysis" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <VibemeterTrendChart
                  data={mockVibeResponses}
                  days={parseInt(timeFrame)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <VibeDistributionChart vibeData={mockVibeResponses} />
              </Grid>
              <Grid item xs={12}>
                <TeamRadarChart
                  data={teamMetrics}
                  title="Department Comparison"
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Department Breakdown
                </Typography>
                {departments.map((department) => {
                  const departmentEmployees = mockEmployees.filter(
                    (emp) => emp.department === department
                  );
                  const departmentVibes = mockVibeResponses.filter((vibe) =>
                    departmentEmployees.some(
                      (emp) => emp.id === vibe.employeeId
                    )
                  );

                  return (
                    <Grid container spacing={3} key={department} sx={{ mb: 4 }}>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {department} ({departmentEmployees.length} employees)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <VibemeterTrendChart
                          data={departmentVibes}
                          days={parseInt(timeFrame)}
                          title={`${department} Vibe Trend`}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <VibeDistributionChart
                          employeeIds={departmentEmployees.map((emp) =>
                            String(emp.id)
                          )}
                          title={`${department} Vibe Distribution`}
                          vibeData={mockVibeResponses}
                        />
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Trend Analysis
                </Typography>
                <Typography variant="body1" paragraph>
                  This section shows the vibe trends over time, helping identify
                  patterns and potential issues before they escalate.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <VibemeterTrendChart
                    data={mockVibeResponses}
                    days={parseInt(timeFrame)}
                    showAverage={true}
                    showTrendline={true}
                    title="Overall Vibe Trend with Trendline"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Correlation Analysis
                </Typography>
                <Typography variant="body2">
                  Based on the trend analysis, we observe the following
                  correlations:
                </Typography>
                <ul>
                  <li>
                    Vibe scores tend to decrease before holiday seasons and
                    increase after
                  </li>
                  <li>
                    Performance reviews correlate with temporary drops in vibe
                    scores
                  </li>
                  <li>
                    Team building events show positive impact on vibes for 2-3
                    weeks
                  </li>
                  <li>
                    Workload increases correlate with vibe decreases within 1-2
                    weeks
                  </li>
                </ul>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VibemeterReportsPage;
