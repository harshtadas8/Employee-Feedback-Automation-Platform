import { 
  Grid, Card, CardContent, Typography, 
  Box, Avatar, useTheme, LinearProgress 
} from '@mui/material';
import { 
  Mood as MoodIcon,
  MoodBad as MoodBadIcon,
  People as PeopleIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import { Employee, VibeResponse, AiConversation } from '../../types/employee';
import { getVibeLabel, isPositiveVibe, isNegativeVibe } from '../../utils/vibeUtils';

interface OverviewCardsProps {
  employees: Employee[];
  vibeResponses: VibeResponse[];
  conversations: AiConversation[];
}

const OverviewCards = ({ employees, vibeResponses, conversations }: OverviewCardsProps) => {
  const theme = useTheme();
  
  // Calculate the percentage of positive vibes
  const positiveVibes = vibeResponses.filter(vibe => isPositiveVibe(vibe)).length;
  const positiveVibePercentage = vibeResponses.length > 0 
    ? (positiveVibes / vibeResponses.length) * 100 
    : 0;
  
  // Calculate percentage of negative vibes
  const negativeVibes = vibeResponses.filter(vibe => isNegativeVibe(vibe)).length;
  const negativeVibePercentage = vibeResponses.length > 0 
    ? (negativeVibes / vibeResponses.length) * 100 
    : 0;
  
  // Count employees needing attention
  const employeesNeedingAttention = new Set(
    vibeResponses.filter(vibe => isNegativeVibe(vibe))
    .map(vibe => vibe.employeeId)
  ).size;
  
  // Count AI conversations
  const totalConversations = conversations.length;
  
  // Count escalated conversations
  const escalatedConversations = conversations.filter(conv => conv.escalated || conv.requiresAttention).length;
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ 
          height: '100%', 
          position: 'relative', 
          overflow: 'hidden',
          borderLeft: '4px solid #52c41a',
        }}>
          <Box
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              opacity: 0.2,
              transform: 'rotate(30deg)',
            }}
          >
            <MoodIcon sx={{ fontSize: 100, color: '#52c41a' }} />
          </Box>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Positive Vibes
            </Typography>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {positiveVibePercentage.toFixed(1)}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={positiveVibePercentage} 
              sx={{ 
                height: 8, 
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(82, 196, 26, 0.2)' : 'rgba(82, 196, 26, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#52c41a',
                }
              }} 
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {positiveVibes} employees reported positive mood
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ 
          height: '100%', 
          position: 'relative', 
          overflow: 'hidden',
          borderLeft: '4px solid #ff4d4f',
        }}>
          <Box
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              opacity: 0.2,
              transform: 'rotate(30deg)',
            }}
          >
            <MoodBadIcon sx={{ fontSize: 100, color: '#ff4d4f' }} />
          </Box>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Negative Vibes
            </Typography>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {negativeVibePercentage.toFixed(1)}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={negativeVibePercentage} 
              sx={{ 
                height: 8, 
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 77, 79, 0.2)' : 'rgba(255, 77, 79, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#ff4d4f',
                }
              }} 
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {negativeVibes} employees reported negative mood
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ 
          height: '100%', 
          position: 'relative', 
          overflow: 'hidden',
          borderLeft: '4px solid #faad14',
        }}>
          <Box
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              opacity: 0.2,
              transform: 'rotate(30deg)',
            }}
          >
            <PeopleIcon sx={{ fontSize: 100, color: '#faad14' }} />
          </Box>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Employees Needing Attention
            </Typography>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {employeesNeedingAttention}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(employeesNeedingAttention / employees.length) * 100} 
              sx={{ 
                height: 8, 
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(250, 173, 20, 0.2)' : 'rgba(250, 173, 20, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#faad14',
                }
              }} 
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {((employeesNeedingAttention / employees.length) * 100).toFixed(1)}% of total employees
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ 
          height: '100%', 
          position: 'relative', 
          overflow: 'hidden',
          borderLeft: '4px solid #1890ff',
        }}>
          <Box
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              opacity: 0.2,
              transform: 'rotate(30deg)',
            }}
          >
            <ChatIcon sx={{ fontSize: 100, color: '#1890ff' }} />
          </Box>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              AI Conversations
            </Typography>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {totalConversations}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={100} 
              sx={{ 
                height: 8, 
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(24, 144, 255, 0.2)' : 'rgba(24, 144, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#1890ff',
                }
              }} 
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {escalatedConversations} conversations need attention
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OverviewCards; 