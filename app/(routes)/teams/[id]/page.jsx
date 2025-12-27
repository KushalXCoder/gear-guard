'use client'
import React, { useState, useEffect, use } from 'react';
import {
    ArrowLeft,
    Users,
    Settings,
    Trash2,
    UserPlus,
    Building2,
    Mail,
    Shield
} from 'lucide-react';
import Link from 'next/link';
// ... imports
import { useRouter } from 'next/navigation';

export default function TeamDetailPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const router = useRouter();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modals & Search State
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);
    const [userQuery, setUserQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Initial Fetch
    const fetchTeam = async () => {
        try {
            const res = await fetch(`/api/teams/${params.id}`);
            const result = await res.json();
            if (result.success) setTeam(result.data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, [params.id]);

    // Search Users Logic
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
                    // Filter out existing members
                    const filtered = result.data.filter(u =>
                        !team.members.some(m => m._id === u._id)
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
    }, [userQuery, team]);


    // Handlers
    const handleDeleteTeam = async () => {
        try {
            const res = await fetch(`/api/teams/${params.id}`, {
                method: 'DELETE',
                headers: { 'x-user-role': 'admin' }
            });
            if (res.ok) router.push('/teams');
        } catch (err) {
            alert('Failed to delete team');
        }
    };

    const handleAddMember = async (user) => {
        try {
            const updatedMembers = [...team.members.map(m => m._id), user._id];

            const res = await fetch(`/api/teams/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-role': 'admin'
                },
                body: JSON.stringify({
                    ...team,
                    members: updatedMembers
                })
            });

            if (res.ok) {
                await fetchTeam(); // Refresh data
                setShowAddMember(false);
                setUserQuery('');
            }
        } catch (err) {
            alert('Failed to add member');
        }
    };

    const handleRemoveMember = async (userId) => {
        if (!confirm("Remove this technician from the team?")) return;

        try {
            const updatedMembers = team.members.filter(m => m._id !== userId).map(m => m._id);

            const res = await fetch(`/api/teams/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-role': 'admin'
                },
                body: JSON.stringify({
                    ...team,
                    members: updatedMembers
                })
            });

            if (res.ok) {
                await fetchTeam();
            }
        } catch (err) {
            alert('Failed to remove member');
        }
    };

    if (loading) return <div className="p-20 text-center animate-pulse text-slate-400 font-bold uppercase tracking-widest italic">Syncing Team Data...</div>;
    if (!team) return <div className="p-20 text-center text-red-500 font-bold">Team Not Found</div>;

    return (
        <div className="min-h-screen bg-[#F8F9FB] pb-20 font-sans text-slate-900 relative">

            {/* DELETE MODAL */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in duration-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Team?</h3>
                        <p className="text-slate-500 text-sm mb-6">This action cannot be undone. All team assignments will be lost.</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                            <button onClick={handleDeleteTeam} className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg">Delete Forever</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD MEMBER MODAL */}
            {showAddMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Add Technician</h3>
                            <button onClick={() => setShowAddMember(false)}><Trash2 className="rotate-45" size={20} /></button>
                        </div>

                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none mb-4"
                            value={userQuery}
                            onChange={(e) => setUserQuery(e.target.value)}
                            autoFocus
                        />

                        <div className="max-h-60 overflow-y-auto space-y-1">
                            {searchResults.map(user => (
                                <button
                                    key={user._id}
                                    onClick={() => handleAddMember(user)}
                                    className="w-full p-3 hover:bg-slate-50 flex items-center justify-between rounded-lg group transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                                            {user.name.substring(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{user.name}</p>
                                            <p className="text-[10px] text-slate-400 uppercase">{user.role}</p>
                                        </div>
                                    </div>
                                    <UserPlus size={16} className="text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                            {userQuery.length > 1 && searchResults.length === 0 && !isSearching && (
                                <p className="text-center text-xs text-slate-400 italic py-4">No matching users found.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* --- TOP ACTION BAR --- */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/teams" className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-slate-800">{team.name}</h1>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${team.isActive ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                                    {team.isActive ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 font-medium italic uppercase tracking-wider">
                                {team.specialization || 'General Maintenance'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="text-slate-400 hover:text-red-600 p-2 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto mt-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- LEFT: TEAM ROSTER --- */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Summary Card */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
                            <div className="h-16 w-16 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                                <Users size={32} />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Members</h2>
                                <p className="text-3xl font-black text-slate-800">{team.members?.length || 0}</p>
                            </div>
                        </div>

                        {/* Members List */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/30">
                                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                    <Shield size={18} className="text-teal-600" /> Authorized Technicians
                                </h3>
                                <button
                                    onClick={() => setShowAddMember(true)}
                                    className="text-[#00A09D] text-xs font-bold hover:underline flex items-center gap-1"
                                >
                                    <UserPlus size={14} /> Add Member
                                </button>
                            </div>

                            <div className="divide-y divide-slate-50">
                                {team.members?.length > 0 ? (
                                    team.members.map((member) => (
                                        <div key={member._id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                                                    {member.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{member.name}</p>
                                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                                                        <Mail size={10} />
                                                        {member.email}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="px-3 py-1 bg-slate-50 rounded text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                    Technician
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveMember(member._id)}
                                                    className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center text-slate-400 italic text-sm">
                                        No technicians currently assigned to this team.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ... rest of the component (Right column) ... */}
                    <div className="space-y-6">
                        {/* Company Association */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Building2 size={12} /> Organizational Unit
                            </h4>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-slate-800 rounded flex items-center justify-center text-white text-xs font-bold">
                                    {team.companyName.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{team.companyName}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Maintenance Division</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Help */}
                        <div className="bg-teal-600 rounded-xl p-6 text-white shadow-lg shadow-teal-100">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80">Admin Note</h4>
                            <p className="text-xs leading-relaxed font-medium">
                                This team specialized in <strong>{team.specialization || 'General'}</strong> work will only receive maintenance requests specifically routed to their domain.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}