import React, { useState, useEffect, useRef } from 'react';
import { Plus, GripVertical, Image as ImageIcon } from 'lucide-react';
import { useAutosizeTextArea } from '../hooks/useAutosizeTextArea';
import { SlashMenu, BlockActionMenu } from './Menus';
import type { BlockData } from '../types';



interface BlockProps {
  block: BlockData;
  updateBlock: (id: string, data: Partial<BlockData>) => void;
  addBlock: (id: string) => void;
  deleteBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  focusNext: (id: string) => void;
  focusPrev: (id: string) => void;
  darkMode: boolean;
}

export const Block: React.FC<BlockProps> = ({ 
  block, updateBlock, addBlock, deleteBlock, duplicateBlock, focusNext, focusPrev, darkMode 
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  useAutosizeTextArea(inputRef.current, block.content);

  useEffect(() => {
    if (block.focus) { inputRef.current?.focus(); updateBlock(block.id, { focus: false }); }
  }, [block.focus, block.id, updateBlock]);

  const checkMarkdown = (text: string) => {
      if (block.type !== 'text') return false;
      const patterns: Record<string, string> = {'# ': 'h1', '## ': 'h2', '### ': 'h3', '- ': 'bullet', '> ': 'quote', '[] ': 'todo', '---': 'divider'};
      if (patterns[text]) { updateBlock(block.id, { type: patterns[text], content: '' }); return true; }
      return false;
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (checkMarkdown(val)) return;
    updateBlock(block.id, { content: val });
    if (val === '/') { 
      // Enhanced positioning: get absolute position relative to the document
      const rect = inputRef.current?.getBoundingClientRect(); 
      if (rect) {
        setMenuPos({ 
          top: rect.bottom + window.scrollY + 5, 
          left: rect.left + window.scrollX 
        }); 
      }
      setShowSlashMenu(true); 
    } 
    else if (showSlashMenu && val !== '/') { setShowSlashMenu(false); }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!showSlashMenu) addBlock(block.id); }
    if (e.key === 'Backspace' && block.content === '') { e.preventDefault(); deleteBlock(block.id); }
    if (e.key === 'ArrowUp') { e.preventDefault(); focusPrev(block.id); }
    if (e.key === 'ArrowDown') { e.preventDefault(); focusNext(block.id); }
  };

  const getStyles = () => {
    let classes = block.textColor || (darkMode ? 'text-gray-100' : 'text-gray-900');
    if (block.align === 'center') classes += ' text-center'; else if (block.align === 'right') classes += ' text-right'; else classes += ' text-left';
    switch (block.type) {
      case 'h1': return classes + ' text-4xl font-bold mt-6 mb-2';
      case 'h2': return classes + ' text-2xl font-semibold mt-5 mb-2';
      case 'h3': return classes + ' text-xl font-semibold mt-4 mb-2';
      case 'bullet': return classes + ' text-base mb-1 leading-relaxed';
      case 'todo': return classes + ' text-base mb-1 leading-relaxed';
      case 'quote': return classes + ` text-lg italic ${darkMode ? 'border-gray-500' : 'border-gray-900'} border-l-4 pl-4 py-1 my-2`;
      case 'callout': return classes + ` text-base ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-md my-2 flex gap-3`;
      default: return classes + ' text-base mb-1 leading-relaxed min-h-[1.5rem]';
    }
  };

  return (
    <div className={`group relative flex items-start -ml-8 pl-8 py-0.5 ${block.backgroundColor ? (darkMode ? 'bg-opacity-20' : 'bg-opacity-50') + ' rounded px-2 ' + block.backgroundColor : ''}`}>
      <div className="absolute left-0 top-1.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-0.5 hover:bg-gray-200 rounded text-gray-400" onClick={() => addBlock(block.id)}><Plus className="w-3.5 h-3.5" /></button>
        <button className="p-0.5 hover:bg-gray-200 rounded text-gray-400" onClick={(e) => { e.stopPropagation(); const rect = e.currentTarget.getBoundingClientRect(); setMenuPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX }); setShowActionMenu(true); }}><GripVertical className="w-3.5 h-3.5" /></button>
      </div>

      <div className="flex-1 flex items-start gap-2 min-w-0 relative">
        {block.type === 'bullet' && <span className={`text-xl leading-6 select-none w-4 ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>•</span>}
        {block.type === 'todo' && <div className="pt-1.5 select-none"><input type="checkbox" checked={block.checked || false} onChange={(e) => updateBlock(block.id, { checked: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-blue-500 transition-all cursor-pointer" /></div>}
        {block.type === 'callout' && <div className="select-none text-xl">💡</div>}
        
        {/* Render different block types */}
        {block.type === 'divider' ? (
            <div className={`w-full h-px my-3 transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        ) : block.type === 'image' ? (
            <div className={`w-full group/img relative rounded-lg overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                {block.props?.url ? (
                  <img src={block.props.url} alt="block" className="w-full h-auto max-h-[500px] object-contain" />
                ) : (
                  <div className="p-12 flex flex-col items-center justify-center gap-2 opacity-50">
                    <ImageIcon className="w-8 h-8" />
                    <button onClick={() => {
                       const url = prompt('Enter image URL:');
                       if(url) updateBlock(block.id, { props: { ...block.props, url } });
                    }} className="text-sm font-medium hover:underline">Add an image</button>
                  </div>
                )}
            </div>
        ) : block.type === 'code' ? (
            <div className={`w-full rounded-lg overflow-hidden border font-mono text-sm ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
                <div className="px-4 py-1.5 bg-black/5 flex justify-between items-center opacity-50">
                  <span className="text-[10px] uppercase font-bold tracking-widest">{block.props?.lang || 'Javascript'}</span>
                </div>
                <textarea 
                  className="w-full bg-transparent p-4 outline-none resize-none overflow-hidden" 
                  value={block.content} 
                  onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                  placeholder="Paste your code here..."
                />
            </div>
        ) : (
            <textarea ref={inputRef} value={block.content} onChange={handleChange} onKeyDown={handleKeyDown} placeholder={block.type === 'text' ? "Type '/' for commands" : ''} className={`w-full bg-transparent resize-none outline-none border-none overflow-hidden placeholder-gray-300 transition-all ${getStyles()} ${block.checked ? 'line-through opacity-40' : ''}`} rows={1} />
        )}

      </div>

      {showSlashMenu && <SlashMenu position={menuPos} darkMode={darkMode} onSelect={(type) => { updateBlock(block.id, { type, content: '' }); setShowSlashMenu(false); setTimeout(() => inputRef.current?.focus(), 0); }} onClose={() => { setShowSlashMenu(false); }} />}

      {showActionMenu && <BlockActionMenu position={menuPos} onClose={() => setShowActionMenu(false)} onDelete={() => deleteBlock(block.id)} onDuplicate={() => duplicateBlock(block.id)} onColor={(styles) => { updateBlock(block.id, styles); setShowActionMenu(false); }} onAlign={(align) => { updateBlock(block.id, { align }); setShowActionMenu(false); }} />}
    </div>
  );
};
