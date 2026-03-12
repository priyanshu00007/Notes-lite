import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { PageData } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  pages: PageData[];
  onSelect: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, pages, onSelect }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 50);
        setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20" onClick={onClose}>
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center border-b border-gray-100 px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Search pages..." 
                className="flex-1 outline-none text-lg text-gray-700 placeholder-gray-300"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
        </div>
        <div className="max-h-96 overflow-y-auto py-2">
            {filteredPages.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">No pages found.</div>
            ) : (
                filteredPages.map(page => (
                    <div 
                        key={page.id}
                        onClick={() => { onSelect(page.id); onClose(); }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3 transition-colors"
                    >
                        <span className="text-xl">{page.icon || '📄'}</span>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-gray-700">{page.title || 'Untitled'}</div>
                            <div className="text-xs text-gray-400 capitalize">{page.workspace} Workspace</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};
