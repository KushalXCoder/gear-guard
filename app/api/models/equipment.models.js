import mongoose from 'mongoose';
import User from './User.models';

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: String, unique: true, required: true },
  category: { type: String, required: true }, // Monitors, Computers, Machines, Vehicles
  department: { type: String, required: true }, // Admin, Technician, Production, etc.
  
  // Owner/User of the equipment
  employee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  
  // Assigned technician for maintenance
  assignedTechnician: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // User with role='technician'
  },
  
  // Company (for multi-tenant)
  company: {
    type: String,
    default: "My Company",
  },
  
  // Equipment status
  status: { 
    type: String, 
    enum: ['operational', 'under_maintenance', 'scrapped', 'inactive'],
    default: 'operational'
  },
  
  location: String,
  
  // Health tracking (for Critical Equipment alert)
  healthPercentage: { type: Number, default: 100, min: 0, max: 100 },
  
  lastMaintenanceDate: Date,
  nextMaintenanceDate: Date

}, { timestamps: true });

export default mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);