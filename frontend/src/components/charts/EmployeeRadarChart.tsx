import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { EmployeeDetails } from '../../types/employee';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface EmployeeRadarChartProps {
  employee: EmployeeDetails;
}

const EmployeeRadarChart = ({ employee }: EmployeeRadarChartProps) => {
  const theme = useTheme();

  // Calculate average vibe from vibe history
  const vibeAverage = employee.vibeHistory.length > 0
    ? employee.vibeHistory.reduce((acc, curr) => acc + curr.score, 0) / employee.vibeHistory.length
    : 0;

  // Normalize all values to 0-100 range for radar chart
  const normalizedData = {
    vibeAverage: (vibeAverage / 10) * 100,
    leaveUtilized: employee.leaveUtilizedScore,
    workload: employee.workloadScore,
    performance: employee.performanceScore,
    reward: employee.rewardScore,
    engagement: employee.engagementScore
  };

  const data = {
    labels: [
      'Vibe Average',
      'Leave Utilized',
      'Workload',
      'Performance', 
      'Reward',
      'Engagement'
    ],
    datasets: [
      {
        label: 'Employee Health Metrics',
        data: [
          normalizedData.vibeAverage,
          normalizedData.leaveUtilized,
          normalizedData.workload,
          normalizedData.performance,
          normalizedData.reward,
          normalizedData.engagement
        ],
        backgroundColor: `${theme.palette.primary.main}33`, // with alpha
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        pointBackgroundColor: theme.palette.primary.dark,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: theme.palette.primary.dark
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    maintainAspectRatio: false
  };

  return (
    <Box sx={{ height: 350, width: '100%', position: 'relative' }}>
      <Radar data={data} options={options} />
    </Box>
  );
};

export default EmployeeRadarChart; 