import { 
  Plus, Trash2, FileText, ChevronsLeft, 
  Search, Settings, Lock, Users
} from 'lucide-react';
import type { PageData } from '../types';


interface SidebarProps {
  pages: PageData[];
  activePageId: string | null;
  onAddPage: () => void;
  onSelectPage: (id: string) => void;
  onDeletePage: (id: string) => void;
  onOpenTemplates: () => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  activeWorkspace: 'private' | 'public';
  onSwitchWorkspace: (workspace: 'private' | 'public') => void;
  darkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  pages, activePageId, onAddPage, onSelectPage, onDeletePage, onOpenTemplates,
  isOpen, toggleSidebar, onOpenSearch, onOpenSettings, 
  activeWorkspace, onSwitchWorkspace, darkMode 
}) => {

  const displayedPages = pages.filter(p => p.workspace === activeWorkspace && !p.favorite);
  const favoritePages = pages.filter(p => p.workspace === activeWorkspace && p.favorite);

  return (
    <>
      <div className={`fixed inset-0 bg-black/20 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}/>
      <div className={`fixed md:relative z-30 h-full border-r flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-0 md:border-none'} ${darkMode ? 'bg-[#202020] border-gray-700' : 'bg-[#F7F7F5] border-gray-200'}`}>
        <div className={`flex flex-col h-full w-64 overflow-hidden transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 invisible md:invisible'}`}>
            <div className="p-3 m-2 flex items-center justify-between group">
                <div className={`flex items-center gap-2 cursor-pointer p-1 rounded-md flex-1 ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-200 text-gray-700'}`}>
                     <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold shadow-sm">N</div>
                     <span className={`font-medium text-sm truncate ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>My Workspace</span>
                </div>
                <button onClick={toggleSidebar} className={`p-1 rounded opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 ${darkMode ? 'text-gray-500 hover:bg-gray-800' : 'text-gray-400 hover:bg-gray-200'}`}><ChevronsLeft className="w-4 h-4" /></button>
            </div>

            <div className="px-3 space-y-0.5 mb-4">
                <div onClick={onOpenSearch} className={`flex items-center gap-3 px-3 py-1.5 rounded cursor-pointer text-sm font-medium transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}><Search className="w-4 h-4" /><span>Search</span></div>
                <div onClick={onOpenSettings} className={`flex items-center gap-3 px-3 py-1.5 rounded cursor-pointer text-sm font-medium transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}><Settings className="w-4 h-4" /><span>Settings</span></div>
                <div onClick={onOpenTemplates} className={`flex items-center gap-3 px-3 py-1.5 rounded cursor-pointer text-sm font-medium transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}><FileText className="w-4 h-4" /><span>Templates</span></div>
            </div>


            <div className="px-5 mb-4">
                <div className={`flex p-0.5 rounded-lg ${darkMode ? 'bg-gray-800/60' : 'bg-gray-200/60'}`}>
                    <button onClick={() => onSwitchWorkspace('private')} className={`flex-1 flex items-center justify-center gap-1.5 py-1 text-xs font-medium rounded-md transition-all ${activeWorkspace === 'private' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-white shadow-sm text-gray-800') : 'text-gray-500 hover:text-gray-700'}`}><Lock className="w-3 h-3" /> Private</button>
                    <button onClick={() => onSwitchWorkspace('public')} className={`flex-1 flex items-center justify-center gap-1.5 py-1 text-xs font-medium rounded-md transition-all ${activeWorkspace === 'public' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-white shadow-sm text-gray-800') : 'text-gray-500 hover:text-gray-700'}`}><Users className="w-3 h-3" /> Public</button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                {favoritePages.length > 0 && <div className="mb-4"><div className={`px-3 pt-2 pb-1 text-xs font-semibold uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Favorites</div>{favoritePages.map(page => (<div key={page.id} className={`group flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer text-sm mb-0.5 ${activePageId === page.id ? (darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-900') : (darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-200')}`} onClick={() => { onSelectPage(page.id); if (window.innerWidth < 768) toggleSidebar(); }}><FileText className="w-4 h-4 shrink-0" /><span className="truncate flex-1">{page.title || 'Untitled'}</span></div>))}</div>}

                <div className={`px-3 pt-2 pb-1 text-xs font-semibold uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{activeWorkspace}</div>
                {displayedPages.map(page => (
                    <div key={page.id} className={`group flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer text-sm mb-0.5 ${activePageId === page.id ? (darkMode ? 'bg-gray-800 text-gray-200 font-semibold' : 'bg-gray-200 text-gray-900 font-semibold') : (darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-200')}`} onClick={() => { onSelectPage(page.id); if (window.innerWidth < 768) toggleSidebar(); }}>
                        <FileText className={`w-4 h-4 shrink-0 ${activePageId === page.id ? (darkMode ? 'text-gray-300' : 'text-gray-600') : 'text-gray-400'}`} />
                        <span className="truncate flex-1">{page.title || 'Untitled'}</span>
                        <button onClick={(e) => { e.stopPropagation(); onDeletePage(page.id); }} className={`opacity-0 group-hover:opacity-100 p-1 rounded ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-300 text-gray-500'}`}><Trash2 className="w-3 h-3" /></button>
                    </div>
                ))}
                
                <button onClick={onAddPage} className={`flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer text-sm w-full mt-2 transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-200'}`}><Plus className="w-4 h-4 shrink-0" /><span>Add a page</span></button>
            </div>
            <div className={`p-3 border-t text-xs text-center ${darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-200 text-gray-400'}`}>Notion Lite v3.0</div>
        </div>
      </div>
    </>
  );
};
