'use client';
import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Save,
    X,
    UserPlus,
    ShieldCheck,
    Info,
    Loader2,
    Check,
    Plus
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function CreateTeamPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        specialization: '',
        members: [],
        isActive: true
    });

    // Redirect non-admin users
    useEffect(() => {
        if (!authLoading && user?.role !== 'admin') {
            router.push('/teams');
        }
    }, [user, authLoading, router]);


    const [userQuery, setUserQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Search technicians logic (letter-by-letter)
    useEffect(() => {
        const searchUsers = async () => {
            if (userQuery.length < 2) {
                setSearchResults([]);
                return;
            }
            setIsSearching(true);
            try {
                const res = await fetch(`/api/users?name=${userQuery}`);
                const result = await res.json();
                if (result.success) {
                    // Filter out users already added to the list
                    const filtered = result.data.filter(u =>
                        !formData.members.some(m => m._id === u._id)
                    );
                    setSearchResults(filtered);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsSearching(false);
            }
        };

        const timer = setTimeout(searchUsers, 300);
        return () => clearTimeout(timer);
    }, [userQuery, formData.members]);

    const addMember = (user) => {
        setFormData({ ...formData, members: [...formData.members, user] });
        setUserQuery('');
        setSearchResults([]);
    };

    const removeMember = (userId) => {
        setFormData({
            ...formData,
            members: formData.members.filter(m => m._id !== userId)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Logic: Send IDs only to the backend
            const payload = {
                ...formData,
                members: formData.members.map(m => m._id)
            };

            const res = await fetch('/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-role': 'admin' // Mocking the admin role check
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => window.location.href = '/teams', 1500);
            }
        } catch (err) {
            alert("Failed to create team");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900 pb-20">
            {/* Header / Actions */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/teams" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administration / Teams</nav>
                            <h1 className="text-xl font-bold text-slate-800">New Maintenance Team</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/teams" className="text-sm font-semibold text-slate-600 hover:text-slate-800">Discard</Link>
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !formData.name}
                            className="bg-[#00A09D] hover:bg-[#008a87] disabled:bg-slate-300 text-white px-6 py-2 rounded shadow-sm text-sm font-bold flex items-center gap-2 transition-all"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            {success ? "Created!" : "Save Team"}
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-5xl mx-auto mt-8 px-4">
                {/* Success Alert */}
                {success && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                        <Check size={20} />
                        <span className="font-semibold text-sm">Team successfully initialized. Redirecting...</span>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-slate-50 border-b border-slate-200 px-8 py-3 flex justify-end">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Draft Mode</span>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                            {/* Left Side: General Info */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Team Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Mechanical Unit A"
                                        className="w-full text-lg font-semibold border-b-2 border-slate-200 focus:border-[#00A09D] outline-none pb-1 transition-colors"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. GearGuard HQ"
                                        className="w-full text-base border-b-2 border-slate-200 focus:border-[#00A09D] outline-none pb-1 transition-colors"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Specialization</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                                        value={formData.specialization}
                                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                    >
                                        <option value="">Select Domain...</option>
                                        <option value="Electrical">Electrical</option>
                                        <option value="Mechanics">Mechanics</option>
                                        <option value="IT/Software">IT / Software</option>
                                        <option value="Facilities">Facilities</option>
                                    </select>
                                </div>
                            </div>

                            {/* Right Side: Logic Information */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <div className="flex items-start gap-3 mb-4">
                                    <ShieldCheck className="text-teal-600 mt-1" size={20} />
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-800">Admin Permissions</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">As an Admin, you are creating a new work silo. Only technicians added to this team can process its specific maintenance requests.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 accent-[#00A09D]"
                                    />
                                    <label htmlFor="active" className="text-sm font-medium text-slate-700 cursor-pointer">Set Team as Active</label>
                                </div>
                            </div>
                        </div>

                        <hr className="my-10 border-slate-100" />

                        {/* Team Members Section */}
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <UserPlus size={16} /> Assign Technicians
                            </h3>

                            <div className="relative max-w-md mb-6">
                                <input
                                    type="text"
                                    placeholder="Search user by name letter by letter..."
                                    className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                                    value={userQuery}
                                    onChange={(e) => setUserQuery(e.target.value)}
                                />

                                {/* Search Results Dropdown */}
                                {searchResults.length > 0 && (
                                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-30 max-h-48 overflow-y-auto">
                                        {searchResults.map(user => (
                                            <div
                                                key={user._id}
                                                onClick={() => addMember(user)}
                                                className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b last:border-0 border-slate-50"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                                                        {user.name.substring(0, 2)}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-800">{user.name}</p>
                                                        <p className="text-[10px] text-slate-400 uppercase tracking-tighter font-medium">{user.role}</p>
                                                    </div>
                                                </div>
                                                <Plus size={14} className="text-teal-600" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {isSearching && <Loader2 size={14} className="absolute right-3 top-3 animate-spin text-slate-400" />}
                            </div>

                            {/* Selected Members Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {formData.members.map(member => (
                                    <div key={member._id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg group hover:border-teal-500 transition-colors shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white text-[11px] font-bold shadow-inner">
                                                {member.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 leading-none mb-1">{member.name}</p>
                                                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Technician</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeMember(member._id)}
                                            className="text-slate-300 hover:text-red-500 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}

                                {formData.members.length === 0 && (
                                    <div className="col-span-full py-12 border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-300">
                                        <UserPlus size={32} className="mb-2 opacity-20" />
                                        <p className="text-xs font-bold uppercase tracking-widest italic">No members assigned yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Hint */}
                <div className="mt-6 flex items-center gap-2 text-slate-400">
                    <Info size={14} />
                    <p className="text-[10px] font-medium italic tracking-wide">Changes will take effect immediately upon saving. All assigned members will gain view access to requests for this team.</p>
                </div>
            </main>
        </div>
    );
}