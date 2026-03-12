import React from 'react';
import { Settings, Moon, Sun, Download } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onExport: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, darkMode, toggleDarkMode, onExport }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center transition-all duration-300" onClick={onClose}>
            <div className={`w-full max-w-md rounded-lg shadow-xl p-6 animate-in fade-in zoom-in duration-200 ${darkMode ? 'bg-[#202020] text-gray-100' : 'bg-white text-gray-900'}`} onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings className="w-5 h-5" /> Settings</h2>
                <div className="space-y-6">
                    <div className={`flex items-center justify-between pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                {darkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-orange-500" />}
                            </div>
                            <div>
                                <div className="font-medium">Dark Mode</div>
                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Switch themes</div>
                            </div>
                        </div>
                        <button onClick={toggleDarkMode} className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${darkMode ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                            <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>
                    <div className={`flex items-center justify-between pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <Download className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                            </div>
                            <div>
                                <div className="font-medium">Export Data</div>
                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Download JSON</div>
                            </div>
                        </div>
                        <button onClick={onExport} className={`px-3 py-1.5 text-sm rounded transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>Export</button>
                    </div>
                    <div className={`text-xs text-center mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Notion Lite v3.0 (MERN Ready)</div>
                </div>
            </div>
        </div>
    );
};
