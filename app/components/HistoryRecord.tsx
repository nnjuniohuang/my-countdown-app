import type { CountdownRecord } from '../types/countdown';
import { formatDateTime, formatDuration, getStatusText, getStatusColorClasses } from '../lib/utils';

interface HistoryRecordProps {
  record: CountdownRecord;
  darkMode: boolean;
  onDelete: (id: string) => void;
}

export default function HistoryRecord({ record, darkMode, onDelete }: HistoryRecordProps) {
  const statusColors = getStatusColorClasses(record.status, darkMode);
  const statusText = getStatusText(record.status);

  // Get status emoji
  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'cancelled':
        return '❌';
      case 'interrupted':
        return '⚠️';
      default:
        return '';
    }
  };

  return (
    <div
      className={`p-4 rounded-xl transition-all duration-200 ${
        darkMode
          ? 'bg-white/10 hover:bg-white/15'
          : 'bg-white/70 hover:bg-white/90 shadow-md'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className={`text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {formatDateTime(record.startTime)}
          </div>
          <div className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            ⏱ {formatDuration(record.totalSeconds)}
          </div>
        </div>

        <button
          onClick={() => onDelete(record.id)}
          className={`p-2 rounded-lg transition-all duration-200 ${
            darkMode
              ? 'hover:bg-red-500/20 text-red-300 hover:text-red-200'
              : 'hover:bg-red-100 text-red-600 hover:text-red-700'
          }`}
          aria-label="刪除紀錄"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${statusColors.bg} ${statusColors.text} ${statusColors.border}`}
        >
          <span>{getStatusEmoji(record.status)}</span>
          <span>{statusText}</span>
        </span>
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {record.completionPercentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className={`w-full h-2 rounded-full overflow-hidden ${
        darkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div
          className={`h-full transition-all duration-300 ${
            record.status === 'completed'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : record.status === 'cancelled'
              ? 'bg-gradient-to-r from-red-500 to-orange-500'
              : 'bg-gradient-to-r from-yellow-500 to-orange-500'
          }`}
          style={{ width: `${record.completionPercentage}%` }}
        />
      </div>
    </div>
  );
}
