import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { NOTION_TEMPLATES } from '../lib/utils';
import { Template } from '../types';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
  darkMode: boolean;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({ isOpen, onClose, onSelect, darkMode }) => {
  const [search, setSearch] = useState('');
  
  if (!isOpen) return null;

  const filteredTemplates = NOTION_TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300" onClick={onClose}>
      <div className={`w-full max-w-4xl max-h-[80vh] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col ${darkMode ? 'bg-[#202020] text-gray-100' : 'bg-white text-gray-900'}`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100/10">
          <h2 className="text-xl font-bold">Templates</h2>
          <button onClick={onClose}><X className="w-5 h-5 opacity-50 hover:opacity-100" /></button>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className={`w-48 border-r border-gray-100/10 p-4 space-y-2 hidden md:block ${darkMode ? 'bg-[#252525]' : 'bg-gray-50'}`}>
            <div className="text-xs font-bold text-gray-400 uppercase mb-4">Categories</div>
            {['Personal', 'Work', 'School'].map(cat => (
              <div key={cat} className="px-2 py-1.5 text-sm font-medium cursor-pointer rounded hover:bg-gray-200/50">{cat}</div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col p-6 overflow-hidden">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
              <Search className="w-4 h-4 opacity-50" />
              <input 
                type="text" 
                placeholder="Search templates..." 
                className="bg-transparent outline-none flex-1 text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
              {filteredTemplates.map(tpl => (
                <div 
                  key={tpl.id}
                  onClick={() => { onSelect(tpl); onClose(); }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${darkMode ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-200 hover:shadow-md'}`}
                >
                  <div className="text-3xl mb-3">{tpl.icon}</div>
                  <div className="font-bold text-lg mb-1">{tpl.name}</div>
                  <div className="text-sm opacity-60 line-clamp-2">{tpl.description}</div>
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-indigo-500">{tpl.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
