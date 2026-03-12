import React, { useState, useEffect } from 'react';
import { Clock, X, Play, Pause, RotateCcw } from 'lucide-react';

export const TimerWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (isActive && time > 0) {
            interval = setInterval(() => setTime(t => t - 1), 1000);
        } else if (time === 0) setIsActive(false);
        return () => { if (interval) clearInterval(interval); };
    }, [isActive, time]);

    if (!isOpen) return <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-40 bg-white p-3 rounded-full shadow-lg border hover:scale-105 transition-transform"><Clock className="w-6 h-6 text-gray-600" /></button>;

    return (
        <div className="fixed bottom-6 right-6 z-40 bg-white rounded-xl shadow-2xl border p-4 w-64 animate-in slide-in-from-bottom-5 fade-in transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2"><Clock className="w-4 h-4" /> Timer</h3>
                <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <div className="text-center py-2">
                <div className="text-5xl font-mono font-bold text-gray-800 mb-4">{Math.floor(time / 60).toString().padStart(2, '0')}:{ (time % 60).toString().padStart(2, '0') }</div>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setIsActive(!isActive)} className={`p-3 rounded-full text-white shadow-md transition-all ${isActive ? 'bg-orange-500' : 'bg-indigo-600'}`}>{isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}</button>
                    <button onClick={() => { setIsActive(false); setTime(25*60); }} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><RotateCcw className="w-5 h-5 text-gray-600" /></button>
                </div>
            </div>
        </div>
    );
};
