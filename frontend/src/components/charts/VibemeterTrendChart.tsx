import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { VibeResponse as AppVibeResponse } from '../../types/employee';

// This internal interface is used only within this component
export interface VibeResponse {
  id: string;
  employeeId: string;
  timestamp: Date;
  vibeScore: number;
}

export interface VibemeterTrendChartProps {
  data?: VibeResponse[];
  vibeData?: AppVibeResponse[];
  days?: number;
  title?: string;
  showAverage?: boolean;
  showTrendline?: boolean;
}

const VibemeterTrendChart: React.FC<VibemeterTrendChartProps> = ({
  data,
  vibeData,
  days = 30,
  title = "Vibemeter Trend",
  showAverage = false,
  showTrendline = false
}) => {
  const theme = useTheme();
  
  // Map vibeData to the internal format if provided
  const mappedVibeData = vibeData?.map(vibe => ({
    id: String(vibe.id),
    employeeId: String(vibe.employeeId),
    timestamp: vibe.date instanceof Date ? vibe.date : new Date(vibe.date),
    vibeScore: vibe.score
  }));
  
  // Use vibeData as a fallback for data
  const chartData = data || mappedVibeData || [];

  // Filter data based on the selected time period
  const filteredData = chartData.filter(item => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - new Date(item.timestamp).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  });

  // Group data by date
  const groupedData: { [key: string]: VibeResponse[] } = {};
  filteredData.forEach(item => {
    const date = new Date(item.timestamp).toISOString().split('T')[0];
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(item);
  });

  // Calculate daily averages
  const dailyAverages = Object.keys(groupedData).map(date => {
    const dayData = groupedData[date];
    const avgScore = dayData.reduce((sum, item) => sum + item.vibeScore, 0) / dayData.length;

    return {
      date,
      avgScore,
      count: dayData.length
    };
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate overall average if needed
  const overallAverage = showAverage ? 
    dailyAverages.reduce((sum, item) => sum + item.avgScore, 0) / dailyAverages.length : 
    null;

  // Format data for the chart
  const formattedChartData = dailyAverages.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    avgScore: Number(item.avgScore.toFixed(1)),
    avgScoreRounded: Math.round(item.avgScore),
    count: item.count,
    ...(showTrendline ? { trendline: 0 } : {}),
    ...(showAverage ? { overallAverage } : {})
  }));

  // Calculate trendline if needed
  if (showTrendline && formattedChartData.length > 1) {
    const n = formattedChartData.length;
    const xValues = Array.from({ length: n }, (_, i) => i);
    const yValues = formattedChartData.map(item => item.avgScore);

    // Calculate slope and intercept for linear regression
    const xMean = xValues.reduce((sum, x) => sum + x, 0) / n;
    const yMean = yValues.reduce((sum, y) => sum + y, 0) / n;
    
    const numerator = xValues.reduce((sum, x, i) => sum + (x - xMean) * (yValues[i] - yMean), 0);
    const denominator = xValues.reduce((sum, x) => sum + Math.pow(x - xMean, 2), 0);
    
    const slope = numerator / denominator;
    const intercept = yMean - slope * xMean;

    // Add trendline data
    formattedChartData.forEach((item, index) => {
      item.trendline = Number((slope * index + intercept).toFixed(1));
    });
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: theme.palette.text.secondary }}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis
                domain={[0, 10]}
                tick={{ fill: theme.palette.text.secondary }}
                label={{ 
                  value: 'Vibe Score (0-10)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: theme.palette.text.secondary }
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgScore"
                name="Average Vibe Score"
                stroke={theme.palette.primary.main}
                activeDot={{ r: 8 }}
                isAnimationActive={true}
                strokeWidth={2}
              />
              {showAverage && (
                <Line
                  type="monotone"
                  dataKey="overallAverage"
                  name="Overall Average"
                  stroke={theme.palette.secondary.main}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
              )}
              {showTrendline && (
                <Line
                  type="monotone"
                  dataKey="trendline"
                  name="Trend"
                  stroke="#ff5722"
                  strokeDasharray="3 3"
                  dot={false}
                  activeDot={false}
                  isAnimationActive={true}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>
        {showAverage && overallAverage !== null && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Overall average: {overallAverage.toFixed(1)} / 10
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default VibemeterTrendChart; 