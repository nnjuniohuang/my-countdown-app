/**
 * Generate a simple UUID v4
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Format a timestamp to a readable date/time string
 */
export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

/**
 * Format duration in seconds to readable string
 */
export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}小時`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}分鐘`);
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds}秒`);
  }

  return parts.join(' ');
}

/**
 * Calculate completion percentage
 */
export function calculateCompletionPercentage(
  totalSeconds: number,
  remainingSeconds: number
): number {
  if (totalSeconds === 0) return 0;
  const completed = totalSeconds - remainingSeconds;
  return Math.round((completed / totalSeconds) * 100);
}

/**
 * Format elapsed time between two timestamps
 */
export function formatElapsedTime(startTime: number, endTime: number | null): string {
  if (!endTime) return '進行中';

  const elapsedMs = endTime - startTime;
  const elapsedSeconds = Math.floor(elapsedMs / 1000);

  return formatDuration(elapsedSeconds);
}

/**
 * Get status display text
 */
export function getStatusText(status: 'completed' | 'cancelled' | 'interrupted'): string {
  switch (status) {
    case 'completed':
      return '已完成';
    case 'cancelled':
      return '已取消';
    case 'interrupted':
      return '已中斷';
    default:
      return '未知';
  }
}

/**
 * Get status color classes for Tailwind
 */
export function getStatusColorClasses(
  status: 'completed' | 'cancelled' | 'interrupted',
  darkMode: boolean
): {
  bg: string;
  text: string;
  border: string;
} {
  if (status === 'completed') {
    return darkMode
      ? {
          bg: 'bg-green-500/20',
          text: 'text-green-300',
          border: 'border-green-500/50'
        }
      : {
          bg: 'bg-green-100',
          text: 'text-green-700',
          border: 'border-green-300'
        };
  }

  if (status === 'cancelled') {
    return darkMode
      ? {
          bg: 'bg-red-500/20',
          text: 'text-red-300',
          border: 'border-red-500/50'
        }
      : {
          bg: 'bg-red-100',
          text: 'text-red-700',
          border: 'border-red-300'
        };
  }

  // interrupted
  return darkMode
    ? {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-300',
        border: 'border-yellow-500/50'
      }
    : {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-300'
      };
}
