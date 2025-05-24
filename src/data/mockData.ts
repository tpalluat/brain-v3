import { LearningItem, Goal, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Durand',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  preferences: {
    theme: 'dark',
    publicProfile: false,
    visibleSections: {
      learning: true,
      goals: true,
      personality: true,
    },
  },
};

export const mockLearningItems: LearningItem[] = [
  {
    id: '1',
    type: 'book',
    title: 'Atomic Habits',
    description: 'A guide to building good habits and breaking bad ones',
    dateAdded: new Date('2023-06-15'),
    summary: 'This book emphasizes the importance of small, incremental changes to achieve remarkable results. It provides practical strategies for forming good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results.',
    tags: ['self-improvement', 'psychology', 'habits'],
    completed: true,
    aiGenerated: true,
  },
  {
    id: '2',
    type: 'video',
    title: 'How to Learn Anything Fast',
    description: 'YouTube video on accelerated learning techniques',
    dateAdded: new Date('2023-09-22'),
    summary: 'This video explores the concept of the Feynman Technique, spaced repetition, and active recall as powerful tools for learning any subject quickly and effectively.',
    tags: ['learning', 'education', 'productivity'],
    completed: false,
    aiGenerated: true,
  },
  {
    id: '3',
    type: 'course',
    title: 'Machine Learning Fundamentals',
    description: 'Online course covering the basics of machine learning',
    dateAdded: new Date('2023-11-05'),
    summary: 'This course introduces key concepts in machine learning, including supervised and unsupervised learning, neural networks, and practical applications using Python and TensorFlow.',
    tags: ['technology', 'AI', 'programming'],
    completed: false,
    aiGenerated: true,
  },
];

export const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Learn Spanish',
    description: 'Become conversationally fluent in Spanish',
    timeframe: 'yearly',
    progress: 35,
    subGoals: [
      {
        id: '1-1',
        title: 'Complete Duolingo Spanish Tree',
        description: 'Finish all lessons in the Spanish course',
        timeframe: 'monthly',
        progress: 60,
        subGoals: [],
        dateCreated: new Date('2023-01-15'),
        status: 'in-progress',
      },
      {
        id: '1-2',
        title: 'Read a Spanish Book',
        description: 'Read "El Principito" in Spanish',
        timeframe: 'monthly',
        progress: 20,
        subGoals: [],
        dateCreated: new Date('2023-02-10'),
        status: 'in-progress',
      },
    ],
    dateCreated: new Date('2023-01-01'),
    status: 'in-progress',
  },
  {
    id: '2',
    title: 'Run a Marathon',
    description: 'Train and complete a full marathon',
    timeframe: 'yearly',
    progress: 50,
    subGoals: [
      {
        id: '2-1',
        title: 'Run 5km without stopping',
        description: 'Build basic endurance',
        timeframe: 'monthly',
        progress: 100,
        subGoals: [],
        dateCreated: new Date('2023-03-01'),
        dateCompleted: new Date('2023-04-15'),
        status: 'completed',
      },
      {
        id: '2-2',
        title: 'Run 10km race',
        description: 'Participate in local 10km event',
        timeframe: 'monthly',
        progress: 80,
        subGoals: [],
        dateCreated: new Date('2023-04-20'),
        status: 'in-progress',
      },
    ],
    dateCreated: new Date('2023-01-01'),
    status: 'in-progress',
  },
];

export const generateAISummary = (text: string, detailLevel: 'concise' | 'detailed' = 'concise'): string => {
  // In a real app, this would call an AI API
  if (detailLevel === 'concise') {
    return `This is a concise AI-generated summary of the content. It focuses on the key points and main ideas, providing a quick overview that captures the essence of the original material in just a few sentences.`;
  } else {
    return `This is a detailed AI-generated summary of the content. It provides a comprehensive overview of the main ideas, supporting points, and significant details. The summary maintains the structure of the original content while condensing it to about 1/3 of the original length. It includes specific examples, data points, and nuanced arguments that are essential to understanding the full context and implications of the material.`;
  }
};

export const suggestSubGoals = (goalTitle: string): Goal[] => {
  // In a real app, this would call an AI API
  if (goalTitle.toLowerCase().includes('spanish')) {
    return [
      {
        id: 'suggested-1',
        title: 'Learn 500 Common Spanish Words',
        description: 'Focus on most frequently used vocabulary',
        timeframe: 'monthly',
        progress: 0,
        subGoals: [],
        dateCreated: new Date(),
        status: 'not-started',
      },
      {
        id: 'suggested-2',
        title: 'Practice with a Native Speaker',
        description: 'Find a language exchange partner',
        timeframe: 'weekly',
        progress: 0,
        subGoals: [],
        dateCreated: new Date(),
        status: 'not-started',
      },
    ];
  } else if (goalTitle.toLowerCase().includes('marathon')) {
    return [
      {
        id: 'suggested-1',
        title: 'Establish Regular Running Schedule',
        description: 'Run 3-4 times per week',
        timeframe: 'weekly',
        progress: 0,
        subGoals: [],
        dateCreated: new Date(),
        status: 'not-started',
      },
      {
        id: 'suggested-2',
        title: 'Complete a Half Marathon',
        description: 'Train for and run 21km',
        timeframe: 'monthly',
        progress: 0,
        subGoals: [],
        dateCreated: new Date(),
        status: 'not-started',
      },
    ];
  }
  
  return [
    {
      id: 'suggested-1',
      title: 'Break down your goal',
      description: 'Divide into smaller achievable steps',
      timeframe: 'weekly',
      progress: 0,
      subGoals: [],
      dateCreated: new Date(),
      status: 'not-started',
    },
    {
      id: 'suggested-2',
      title: 'Set a timeline',
      description: 'Create deadlines for each milestone',
      timeframe: 'weekly',
      progress: 0,
      subGoals: [],
      dateCreated: new Date(),
      status: 'not-started',
    },
  ];
};