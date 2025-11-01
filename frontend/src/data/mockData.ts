import { 
  Employee, 
  EmployeeDetails, 
  VibeZone, 
  VibeResponse, 
  ActivityData, 
  LeaveData,
  PerformanceData,
  RewardData,
  OnboardingData,
  AiConversation
} from '../types/employee';

const vibeZones: VibeZone[] = ['Frustrated', 'Sad', 'Okay', 'Happy', 'Excited'];

// Helper function to generate random date between start and end
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Helper function to generate random vibe responses
const generateVibeHistory = (employeeId: number, count: number): VibeResponse[] => {
  const result: VibeResponse[] = [];
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  const sentiments = ['positive', 'neutral', 'negative'] as const;
  const tags = [
    'work-life balance', 'workload', 'team dynamics', 'management', 
    'career growth', 'compensation', 'recognition', 'project satisfaction'
  ];

  for (let i = 0; i < count; i++) {
    const vibeZone = vibeZones[Math.floor(Math.random() * vibeZones.length)];
    const score = vibeZone === 'Frustrated' ? 1 + Math.random() * 2 : 
                 vibeZone === 'Sad' ? 3 + Math.random() * 2 : 
                 vibeZone === 'Okay' ? 5 + Math.random() * 2 :
                 vibeZone === 'Happy' ? 7 + Math.random() * 2 :
                 8 + Math.random() * 2; // Excited
    
    // Assign sentiment based on vibe
    const sentiment = vibeZone === 'Frustrated' || vibeZone === 'Sad' ? 'negative' :
                     vibeZone === 'Okay' ? 'neutral' : 'positive';
    
    // Generate random tags (1-3)
    const vibeTags: string[] = [];
    const tagCount = 1 + Math.floor(Math.random() * 3);
    for (let j = 0; j < tagCount; j++) {
      const tag = tags[Math.floor(Math.random() * tags.length)];
      if (!vibeTags.includes(tag)) vibeTags.push(tag);
    }

    // Generate feedback based on vibe
    const feedbackPool = {
      Frustrated: [
        "Too much workload and tight deadlines",
        "Feeling overwhelmed with current responsibilities",
        "Lack of support from management"
      ],
      Sad: [
        "Missing connection with the team",
        "Feeling undervalued in current role",
        "Personal issues affecting work life"
      ],
      Okay: [
        "Regular day, nothing special to report",
        "Work is proceeding as expected",
        "Balanced workload, but nothing exciting"
      ],
      Happy: [
        "Great team collaboration on current project",
        "Received positive feedback from client",
        "Enjoying current responsibilities"
      ],
      Excited: [
        "Just completed a challenging project successfully",
        "New opportunities for growth within the team",
        "Recognition for recent achievements"
      ]
    };

    const feedback = feedbackPool[vibeZone][Math.floor(Math.random() * feedbackPool[vibeZone].length)];
    
    result.push({
      id: i + 1,
      employeeId: Number(employeeId),
      date: randomDate(sixMonthsAgo, today),
      score,
      vibeZone,
      feedback,
      sentiment,
      tags: vibeTags,
      triggerFlags: (vibeZone === 'Frustrated' || vibeZone === 'Sad') && Math.random() < 0.3
    });
  }

  // Sort by date, most recent first
  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate activity data
const generateActivityData = (employeeId: number, count: number): ActivityData[] => {
  const result: ActivityData[] = [];
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  for (let i = 0; i < count; i++) {
    result.push({
      id: i + 1,
      employeeId,
      date: randomDate(threeMonthsAgo, today),
      hoursWorked: 7 + Math.random() * 3,
      afterHoursWork: Math.random() * 2,
      meetingsAttended: Math.floor(Math.random() * 8),
      emailsSent: Math.floor(Math.random() * 40) + 10
    });
  }

  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate leave data
const generateLeaveData = (employeeId: number, count: number): LeaveData[] => {
  const result: LeaveData[] = [];
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  const leaveTypes = ['Annual', 'Sick', 'Personal', 'Bereavement', 'Other'] as const;
  const statuses = ['Approved', 'Pending', 'Rejected'] as const;

  for (let i = 0; i < count; i++) {
    const startDate = new Date(randomDate(oneYearAgo, today));
    const daysCount = Math.floor(Math.random() * 5) + 1;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + daysCount);

    result.push({
      id: i + 1,
      employeeId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      type: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      daysCount
    });
  }

  return result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
};

// Generate performance data
const generatePerformanceData = (employeeId: number, count: number): PerformanceData[] => {
  const result: PerformanceData[] = [];
  const today = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  const strengthsPool = [
    'Strong communication', 'Leadership', 'Problem solving', 'Team player',
    'Technical excellence', 'Client relations', 'Creativity', 'Adaptability'
  ];
  
  const improvementPool = [
    'Time management', 'Delegation skills', 'Technical knowledge in specific area',
    'Communication with management', 'Documentation', 'Work-life balance',
    'Conflict resolution', 'Strategic thinking'
  ];

  const goalsPool = [
    'Improve client satisfaction by 15%', 'Complete certification',
    'Mentor 2 junior team members', 'Reduce project delivery time by 10%',
    'Learn new technology/tool', 'Improve documentation standards',
    'Take on leadership role in project', 'Contribute to team knowledge sharing'
  ];

  for (let i = 0; i < count; i++) {
    // Generate random strengths, areas for improvement, and goals
    const strengths: string[] = [];
    const areasForImprovement: string[] = [];
    const goals: string[] = [];
    
    // Add 2-3 random strengths
    for (let j = 0; j < 2 + Math.floor(Math.random() * 2); j++) {
      const strength = strengthsPool[Math.floor(Math.random() * strengthsPool.length)];
      if (!strengths.includes(strength)) strengths.push(strength);
    }
    
    // Add 1-3 areas for improvement
    for (let j = 0; j < 1 + Math.floor(Math.random() * 3); j++) {
      const area = improvementPool[Math.floor(Math.random() * improvementPool.length)];
      if (!areasForImprovement.includes(area)) areasForImprovement.push(area);
    }
    
    // Add 2-4 goals
    for (let j = 0; j < 2 + Math.floor(Math.random() * 3); j++) {
      const goal = goalsPool[Math.floor(Math.random() * goalsPool.length)];
      if (!goals.includes(goal)) goals.push(goal);
    }

    result.push({
      id: i + 1,
      employeeId,
      reviewDate: randomDate(twoYearsAgo, today),
      rating: (Math.floor(Math.random() * 5) + 1) as 1 | 2 | 3 | 4 | 5,
      feedback: `Overall performance is ${['below expectations', 'meeting expectations', 'exceeding expectations'][Math.floor(Math.random() * 3)]}.`,
      strengths,
      areasForImprovement,
      goals
    });
  }

  return result.sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());
};

// Generate rewards data
const generateRewardsData = (employeeId: number, count: number): RewardData[] => {
  const result: RewardData[] = [];
  const today = new Date();
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(today.getFullYear() - 3);
  
  const rewardTypes = ['Bonus', 'Promotion', 'Award', 'Recognition'] as const;
  const descriptions = [
    'Quarterly performance bonus', 'Annual bonus', 'Spot bonus for exceptional work',
    'Promotion to Senior position', 'Promotion to Lead position', 'Promotion to Manager',
    'Employee of the month', 'Team player award', 'Innovation award',
    'Client satisfaction recognition', 'Project completion recognition', 'Years of service recognition'
  ];

  for (let i = 0; i < count; i++) {
    const type = rewardTypes[Math.floor(Math.random() * rewardTypes.length)];
    
    result.push({
      id: i + 1,
      employeeId,
      date: randomDate(threeYearsAgo, today),
      type,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      amount: type === 'Bonus' ? Math.floor(Math.random() * 5000) + 1000 : undefined
    });
  }

  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate onboarding data
const generateOnboardingData = (employeeId: number): OnboardingData[] => {
  const result: OnboardingData[] = [];
  const joinDate = new Date(mockEmployees.find(e => e.id === employeeId)?.joinDate || new Date());
  const oneMonthAfter = new Date(joinDate);
  oneMonthAfter.setMonth(joinDate.getMonth() + 1);
  
  const challengesPool = [
    'Understanding company processes', 'Learning company tools',
    'Getting access to systems', 'Getting to know the team remotely',
    'Navigating the organization structure', 'Understanding role expectations',
    'Technical setup challenges', 'Information overload'
  ];

  // 1-2 onboarding feedback entries
  for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
    const challenges: string[] = [];
    
    // Add 1-3 challenges
    for (let j = 0; j < 1 + Math.floor(Math.random() * 3); j++) {
      const challenge = challengesPool[Math.floor(Math.random() * challengesPool.length)];
      if (!challenges.includes(challenge)) challenges.push(challenge);
    }

    result.push({
      id: i + 1,
      employeeId,
      date: randomDate(joinDate, oneMonthAfter),
      satisfactionRating: (Math.floor(Math.random() * 5) + 1) as 1 | 2 | 3 | 4 | 5,
      feedback: `Onboarding experience was ${['challenging but rewarding', 'smooth and well-organized', 'somewhat disorganized', 'comprehensive', 'helpful but overwhelming'][Math.floor(Math.random() * 5)]}.`,
      challenges
    });
  }

  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate AI conversations
const generateAiConversations = (employeeId: number, count: number): AiConversation[] => {
  const result: AiConversation[] = [];
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  
  const botOpeners = [
    "Hello! I noticed your Vibemeter response was in the [VIBE] zone. How are you feeling today?",
    "Hi there! Your recent mood seems to be [VIBE]. Would you like to talk about it?",
    "I saw that you've been feeling [VIBE] lately. Is there anything you'd like to discuss?",
    "Your well-being matters to us. I noticed you've been in the [VIBE] zone. How can I help?"
  ];
  
  const employeeResponses = {
    Frustrated: [
      "I'm just overwhelmed with the workload right now.",
      "I've been working long hours and don't feel appreciated.",
      "My project deadlines are unrealistic and I'm feeling the pressure.",
      "I don't think my skills are being utilized properly."
    ],
    Sad: [
      "I miss the team interaction since we've been working remotely.",
      "I didn't get the promotion I was hoping for.",
      "I'm going through some personal challenges right now.",
      "I feel like I'm not making progress in my career."
    ],
    Okay: [
      "Things are fine, just the usual ups and downs.",
      "I'm doing alright, thanks for checking in.",
      "Nothing special to report, just a normal week.",
      "I'm managing okay, though could be better."
    ],
    Happy: [
      "I'm feeling good about the progress on my current project.",
      "My team has been very supportive lately.",
      "I received positive feedback from a client today.",
      "I'm enjoying the new challenge I've been given."
    ],
    Excited: [
      "I just got assigned to a project I'm really passionate about!",
      "My innovative idea got approved by management.",
      "I'm thrilled about the upcoming team offsite.",
      "I'm excited about the new skills I'm developing."
    ]
  };
  
  const botFollowUps = {
    Frustrated: [
      "I understand that feeling overwhelmed can be difficult. Have you discussed your workload with your manager?",
      "Working long hours consistently can impact your well-being. Would taking some time off help?",
      "Unrealistic deadlines can be stressful. Would you like me to flag this to your department head?"
    ],
    Sad: [
      "Remote work can be isolating. Have you considered joining any of our virtual social events?",
      "Not getting a promotion can be disappointing. Would it help to discuss a career development plan?",
      "I'm sorry to hear you're going through challenges. Would you like information about our employee assistance program?"
    ],
    Okay: [
      "It's good to hear you're doing okay. Is there anything specific that could help improve your experience?",
      "Thanks for sharing. Remember that you can reach out if you need any support in the future."
    ],
    Happy: [
      "That's great to hear! What aspects of your project are you enjoying the most?",
      "Supportive teams make a big difference. Would you like to share any specific positive experiences?"
    ],
    Excited: [
      "It's wonderful to see you so passionate! What are you looking forward to most?",
      "That sounds amazing! Is there anything you need to make this experience even better?"
    ]
  };

  const conversationTags = [
    'workload', 'career development', 'team dynamics', 'personal issues',
    'work environment', 'project feedback', 'communication', 'well-being'
  ];

  // Generate random vibe zone for each conversation
  for (let i = 0; i < count; i++) {
    const vibeZone = vibeZones[Math.floor(Math.random() * vibeZones.length)];
    const conversationDate = randomDate(sixMonthsAgo, today);
    
    // Determine if conversation should be escalated based on vibe (more likely for negative vibes)
    const escalated = vibeZone === 'Frustrated' || vibeZone === 'Sad' 
      ? Math.random() < 0.3  // 30% chance for negative vibes
      : Math.random() < 0.05; // 5% chance for other vibes
    
    // Set requiresAttention based on similar logic but with different probability
    const requiresAttention = vibeZone === 'Frustrated' || vibeZone === 'Sad'
      ? Math.random() < 0.4  // 40% chance for negative vibes
      : Math.random() < 0.1; // 10% chance for other vibes
    
    // Generate summary and action items
    const summary = `Employee expressed feeling ${vibeZone.toLowerCase()} due to ${
      vibeZone === 'Frustrated' ? 'work pressure and long hours.' :
      vibeZone === 'Sad' ? 'personal challenges and career concerns.' :
      vibeZone === 'Okay' ? 'routine work environment.' :
      vibeZone === 'Happy' ? 'positive project progress and team support.' :
      'exciting new opportunities and recognition.'
    }`;
    
    const actionItems = [];
    if (vibeZone === 'Frustrated' || vibeZone === 'Sad') {
      actionItems.push('Schedule follow-up conversation in 3 days');
      if (escalated) actionItems.push('Alert HR manager for direct intervention');
      actionItems.push('Provide resources for work-life balance');
      if (vibeZone === 'Frustrated') actionItems.push('Review workload allocation with manager');
      if (vibeZone === 'Sad') actionItems.push('Share information about employee assistance program');
    } else if (vibeZone === 'Okay') {
      actionItems.push('Regular check-in in 2 weeks');
      actionItems.push('Share upcoming team events');
    } else {
      actionItems.push('Capture positive feedback for team recognition');
      actionItems.push('Consider employee for mentoring opportunities');
    }

    // Generate 1-3 tags for the conversation
    const convTags: string[] = [];
    const tagCount = 1 + Math.floor(Math.random() * 3);
    for (let j = 0; j < tagCount; j++) {
      const tag = conversationTags[Math.floor(Math.random() * conversationTags.length)];
      if (!convTags.includes(tag)) convTags.push(tag);
    }
    
    // Create messages array
    const opener = botOpeners[Math.floor(Math.random() * botOpeners.length)].replace('[VIBE]', vibeZone.toLowerCase());
    const employeeResponse = employeeResponses[vibeZone][Math.floor(Math.random() * employeeResponses[vibeZone].length)];
    const followUp = botFollowUps[vibeZone][Math.floor(Math.random() * botFollowUps[vibeZone].length)];
    
    const messages = [
      {
        id: 1,
        conversationId: i + 1,
        sender: 'bot' as const,
        content: opener,
        timestamp: conversationDate
      },
      {
        id: 2,
        conversationId: i + 1,
        sender: 'employee' as const,
        content: employeeResponse,
        timestamp: new Date(new Date(conversationDate).getTime() + 5 * 60000).toISOString() // 5 minutes later
      },
      {
        id: 3,
        conversationId: i + 1,
        sender: 'bot' as const,
        content: followUp,
        timestamp: new Date(new Date(conversationDate).getTime() + 7 * 60000).toISOString() // 7 minutes later
      }
    ];
    
    // Add more exchanges if needed
    if (Math.random() > 0.5) {
      messages.push({
        id: 4,
        conversationId: i + 1,
        sender: 'employee' as const,
        content: "Yes, that would be helpful. Thank you for checking in.",
        timestamp: new Date(new Date(conversationDate).getTime() + 10 * 60000).toISOString() // 10 minutes later
      });
      
      messages.push({
        id: 5,
        conversationId: i + 1,
        sender: 'bot' as const,
        content: "You're welcome. I'll make sure to follow up with the appropriate resources. Is there anything else you'd like to discuss today?",
        timestamp: new Date(new Date(conversationDate).getTime() + 12 * 60000).toISOString() // 12 minutes later
      });
    }
    
    // Determine sentiment based on vibe
    const sentiment = vibeZone === 'Frustrated' || vibeZone === 'Sad' ? 'negative' :
                     vibeZone === 'Okay' ? 'neutral' : 'positive';

    result.push({
      id: i + 1,
      employeeId: Number(employeeId),
      date: conversationDate,
      messages,
      summary,
      sentiment,
      actionItems,
      requiresAttention,
      escalated,
      tags: convTags
    });
  }
  
  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Mock employees base data
export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Emily Johnson',
    email: 'emily.johnson@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    manager: 'Michael Chen',
    joinDate: '2021-03-15',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    lastVibe: 'Happy'
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    phone: '+1 (555) 234-5678',
    department: 'Marketing',
    position: 'Marketing Specialist',
    manager: 'Sarah Thompson',
    joinDate: '2022-01-10',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastVibe: 'Frustrated'
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    email: 'sophia.rodriguez@company.com',
    phone: '+1 (555) 345-6789',
    department: 'HR',
    position: 'HR Coordinator',
    manager: 'Robert Jones',
    joinDate: '2020-09-22',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    lastVibe: 'Okay'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@company.com',
    phone: '+1 (555) 456-7890',
    department: 'Finance',
    position: 'Financial Analyst',
    manager: 'Jennifer Wu',
    joinDate: '2021-11-05',
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    lastVibe: 'Sad'
  },
  {
    id: 5,
    name: 'Emma Davis',
    email: 'emma.davis@company.com',
    phone: '+1 (555) 567-8901',
    department: 'Product',
    position: 'Product Manager',
    manager: 'Thomas Brown',
    joinDate: '2020-06-17',
    profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    lastVibe: 'Excited'
  },
  {
    id: 6,
    name: 'Michael Chang',
    email: 'michael.chang@company.com',
    phone: '+1 (555) 678-9012',
    department: 'Engineering',
    position: 'DevOps Engineer',
    manager: 'Michael Chen',
    joinDate: '2022-02-28',
    profileImage: 'https://randomuser.me/api/portraits/men/6.jpg',
    lastVibe: 'Okay'
  },
  {
    id: 7,
    name: 'Olivia Martinez',
    email: 'olivia.martinez@company.com',
    phone: '+1 (555) 789-0123',
    department: 'Sales',
    position: 'Account Executive',
    manager: 'William Taylor',
    joinDate: '2021-08-09',
    profileImage: 'https://randomuser.me/api/portraits/women/7.jpg',
    lastVibe: 'Happy'
  },
  {
    id: 8,
    name: 'Ethan Williams',
    email: 'ethan.williams@company.com',
    phone: '+1 (555) 890-1234',
    department: 'Customer Support',
    position: 'Support Specialist',
    manager: 'Elizabeth Green',
    joinDate: '2022-04-11',
    profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
    lastVibe: 'Frustrated'
  },
  {
    id: 9,
    name: 'Ava Thompson',
    email: 'ava.thompson@company.com',
    phone: '+1 (555) 901-2345',
    department: 'Design',
    position: 'UI/UX Designer',
    manager: 'Daniel Robinson',
    joinDate: '2021-05-03',
    profileImage: 'https://randomuser.me/api/portraits/women/9.jpg',
    lastVibe: 'Excited'
  },
  {
    id: 10,
    name: 'Noah Garcia',
    email: 'noah.garcia@company.com',
    phone: '+1 (555) 012-3456',
    department: 'Engineering',
    position: 'Frontend Developer',
    manager: 'Michael Chen',
    joinDate: '2022-03-14',
    profileImage: 'https://randomuser.me/api/portraits/men/10.jpg',
    lastVibe: 'Sad'
  }
];

// Generate detailed employee data
export const mockEmployeeDetails: EmployeeDetails[] = mockEmployees.map(employee => {
  // Get data items for this employee
  const employeeId = Number(employee.id);
  const vibeHistory = generateVibeHistory(employeeId, 30);
  const activityData = generateActivityData(employeeId, 20);
  const leaveData = generateLeaveData(employeeId, 5);
  const performanceData = generatePerformanceData(employeeId, 3);
  const rewardData = generateRewardsData(employeeId, 4);
  const onboardingData = generateOnboardingData(employeeId);
  const aiConversations = generateAiConversations(employeeId, 6);
  
  // Extract strengths, areas for improvement, goals from performance data
  const strengths = performanceData.length > 0 ? [...performanceData[0].strengths] : ['Communication', 'Problem solving'];
  const areasForImprovement = performanceData.length > 0 ? [...performanceData[0].areasForImprovement] : ['Time management'];
  const goals = performanceData.length > 0 ? [...performanceData[0].goals] : ['Complete training', 'Improve skills'];
  
  // Extract challenges from onboarding data
  const challenges = onboardingData.length > 0 ? [...onboardingData[0].challenges] : ['Learning company processes'];
  
  // Calculate scores based on available data
  const performanceScore = performanceData.length > 0 
    ? performanceData.reduce((sum, pd) => sum + pd.rating, 0) / performanceData.length * 2 // Scale to 0-10
    : 5 + Math.random() * 3; // Default 5-8
  
  const workloadScore = activityData.length > 0
    ? 10 - (activityData.reduce((sum, ad) => sum + ad.hoursWorked + ad.afterHoursWork, 0) / activityData.length - 8) // Higher hours = lower score
    : 5 + Math.random() * 3;
  
  const leaveUtilizedScore = leaveData.length > 0
    ? Math.min(10, leaveData.reduce((sum, ld) => sum + (ld.status === 'Approved' ? ld.daysCount : 0), 0)) // More utilized leave = higher score
    : Math.random() * 5;
  
  const rewardScore = rewardData.length > 0
    ? Math.min(10, rewardData.length * 2)
    : Math.random() * 5;
  
  const engagementScore = vibeHistory.length > 0
    ? vibeHistory.reduce((sum, vibe) => sum + vibe.score, 0) / vibeHistory.length
    : 5 + Math.random() * 3;

  return {
    id: employeeId,
    employeeId: employeeId,
    vibeHistory,
    activityData,
    leaveData,
    performanceData,
    rewardData,
    onboardingData,
    aiConversations,
    performanceScore,
    workloadScore,
    leaveUtilizedScore,
    rewardScore,
    engagementScore,
    strengths,
    areasForImprovement,
    goals,
    challenges
  };
});

// Helper function to get a specific employee's details
export const getEmployeeDetails = (id: number): EmployeeDetails | undefined => {
  return mockEmployeeDetails.find(employee => employee.id === id);
}; 