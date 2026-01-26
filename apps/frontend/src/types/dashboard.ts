// Quest card on dashboard
export type DashboardQuest = {
  id: string;
  title: string;
  progress: number; // %
};

// Active task
export type DashboardTask = {
  goalId: string;
  goalTitle: string;
  taskId: string;
  title: string;
  xp: number;
};

// Streak info
export type DashboardStreak = {
  count: number;
  week: boolean[]; // length = 7
};

// XP info
export type DashboardXP = {
  current: number;
  next: number;
  level: number;
};

// Full dashboard response
export type DashboardData = {
  quests: DashboardQuest[];
  activeTasks: DashboardTask[];
  streak: DashboardStreak;
  xp: DashboardXP;
};
