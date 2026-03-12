import React, { useState } from 'react';
import { Share2, Globe, Lock, Copy, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PageData } from '../types';

interface ShareMenuProps {
  page: PageData;
  onUpdatePage: (page: PageData) => void;
  darkMode: boolean;
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ page, onUpdatePage, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const togglePublic = () => {
    const isPublic = !page.isPublic;
    const shareId = isPublic ? Math.random().toString(36).substr(2, 9) : undefined;
    onUpdatePage({ ...page, isPublic, shareId });
  };

  const shareUrl = `${window.location.origin}/share/${page.shareId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`flex items-center gap-1.5 px-2 py-1 rounded text-sm font-medium transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={`absolute right-0 top-10 w-80 z-50 rounded-xl shadow-2xl border p-4 ${darkMode ? 'bg-[#202020] border-gray-700 text-gray-100' : 'bg-white border-gray-100 text-gray-900'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {page.isPublic ? <Globe className="w-4 h-4 text-blue-500" /> : <Lock className="w-4 h-4 text-gray-400" />}
                  <span className="text-sm font-semibold">{page.isPublic ? 'Published to Web' : 'Private'}</span>
                </div>
                <button 
                  onClick={togglePublic}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${page.isPublic ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  {page.isPublic ? 'Unpublish' : 'Publish'}
                </button>
              </div>

              {page.isPublic ? (
                <div className="space-y-3">
                  <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <input 
                      readOnly 
                      value={shareUrl} 
                      className="bg-transparent text-xs flex-1 outline-none opacity-60"
                    />
                    <button onClick={copyLink} className="p-1.5 hover:bg-gray-400/20 rounded-md transition-colors">
                      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>Anyone with the link can view</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  Publish this page to share it with others. Private pages are only visible to you.
                </p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
