import { useMemo } from 'react';
import { 
  Card, CardContent, Typography, Box, 
  Grid, Divider, Chip, LinearProgress, 
  useTheme
} from '@mui/material';
import { 
  Chat as ChatIcon, 
  Warning as WarningIcon, 
  Escalator as EscalatorIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { AiConversation } from '../../types/employee';

interface AiBotStatsCardProps {
  conversations: AiConversation[];
}

const AiBotStatsCard = ({ conversations }: AiBotStatsCardProps) => {
  const theme = useTheme();
  
  const stats = useMemo(() => {
    const totalConversations = conversations.length;
    const escalatedCount = conversations.filter(c => c.escalated || c.requiresAttention).length;
    const escalationRate = totalConversations > 0 
      ? (escalatedCount / totalConversations) * 100 
      : 0;
    
    // Get unique employee count
    const uniqueEmployees = new Set(conversations.map(c => c.employeeId)).size;
    
    // Count conversations by vibe zone sentiment based on summary
    const vibeCounts = {
      'frustrated': 0,
      'sad': 0,
      'okay': 0,
      'happy': 0,
      'excited': 0
    };
    
    conversations.forEach(conv => {
      const summary = conv.summary.toLowerCase();
      if (summary.includes('frustrated')) vibeCounts.frustrated++;
      else if (summary.includes('sad')) vibeCounts.sad++;
      else if (summary.includes('okay')) vibeCounts.okay++;
      else if (summary.includes('happy')) vibeCounts.happy++;
      else if (summary.includes('excited')) vibeCounts.excited++;
    });
    
    // Find most common action item
    const actionItems: Record<string, number> = {};
    conversations.forEach(conv => {
      conv.actionItems.forEach(item => {
        actionItems[item] = (actionItems[item] || 0) + 1;
      });
    });
    
    const mostCommonAction = Object.entries(actionItems)
      .sort((a, b) => b[1] - a[1])
      .map(([action]) => action)[0] || 'No actions recorded';
    
    return {
      totalConversations,
      escalatedCount,
      escalationRate,
      uniqueEmployees,
      vibeCounts,
      mostCommonAction
    };
  }, [conversations]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          AI Bot Conversation Metrics
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Stats on employee engagement with the AI assistant
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <ChatIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h5">{stats.totalConversations}</Typography>
              <Typography variant="body2" color="text.secondary">Total Conversations</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <PersonIcon color="info" sx={{ fontSize: 40 }} />
              <Typography variant="h5">{stats.uniqueEmployees}</Typography>
              <Typography variant="body2" color="text.secondary">Unique Employees</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <EscalatorIcon color="warning" sx={{ fontSize: 40 }} />
              <Typography variant="h5">{stats.escalatedCount}</Typography>
              <Typography variant="body2" color="text.secondary">Escalated Issues</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <WarningIcon color="error" sx={{ fontSize: 40 }} />
              <Typography variant="h5">{stats.escalationRate.toFixed(1)}%</Typography>
              <Typography variant="body2" color="text.secondary">Escalation Rate</Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" gutterBottom>
          Mood Distribution in Conversations
        </Typography>
        
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 100 }}>Frustrated</Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.totalConversations > 0 ? (stats.vibeCounts.frustrated / stats.totalConversations) * 100 : 0} 
                sx={{ 
                  width: '100%', 
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 77, 79, 0.2)' : 'rgba(255, 77, 79, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#ff4d4f',
                  }
                }} 
              />
              <Typography variant="body2" sx={{ ml: 1, minWidth: 30 }}>
                {stats.vibeCounts.frustrated}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 100 }}>Sad</Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.totalConversations > 0 ? (stats.vibeCounts.sad / stats.totalConversations) * 100 : 0} 
                sx={{ 
                  width: '100%', 
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(250, 173, 20, 0.2)' : 'rgba(250, 173, 20, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#faad14',
                  }
                }} 
              />
              <Typography variant="body2" sx={{ ml: 1, minWidth: 30 }}>
                {stats.vibeCounts.sad}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 100 }}>Okay</Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.totalConversations > 0 ? (stats.vibeCounts.okay / stats.totalConversations) * 100 : 0} 
                sx={{ 
                  width: '100%', 
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(24, 144, 255, 0.2)' : 'rgba(24, 144, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1890ff',
                  }
                }} 
              />
              <Typography variant="body2" sx={{ ml: 1, minWidth: 30 }}>
                {stats.vibeCounts.okay}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 100 }}>Happy</Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.totalConversations > 0 ? (stats.vibeCounts.happy / stats.totalConversations) * 100 : 0} 
                sx={{ 
                  width: '100%', 
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(82, 196, 26, 0.2)' : 'rgba(82, 196, 26, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#52c41a',
                  }
                }} 
              />
              <Typography variant="body2" sx={{ ml: 1, minWidth: 30 }}>
                {stats.vibeCounts.happy}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 100 }}>Excited</Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.totalConversations > 0 ? (stats.vibeCounts.excited / stats.totalConversations) * 100 : 0} 
                sx={{ 
                  width: '100%', 
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(114, 46, 209, 0.2)' : 'rgba(114, 46, 209, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#722ed1',
                  }
                }} 
              />
              <Typography variant="body2" sx={{ ml: 1, minWidth: 30 }}>
                {stats.vibeCounts.excited}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" gutterBottom>
          Most Common Action
        </Typography>
        <Chip 
          label={stats.mostCommonAction} 
          color="primary" 
          sx={{ mt: 1 }} 
        />
      </CardContent>
    </Card>
  );
};

export default AiBotStatsCard; 