'use client'
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    ChevronRight,
    Calendar,
    User,
    Laptop,
    Clock,
    AlertCircle,
    CheckCircle2,
    Trash2,
    Settings
} from 'lucide-react';

// --- Reusable Sub-Components ---

const StatusBadge = ({ state }) => {
    const styles = {
        'New': 'bg-blue-100 text-blue-700 border-blue-200',
        'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
        'Repaired': 'bg-green-100 text-green-700 border-green-200',
        'Scrap': 'bg-red-100 text-red-700 border-red-200',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[state]}`}>
            {state}
        </span>
    );
};

const FormLabel = ({ children }) => (
    <label className="block text-sm font-medium text-gray-500 mb-1">
        {children}
    </label>
);

const ReadOnlyField = ({ value, icon: Icon }) => (
    <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-600">
        {Icon && <Icon size={16} className="text-gray-400" />}
        <span className="text-sm">{value}</span>
    </div>
);

// --- Main Page Component ---

export default function MaintenanceRequestPage() {
    const searchParams = useSearchParams();

    // Helper to safely get param or default
    const getParam = (key, fallback) => searchParams.get(key) || fallback;

    const [activeTab, setActiveTab] = useState('notes');
    const [formData, setFormData] = useState({
        subject: getParam('subject', "Test activity"),
        maintenanceFor: "Internal Maintenance",
        equipment: getParam('equipment', "Acer Laptop / LP/203/19281928"),
        category: getParam('category', "Computers"),
        requestDate: "2025-12-18",
        maintenanceType: "Corrective",
        team: "Watchful Octopus",
        technician: getParam('technician', "Graceful Clam"),
        scheduledDate: "2025-12-28T14:30",
        duration: "02:00",
        priority: getParam('priority', "Medium"),
        status: getParam('status', "New") // Mapping status might be needed to match exact strings
    });

    // Overdue Logic
    const isOverdue = new Date(formData.scheduledDate) < new Date();

    const workflowStages = ["New", "In Progress", "Repaired", "Scrap"];

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="min-h-screen bg-gray-100 pb-12 font-sans text-gray-900">
                {/* --- Header / Breadcrumbs --- */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="hover:text-blue-600 cursor-pointer">Maintenance Requests</span>
                        <ChevronRight size={16} />
                        <span className="font-semibold text-gray-800">{formData.subject}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors">
                            Save
                        </button>
                        <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 border border-gray-300 rounded shadow-sm text-sm font-medium transition-colors">
                            Discard
                        </button>
                    </div>
                </header>

                {/* --- Status Workflow Bar --- */}
                <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <StatusBadge state={formData.status} />
                        {isOverdue && (
                            <span className="flex items-center text-red-600 text-xs font-bold animate-pulse">
                                <AlertCircle size={14} className="mr-1" /> OVERDUE
                            </span>
                        )}
                    </div>

                    <nav className="flex items-center">
                        {workflowStages.map((stage, idx) => (
                            <div key={stage} className="flex items-center">
                                <span className={`text-xs font-medium px-4 py-1 rounded ${formData.status === stage
                                    ? 'text-blue-600 bg-blue-50 border border-blue-100'
                                    : 'text-gray-400'
                                    }`}>
                                    {stage}
                                </span>
                                {idx < workflowStages.length - 1 && (
                                    <ChevronRight size={14} className="text-gray-300 mx-1" />
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* --- Main Content Container --- */}
                <main className="max-w-5xl mx-auto mt-8 px-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

                        <div className="p-8">
                            {/* Title Section */}
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-gray-800 mb-1">{formData.subject}</h1>
                                <p className="text-sm text-gray-400 italic">Reference: MAINT/2025/0042</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

                                {/* LEFT COLUMN */}
                                <div className="space-y-5">
                                    <div>
                                        <FormLabel>Subject</FormLabel>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <FormLabel>Created By</FormLabel>
                                        <ReadOnlyField value="Arctic Goldfinch" icon={User} />
                                    </div>

                                    <div>
                                        <FormLabel>Maintenance For</FormLabel>
                                        <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500">
                                            <option>Internal Maintenance</option>
                                            <option>Customer Repair</option>
                                        </select>
                                    </div>

                                    <div>
                                        <FormLabel>Equipment</FormLabel>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Laptop size={16} className="text-gray-400" />
                                            </div>
                                            <select className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 bg-white focus:ring-2 focus:ring-blue-500">
                                                <option>{formData.equipment}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <FormLabel>Category</FormLabel>
                                        <ReadOnlyField value={formData.category} icon={Settings} />
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <FormLabel>Maintenance Type</FormLabel>
                                            <div className="flex items-center space-x-4 mt-2">
                                                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                                                    <input type="radio" name="type" checked={formData.maintenanceType === 'Corrective'} className="text-blue-600" />
                                                    <span>Corrective</span>
                                                </label>
                                                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                                                    <input type="radio" name="type" checked={formData.maintenanceType === 'Preventive'} className="text-blue-600" />
                                                    <span>Preventive</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN */}
                                <div className="space-y-5">
                                    <div>
                                        <FormLabel>Team</FormLabel>
                                        <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500">
                                            <option>{formData.team}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <FormLabel>Responsible Technician</FormLabel>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">
                                                GC
                                            </div>
                                            <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500">
                                                <option>{formData.technician}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <FormLabel>Scheduled Date</FormLabel>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Calendar size={16} className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="datetime-local"
                                                    value={formData.scheduledDate}
                                                    className={`w-full border rounded-md pl-10 pr-3 py-2 focus:ring-2 outline-none ${isOverdue ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-300'}`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <FormLabel>Duration (Hrs)</FormLabel>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Clock size={16} className="text-gray-400" />
                                                </div>
                                                <input type="text" defaultValue={formData.duration} className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <FormLabel>Priority</FormLabel>
                                        <div className="flex space-x-1">
                                            {[1, 2, 3].map((star) => (
                                                <button key={star} className={`p-1 rounded ${star <= 2 ? 'text-amber-400' : 'text-gray-300'}`}>
                                                    ★
                                                </button>
                                            ))}
                                            <span className="text-xs text-gray-500 ml-2 self-center">(Medium)</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <FormLabel>Company</FormLabel>
                                        <p className="text-sm font-semibold text-gray-700">My Company (San Francisco)</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* --- Bottom Tabs Section --- */}
                        <div className="border-t border-gray-200">
                            <div className="flex bg-gray-50 border-b border-gray-200">
                                <button
                                    onClick={() => setActiveTab('notes')}
                                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'notes' ? 'bg-white border-r border-gray-200 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Notes
                                </button>
                                <button
                                    onClick={() => setActiveTab('instructions')}
                                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'instructions' ? 'bg-white border-l border-r border-gray-200 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Instructions
                                </button>
                            </div>

                            <div className="p-6">
                                {activeTab === 'notes' ? (
                                    <textarea
                                        className="w-full h-32 p-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                                        placeholder="Add internal notes here..."
                                    ></textarea>
                                ) : (
                                    <div className="space-y-2">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Repair Checklist</p>
                                        <textarea
                                            className="w-full h-32 p-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none text-sm bg-gray-50"
                                            placeholder="Provide step-by-step instructions for the technician..."
                                        ></textarea>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* --- Footer Utility Actions --- */}
                    <div className="mt-6 flex justify-between items-center px-2">
                        <div className="flex space-x-4">
                            <button className="text-gray-500 hover:text-red-600 flex items-center text-sm transition-colors">
                                <Trash2 size={16} className="mr-1" /> Archive Request
                            </button>
                        </div>
                        <p className="text-xs text-gray-400">Last updated: Today at 10:45 AM</p>
                    </div>
                </main>
            </div>
        </Suspense>
    );
}