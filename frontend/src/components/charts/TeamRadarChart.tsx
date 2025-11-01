import { FC } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  useTheme 
} from '@mui/material';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface TeamMetrics {
  department: string;
  vibeScore: number;
  engagementScore: number;
  performanceScore: number;
  workloadScore: number;
  rewardScore: number;
  leaveUtilizedScore: number;
}

interface TeamRadarChartProps {
  data: TeamMetrics[];
  title?: string;
}

const TeamRadarChart: FC<TeamRadarChartProps> = ({ data, title = "Team Metrics Comparison" }) => {
  const theme = useTheme();

  // Transform data for radar chart
  const formattedData = [
    { 
      metric: 'Vibe Score', 
      ...data.reduce((acc, team) => ({ ...acc, [team.department]: team.vibeScore }), {})
    },
    { 
      metric: 'Engagement', 
      ...data.reduce((acc, team) => ({ ...acc, [team.department]: team.engagementScore }), {})
    },
    { 
      metric: 'Performance', 
      ...data.reduce((acc, team) => ({ ...acc, [team.department]: team.performanceScore }), {})
    },
    { 
      metric: 'Workload Balance', 
      ...data.reduce((acc, team) => ({ ...acc, [team.department]: team.workloadScore }), {})
    },
    { 
      metric: 'Rewards', 
      ...data.reduce((acc, team) => ({ ...acc, [team.department]: team.rewardScore }), {})
    },
    { 
      metric: 'Leave Utilized', 
      ...data.reduce((acc, team) => ({ ...acc, [team.department]: team.leaveUtilizedScore }), {})
    }
  ];

  // Generate colors for each department
  const departmentColors = {
    'Engineering': '#1f77b4',
    'Marketing': '#ff7f0e',
    'Sales': '#2ca02c',
    'HR': '#d62728',
    'Finance': '#9467bd',
    'Product': '#8c564b',
    'Design': '#e377c2',
    'Customer Support': '#7f7f7f',
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
              <PolarGrid stroke={theme.palette.divider} />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 10]} 
                tick={{ fill: theme.palette.text.secondary }}
              />
              {data.map((team) => (
                <Radar
                  key={team.department}
                  name={team.department}
                  dataKey={team.department}
                  stroke={departmentColors[team.department as keyof typeof departmentColors] || theme.palette.primary.main}
                  fill={departmentColors[team.department as keyof typeof departmentColors] || theme.palette.primary.main}
                  fillOpacity={0.2}
                />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamRadarChart; 