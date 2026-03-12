import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { debounce, getRandomEmoji, getRandomCover, generateId } from '../lib/utils';
import { Block } from './Block';
import type { PageData, BlockData } from '../types';


interface EditorProps {
  page: PageData | undefined;
  onUpdatePage: (page: PageData) => void;
  darkMode: boolean;
}

export const Editor: React.FC<EditorProps> = ({ page, onUpdatePage, darkMode }) => {
  const [coverHover, setCoverHover] = useState(false);

  // Debounced Save Trigger
  const debouncedSave = useCallback(debounce((newPage: PageData) => {
    api.updatePage(newPage).then(updated => console.log('Saved:', updated.id));
  }, 1000), []);

  const handlePageUpdate = (newPage: PageData) => {
      onUpdatePage(newPage);
      debouncedSave(newPage);
  }

  useEffect(() => {
    if (page?.fontFamily) {
        const fontName = page.fontFamily.split(',')[0].replace(/['"]/g, '');
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => { try { document.head.removeChild(link); } catch(e) {} }
    }
  }, [page?.fontFamily]);

  if (!page) return <div className={`flex-1 flex items-center justify-center ${darkMode ? 'bg-[#191919] text-gray-500' : 'bg-white text-gray-400'}`}>Select or create a page</div>;

  const widthClass = page.fullWidth ? 'max-w-full px-12' : 'max-w-4xl mx-auto px-12 md:px-24';
  
  const updateBlock = (blockId: string, data: Partial<BlockData>) => { 
    handlePageUpdate({ ...page, blocks: page.blocks.map(b => b.id === blockId ? { ...b, ...data } : b) }); 
  };

  const addBlock = (afterId: string) => { 
    const idx = page.blocks.findIndex(b => b.id === afterId); 
    const newB: BlockData = { id: generateId(), type: 'text', content: '', focus: true }; 
    const newBs = [...page.blocks]; newBs.splice(idx + 1, 0, newB); 
    handlePageUpdate({ ...page, blocks: newBs }); 
  };

  const deleteBlock = (id: string) => { 
    if (page.blocks.length <= 1) return; 
    const newBs = page.blocks.filter(b => b.id !== id); 
    handlePageUpdate({ ...page, blocks: newBs }); 
  };

  const duplicateBlock = (id: string) => { 
    const b = page.blocks.find(b => b.id === id); 
    if (!b) return;
    const idx = page.blocks.findIndex(b => b.id === id); 
    const newBs = [...page.blocks]; 
    newBs.splice(idx+1, 0, { ...b, id: generateId(), focus: false }); 
    handlePageUpdate({ ...page, blocks: newBs }); 
  };

  return (
    <div className={`flex-1 h-full overflow-y-auto relative scroll-smooth ${darkMode ? 'bg-[#191919] text-gray-100' : 'bg-white text-gray-900'}`} style={{ fontFamily: page.fontFamily || "'Inter', sans-serif" }}>
        <div className={`h-48 w-full relative group transition-colors duration-500 ${page.cover || 'bg-gradient-to-r from-pink-100 to-blue-100'}`} onMouseEnter={() => setCoverHover(true)} onMouseLeave={() => setCoverHover(false)}>
            {coverHover && <button onClick={() => handlePageUpdate({ ...page, cover: getRandomCover() })} className="absolute bottom-4 right-10 bg-white/80 hover:bg-white text-xs px-3 py-1.5 rounded shadow-sm text-gray-600 font-sans">Change cover</button>}
        </div>
        <div className={`${widthClass} pb-48 transition-all duration-300`}>
            <div className="-mt-10 mb-8 relative group w-20 h-20 z-10"><div onClick={() => handlePageUpdate({ ...page, icon: getRandomEmoji() })} className="text-7xl cursor-pointer hover:opacity-90 select-none">{page.icon || '📄'}</div></div>
            <div className="group mb-4"><textarea value={page.title} onChange={(e) => handlePageUpdate({ ...page, title: e.target.value })} placeholder="Untitled" className={`w-full text-4xl font-bold placeholder-gray-300 resize-none outline-none border-none bg-transparent overflow-hidden h-14 ${darkMode ? 'text-white' : 'text-gray-900'}`} rows={1} /></div>
            <div className="flex items-center gap-2 mb-8 font-sans"><div className={`text-xs px-2 py-0.5 rounded border ${page.workspace === 'private' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-green-50 text-green-600 border-green-100'}`}>{page.workspace === 'private' ? 'Private Workspace' : 'Public Workspace'}</div></div>
            <div className="space-y-1">{page.blocks.map(block => (<Block key={block.id} block={block} updateBlock={updateBlock} addBlock={addBlock} deleteBlock={deleteBlock} duplicateBlock={duplicateBlock} focusNext={(id) => { const idx = page.blocks.findIndex(b => b.id === id); if(idx < page.blocks.length-1) updateBlock(page.blocks[idx+1].id, {focus:true}) }} focusPrev={(id) => { const idx = page.blocks.findIndex(b => b.id === id); if(idx > 0) updateBlock(page.blocks[idx-1].id, {focus:true}) }} darkMode={darkMode} />))}</div>
            <div className="h-48 cursor-text" onClick={() => { if (page.blocks.length > 0) updateBlock(page.blocks[page.blocks.length-1].id, { focus: true }); else handlePageUpdate({ ...page, blocks: [{ id: generateId(), type: 'text', content: '', focus: true }] }); }} />
        </div>
    </div>
  );
};
