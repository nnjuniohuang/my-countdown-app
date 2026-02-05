interface HistoryButtonProps {
  recordCount: number;
  onClick: () => void;
  darkMode: boolean;
}

export default function HistoryButton({ recordCount, onClick, darkMode }: HistoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-2.5 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
        darkMode
          ? 'bg-white/10 text-gray-200 hover:bg-white/20'
          : 'bg-gray-800/10 text-gray-700 hover:bg-gray-800/20'
      }`}
      aria-label="查看歷史紀錄"
    >
      {/* History Icon */}
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* Badge showing record count */}
      {recordCount > 0 && (
        <span
          className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
            darkMode
              ? 'bg-purple-500 text-white'
              : 'bg-purple-600 text-white'
          }`}
        >
          {recordCount > 99 ? '99+' : recordCount}
        </span>
      )}
    </button>
  );
}
