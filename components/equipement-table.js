export default function EquipmentTable({ equipment }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr className="text-gray-600">
            <th className="text-left px-4 py-3 font-medium">Equipment Name</th>
            <th className="text-left px-4 py-3 font-medium">Employee</th>
            <th className="text-left px-4 py-3 font-medium">Department</th>
            <th className="text-left px-4 py-3 font-medium">Serial Number</th>
            <th className="text-left px-4 py-3 font-medium">Technician</th>
            <th className="text-left px-4 py-3 font-medium">Category</th>
            <th className="text-left px-4 py-3 font-medium">Company</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {equipment.length === 0 && (
            <tr>
              <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                No equipment found
              </td>
            </tr>
          )}

          {equipment.map((item) => (
            <tr
              key={item._id}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {item.name}
              </td>

              <td className="px-4 py-3 text-gray-700">
                {item.employee?.name || '—'}
              </td>

              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                  {item.department}
                </span>
              </td>

              <td className="px-4 py-3 text-gray-600">
                {item.serialNumber}
              </td>

              <td className="px-4 py-3 text-gray-700">
                {item.assignedTechnician?.name || '—'}
              </td>

              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700">
                  {item.category}
                </span>
              </td>

              <td className="px-4 py-3 text-gray-600">
                {item.company}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}