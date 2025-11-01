import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { VibeResponse } from './VibemeterTrendChart';

export interface VibeDistributionChartProps {
  vibeData: VibeResponse[];
  employeeIds?: string[];
  title?: string;
}

const VibeDistributionChart: React.FC<VibeDistributionChartProps> = ({
  vibeData,
  employeeIds,
  title = "Vibe Distribution"
}) => {
  // Filter by employee IDs if provided
  const filteredData = employeeIds 
    ? vibeData.filter(vibe => employeeIds.includes(vibe.employeeId))
    : vibeData;

  // Define vibe zones and their score ranges
  const vibeZones = [
    { name: 'Critical', range: [0, 2], color: '#f44336' },
    { name: 'Concerned', range: [3, 4], color: '#ff9800' },
    { name: 'Neutral', range: [5, 6], color: '#ffc107' },
    { name: 'Happy', range: [7, 8], color: '#4caf50' },
    { name: 'Very Happy', range: [9, 10], color: '#2e7d32' }
  ];

  // Count vibes in each zone
  const zoneCounts = vibeZones.map(zone => {
    const count = filteredData.filter(vibe => 
      vibe.vibeScore >= zone.range[0] && vibe.vibeScore <= zone.range[1]
    ).length;
    
    return {
      name: zone.name,
      value: count,
      color: zone.color
    };
  });

  // Prepare data for the chart
  const chartData = zoneCounts.filter(zone => zone.value > 0);
  
  // If no data, show a message
  if (chartData.length === 0) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>{title}</Typography>
          <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No data available
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Calculate total for percentages
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} responses (${((value / total) * 100).toFixed(1)}%)`, 'Count']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          Total responses: {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VibeDistributionChart; 