'use client';

export default function EquipmentToolbar({ search, setSearch }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Equipment
      </h1>

      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-64
                       focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          className="bg-black text-white px-5 py-2 rounded-lg text-sm
                     hover:bg-gray-800 transition"
          onClick={() => alert('Open create equipment modal')}
        >
          + New
        </button>
      </div>
    </div>
  );
}