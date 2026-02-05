import { useState, useCallback, useEffect } from 'react';
import type { CountdownRecord, CountdownStatus } from '../types/countdown';
import { getHistory, addRecord, updateRecord, deleteRecord as deleteRecordFromStorage, clearAllHistory } from '../lib/storage';
import { generateUUID, calculateCompletionPercentage } from '../lib/utils';

export function useCountdownHistory() {
  const [records, setRecords] = useState<CountdownRecord[]>([]);
  const [currentRecordId, setCurrentRecordId] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    const history = getHistory();
    setRecords(history.records);
  }, []);

  /**
   * Start a new countdown and create a history record
   */
  const recordStart = useCallback((duration: { hours: number; minutes: number; seconds: number }): string => {
    const id = generateUUID();
    const totalSeconds = duration.hours * 3600 + duration.minutes * 60 + duration.seconds;

    const record: CountdownRecord = {
      id,
      startTime: Date.now(),
      endTime: null,
      duration,
      totalSeconds,
      remainingSeconds: totalSeconds,
      status: 'interrupted',
      completionPercentage: 0
    };

    setCurrentRecordId(id);
    addRecord(record);

    // Refresh records
    const history = getHistory();
    setRecords(history.records);

    return id;
  }, []);

  /**
   * End the current countdown and update the record
   */
  const recordEnd = useCallback((status: CountdownStatus, remainingSeconds: number) => {
    if (!currentRecordId) return;

    const endTime = Date.now();
    const history = getHistory();
    const record = history.records.find(r => r.id === currentRecordId);

    if (record) {
      const completionPercentage = calculateCompletionPercentage(
        record.totalSeconds,
        remainingSeconds
      );

      updateRecord(currentRecordId, {
        endTime,
        status,
        remainingSeconds,
        completionPercentage
      });

      // Refresh records
      const updatedHistory = getHistory();
      setRecords(updatedHistory.records);
    }

    setCurrentRecordId(null);
  }, [currentRecordId]);

  /**
   * Delete a specific record
   */
  const deleteRecord = useCallback((id: string) => {
    deleteRecordFromStorage(id);

    // Refresh records
    const history = getHistory();
    setRecords(history.records);
  }, []);

  /**
   * Clear all history
   */
  const clearHistory = useCallback(() => {
    clearAllHistory();
    setRecords([]);
  }, []);

  /**
   * Get sorted records (most recent first)
   */
  const sortedRecords = [...records].sort((a, b) => b.startTime - a.startTime);

  return {
    records: sortedRecords,
    recordStart,
    recordEnd,
    deleteRecord,
    clearHistory,
    currentRecordId
  };
}
