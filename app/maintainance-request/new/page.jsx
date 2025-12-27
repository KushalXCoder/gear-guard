"use client";

import { useAuth } from "@/context/AuthContext";
import { Calendar, Clock, Laptop, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";

const FormLabel = ({ children }) => (
  <label className="block text-sm font-medium text-gray-500 mb-1">
    {children}
  </label>
);

const ReadOnlyField = ({ value, icon: Icon }) => (
  <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-600">
    {Icon && <Icon size={16} className="text-gray-400" />}
    <span className="text-sm">{value}</span>
  </div>
);

const NewRequest = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [activeTab, setActiveTab] = useState("notes");
  const  { user } = useAuth();

  const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = async () => {
  try {
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.subject || !formData.equipment) {
      setError("Subject and Equipment are required");
      return;
    }

    const res = await fetch("/api/maintenance-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: formData.subject,
        createdBy: user?.name,
        maintenanceFor: formData.maintenanceFor,
        equipment: formData.equipment,
        maintenanceType: formData.maintenanceType,
        scheduledDate: formData.scheduledDate || null,
        duration: formData.duration || null,
        priority: formData.priority,
        notes: formData.notes,
        instructions: formData.instructions,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create request");
    }

    console.log("Maintenance request created:", data);

    // Optional: reset form or redirect
    // setFormData(initialState);
    // router.push("/maintenance");

  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const [formData, setFormData] = useState({
    subject: "",
    maintenanceFor: "Internal Maintenance",
    equipment: "",
    category: "",
    maintenanceType: "Corrective",
    team: "",
    technician: "",
    scheduledDate: "",
    duration: "",
    priority: 2,
    notes: "",
    instructions: "",
  });

  const isOverdue = new Date(formData.scheduledDate) < new Date();

  // 🔹 FETCH EQUIPMENT LIST
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetch("/api/equipment");
        const data = await res.json();
        setEquipmentList(data);
      } catch (error) {
        console.error("Failed to fetch equipment", error);
      }
    };

    fetchEquipment();
  }, []);

  // 🔹 FETCH EQUIPMENT DETAILS ON SELECT
  const handleEquipmentChange = async (e) => {
    const equipmentId = e.target.value;
    if (!equipmentId) return;

    setFormData((prev) => ({
      ...prev,
      equipment: equipmentId,
    }));

    try {
      const res = await fetch(`/api/equipment/${equipmentId}`);
      const data = await res.json();

      console.log("Equipment details fetched:", data);

      setFormData((prev) => ({
        ...prev,
        category: data.category,
        team: data.department,
        technician: data.assignedTechnician?.name || "",
      }));
    } catch (error) {
      console.error("Failed to fetch equipment details", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-12 font-primary text-gray-900">
      <main className="max-w-5xl mx-auto pt-12 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {formData.subject}
              </h1>
              <p className="text-sm text-gray-400 italic">
                Reference: MAINT/2025/0042
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* LEFT COLUMN */}
              <div className="space-y-5">
                <div>
                  <FormLabel>Subject</FormLabel>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <FormLabel>Created By</FormLabel>
                  <ReadOnlyField value={user?.name || ""} icon={User} />
                </div>

                <div>
                  <FormLabel>Maintenance For</FormLabel>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500">
                    <option>Internal Maintenance</option>
                    <option>Customer Repair</option>
                  </select>
                </div>

                <div>
                  <FormLabel>Equipment</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Laptop size={16} className="text-gray-400" />
                    </div>
                    <select
                      value={formData.equipment}
                      onChange={handleEquipmentChange}
                      className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Equipment</option>
                      {equipmentList.map((eq) => (
                        <option key={eq._id} value={eq._id}>
                          {eq.name} ({eq.serialNumber})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <FormLabel>Category</FormLabel>
                  <ReadOnlyField value={formData.category} icon={Settings} />
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-5">
                <div>
                  <FormLabel>Team</FormLabel>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500">
                    <option>{formData.team}</option>
                  </select>
                </div>

                <div>
                  <FormLabel>Responsible Technician</FormLabel>
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">
                      {formData.technician
                        ? formData.technician
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "—"}
                    </div>
                    <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500">
                      <option>{formData.technician}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormLabel>Scheduled Date</FormLabel>
                    <input
                      type="datetime-local"
                      value={formData.scheduledDate}
                      className={`w-full border rounded-md px-3 py-2 ${
                        isOverdue
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <FormLabel>Duration (Hrs)</FormLabel>
                    <input
                      type="text"
                      value={formData.duration}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="border-t border-gray-200">
            <div className="flex bg-gray-50 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "notes"
                    ? "bg-white text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Notes
              </button>
            </div>
            <input value={formData.notes} onChange={(e) => { setFormData(prev => ({ ...prev, notes: e.target.value })) }} type="text" className="px-4 py-5 w-full" />
          </div>
        </div>
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md mt-5">Submit</button>
      </main>
    </div>
  );
};

export default NewRequest;