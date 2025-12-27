"use client";

import { useRouter } from 'next/navigation';
import { Search, AlertTriangle, Users, CheckCircle, Clock, Calendar, FileText, Plus, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MaintenanceDashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);


  const criticalEquipment = [
    { id: 1, name: 'Hydraulic Press #3', health: 28, status: 'critical' },
    { id: 2, name: 'CNC Machine #7', health: 35, status: 'critical' },
    { id: 3, name: 'Air Compressor #2', health: 32, status: 'critical' },
    { id: 4, name: 'Conveyor Belt #5', health: 29, status: 'critical' },
    { id: 5, name: 'Boiler Unit #1', health: 34, status: 'critical' }
  ];

  const technicianLoad = [
    { id: 1, name: 'Alex Foster', utilization: 85, status: 'high', tasks: 12 },
    { id: 2, name: 'Sarah Chen', utilization: 78, status: 'high', tasks: 9 },
    { id: 3, name: 'Marcus Reid', utilization: 65, status: 'moderate', tasks: 7 },
    { id: 4, name: 'Emily Torres', utilization: 72, status: 'moderate', tasks: 8 }
  ];

  const openRequests = [
    { id: 1, equipment: 'Generator', category: 'Electrical', technician: 'Alex Foster', status: 'pending', priority: 'high' },
    { id: 2, equipment: 'HVAC Unit', category: 'Climate Control', technician: 'Sarah Chen', status: 'in-progress', priority: 'medium' },
    { id: 3, equipment: 'Forklift #4', category: 'Material Handling', technician: 'Unassigned', status: 'pending', priority: 'high' },
    { id: 4, equipment: 'Packaging Machine', category: 'Production', technician: 'Marcus Reid', status: 'in-progress', priority: 'medium' },
    { id: 5, equipment: 'Water Pump', category: 'Utilities', technician: 'Emily Torres', status: 'pending', priority: 'low' }
  ];

  const recentActivity = [
    { id: 1, action: 'Completed maintenance on CNC Machine #4', user: 'Alex Foster', time: '15 min ago' },
    { id: 2, action: 'New request created for Boiler inspection', user: 'System', time: '1 hour ago' },
    { id: 3, action: 'Updated status: Generator repair in progress', user: 'Sarah Chen', time: '2 hours ago' },
    { id: 4, action: 'Equipment health alert: Hydraulic Press #3', user: 'System', time: '3 hours ago' }
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        console.log('Fetched Tasks:', data);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log('Tasks state updated:', tasks);
  }, [tasks]);

  return (
    <div className="min-h-screen bg-slate-50 font-primary">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Maintenance Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">Equipment monitoring and workforce optimization</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200">
              <Plus size={18} />
              <span onClick={() => router.push("/maintainance-request/new")} className="font-medium">New Request</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search equipment, requests, or technicians..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Critical Equipment */}
          <div className="bg-white rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">3 Units</h3>
              <p className="text-red-600 font-medium">Critical Equipment</p>
              <p className="text-sm text-slate-600 mt-2">(Health &lt; 39%)</p>
            </div>
          </div>

          {/* Technician Load */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">65% Utilized</h3>
              <p className="text-blue-600 font-medium">Technician Load</p>
              <p className="text-sm text-slate-600 mt-2">(Assign more tasks)</p>
            </div>
          </div>

          {/* Open Requests */}
          <div className="bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <CheckCircle className="text-red-600" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">12 Pending</h3>
              <p className="text-red-600 font-medium">Open Requests</p>
              <p className="text-sm text-slate-600 mt-2">0 Overdue</p>
            </div>
          </div>
        </div>

        {/* Open Requests Table */}
        <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Open Requests</h2>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all duration-200">
                <Filter size={16} />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Technician
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                    onClick={() => {
                      const params = new URLSearchParams({
                        id: request.id,
                        subject: request.subject, // Mapping equipment to subject as per plan
                        equipment: request.equipment.name,
                        technician: request.technician.name,
                        category: request.category,
                        status: request.status === 'pending' ? 'New' : 'In Progress', // Mapping status
                        priority: request.priority
                      });
                      router.push(`/maintainance-request?${params.toString()}`);
                    }}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 truncate">{request.subject}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{request.technician.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{request.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${request.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-blue-50 text-blue-700'
                          }`}
                      >
                        {request.status === 'pending' ? 'Pending' : 'In Progress'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${request.priority === '3'
                          ? 'bg-red-50 text-red-700'
                          : request.priority === '2'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                          }`}
                      >
                        {request.priority === '3'
                          ? 'High'
                          : request.priority === '2'
                            ? 'Medium'
                            : 'Low'
                        }
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}