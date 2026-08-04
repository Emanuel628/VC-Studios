import type { ActivityEventType, BadgeKey, CheckpointKey, LearningPath, PrismaClient, User } from '@prisma/client';

// Matches the three locked review checkpoints in
// docs/website-foundations-completion-standard.md §4 - three, not the module count.
export const CHECKPOINT_LABELS: Record<CheckpointKey, string> = {
  PLAN_OR_BLUEPRINT_APPROVAL: 'Plan or blueprint approval',
  ARCHITECTURE_OR_FILE_MAP: 'Architecture or file-map checkpoint',
  FINAL_COMPLETION_REVIEW: 'Final completion review',
};

export const BADGE_DEFINITIONS: Record<BadgeKey, { label: string; description: string }> = {
  GETTING_STARTED: { label: 'Getting Started', description: 'Create your account' },
  LEARNING_PATH_CHOSEN: { label: 'Path Chosen', description: 'Choose Guided Build-Along or Coursework-Only' },
  FIRST_CHECKPOINT: { label: 'First Checkpoint', description: 'Pass your first review checkpoint' },
  STREAK_STARTER: { label: 'Streak Starter', description: 'Reach a 3-day activity streak' },
};

const STREAK_STARTER_THRESHOLD = 3;

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function nextStreak(user: Pick<User, 'currentStreak' | 'lastActivityOn'>, now: Date): number {
  if (!user.lastActivityOn) return 1;

  const dayDiff = (startOfDay(now) - startOfDay(user.lastActivityOn)) / 86_400_000;
  if (dayDiff === 0) return user.currentStreak;
  if (dayDiff === 1) return user.currentStreak + 1;
  return 1;
}

async function awardBadge(prisma: PrismaClient, userId: string, badge: BadgeKey): Promise<void> {
  const alreadyEarned = await prisma.userBadge.findUnique({ where: { userId_badge: { userId, badge } } });
  if (alreadyEarned) return;

  await prisma.userBadge.create({ data: { userId, badge } });
  await prisma.notification.create({
    data: { userId, message: `You earned the "${BADGE_DEFINITIONS[badge].label}" badge.` },
  });
}

/**
 * Records a real activity event, updates the user's streak, and awards any badge
 * that event unlocks. This is the one place points, streaks, and badges change -
 * nothing in this file invents progress the user didn't actually make happen.
 */
export async function recordActivity(
  prisma: PrismaClient,
  userId: string,
  type: ActivityEventType,
  points: number,
  message: string,
): Promise<void> {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const now = new Date();
  const currentStreak = nextStreak(user, now);

  await prisma.$transaction([
    prisma.activityEvent.create({ data: { userId, type, points, message } }),
    prisma.user.update({ where: { id: userId }, data: { currentStreak, lastActivityOn: now } }),
  ]);

  if (type === 'ACCOUNT_CREATED') {
    await awardBadge(prisma, userId, 'GETTING_STARTED');
  }
  if (type === 'LEARNING_PATH_CHOSEN') {
    await awardBadge(prisma, userId, 'LEARNING_PATH_CHOSEN');
  }
  if (type === 'CHECKPOINT_PASSED') {
    await awardBadge(prisma, userId, 'FIRST_CHECKPOINT');
  }
  if (currentStreak >= STREAK_STARTER_THRESHOLD) {
    await awardBadge(prisma, userId, 'STREAK_STARTER');
  }
}

export type DashboardData = {
  learningPath: LearningPath | null;
  points: number;
  streak: number;
  checkpoints: { total: number; passed: number; items: Array<{ key: CheckpointKey; label: string; passed: boolean }> };
  badges: Array<{ key: BadgeKey; label: string; description: string; earned: boolean }>;
  recentActivity: Array<{ type: ActivityEventType; message: string; points: number; createdAt: Date }>;
};

export type NotificationsData = {
  notifications: Array<{ id: string; message: string; read: boolean; createdAt: Date }>;
  unreadCount: number;
};

export async function getNotifications(prisma: PrismaClient, userId: string): Promise<NotificationsData> {
  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { id: true, message: true, read: true, createdAt: true },
    }),
    prisma.notification.count({ where: { userId, read: false } }),
  ]);

  return { notifications, unreadCount };
}

export async function markNotificationsRead(prisma: PrismaClient, userId: string): Promise<void> {
  await prisma.notification.updateMany({ where: { userId, read: false }, data: { read: true } });
}

export async function getDashboardData(prisma: PrismaClient, userId: string): Promise<DashboardData> {
  const [user, pointsTotal, checkpointCompletions, earnedBadges, recentActivity] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { learningPath: true, currentStreak: true } }),
    prisma.activityEvent.aggregate({ where: { userId }, _sum: { points: true } }),
    prisma.checkpointCompletion.findMany({ where: { userId }, select: { checkpoint: true } }),
    prisma.userBadge.findMany({ where: { userId }, select: { badge: true } }),
    prisma.activityEvent.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { type: true, message: true, points: true, createdAt: true },
    }),
  ]);

  const passedCheckpoints = new Set(checkpointCompletions.map((c) => c.checkpoint));
  const earnedBadgeKeys = new Set(earnedBadges.map((b) => b.badge));
  const checkpointKeys = Object.keys(CHECKPOINT_LABELS) as CheckpointKey[];
  const badgeKeys = Object.keys(BADGE_DEFINITIONS) as BadgeKey[];

  return {
    learningPath: user.learningPath,
    points: pointsTotal._sum.points ?? 0,
    streak: user.currentStreak,
    checkpoints: {
      total: checkpointKeys.length,
      passed: passedCheckpoints.size,
      items: checkpointKeys.map((key) => ({ key, label: CHECKPOINT_LABELS[key], passed: passedCheckpoints.has(key) })),
    },
    badges: badgeKeys.map((key) => ({
      key,
      ...BADGE_DEFINITIONS[key],
      earned: earnedBadgeKeys.has(key),
    })),
    recentActivity,
  };
}
