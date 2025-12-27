'use client';
import React, { useState } from 'react';
import {
    Clock,
    AlertCircle,
    Laptop,
    Plus,
    MoreVertical,
    Wrench,
    CheckCircle2,
    Trash2
} from 'lucide-react';

// --- Initial Mock Data ---
const INITIAL_TASKS = [
    { id: '1', subject: 'Laptop Screen Flickering', equipment: 'Acer Laptop LP/203', technician: 'Graceful Clam', stage: 'New', priority: 'High', type: 'Corrective', overdue: true, avatar: 'GC' },
    { id: '2', subject: 'Monthly CNC Calibration', equipment: 'CNC Machine-01', technician: 'Watchful Octopus', stage: 'In Progress', priority: 'Medium', type: 'Preventive', overdue: false, avatar: 'WO' },
    { id: '3', subject: 'Oil Leakage - Hydraulic', equipment: 'Forklift XT', technician: 'Graceful Clam', stage: 'New', priority: 'High', type: 'Corrective', overdue: false, avatar: 'GC' },
    { id: '4', subject: 'Software Update', equipment: 'Workstation 05', technician: 'System Admin', stage: 'Repaired', priority: 'Low', type: 'Preventive', overdue: false, avatar: 'SA' },
    { id: '5', subject: 'Engine Failure - Total', equipment: 'Delivery Truck B2', technician: 'Arctic Goldfinch', stage: 'Scrap', priority: 'High', type: 'Corrective', overdue: false, avatar: 'AG' },
];

const STAGES = ['New', 'In Progress', 'Repaired', 'Scrap'];

export default function GearGuardKanban() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [draggedTaskId, setDraggedTaskId] = useState(null);

    // --- Drag and Drop Handlers ---

    const onDragStart = (e, id) => {
        setDraggedTaskId(id);
        e.dataTransfer.effectAllowed = 'move';
        // Visual feedback for the ghost image
        e.target.style.opacity = '0.5';
    };

    const onDragEnd = (e) => {
        e.target.style.opacity = '1';
        setDraggedTaskId(null);
    };

    const onDragOver = (e) => {
        e.preventDefault(); // Necessary to allow drop
        e.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (e, targetStage) => {
        e.preventDefault();
        if (!draggedTaskId) return;

        setTasks(prev => prev.map(task => {
            if (task.id === draggedTaskId) {
                // Business Logic: If moved to Scrap, you might trigger an alert here
                return { ...task, stage: targetStage };
            }
            return task;
        }));
        setDraggedTaskId(null);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-8 font-sans text-slate-900">
            {/* Kanban Board Container */}
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STAGES.map((stage) => (
                    <div
                        key={stage}
                        className="flex flex-col min-h-[700px]"
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, stage)}
                    >
                        {/* Column Header */}
                        <div className="flex items-center justify-between mb-4 px-2 border-b-2 border-transparent">
                            <div className="flex items-center gap-3">
                                <h2 className="text-sm font-bold text-slate-600 uppercase tracking-widest">{stage}</h2>
                                <span className="bg-slate-200 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    {tasks.filter(t => t.stage === stage).length}
                                </span>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Droppable Area */}
                        <div className={`flex-1 rounded-xl p-2 transition-colors duration-200 ${draggedTaskId ? 'bg-slate-200/50 outline-2 outline-dashed outline-slate-300' : 'bg-transparent'}`}>
                            <div className="space-y-3">
                                {tasks
                                    .filter(task => task.stage === stage)
                                    .map((task) => (
                                        <div
                                            key={task.id}
                                            draggable
                                            onDragStart={(e) => onDragStart(e, task.id)}
                                            onDragEnd={onDragEnd}
                                            className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-[#00A09D] hover:shadow-md transition-all cursor-grab active:cursor-grabbing relative overflow-hidden group"
                                        >
                                            {/* Overdue Ribbon */}
                                            {task.overdue && (
                                                <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-sm">
                                                    <AlertCircle size={10} /> OVERDUE
                                                </div>
                                            )}

                                            {/* Header: Priority & Type */}
                                            <div className="flex justify-between items-start mb-3">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${task.type === 'Corrective' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-sky-50 text-sky-700 border border-sky-100'
                                                    }`}>
                                                    {task.type}
                                                </span>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className={`h-1.5 w-1.5 rounded-full ${i <= (task.priority === 'High' ? 3 : task.priority === 'Medium' ? 2 : 1) ? 'bg-amber-400' : 'bg-slate-200'}`} />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-[#00A09D] transition-colors leading-tight">
                                                {task.subject}
                                            </h3>

                                            <div className="flex items-center text-xs text-slate-400 mb-4 gap-1">
                                                <Laptop size={14} className="opacity-70" />
                                                <span className="truncate">{task.equipment}</span>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-[#714B67] flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                                                        {task.avatar}
                                                    </div>
                                                    <span className="text-[11px] font-medium text-slate-500">{task.technician}</span>
                                                </div>
                                                <div className="flex items-center text-slate-300">
                                                    <Clock size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}