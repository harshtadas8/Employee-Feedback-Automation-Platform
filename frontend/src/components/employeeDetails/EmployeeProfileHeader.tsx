import { Box, Avatar, Typography, Chip, Grid, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { Employee, EmployeeDetails, VibeZone } from "../../types/employee";
import {
  getVibeColor,
  getVibeLabel,
  getVibeZoneColor,
} from "../../utils/vibeUtils";

interface EmployeeProfileHeaderProps {
  employee: Employee;
  employeeDetails: EmployeeDetails;
}

const EmployeeProfileHeader = ({
  employee,
  employeeDetails,
}: EmployeeProfileHeaderProps) => {
  // Calculate the average vibe score
  const avgVibe =
    employeeDetails.vibeHistory.length > 0
      ? employeeDetails.vibeHistory.reduce((acc, curr) => acc + curr.score, 0) /
        employeeDetails.vibeHistory.length
      : 0;

  // Get the most recent vibe
  const latestVibe =
    employeeDetails.vibeHistory.length > 0
      ? employeeDetails.vibeHistory[employeeDetails.vibeHistory.length - 1]
      : null;

  const latestScore = latestVibe ? latestVibe.score : 0;
  const latestVibeZone = latestVibe ? latestVibe.vibeZone : undefined;

  // Format date for display
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={employee.avatarUrl || employee.profileImage}
              alt={employee.name}
              sx={{ width: 100, height: 100, mr: 3 }}
            />
            <Box>
              <Typography variant="h4">{employee.name}</Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {employee.title || employee.position || "No title"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Chip
                  icon={<WorkIcon />}
                  label={`${employee.department}`}
                  variant="outlined"
                  size="small"
                />
                {employee.joinDate && (
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={`Joined: ${formatDate(employee.joinDate)}`}
                    variant="outlined"
                    size="small"
                  />
                )}
                {employee.location && (
                  <Chip
                    icon={<PlaceIcon />}
                    label={employee.location}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                  {employee.email}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <LocalPhoneIcon fontSize="small" sx={{ mr: 1 }} />
                  {employee.phone}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minWidth: 180,
            }}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ textAlign: "center" }}
            >
              Vibemeter Status
            </Typography>

            <Box sx={{ textAlign: "center", mb: 2 }}>
              {latestVibeZone ? (
                <>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: getVibeZoneColor(latestVibeZone),
                    }}
                  >
                    {latestVibeZone}
                  </Typography>
                  <Chip
                    label={`Score: ${latestScore.toFixed(1)}`}
                    sx={{
                      bgcolor: getVibeZoneColor(latestVibeZone),
                      color: "#fff",
                    }}
                  />
                </>
              ) : (
                <>
                  <Typography
                    variant="h3"
                    sx={{
                      color: getVibeColor(latestScore),
                      fontWeight: "bold",
                    }}
                  >
                    {latestScore.toFixed(1)}
                  </Typography>
                  <Chip
                    label={getVibeLabel(latestScore)}
                    sx={{
                      bgcolor: getVibeColor(latestScore),
                      color: "#fff",
                    }}
                  />
                </>
              )}
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" gutterBottom>
                Average Vibe
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: getVibeColor(avgVibe),
                }}
              >
                {avgVibe.toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeProfileHeader;
