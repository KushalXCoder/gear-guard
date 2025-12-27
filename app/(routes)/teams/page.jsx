'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Users,
    ChevronRight,
    Plus,
    Building2,
    Loader2,
    Search
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function TeamsPage() {
    const { user } = useAuth();
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const isAdmin = user?.role === 'admin';

    // Fetch all teams on mount
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await fetch('/api/teams', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await res.json();
                console.log(result.data);
                if (result.data) {
                    setTeams(result.data);
                }
            } catch (error) {
                console.error("Error loading teams:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="animate-spin text-teal-600 mb-2" size={32} />
                <p className="text-sm text-gray-500 font-medium">Loading Teams...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Maintenance Teams</h1>
                        <p className="text-sm text-slate-500">Configure specialized workforces and technician assignments.</p>
                    </div>
                    {isAdmin && (
                        <Link href="/teams/new">
                            <button className="bg-[#00A09D] hover:bg-[#008a87] text-white px-5 py-2.5 rounded-lg shadow-sm font-semibold text-sm transition-all flex items-center gap-2">
                                <Plus size={18} /> Create Team
                            </button>
                        </Link>
                    )}
                </div>

                {/* Search & Stats Bar */}
                <div className="bg-white p-4 rounded-t-xl border border-slate-200 border-b-0 flex items-center justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by team name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        />
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-teal-600" />
                            <span className="font-semibold">{teams.length} Teams Total</span>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-b-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-bold">
                                <th className="px-6 py-4">Team Name</th>
                                <th className="px-6 py-4">Specialization</th>
                                <th className="px-6 py-4">Team Members</th>
                                <th className="px-6 py-4">Company</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTeams.map((team) => (
                                <Link
                                    key={team._id}
                                    href={`/teams/${team._id}`}
                                    component="tr" // Link behavior on row
                                    className="group hover:bg-slate-50 transition-colors cursor-pointer block md:table-row"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs uppercase">
                                                {team.name.substring(0, 2)}
                                            </div>
                                            <span className="font-bold text-slate-700 group-hover:text-teal-600 transition-colors">
                                                {team.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500 italic uppercase tracking-tight">
                                        {team.specialization || 'General Maintenance'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="text-sm text-slate-600">
                                                {team.members?.length > 0 ? (
                                                    <span className="bg-slate-100 px-2 py-1 rounded text-[11px] font-bold border border-slate-200">
                                                        {team.members.length} {team.members.length === 1 ? 'Member' : 'Members'}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-300 italic text-xs">No members assigned</span>
                                                )}
                                                <span className="ml-2 text-xs text-slate-400">
                                                    {team.members?.slice(0, 2).map(m => m.name).join(', ')}
                                                    {team.members?.length > 2 && '...'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Building2 size={14} />
                                            <span>{team.companyName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ${team.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {team.isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <ChevronRight size={18} className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                                    </td>
                                </Link>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {filteredTeams.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <Users className="text-slate-200 mb-4" size={48} />
                            <h3 className="text-slate-600 font-bold italic uppercase tracking-wider">No Teams Found</h3>
                            <p className="text-slate-400 text-sm max-w-xs">Adjust your search or create a new team to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}