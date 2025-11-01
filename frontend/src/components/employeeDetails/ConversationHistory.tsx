import { useState } from 'react';
import { 
  Card, CardContent, Typography, Box, 
  Accordion, AccordionSummary, AccordionDetails,
  Chip, Divider, Avatar, useTheme,
  List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  Chat as ChatIcon,
  Warning as WarningIcon,
  Check as CheckIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon
} from '@mui/icons-material';
import { AiConversation, AiMessage } from '../../types/employee';

interface ConversationHistoryProps {
  conversations: AiConversation[];
}

const ConversationHistory = ({ conversations }: ConversationHistoryProps) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | number | false>(false);

  const handleChange = (panel: string | number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageContent = (message: AiMessage) => {
    return message.content || message.text || '';
  };

  const getMessageTimestamp = (message: AiMessage) => {
    return new Date(message.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (conversations.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            AI Conversation History
          </Typography>
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No conversations recorded with this employee.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          AI Conversation History
        </Typography>
        
        {conversations.map((conversation) => (
          <Accordion 
            key={conversation.id}
            expanded={expanded === conversation.id}
            onChange={handleChange(conversation.id)}
            sx={{ 
              mb: 2,
              border: (conversation.escalated || conversation.requiresAttention)
                ? `1px solid ${theme.palette.error.main}` 
                : `1px solid ${theme.palette.divider}`,
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.03)',
                borderLeft: (conversation.escalated || conversation.requiresAttention)
                  ? `4px solid ${theme.palette.error.main}` 
                  : 'none',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <ChatIcon 
                  sx={{ 
                    mr: 2, 
                    color: (conversation.escalated || conversation.requiresAttention)
                      ? theme.palette.error.main 
                      : theme.palette.primary.main 
                  }} 
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">
                    Conversation on {formatDate(conversation.date)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {conversation.summary}
                  </Typography>
                </Box>
                
                {(conversation.escalated || conversation.requiresAttention) && (
                  <Chip 
                    icon={<WarningIcon />} 
                    label="Needs Attention" 
                    color="error" 
                    size="small"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>
            </AccordionSummary>
            
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                {conversation.messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      mb: 2,
                      flexDirection: message.sender === 'bot' || message.sender === 'ai' ? 'row' : 'row-reverse',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: message.sender === 'bot' || message.sender === 'ai' 
                          ? theme.palette.primary.main 
                          : theme.palette.secondary.main,
                        width: 36,
                        height: 36,
                        mr: message.sender === 'bot' || message.sender === 'ai' ? 1 : 0,
                        ml: message.sender === 'employee' ? 1 : 0,
                      }}
                    >
                      {message.sender === 'bot' || message.sender === 'ai' ? <BotIcon /> : <PersonIcon />}
                    </Avatar>
                    
                    <Box
                      sx={{
                        maxWidth: '80%',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: message.sender === 'bot' || message.sender === 'ai'
                          ? theme.palette.mode === 'dark' 
                            ? 'rgba(25, 118, 210, 0.1)' 
                            : 'rgba(25, 118, 210, 0.05)'
                          : theme.palette.mode === 'dark'
                            ? 'rgba(156, 39, 176, 0.1)'
                            : 'rgba(156, 39, 176, 0.05)',
                      }}
                    >
                      <Typography variant="body1">{getMessageContent(message)}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        {getMessageTimestamp(message)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PlaylistAddCheckIcon sx={{ mr: 1 }} />
                  Action Items
                </Box>
              </Typography>
              
              <List dense>
                {conversation.actionItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
};

export default ConversationHistory; 