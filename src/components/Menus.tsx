import React, { useEffect, useRef } from 'react';
import { 
  Type, Heading1, Heading2, Heading3, List, CheckSquare, Quote, MessageSquare, Minus,
  AlignLeft, AlignCenter, AlignRight, Trash2, Copy, Image as ImageIcon, Code as CodeIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEXT_COLORS, BG_COLORS, FONT_LIBRARY } from '../lib/utils';
import type { PageData } from '../types';


interface MenuPos {
  top: number;
  left: number;
}

export const SlashMenu: React.FC<{ position: MenuPos; onSelect: (type: string) => void; onClose: () => void; darkMode: boolean }> = ({ position, onSelect, onClose, darkMode }) => {

  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const options = [
    { type: 'text', label: 'Text', icon: Type }, { type: 'h1', label: 'Heading 1', icon: Heading1 },
    { type: 'h2', label: 'Heading 2', icon: Heading2 }, { type: 'h3', label: 'Heading 3', icon: Heading3 },
    { type: 'bullet', label: 'Bulleted list', icon: List }, { type: 'todo', label: 'To-do list', icon: CheckSquare },
    { type: 'quote', label: 'Quote', icon: Quote }, { type: 'callout', label: 'Callout', icon: MessageSquare },
    { type: 'divider', label: 'Divider', icon: Minus },
  ];

  return (
    <AnimatePresence>
      <motion.div 
        ref={menuRef} 
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`absolute z-50 w-72 rounded-xl shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] border overflow-hidden ${darkMode ? 'bg-[#202020] border-gray-700 text-gray-100' : 'bg-white border-gray-100 text-gray-900'}`} 
        style={{ top: position.top, left: position.left }}
      >
        <div className={`px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-50/50 text-gray-400'}`}>Basic blocks</div>
        <div className="max-h-[300px] overflow-y-auto py-1 custom-scrollbar">
          {options.map(opt => (
            <button 
              key={opt.type} 
              onClick={() => onSelect(opt.type)} 
              className={`w-full text-left px-3 py-1.5 flex items-center gap-3 transition-colors group ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <div className={`w-8 h-8 border rounded-lg flex items-center justify-center shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700 group-hover:border-gray-600' : 'bg-white border-gray-100 group-hover:border-gray-200'}`}>
                <opt.icon className={`w-4 h-4 ${darkMode ? 'text-gray-400 group-hover:text-gray-100' : 'text-gray-500 group-hover:text-gray-900'}`} />
              </div>
              <div className="flex flex-col">
                <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{opt.label}</div>
                <div className="text-[10px] opacity-40">Add a {opt.label.toLowerCase()} block</div>
              </div>
            </button>
          ))}
          <div className={`px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider border-t ${darkMode ? 'bg-gray-800/50 text-gray-500 border-gray-700' : 'bg-gray-50/50 text-gray-400 border-gray-100'}`}>Media</div>
          <button onClick={() => onSelect('image')} className={`w-full text-left px-3 py-1.5 flex items-center gap-3 transition-colors group ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <div className={`w-8 h-8 border rounded-lg flex items-center justify-center shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
               <ImageIcon className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex flex-col">
              <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Image</div>
              <div className="text-[10px] opacity-40">Upload or embed with a link</div>
            </div>
          </button>

          <button onClick={() => onSelect('code')} className="w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center gap-3 transition-colors group">
            <div className="w-8 h-8 border border-gray-100 rounded-lg flex items-center justify-center bg-white shadow-sm group-hover:border-gray-200">
               <CodeIcon className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-medium text-gray-700">Code</div>
              <div className="text-[10px] text-gray-400">Capture a code snippet</div>
            </div>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>

  );
};

export const BlockActionMenu: React.FC<{ 
  position: MenuPos; 
  onDelete: () => void; 
  onDuplicate: () => void; 
  onColor: (styles: { textColor?: string; backgroundColor?: string }) => void; 
  onAlign: (align: 'left' | 'center' | 'right') => void; 
  onClose: () => void 
}> = ({ position, onDelete, onDuplicate, onColor, onAlign, onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => { const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose(); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, [onClose]);

    return (
        <div ref={menuRef} className="absolute z-50 w-56 bg-white rounded-lg shadow-xl border overflow-hidden flex flex-col" style={{ top: position.top, left: position.left }}>
            <div className="p-1 border-b flex justify-between bg-gray-50"><div className="flex"><button onClick={() => onAlign('left')} className="p-1.5 hover:bg-gray-200 rounded"><AlignLeft className="w-4 h-4"/></button><button onClick={() => onAlign('center')} className="p-1.5 hover:bg-gray-200 rounded"><AlignCenter className="w-4 h-4"/></button><button onClick={() => onAlign('right')} className="p-1.5 hover:bg-gray-200 rounded"><AlignRight className="w-4 h-4"/></button></div><button onClick={onDelete} className="p-1.5 hover:bg-red-100 text-red-500 rounded"><Trash2 className="w-4 h-4"/></button></div>
            <button onClick={onDuplicate} className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm text-gray-600"><Copy className="w-4 h-4" /> Duplicate</button>
            <div className="border-t"><div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase">Color</div><div className="max-h-32 overflow-y-auto px-1 pb-1">{TEXT_COLORS.map(c => (<button key={c.name} onClick={() => onColor({ textColor: c.class })} className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded text-sm flex items-center gap-2"><div className={`w-4 h-4 rounded border ${c.name === 'Default' ? 'bg-black' : c.class.replace('text-', 'bg-')}`} /><span>{c.name}</span></button>))}</div></div>
            <div className="border-t"><div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase">Background</div><div className="max-h-32 overflow-y-auto px-1 pb-1">{BG_COLORS.map(c => (<button key={c.name} onClick={() => onColor({ backgroundColor: c.class })} className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded text-sm flex items-center gap-2"><div className={`w-4 h-4 rounded border ${c.name === 'Default' ? 'bg-white' : c.class}`} /><span>{c.name}</span></button>))}</div></div>
        </div>
    )
};

export const PageStyleMenu: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  page: PageData | undefined; 
  onUpdatePage: (page: PageData) => void; 
  darkMode: boolean 
}> = ({ isOpen, onClose, page, onUpdatePage, darkMode }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => { const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose(); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, [onClose]);
    if (!isOpen || !page) return null;

    return (
        <div ref={menuRef} className={`absolute top-12 right-4 z-40 w-72 rounded-xl shadow-xl border overflow-hidden flex flex-col max-h-[80vh] ${darkMode ? 'bg-[#202020] border-gray-700 text-gray-100' : 'bg-white border-gray-100 text-gray-900'}`}>
            <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-4"><span className="text-sm font-medium">Full Width</span><button onClick={() => onUpdatePage({ ...page, fullWidth: !page.fullWidth })} className={`w-10 h-5 rounded-full relative transition-colors ${page.fullWidth ? 'bg-blue-500' : 'bg-gray-300'}`}><div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${page.fullWidth ? 'left-6' : 'left-1'}`} /></button></div>
                <div className="text-xs font-medium text-gray-500 uppercase mb-2">Typography</div>
                <div className="space-y-4">{FONT_LIBRARY.map((cat) => (<div key={cat.cat}><div className="text-[10px] font-bold uppercase mb-1 text-gray-400">{cat.cat}</div><div className="grid grid-cols-1 gap-1">{cat.fonts.map(font => (<button key={font.name} onClick={() => onUpdatePage({ ...page, fontFamily: font.family })} className={`text-left px-2 py-1.5 text-sm rounded flex justify-between items-center ${page.fontFamily === font.family ? (darkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-blue-50 text-blue-600') : (darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50')}`} style={{ fontFamily: font.family }}><span>{font.name}</span>{page.fontFamily === font.family && <CheckSquare className="w-3 h-3" />}</button>))}</div></div>))}</div>
            </div>
        </div>
    );
};
