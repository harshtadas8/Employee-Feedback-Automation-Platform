import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockEmployees } from "../../data/mockData";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AnalyticsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [department, setDepartment] = useState("all");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setDepartment(event.target.value);
  };

  // Compute department statistics
  const departments = [
    "all",
    ...new Set(mockEmployees.map((emp) => emp.department)),
  ];

  const filteredEmployees =
    department === "all"
      ? mockEmployees
      : mockEmployees.filter((emp) => emp.department === department);

  // Calculate conversation engagement statistics
  const conversationStats = [
    {
      name: "High Engagement",
      value: filteredEmployees.filter(
        (emp) =>
          emp.aiStats?.engagementRate !== undefined &&
          emp.aiStats.engagementRate > 0.7
      ).length,
    },
    {
      name: "Medium Engagement",
      value: filteredEmployees.filter((emp) => {
        const rate = emp.aiStats?.engagementRate;
        return rate !== undefined && rate >= 0.4 && rate <= 0.7;
      }).length,
    },
    {
      name: "Low Engagement",
      value: filteredEmployees.filter((emp) => {
        const rate = emp.aiStats?.engagementRate;
        return rate !== undefined && rate < 0.4;
      }).length,
    },
  ];

  // Calculate vibe distribution
  const vibeDistribution = [
    {
      name: "Very Happy",
      value: filteredEmployees.filter((emp) => emp.vibeZone === "very_happy")
        .length,
    },
    {
      name: "Happy",
      value: filteredEmployees.filter((emp) => emp.vibeZone === "happy").length,
    },
    {
      name: "Neutral",
      value: filteredEmployees.filter((emp) => emp.vibeZone === "neutral")
        .length,
    },
    {
      name: "Concerned",
      value: filteredEmployees.filter((emp) => emp.vibeZone === "concerned")
        .length,
    },
    {
      name: "Critical",
      value: filteredEmployees.filter((emp) => emp.vibeZone === "critical")
        .length,
    },
  ];

  // Top issues reported by employees
  const topIssues = [
    { issue: "Work-life balance", count: 24, percentChange: +5 },
    { issue: "Workload management", count: 18, percentChange: -3 },
    { issue: "Career progression", count: 15, percentChange: +12 },
    { issue: "Management support", count: 12, percentChange: -8 },
    { issue: "Compensation", count: 10, percentChange: +2 },
  ];

  return (
    <Box sx={{ p: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p:1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                mb: 2,
              }}
            >
              <Typography variant="h5">Analytics Dashboard</Typography>
              <FormControl
                sx={{ minWidth: 200, marginTop: "15px" }}
                size="small"
              >
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department-select"
                  value={department}
                  label="Department"
                  onChange={handleDepartmentChange}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </MenuItem>
                  ))}
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
              <Tab label="Engagement Analytics" />
              <Tab label="Vibe Analysis" />
              <Tab label="Issue Tracking" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent sx={{p:1}}>
                      <Typography variant="h6" gutterBottom>
                        Bot Conversation Engagement
                      </Typography>
                      <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={conversationStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="value"
                              name="Employees"
                              fill="#8884d8"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Engagement Metrics
                      </Typography>
                      <TableContainer sx={{px:1}}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Metric</TableCell>
                              <TableCell align="right">Value</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>Average Response Rate</TableCell>
                              <TableCell align="right">
                                {Math.round(
                                  (filteredEmployees.reduce(
                                    (sum, emp) =>
                                      sum + (emp.aiStats?.responseRate || 0),
                                    0
                                  ) /
                                    filteredEmployees.length) *
                                    100
                                )}
                                %
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Average Conversation Length</TableCell>
                              <TableCell align="right">
                                {Math.round(
                                  filteredEmployees.reduce(
                                    (sum, emp) =>
                                      sum +
                                      (emp.aiStats?.avgConversationLength || 0),
                                    0
                                  ) / filteredEmployees.length
                                )}{" "}
                                messages
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                Avg Bot Interactions per Week
                              </TableCell>
                              <TableCell align="right">
                                {(
                                  filteredEmployees.reduce(
                                    (sum, emp) =>
                                      sum +
                                      (emp.aiStats?.weeklyInteractions || 0),
                                    0
                                  ) / filteredEmployees.length
                                ).toFixed(1)}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Actionable Feedback Rate</TableCell>
                              <TableCell align="right">
                                {Math.round(
                                  (filteredEmployees.reduce(
                                    (sum, emp) =>
                                      sum +
                                      (emp.aiStats?.actionableFeedbackRate ||
                                        0),
                                    0
                                  ) /
                                    filteredEmployees.length) *
                                    100
                                )}
                                %
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Vibe Zone Distribution
                      </Typography>
                      <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={vibeDistribution}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="value"
                              name="Employees"
                              fill="#82ca9d"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Vibe Metrics
                      </Typography>
                      <TableContainer sx={{px:1}}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Metric</TableCell>
                              <TableCell align="right">Value</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>Average Vibe Score</TableCell>
                              <TableCell align="right">
                                {(
                                  filteredEmployees.reduce(
                                    (sum, emp) =>
                                      sum + (emp.metrics?.vibeAverage || 0),
                                    0
                                  ) / filteredEmployees.length
                                ).toFixed(1)}{" "}
                                / 10
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Employees in Critical Zone</TableCell>
                              <TableCell align="right">
                                {
                                  filteredEmployees.filter(
                                    (emp) => emp.vibeZone === "critical"
                                  ).length
                                }
                                (
                                {Math.round(
                                  (filteredEmployees.filter(
                                    (emp) => emp.vibeZone === "critical"
                                  ).length /
                                    filteredEmployees.length) *
                                    100
                                )}
                                %)
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Employees in Concerned Zone</TableCell>
                              <TableCell align="right">
                                {
                                  filteredEmployees.filter(
                                    (emp) => emp.vibeZone === "concerned"
                                  ).length
                                }
                                (
                                {Math.round(
                                  (filteredEmployees.filter(
                                    (emp) => emp.vibeZone === "concerned"
                                  ).length /
                                    filteredEmployees.length) *
                                    100
                                )}
                                %)
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Employees in Positive Zones</TableCell>
                              <TableCell align="right">
                                {
                                  filteredEmployees.filter((emp) =>
                                    ["happy", "very_happy"].includes(
                                      emp.vibeZone || ""
                                    )
                                  ).length
                                }
                                (
                                {Math.round(
                                  (filteredEmployees.filter((emp) =>
                                    ["happy", "very_happy"].includes(
                                      emp.vibeZone || ""
                                    )
                                  ).length /
                                    filteredEmployees.length) *
                                    100
                                )}
                                %)
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Top Issues Reported by Employees
                      </Typography>
                      <TableContainer sx={{px:1}}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Issue</TableCell>
                              <TableCell align="right">Count</TableCell>
                              <TableCell align="right">Change</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {topIssues.map((row) => (
                              <TableRow key={row.issue}>
                                <TableCell component="th" scope="row">
                                  {row.issue}
                                </TableCell>
                                <TableCell align="right">{row.count}</TableCell>
                                <TableCell
                                  align="right"
                                  sx={{
                                    color:
                                      row.percentChange > 0
                                        ? "error.main"
                                        : "success.main",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {row.percentChange > 0 ? "+" : ""}
                                  {row.percentChange}%
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Issue Analysis
                      </Typography>
                      <Typography variant="body1" paragraph>
                        Based on conversations with the AI bot, here are the key
                        insights from employee feedback:
                      </Typography>
                      <Typography variant="body2" component="div">
                        <ul>
                          <li>
                            Work-life balance concerns have increased in the
                            last quarter, particularly in engineering and
                            product teams
                          </li>
                          <li>
                            Career progression concerns are highest among
                            employees with 2-5 years tenure
                          </li>
                          <li>
                            Management support issues show improvement across
                            most departments but remain a concern in sales
                          </li>
                          <li>
                            Workload management feedback has decreased,
                            indicating potential improvement in project planning
                          </li>
                        </ul>
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 2 }}>
                        Recommended Actions:
                      </Typography>
                      <Typography variant="body2" component="div">
                        <ol>
                          <li>
                            Conduct focused discussions with engineering and
                            product teams about work-life balance
                          </li>
                          <li>
                            Review career path clarity for mid-tenure employees
                          </li>
                          <li>
                            Provide additional management training for sales
                            team leaders
                          </li>
                          <li>
                            Continue monitoring workload distribution
                            improvements
                          </li>
                        </ol>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
