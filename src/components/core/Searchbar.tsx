// components/search-bar.tsx
import { useEffect, useState } from 'react';
import { useClipboard } from '@/hooks';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useClipboard();
    const [localQuery, setLocalQuery] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchQuery(localQuery);
        }, 300);

        return () => clearTimeout(timeout);
    }, [localQuery]);

    return (
        <div className="mb-4">
            <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search clipboard history..."
                    className="w-full pl-10 pr-4 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

    );
};