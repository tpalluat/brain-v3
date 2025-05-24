export interface LearningItem {
  id: string;
  type: 'book' | 'video' | 'movie' | 'course';
  title: string;
  description: string;
  dateAdded: Date;
  summary: string;
  tags: string[];
  completed: boolean;
  aiGenerated: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  timeframe: 'long-term' | 'yearly' | 'monthly' | 'weekly' | 'daily';
  progress: number; // 0-100
  subGoals: Goal[];
  dateCreated: Date;
  dateCompleted?: Date;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    theme: 'light' | 'dark';
    publicProfile: boolean;
    visibleSections: {
      learning: boolean;
      goals: boolean;
      personality: boolean;
    };
  };
}

export type BrainSection = 'learning' | 'goals' | 'personality' | 'profile';