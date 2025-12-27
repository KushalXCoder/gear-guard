import mongoose from 'mongoose';
import User from './User.models';

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ['Computer', 'Laptop', 'Desktop', 'Vehicle', 'Machine'],
    },

    department: {
      type: String,
      required: true,
      enum: ['IT', 'Operations', 'Maintenance'],
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function () {
        return ['Computer', 'Laptop', 'Desktop'].includes(this.category);
      },
    },

    /**
     * ✅ Technician (optional but recommended)
     */
    assignedTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    company: {
      type: String,
      default: 'My Company',
    },

    status: {
      type: String,
      enum: ['operational', 'under_maintenance', 'scrapped', 'inactive'],
      default: 'operational',
    },

    location: {
      type: String,
      trim: true,
    },

    /**
     * ✅ Required only for Vehicle & Machine
     */
    workCenter: {
      type: String,
      enum: [
        'IT Operations',
        'Production Floor',
        'Maintenance Workshop',
        'Logistics & Warehouse',
        'Operations',
      ],
      required: function () {
        return ['Vehicle', 'Machine'].includes(this.category);
      },
    },

    assignedDate: {
      type: Date,
      default: Date.now,
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    healthPercentage: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    lastMaintenanceDate: {
      type: Date,
    },

    nextMaintenanceDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Equipment ||
  mongoose.model('Equipment', equipmentSchema);