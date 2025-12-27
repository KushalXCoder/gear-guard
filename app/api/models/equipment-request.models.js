import mongoose from 'mongoose';
import User from './User.models';

const maintenanceRequestSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    reference: { type: String, unique: true },

    createdBy: {
      type: String,
    },

    maintenanceFor: {
      type: String,
      enum: ['Internal Maintenance', 'Customer Repair'],
      required: true,
    },

    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true,
    },

    category: String,

    maintenanceType: {
      type: String,
      enum: ['Corrective', 'Preventive'],
      required: true,
    },

    team: String,

    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    scheduledDate: Date,
    duration: Number,

    priority: {
      type: Number,
      min: 1,
      max: 3,
      default: 2,
    },

    notes: String,
    instructions: String,

    status: {
      type: String,
      enum: ['New', 'In Progress', 'Repaired','Scrapped'],
      default: 'New',
    },
  },
  { timestamps: true }
);
export default mongoose.models.MaintenanceRequest ||
mongoose.model('MaintenanceRequest', maintenanceRequestSchema);