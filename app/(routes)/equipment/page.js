'use client';

import { useEffect, useState } from 'react';
import EquipmentTable from '@/components/equipement-table';
import EquipmentToolbar from '@/components/equipment-toolbar';

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchEquipment = async () => {
    setLoading(true);
    const res = await fetch('/api/equipment');
    const data = await res.json();
    console.log('Fetched equipment:', data);
    setEquipment(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const filteredEquipment = equipment.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.serialNumber?.toLowerCase().includes(search.toLowerCase())
  );

  console.log('Filtered equipment:', filteredEquipment);

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <EquipmentToolbar search={search} setSearch={setSearch} />

      {loading ? (
        <div className="mt-8 text-gray-500">Loading equipment...</div>
      ) : (
        <EquipmentTable equipment={filteredEquipment} />
      )}
    </div>
  );
}