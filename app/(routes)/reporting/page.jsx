"use client";
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Filter } from 'lucide-react';

// Mock data for maintenance requests
const mockRequests = [
  { id: '1', team: 'Mechanical', equipmentCategory: 'Production', status: 'Repaired' },
  { id: '2', team: 'Mechanical', equipmentCategory: 'Production', status: 'In Progress' },
  { id: '3', team: 'Mechanical', equipmentCategory: 'HVAC', status: 'New' },
  { id: '4', team: 'Mechanical', equipmentCategory: 'Production', status: 'Repaired' },
  { id: '5', team: 'Mechanical', equipmentCategory: 'Material Handling', status: 'In Progress' },
  { id: '6', team: 'Mechanical', equipmentCategory: 'Production', status: 'Repaired' },
  { id: '7', team: 'Mechanical', equipmentCategory: 'HVAC', status: 'New' },
  { id: '8', team: 'Mechanical', equipmentCategory: 'Production', status: 'In Progress' },
  { id: '9', team: 'Mechanical', equipmentCategory: 'Material Handling', status: 'Repaired' },
  { id: '10', team: 'Mechanical', equipmentCategory: 'Production', status: 'New' },
  { id: '11', team: 'Mechanical', equipmentCategory: 'HVAC', status: 'Repaired' },
  { id: '12', team: 'Mechanical', equipmentCategory: 'Production', status: 'In Progress' },
  
  { id: '13', team: 'Electrical', equipmentCategory: 'Electrical Systems', status: 'New' },
  { id: '14', team: 'Electrical', equipmentCategory: 'Lighting', status: 'Repaired' },
  { id: '15', team: 'Electrical', equipmentCategory: 'Electrical Systems', status: 'In Progress' },
  { id: '16', team: 'Electrical', equipmentCategory: 'Power Distribution', status: 'New' },
  { id: '17', team: 'Electrical', equipmentCategory: 'Electrical Systems', status: 'Repaired' },
  { id: '18', team: 'Electrical', equipmentCategory: 'Lighting', status: 'In Progress' },
  { id: '19', team: 'Electrical', equipmentCategory: 'Power Distribution', status: 'New' },
  { id: '20', team: 'Electrical', equipmentCategory: 'Electrical Systems', status: 'Repaired' },
  
  { id: '21', team: 'IT Support', equipmentCategory: 'Computers', status: 'New' },
  { id: '22', team: 'IT Support', equipmentCategory: 'Network', status: 'In Progress' },
  { id: '23', team: 'IT Support', equipmentCategory: 'Computers', status: 'Repaired' },
  { id: '24', team: 'IT Support', equipmentCategory: 'Printers', status: 'New' },
  { id: '25', team: 'IT Support', equipmentCategory: 'Computers', status: 'In Progress' },
  
  { id: '26', team: 'HVAC', equipmentCategory: 'Climate Control', status: 'Repaired' },
  { id: '27', team: 'HVAC', equipmentCategory: 'Climate Control', status: 'In Progress' },
  { id: '28', team: 'HVAC', equipmentCategory: 'Ventilation', status: 'New' },
  { id: '29', team: 'HVAC', equipmentCategory: 'Climate Control', status: 'Repaired' },
  { id: '30', team: 'HVAC', equipmentCategory: 'Ventilation', status: 'In Progress' },
  { id: '31', team: 'HVAC', equipmentCategory: 'Climate Control', status: 'New' },
  
  { id: '32', team: 'Plumbing', equipmentCategory: 'Water Systems', status: 'Repaired' },
  { id: '33', team: 'Plumbing', equipmentCategory: 'Drainage', status: 'New' },
  { id: '34', team: 'Plumbing', equipmentCategory: 'Water Systems', status: 'In Progress' },
  { id: '35', team: 'Plumbing', equipmentCategory: 'Water Systems', status: 'Repaired' },
  
  // Scrap items (should be ignored in analytics)
  { id: '36', team: 'Mechanical', equipmentCategory: 'Production', status: 'Scrap' },
  { id: '37', team: 'Electrical', equipmentCategory: 'Lighting', status: 'Scrap' },
  { id: '38', team: 'IT Support', equipmentCategory: 'Computers', status: 'Scrap' }
];

// Report Header Component
const ReportHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <TrendingUp className="text-indigo-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Maintenance Reports</h1>
          <p className="text-sm text-slate-600 mt-1">Insights into maintenance workload and team performance</p>
        </div>
      </div>
    </div>
  );
};

// Report Filters Component
const ReportFilters = ({ groupBy, chartType, onGroupByChange, onChartTypeChange }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-2">
        <Filter className="text-slate-500" size={18} />
        <span className="text-sm font-medium text-slate-700">Filters:</span>
      </div>
      
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-600">Group By:</label>
        <select
          value={groupBy}
          onChange={(e) => onGroupByChange(e.target.value)}
          className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="team">Team</option>
          <option value="category">Equipment Category</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-600">Chart Type:</label>
        <select
          value={chartType}
          onChange={(e) => onChartTypeChange(e.target.value)}
          className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>
    </div>
  );
};

// Bar Chart Component
const MaintenanceBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-xl border border-slate-200">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-slate-600 font-medium">No data available</p>
          <p className="text-sm text-slate-500 mt-1">No maintenance requests found for the selected criteria</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-lg">
          <p className="text-sm font-semibold text-slate-900">{payload[0].payload.label}</p>
          <p className="text-sm text-slate-600 mt-1">
            Requests: <span className="font-semibold text-indigo-600">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate max value for Y-axis scaling
  const maxValue = Math.max(...data.map(item => item.count));
  const yAxisMax = Math.ceil(maxValue * 1.2); // Add 20% padding

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Request Distribution</h3>
        <p className="text-sm text-slate-600 mt-1">Total active requests by group</p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="label" 
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: '#64748b', fontSize: 12 }}
            stroke="#cbd5e1"
          />
          <YAxis 
            tick={{ fill: '#64748b', fontSize: 12 }}
            stroke="#cbd5e1"
            domain={[0, yAxisMax]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
          <Bar 
            dataKey="count" 
            fill="#6366f1" 
            radius={[8, 8, 0, 0]}
            maxBarSize={80}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-slate-600">Total Groups</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">{data.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Total Requests</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">
              {data.reduce((sum, item) => sum + item.count, 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Average per Group</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">
              {Math.round(data.reduce((sum, item) => sum + item.count, 0) / data.length)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pie Chart Component
const MaintenancePieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-xl border border-slate-200">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-slate-600 font-medium">No data available</p>
          <p className="text-sm text-slate-500 mt-1">No maintenance requests found for the selected criteria</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#64748b'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = data.reduce((sum, item) => sum + item.count, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-lg">
          <p className="text-sm font-semibold text-slate-900">{payload[0].name}</p>
          <p className="text-sm text-slate-600 mt-1">
            Requests: <span className="font-semibold text-indigo-600">{payload[0].value}</span>
          </p>
          <p className="text-sm text-slate-600">
            Percentage: <span className="font-semibold">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Hide labels for small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Request Distribution</h3>
        <p className="text-sm text-slate-600 mt-1">Proportional view of maintenance workload</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={140}
              fill="#8884d8"
              dataKey="count"
              nameKey="label"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col justify-center">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Legend</h4>
          <div className="space-y-2">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{entry.label}</p>
                  <p className="text-xs text-slate-600">{entry.count} requests</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="text-center">
              <p className="text-sm text-slate-600">Total Requests</p>
              <p className="text-3xl font-semibold text-slate-900 mt-1">
                {data.reduce((sum, item) => sum + item.count, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Reports Page Component
const MaintenanceReports = () => {
  const [groupBy, setGroupBy] = useState('team');
  const [chartType, setChartType] = useState('bar');

  // Process data based on selected grouping
  // Ignore 'Scrap' status requests in analytics
  const processedData = useMemo(() => {
    const activeRequests = mockRequests.filter(req => req.status !== 'Scrap');
    
    const grouped = activeRequests.reduce((acc, request) => {
      const key = groupBy === 'team' ? request.team : request.equipmentCategory;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // Convert to array format for charts and sort by count descending
    return Object.entries(grouped)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  }, [groupBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ReportHeader />
        
        <ReportFilters
          groupBy={groupBy}
          chartType={chartType}
          onGroupByChange={setGroupBy}
          onChartTypeChange={setChartType}
        />

        {chartType === 'bar' ? (
          <MaintenanceBarChart data={processedData} />
        ) : (
          <MaintenancePieChart data={processedData} />
        )}

        {/* Additional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <TrendingUp className="text-blue-600" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Most Active</h3>
            </div>
            <p className="text-2xl font-bold text-slate-900">{processedData[0]?.label || 'N/A'}</p>
            <p className="text-sm text-slate-600 mt-1">{processedData[0]?.count || 0} requests</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Least Active</h3>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {processedData[processedData.length - 1]?.label || 'N/A'}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              {processedData[processedData.length - 1]?.count || 0} requests
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="text-purple-600" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Groups</h3>
            </div>
            <p className="text-2xl font-bold text-slate-900">{processedData.length}</p>
            <p className="text-sm text-slate-600 mt-1">
              {groupBy === 'team' ? 'Teams' : 'Categories'} tracked
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceReports;