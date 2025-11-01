export type VibeZone = 'Frustrated' | 'Sad' | 'Okay' | 'Happy' | 'Excited';

export interface VibeResponse {
  id: string | number;
  employeeId: string | number;
  date: Date | string;
  score: number;
  vibeZone?: VibeZone;
  feedback: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  tags: string[];
  triggerFlags?: boolean;
}

export interface ActivityData {
  id: number;
  employeeId: number;
  date: string; // ISO date string
  hoursWorked: number;
  afterHoursWork: number;
  meetingsAttended: number;
  emailsSent: number;
}

export interface LeaveData {
  id: number;
  employeeId: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  type: 'Annual' | 'Sick' | 'Personal' | 'Bereavement' | 'Other';
  status: 'Approved' | 'Pending' | 'Rejected';
  daysCount: number;
}

export interface PerformanceData {
  id: number;
  employeeId: number;
  reviewDate: string; // ISO date string
  rating: 1 | 2 | 3 | 4 | 5; // 1 = Poor, 5 = Excellent
  feedback: string;
  goals: string[];
  strengths: string[];
  areasForImprovement: string[];
}

export interface RewardData {
  id: number;
  employeeId: number;
  date: string; // ISO date string
  type: 'Bonus' | 'Promotion' | 'Award' | 'Recognition';
  description: string;
  amount?: number;
}

export interface OnboardingData {
  id: number;
  employeeId: number;
  date: string; // ISO date string
  satisfactionRating: 1 | 2 | 3 | 4 | 5;
  feedback: string;
  challenges: string[];
}

export interface AiConversation {
  id: string | number;
  employeeId: string | number;
  date: Date | string;
  summary: string;
  messages: AiMessage[];
  sentiment: 'positive' | 'neutral' | 'negative';
  actionItems: string[];
  requiresAttention: boolean;
  escalated?: boolean;
  tags: string[];
}

export interface AiMessage {
  id: string | number;
  conversationId?: number;
  sender: 'employee' | 'ai' | 'bot';
  text?: string;
  content?: string;
  timestamp: Date | string;
}

export interface BotReportSummary {
  date: string;
  totalConversations: number;
  issuesDetected: number;
  escalatedIssues: number;
  commonThemes: string[];
  recommendations: string[];
}

export interface AiStats {
  engagementRate: number;
  conversationCount: number;
  averageResponseTime: number;
  sentimentScore: number;
  lastConversationDate?: Date | string;
  responseRate?: number;
  avgConversationLength?: number;
  weeklyInteractions?: number;
  actionableFeedbackRate?: number;
}

export interface Metrics {
  productivity: number;
  satisfaction: number;
  engagement: number;
  retention: number;
  development: number;
  vibeAverage?: number;
}

export interface Employee {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position?: string;
  title?: string;
  location?: string;
  tenure?: number;
  avatarUrl?: string;
  profileImage?: string;
  manager?: string;
  joinDate?: string;
  status?: 'active' | 'onLeave' | 'terminated';
  vibeScore?: number;
  lastVibe?: VibeZone;
  vibeZone?: string | 'very_happy' | 'happy' | 'neutral' | 'concerned' | 'critical';
  aiStats?: AiStats;
  metrics?: Metrics;
  lastContact?: Date | string;
}

export interface EmployeeDetails {
  id: string | number;
  employeeId?: string | number;
  vibeHistory: VibeResponse[];
  activityData?: ActivityData[];
  leaveData?: LeaveData[];
  performanceData?: PerformanceData[];
  rewardData?: RewardData[];
  onboardingData?: OnboardingData[];
  aiConversations: AiConversation[];
  performanceScore: number;
  engagementScore: number;
  rewardScore: number;
  workloadScore: number;
  leaveUtilizedScore: number;
  strengths: string[];
  areasForImprovement: string[];
  goals: string[];
  challenges: string[];
} 