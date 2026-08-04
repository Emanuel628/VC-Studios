import { API_BASE_URL } from './apiBaseUrl';

export type LearningPath = 'GUIDED' | 'COURSEWORK';

export type DashboardData = {
  learningPath: LearningPath | null;
  points: number;
  streak: number;
  checkpoints: {
    total: number;
    passed: number;
    items: Array<{ key: string; label: string; passed: boolean }>;
  };
  badges: Array<{ key: string; label: string; description: string; earned: boolean }>;
  recentActivity: Array<{ type: string; message: string; points: number; createdAt: string }>;
};

export async function fetchDashboard(): Promise<DashboardData> {
  const response = await fetch(`${API_BASE_URL}/api/dashboard`, { credentials: 'include' });

  if (!response.ok) {
    throw new Error('Could not load your dashboard.');
  }

  return response.json();
}

export async function chooseLearningPath(path: LearningPath): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/learning-path`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ path }),
  });

  if (!response.ok) {
    throw new Error('Could not save your learning path.');
  }
}

export type NotificationsData = {
  notifications: Array<{ id: string; message: string; read: boolean; createdAt: string }>;
  unreadCount: number;
};

export async function fetchNotifications(): Promise<NotificationsData> {
  const response = await fetch(`${API_BASE_URL}/api/notifications`, { credentials: 'include' });

  if (!response.ok) {
    throw new Error('Could not load notifications.');
  }

  return response.json();
}

export async function markNotificationsRead(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/notifications/read`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Could not update notifications.');
  }
}
