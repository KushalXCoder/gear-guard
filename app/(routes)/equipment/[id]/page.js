'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EquipmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipment = async () => {
      const res = await fetch(`/api/equipment/${id}`);
      const data = await res.json();
      setEquipment(data);
      setLoading(false);
    };

    fetchEquipment();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  if (!equipment) {
    return <div className="p-6 text-red-500">Equipment not found</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto font-primary">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-semibold">
            {equipment.name}
          </h1>
        </div>

        <span className="px-3 py-1 text-xs rounded-md bg-purple-100 text-purple-700">
          {equipment.status}
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white border rounded-xl p-8">
        <div className="grid grid-cols-2 gap-x-16 gap-y-6">
          <Field label="Name" value={equipment.name} />
          <Field label="Technician" value={equipment.assignedTechnician?.name} />

          <Field label="Equipment Category" value={equipment.category} />
          <Field label="Employee" value={equipment.employee?.name} />

          <Field label="Company" value={equipment.company} />
          <Field label="Scrap Date" value="—" />

          <Field label="Used By" value={(equipment.category === "Vehicle" || equipment.category === "Machine") ? "Employee" : "Department" } />
          <Field label="Department Name" value={equipment.department} />
          <Field label="Used in Location" value={equipment.location || '—'} />

          <Field label="Maintenance Team" value="Internal Maintenance" />
          <Field label="Work Center" value={equipment.workCenter || '—'} />

          <Field
            label="Assigned Date"
            value={
              equipment.assignedDate
                ? new Date(equipment.assignedDate).toLocaleDateString()
                : '—'
            }
          />
        </div>

        {/* Description */}
        <div className="mt-10">
          <h1 className='text-gray-500 mb-1'>Description:</h1>
          <label className="block text-sm text-black pb-2 border-b-2">
            {equipment.description ? equipment.description : 'No description provided'}
          </label>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1">
        {label}
      </label>
      <div className="border-b border-gray-400 pb-1 text-gray-900">
        {value || '—'}
      </div>
    </div>
  );
}