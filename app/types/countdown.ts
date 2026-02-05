/**
 * Status of a countdown session
 */
export type CountdownStatus = 'completed' | 'cancelled' | 'interrupted';

/**
 * Represents a single countdown history record
 */
export interface CountdownRecord {
  id: string;                    // UUID for unique identification
  startTime: number;             // Unix timestamp (milliseconds)
  endTime: number | null;        // Unix timestamp or null if not finished
  duration: {                    // Original configured duration
    hours: number;
    minutes: number;
    seconds: number;
  };
  totalSeconds: number;          // Total seconds configured
  remainingSeconds: number;      // Seconds left when stopped (0 if completed)
  status: CountdownStatus;       // Final status
  completionPercentage: number;  // 0-100, how much was completed
}

/**
 * Storage wrapper for all history records
 */
export interface CountdownHistory {
  records: CountdownRecord[];
  version: number;               // For future data migration
  lastUpdated: number;           // Unix timestamp
}
