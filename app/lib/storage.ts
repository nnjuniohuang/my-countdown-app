import type { CountdownHistory, CountdownRecord } from '../types/countdown';

const STORAGE_KEY = 'countdown-timer-history';
const MAX_RECORDS = 100;

/**
 * Get history from localStorage with error handling
 */
export function getHistory(): CountdownHistory {
  if (typeof window === 'undefined' || typeof Storage === 'undefined') {
    return { version: 1, lastUpdated: Date.now(), records: [] };
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return { version: 1, lastUpdated: Date.now(), records: [] };
    }

    const parsed = JSON.parse(data) as CountdownHistory;

    // Validate structure
    if (!parsed.version || !Array.isArray(parsed.records)) {
      throw new Error('Invalid history structure');
    }

    return parsed;
  } catch (e) {
    console.error('Failed to load history:', e);
    return { version: 1, lastUpdated: Date.now(), records: [] };
  }
}

/**
 * Save history to localStorage with quota management
 */
export function saveHistory(history: CountdownHistory): void {
  if (typeof window === 'undefined' || typeof Storage === 'undefined') {
    return;
  }

  try {
    history.lastUpdated = Date.now();

    // Limit records to MAX_RECORDS
    if (history.records.length > MAX_RECORDS) {
      history.records = history.records.slice(-MAX_RECORDS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      // Prune oldest records and retry
      console.warn('LocalStorage quota exceeded, pruning old records');
      history.records = history.records.slice(-(MAX_RECORDS - 10));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      } catch (retryError) {
        console.error('Failed to save history after pruning:', retryError);
      }
    } else {
      console.error('Failed to save history:', e);
    }
  }
}

/**
 * Add a new record to history
 */
export function addRecord(record: CountdownRecord): void {
  const history = getHistory();
  history.records.push(record);
  saveHistory(history);
}

/**
 * Update an existing record in history
 */
export function updateRecord(id: string, updates: Partial<CountdownRecord>): void {
  const history = getHistory();
  const recordIndex = history.records.findIndex(r => r.id === id);

  if (recordIndex !== -1) {
    history.records[recordIndex] = {
      ...history.records[recordIndex],
      ...updates
    };
    saveHistory(history);
  }
}

/**
 * Delete a specific record from history
 */
export function deleteRecord(id: string): void {
  const history = getHistory();
  history.records = history.records.filter(r => r.id !== id);
  saveHistory(history);
}

/**
 * Clear all history records
 */
export function clearAllHistory(): void {
  const history: CountdownHistory = {
    version: 1,
    lastUpdated: Date.now(),
    records: []
  };
  saveHistory(history);
}
