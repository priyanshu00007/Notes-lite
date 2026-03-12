import { useState, useEffect } from 'react';
import { Menu, Star, MoreHorizontal } from 'lucide-react';

import { api } from './lib/api';
import { generateId, getRandomEmoji, getRandomCover } from './lib/utils';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { SearchModal } from './components/SearchModal';
import { SettingsModal } from './components/SettingsModal';
import { TemplateModal } from './components/TemplateModal';
import { ShareMenu } from './components/ShareMenu';
import { PageStyleMenu } from './components/Menus';
import { TimerWidget } from './components/TimerWidget';
import type { PageData, Template } from './types';


export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<'private' | 'public'>('private');
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pages, setPages] = useState<PageData[]>([]);
  const [activePageId, setActivePageId] = useState<string | null>(null);

  // LOAD PAGES
  useEffect(() => {
    api.fetchPages().then((data: PageData[]) => {
        if (data.length === 0) {
             const initialPage: PageData = {
                 id: generateId(), 
                 title: 'Welcome to Notion Lite', 
                 icon: '👋', 
                 workspace: 'private', 
                 favorite: false,
                 fontFamily: "'Inter', sans-serif", 
                 fullWidth: false, 
                 cover: 'bg-gradient-to-r from-pink-100 to-blue-100',
                 blocks: [
                   { id: generateId(), type: 'h1', content: 'MERN Stack Ready' }, 
                   { id: generateId(), type: 'text', content: 'This app is now ready to connect to your local Node.js backend.' }
                 ],
                 createdAt: Date.now(),
                 updatedAt: Date.now()
             };
             api.createPage(initialPage).then(() => {
                 setPages([initialPage]);
                 setActivePageId(initialPage.id);
             });
        } else {
            setPages(data);
            setActivePageId(data[0].id);
        }
    });
  }, []);

  const activePage = pages.find(p => p.id === activePageId);

  const addPage = async () => {
    const newPage: PageData = { 
      id: generateId(), 
      title: '', 
      icon: getRandomEmoji(), 
      cover: getRandomCover(), 
      workspace: activeWorkspace, 
      favorite: false, 
      fontFamily: "'Inter', sans-serif", 
      fullWidth: false, 
      blocks: [{ id: generateId(), type: 'text', content: '', focus: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setPages([...pages, newPage]);
    setActivePageId(newPage.id);
    await api.createPage(newPage);
  };

  const deletePage = async (id: string) => {
    const newPages = pages.filter(p => p.id !== id);
    setPages(newPages);
    if (activePageId === id) setActivePageId(newPages.length > 0 ? newPages[0].id : null);
    await api.deletePage(id);
  };

  const updatePageImmediate = (updatedPage: PageData) => {
      setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p));
      api.updatePage(updatedPage);
  };

  const handleExport = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pages));
      const a = document.createElement('a'); a.href = dataStr; a.setAttribute("download", "notion_lite_export.json"); document.body.appendChild(a); a.click(); a.remove();
  };

  const handleTemplateSelect = async (template: Template) => {
    const newPage: PageData = {
      ...template.page as PageData,
      id: generateId(),
      workspace: activeWorkspace,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setPages([...pages, newPage]);
    setActivePageId(newPage.id);
    await api.createPage(newPage);
  }

  return (
    <div className={`flex h-screen w-full font-sans overflow-hidden transition-colors duration-200 ${darkMode ? 'bg-[#191919] text-gray-100' : 'bg-white text-gray-900'}`}>
      <Sidebar 
        pages={pages} 
        activePageId={activePageId} 
        onAddPage={addPage} 
        onSelectPage={setActivePageId} 
        onDeletePage={deletePage} 
        onOpenTemplates={() => setShowTemplates(true)}
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        onOpenSearch={() => setShowSearch(true)} 
        onOpenSettings={() => setShowSettings(true)} 
        activeWorkspace={activeWorkspace} 
        onSwitchWorkspace={setActiveWorkspace} 
        darkMode={darkMode} 
      />
      <div className="flex-1 flex flex-col h-full relative min-w-0">
        <div className={`h-12 border-b flex items-center px-4 justify-between shrink-0 z-10 transition-colors ${darkMode ? 'bg-[#191919] border-gray-800' : 'bg-white border-gray-100'}`}>
           <div className="flex items-center gap-2">
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-1 hover:bg-gray-100 rounded ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'text-gray-500'}`}><Menu className="w-4 h-4" /></button>
             <div className="flex items-center gap-2 text-sm overflow-hidden text-gray-500"><span>{activePage?.icon || '📄'}</span><span className={`font-medium truncate max-w-[200px] ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{activePage?.title || 'Untitled'}</span></div>
           </div>
           <div className="flex items-center gap-1">
             {activePage && <ShareMenu page={activePage} onUpdatePage={updatePageImmediate} darkMode={darkMode} />}
             <button onClick={() => activePage && updatePageImmediate({ ...activePage, favorite: !activePage.favorite })} className={`text-sm hover:bg-gray-100 p-1 rounded ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500'}`}><Star className={`w-4 h-4 ${activePage?.favorite ? 'fill-orange-400 text-orange-400' : ''}`} /></button>

             <div className="relative">
               <button onClick={() => setShowStyleMenu(!showStyleMenu)} className={`hover:bg-gray-100 p-1 rounded ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500'}`}><MoreHorizontal className="w-4 h-4" /></button>
               <PageStyleMenu isOpen={showStyleMenu} onClose={() => setShowStyleMenu(false)} page={activePage} onUpdatePage={updatePageImmediate} darkMode={darkMode} />
             </div>
           </div>
        </div>
        <Editor page={activePage} onUpdatePage={(p) => setPages(pags => pags.map(x => x.id === p.id ? p : x))} darkMode={darkMode} />
      </div>
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} pages={pages} onSelect={setActivePageId} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} onExport={handleExport} />
      <TemplateModal isOpen={showTemplates} onClose={() => setShowTemplates(false)} onSelect={handleTemplateSelect} darkMode={darkMode} />
      <TimerWidget />
    </div>
  );
}