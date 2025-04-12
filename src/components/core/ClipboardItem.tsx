import { ClipboardEntry } from '../../types';

export const ClipboardItem = ({ entry }: { entry: ClipboardEntry; }) => {
    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
            {/* Content Preview */}
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 mt-1 text-blue-500">
                    {entry.type === 'text' ? '📄' : '🌃'}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                        </span>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-300 break-words line-clamp-3">
                        {entry.type === 'text' ? (
                            entry.content
                        ) : (
                            <img
                                src={`data:image/*;base64, ${entry.content}`} alt="Fail to load image"
                                className="max-h-32 rounded object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};