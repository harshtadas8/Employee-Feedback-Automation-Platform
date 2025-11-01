import { useMemo } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import OverviewCards from "../../components/dashboard/OverviewCards";
import VibemeterTrendChart from "../../components/charts/VibemeterTrendChart";
import VibeDistributionChart from "../../components/charts/VibeDistributionChart";
import AiBotStatsCard from "../../components/charts/AiBotStatsCard";
import { mockEmployees, mockEmployeeDetails } from "../../data/mockData";

const Dashboard = () => {
  // Combine all vibe responses from all employees for overall stats
  const allVibeResponses = useMemo(() => {
    return mockEmployeeDetails.flatMap((employee) => employee.vibeHistory);
  }, []);

  // Convert the allVibeResponses to the format expected by VibeDistributionChart
  const formattedVibeResponses = useMemo(() => {
    return allVibeResponses.map((vibe) => ({
      id: String(vibe.id),
      employeeId: String(vibe.employeeId),
      timestamp: vibe.date instanceof Date ? vibe.date : new Date(vibe.date),
      vibeScore: vibe.score,
    }));
  }, [allVibeResponses]);

  // Combine all AI conversations from all employees
  const allConversations = useMemo(() => {
    return mockEmployeeDetails.flatMap((employee) => employee.aiConversations);
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Employee well-being and engagement overview
        </Typography>
      </Box>

      <OverviewCards
        employees={mockEmployees}
        vibeResponses={allVibeResponses}
        conversations={allConversations}
      />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8}>
          <VibemeterTrendChart vibeData={allVibeResponses} />
        </Grid>

        <Grid item xs={12} md={4}>
          <VibeDistributionChart vibeData={formattedVibeResponses} />
        </Grid>

        <Grid item xs={12}>
          <AiBotStatsCard conversations={allConversations} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
