"use client";

import React, { useState } from 'react';
import { Search, AlertTriangle, Users, CheckCircle, Clock, Calendar, FileText, Plus, Filter } from 'lucide-react';

export default function MaintenanceDashboard() {


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

  return (
    <div className="min-h-screen bg-slate-50">
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
              <span className="font-medium">New Request</span>
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
              <h3 className="text-3xl font-bold text-slate-900 mb-1">5 Units</h3>
              <p className="text-red-600 font-medium">Critical Equipment</p>
              <p className="text-sm text-slate-600 mt-2">(Health &lt; 30%)</p>
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
              <h3 className="text-3xl font-bold text-slate-900 mb-1">85% Utilized</h3>
              <p className="text-blue-600 font-medium">Technician Load</p>
              <p className="text-sm text-slate-600 mt-2">(Assign Carefully)</p>
            </div>
          </div>

          {/* Open Requests */}
          <div className="bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">12 Pending</h3>
              <p className="text-green-600 font-medium">Open Requests</p>
              <p className="text-sm text-slate-600 mt-2">3 Overdue</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Critical Equipment Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Critical Equipment</h2>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {criticalEquipment.length} units
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Equipment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Health
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {criticalEquipment.map((equipment) => (
                    <tr key={equipment.id} className="hover:bg-slate-50 transition-all duration-200">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{equipment.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full"
                              style={{ width: `${equipment.health}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{equipment.health}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                          Critical
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Technician Load */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Technician Load</h2>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {technicianLoad.length} technicians
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Technician
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Utilization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Tasks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {technicianLoad.map((tech) => (
                    <tr key={tech.id} className="hover:bg-slate-50 transition-all duration-200">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{tech.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                tech.utilization >= 80 ? 'bg-amber-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${tech.utilization}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{tech.utilization}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-700">{tech.tasks}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                {openRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50 transition-all duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{request.equipment}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{request.technician}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{request.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {request.status === 'pending' ? 'Pending' : 'In Progress'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          request.priority === 'high'
                            ? 'bg-red-50 text-red-700'
                            : request.priority === 'medium'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-all duration-200">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Clock className="text-indigo-600" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-600">{activity.user}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}