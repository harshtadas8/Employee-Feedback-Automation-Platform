import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  PieChart,
  TrendingUp,
  Download,
} from "@mui/icons-material";
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

// Define TypeScript interfaces for our data structure
interface RiskCategory {
  category: string;
  count: number;
  percentChange: number;
  emotion: string;
}

interface RiskFactor {
  factor: string;
  count: number;
}

interface Department {
  name: string;
  vibeScore: number;
  highRiskPercent: number;
  keyRiskFactor: string;
}

interface CommonTheme {
  text: string;
}

interface EmployeeQuote {
  text: string;
}

interface FocusArea {
  title: string;
  actions: string[];
}

interface ActionItem {
  text: string;
}

interface SuccessStory {
  text: string;
}

interface HighRiskEmployee {
  id: string;
  score: number;
  concerns: string;
  actions: string;
}

interface DailyReportData {
  date: string;
  totalEmployees: number;
  atRiskEmployees: number;
  conversationsHeld: number;
  hrInterventions: number;
  riskCategories: RiskCategory[];
  keyInsights: string[];
  topRiskFactors: RiskFactor[];
  departments: Department[];
  commonThemes: CommonTheme[];
  employeeQuotes: EmployeeQuote[];
  focusAreas: FocusArea[];
  actionItems: ActionItem[];
  successStories: SuccessStory[];
  highRiskEmployees: HighRiskEmployee[];
}

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
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

// Sample data based on the PDF
const sampleReportData: DailyReportData = {
  date: "April 5, 2025",
  totalEmployees: 35000,
  atRiskEmployees: 142,
  conversationsHeld: 48,
  hrInterventions: 12,
  riskCategories: [
    {
      category: "High Risk (7-10)",
      count: 32,
      percentChange: 5,
      emotion: "Frustrated",
    },
    {
      category: "Medium Risk (4-6)",
      count: 87,
      percentChange: -2,
      emotion: "Sad",
    },
    {
      category: "Low Risk (1-3)",
      count: 23,
      percentChange: -10,
      emotion: "Okay",
    },
  ],
  keyInsights: [
    "Work-life balance issues remain the leading concern across all risk groups (62% of cases)",
    "Meeting overload is increasingly cited as a source of frustration (+15% from last month)",
    "Leave utilization is trending positively in response to recent initiatives (+8% YoY)",
    "Recognition opportunities show uneven distribution across departments",
  ],
  topRiskFactors: [
    { factor: "Extended work hours", count: 78 },
    { factor: "High meeting load", count: 65 },
    { factor: "Low leave utilization", count: 52 },
    { factor: "Recognition gap", count: 41 },
    { factor: "Performance concerns", count: 38 },
  ],
  departments: [
    {
      name: "Consulting",
      vibeScore: 3.2,
      highRiskPercent: 12,
      keyRiskFactor: "Work hours",
    },
    {
      name: "Audit",
      vibeScore: 3.5,
      highRiskPercent: 8,
      keyRiskFactor: "Leave utilization",
    },
    {
      name: "Tax",
      vibeScore: 3.7,
      highRiskPercent: 6,
      keyRiskFactor: "Meeting load",
    },
    {
      name: "Technology",
      vibeScore: 3.1,
      highRiskPercent: 14,
      keyRiskFactor: "Work hours",
    },
    {
      name: "Finance",
      vibeScore: 3.8,
      highRiskPercent: 5,
      keyRiskFactor: "Recognition gap",
    },
  ],
  commonThemes: [
    { text: "Project deadline pressure creating extended work hours" },
    { text: "Meeting fatigue affecting productivity and satisfaction" },
    { text: "Difficulty balancing client demands with personal time" },
    { text: "Concerns about visibility and recognition in hybrid work model" },
    { text: "Challenges with communication in matrix reporting structures" },
  ],
  employeeQuotes: [
    {
      text: "The constant back-to-back meetings leave no time for actual work during regular hours.",
    },
    {
      text: "I feel like I need to be always available to demonstrate commitment, even after hours.",
    },
    {
      text: "It's difficult to take leave when client deadlines are always looming.",
    },
    {
      text: "I'm working harder than ever but feel less visible to leadership.",
    },
  ],
  focusAreas: [
    {
      title: "Workload balancing and resource allocation",
      actions: [
        "Review staffing models for high-pressure projects",
        "Implement capacity planning tools for more accurate resource allocation",
        "Conduct regular workload check-ins at team level",
      ],
    },
    {
      title: "Meeting efficiency and calendar management",
      actions: [
        "Roll out meeting effectiveness training to all managers",
        "Implement company-wide meeting-free blocks (e.g., Wednesday afternoons)",
        "Audit recurring meetings for necessity and appropriate attendance",
      ],
    },
    {
      title: "Leave utilization and wellness",
      actions: [
        'Promote "planned disconnection" through pre-scheduled quarterly breaks',
        "Implement manager accountability for team leave utilization",
        "Expand wellness resources with focus on stress management",
      ],
    },
    {
      title: "Recognition programs and visibility",
      actions: [
        "Review recognition distribution across departments",
        "Enhance peer recognition opportunities",
        "Create more visibility for contributions in hybrid/remote settings",
      ],
    },
  ],
  actionItems: [
    {
      text: "HR Business Partner follow-ups required for 12 high-risk employees",
    },
    {
      text: "Leadership briefing scheduled for Friday on meeting reduction strategy",
    },
    {
      text: "Wellness webinar planned for next week focusing on stress management techniques",
    },
    {
      text: "Manager training on workload balancing to be launched next month",
    },
  ],
  successStories: [
    {
      text: 'The "No Meeting Friday" pilot in Consulting has shown a 12% improvement in Vibe scores',
    },
    {
      text: "Teams with structured mentorship programs show 23% lower high-risk employee rates",
    },
    {
      text: "Departments utilizing workload planning tools show 18% better leave utilization",
    },
  ],
  highRiskEmployees: [
    {
      id: "EMP0172",
      score: 7.5,
      concerns: "Work hours, Meetings, Stress",
      actions: "Manager discussion, Workload assessment",
    },
    {
      id: "EMP0354",
      score: 8.2,
      concerns: "Burnout risk, Leave utilization",
      actions: "Immediate leave plan, Wellness referral",
    },
    {
      id: "EMP0089",
      score: 7.8,
      concerns: "Performance anxiety, Manager relationship",
      actions: "HR mediation, Performance plan review",
    },
  ],
};

// Create risk category data for chart
const getRiskCategoryChartData = (riskCategories: RiskCategory[]) => {
  return riskCategories.map((category) => ({
    name: category.category,
    count: category.count,
    change: category.percentChange,
  }));
};

// Create risk factors data for chart
const getRiskFactorsChartData = (riskFactors: RiskFactor[]) => {
  return riskFactors.map((factor) => ({
    name: factor.factor,
    count: factor.count,
  }));
};

const DailyReportPage = ({
  data = sampleReportData,
}: {
  data?: DailyReportData;
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const riskCategoryChartData = getRiskCategoryChartData(data.riskCategories);
  const riskFactorsChartData = getRiskFactorsChartData(data.topRiskFactors);

  const downloadPdf = () => {
    // Logic to download the report as a PDF
    alert("Download PDF clicked");
  };

  return (
    <Box sx={{ p: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                mb: 2,
              }}
            >
              <Typography variant="h5">
                People Experience Daily Report
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Date: {data.date}
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Executive Summary Cards */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                mb: 2,
                "& .MuiFormControl-root": {
                  margin: "15px 0 0",
                },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Executive Summary
              </Typography>
              <Box
                component="button"
                onClick={downloadPdf}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  py: 1,
                  px: 2,
                  border: "none",
                  borderRadius: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  mb: 2,
                }}
              >
                <Download fontSize="small" />
                Download PDF
              </Box>
            </Box>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Employees
                    </Typography>
                    <Typography variant="h4">
                      {data.totalEmployees.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      At Risk Employees
                    </Typography>
                    <Typography variant="h4">{data.atRiskEmployees}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      Conversations Held
                    </Typography>
                    <Typography variant="h4">
                      {data.conversationsHeld}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      HR Interventions
                    </Typography>
                    <Typography variant="h4" color="error.main">
                      {data.hrInterventions}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

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
              <Tab
                label="Risk Analysis"
                onMouseDown={(e) => e.preventDefault()}
              />
              <Tab
                label="Employee Feedback"
                onMouseDown={(e) => e.preventDefault()}
              />
              <Tab
                label="Action Plan"
                onMouseDown={(e) => e.preventDefault()}
              />
            </Tabs>

            {/* Tab 1: Risk Analysis */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Risk Category Distribution
                      </Typography>
                      <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%">
                          <BarChart data={riskCategoryChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="count"
                              name="Employees"
                              fill="#8884d8"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Risk Metrics
                      </Typography>
                      <TableContainer sx={{ 
        overflowX: 'auto',  // Add horizontal scroll
        '& .MuiTableCell-root': {
          whiteSpace: 'nowrap',  // Prevent text wrapping
          minWidth: '100px'  // Ensure minimum cell width
        }}}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontSize: "1.1rem" }}>
                                Risk Category
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ fontSize: "1.1rem" }}
                              >
                                Count
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ fontSize: "1.1rem" }}
                              >
                                Change
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ fontSize: "1.1rem" }}
                              >
                                Top Emotion
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.riskCategories.map((category) => (
                              <TableRow key={category.category}>
                                <TableCell
                                  sx={{ fontSize: "0.9rem", height: "50px" }}
                                >
                                  {category.category}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ fontSize: "0.9rem", height: "50px" }}
                                >
                                  {category.count}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{
                                    fontSize: "0.9rem",
                                    height: "50px",
                                    color:
                                      category.percentChange > 0
                                        ? "error.main"
                                        : "success.main",
                                    fontWeight: "bold",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  {category.percentChange > 0 ? (
                                    <ArrowUpward
                                      fontSize="small"
                                      sx={{ mr: 0.5 }}
                                    />
                                  ) : (
                                    <ArrowDownward
                                      fontSize="small"
                                      sx={{ mr: 0.5 }}
                                    />
                                  )}
                                  {Math.abs(category.percentChange)}%
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ fontSize: "0.9rem", height: "50px" }}
                                >
                                  {category.emotion}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Top Risk Factors
                      </Typography>
                      <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={riskFactorsChartData}
                            layout="vertical"
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={150} />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="count"
                              name="Employees Affected"
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
                        Key Insights
                      </Typography>
                      <List>
                        {data.keyInsights.map((insight, index) => (
                          <ListItem key={index} sx={{ py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <PieChart fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={insight} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Tab 3: Employee Feedback */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Common Themes
                      </Typography>
                      <List>
                        {data.commonThemes.map((theme, index) => (
                          <ListItem key={index} sx={{ py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <TrendingUp fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={theme.text} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Employee Voice (Anonymous)
                      </Typography>
                      <Box
                        sx={{
                          overflowY: "auto",
                          maxHeight: "calc(100% - 50px)",
                        }}
                      >
                        {data.employeeQuotes.map((quote, index) => (
                          <Card
                            key={index}
                            variant="outlined"
                            sx={{ mb: 2, backgroundColor: "transparent" }}
                          >
                            <CardContent
                              sx={{ backgroundColor: "transparent" }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontStyle: "italic",
                                  backgroundColor: "transparent",
                                }}
                              >
                                "{quote.text}"
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        High Risk Employees Requiring Immediate Attention
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Employee ID</TableCell>
                              <TableCell align="right">Risk Score</TableCell>
                              <TableCell>Primary Concerns</TableCell>
                              <TableCell>Recommended Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.highRiskEmployees.map((employee) => (
                              <TableRow key={employee.id}>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell
                                  align="right"
                                  sx={{
                                    color:
                                      employee.score > 8
                                        ? "error.main"
                                        : "warning.main",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {employee.score}
                                </TableCell>
                                <TableCell>{employee.concerns}</TableCell>
                                <TableCell>{employee.actions}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Tab 4: Action Plan */}
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Recommended Focus Areas
                      </Typography>
                      <Grid container spacing={2}>
                        {data.focusAreas.map((area, index) => (
                          <Grid item xs={12} md={6} key={index}>
                            <Card variant="outlined" sx={{ height: "100%" }}>
                              <CardContent>
                                <Typography
                                  variant="subtitle1"
                                  gutterBottom
                                  sx={{ fontWeight: "bold" }}
                                >
                                  {index + 1}. {area.title}
                                </Typography>
                                <List dense>
                                  {area.actions.map((action, idx) => (
                                    <ListItem key={idx}>
                                      <ListItemIcon sx={{ minWidth: 36 }}>
                                        <Typography
                                          variant="body2"
                                          sx={{ fontWeight: "bold" }}
                                        >
                                          •
                                        </Typography>
                                      </ListItemIcon>
                                      <ListItemText primary={action} />
                                    </ListItem>
                                  ))}
                                </List>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Immediate Action Items
                      </Typography>
                      <List>
                        {data.actionItems.map((item, index) => (
                          <ListItem key={index} sx={{ py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {index + 1}.
                              </Typography>
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Success Stories
                      </Typography>
                      <List>
                        {data.successStories.map((story, index) => (
                          <ListItem key={index} sx={{ py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <TrendingUp fontSize="small" color="success" />
                            </ListItemIcon>
                            <ListItemText primary={story.text} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Typography variant="caption" color="text.secondary">
          This report was generated by TIA (Talent Intelligence Assistant) based
          on Vibemeter data and employee conversations.
        </Typography>
      </Box>
    </Box>
  );
};

export default DailyReportPage;
