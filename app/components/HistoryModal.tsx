import { useEffect, useState } from 'react';
import type { CountdownRecord } from '../types/countdown';
import HistoryRecord from './HistoryRecord';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: CountdownRecord[];
  onDeleteRecord: (id: string) => void;
  onClearHistory: () => void;
  darkMode: boolean;
}

export default function HistoryModal({
  isOpen,
  onClose,
  records,
  onDeleteRecord,
  onClearHistory,
  darkMode
}: HistoryModalProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setShowConfirm(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClearClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmClear = () => {
    onClearHistory();
    setShowConfirm(false);
    onClose();
  };

  const handleCancelClear = () => {
    setShowConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`modal-backdrop absolute inset-0 ${
          darkMode ? 'bg-black/70' : 'bg-black/50'
        } backdrop-blur-sm`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`modal-content relative w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden ${
          darkMode
            ? 'bg-gray-900/95 backdrop-blur-xl'
            : 'bg-white/95 backdrop-blur-xl'
        }`}
      >
        {/* Header */}
        <div
          className={`sticky top-0 z-10 p-6 border-b ${
            darkMode
              ? 'bg-gray-900/95 border-gray-700'
              : 'bg-white/95 border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              倒數歷史紀錄
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-all duration-200 ${
                darkMode
                  ? 'hover:bg-white/10 text-gray-300 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
              }`}
              aria-label="關閉"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {records.length > 0 && (
            <div className="mt-4">
              <button
                onClick={handleClearClick}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  darkMode
                    ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/50'
                    : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300'
                }`}
              >
                清除所有紀錄
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">⏱️</div>
              <p
                className={`text-lg mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                沒有歷史紀錄
              </p>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                開始一個倒數計時器來建立紀錄
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => (
                <HistoryRecord
                  key={record.id}
                  record={record}
                  darkMode={darkMode}
                  onDelete={onDeleteRecord}
                />
              ))}
            </div>
          )}
        </div>

        {/* Confirmation Dialog */}
        {showConfirm && (
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div
              className={`w-full max-w-sm p-6 rounded-xl shadow-2xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h3
                className={`text-lg font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                確認清除
              </h3>
              <p
                className={`text-sm mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                確定要清除所有歷史紀錄嗎？此操作無法復原。
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelClear}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmClear}
                  className="flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                >
                  確定清除
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
