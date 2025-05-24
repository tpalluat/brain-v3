import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BrainSection, LearningItem, Goal, User } from '../types';
import { mockUser, mockLearningItems, mockGoals } from '../data/mockData';

interface AppContextType {
  user: User;
  learningItems: LearningItem[];
  goals: Goal[];
  activeSection: BrainSection | null;
  setActiveSection: (section: BrainSection | null) => void;
  addLearningItem: (item: Omit<LearningItem, 'id' | 'dateAdded'>) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'dateCreated' | 'subGoals'>) => void;
  updateGoalProgress: (goalId: string, progress: number) => void;
  toggleLearningItemCompleted: (id: string) => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(mockUser);
  const [learningItems, setLearningItems] = useState<LearningItem[]>(mockLearningItems);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [activeSection, setActiveSection] = useState<BrainSection | null>(null);

  const addLearningItem = (item: Omit<LearningItem, 'id' | 'dateAdded'>) => {
    const newItem: LearningItem = {
      ...item,
      id: Date.now().toString(),
      dateAdded: new Date(),
    };
    setLearningItems([newItem, ...learningItems]);
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'dateCreated' | 'subGoals'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      dateCreated: new Date(),
      subGoals: [],
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    const updateGoalsRecursively = (goals: Goal[]): Goal[] => {
      return goals.map(goal => {
        if (goal.id === goalId) {
          return { ...goal, progress };
        }
        if (goal.subGoals.length > 0) {
          return { ...goal, subGoals: updateGoalsRecursively(goal.subGoals) };
        }
        return goal;
      });
    };

    setGoals(updateGoalsRecursively(goals));
  };

  const toggleLearningItemCompleted = (id: string) => {
    setLearningItems(
      learningItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const updateUserPreferences = (preferences: Partial<User['preferences']>) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences,
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        learningItems,
        goals,
        activeSection,
        setActiveSection,
        addLearningItem,
        addGoal,
        updateGoalProgress,
        toggleLearningItemCompleted,
        updateUserPreferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};