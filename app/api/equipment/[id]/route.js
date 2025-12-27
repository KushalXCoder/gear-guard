import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/db';
import Equipment from '../../models/equipment.models';
import User from '../../models/User.models';

// GET single equipment
export async function GET(request, context) {
  try {
    await connectToDatabase();

    const { id } = await context.params;
    console.log('Fetching equipment with ID:', id);
    const equipment = await Equipment.findById(id)
      .populate('employee', 'name email role')
      .populate('assignedTechnician', 'name email');

    console.log('Fetched equipment:', equipment);

    if (!equipment) {
      console.log('Equipment not found for ID:', id);
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(equipment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update equipment
export async function PUT(request, context) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const { id } = await context.params;
    const equipment = await Equipment.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )
      .populate('employee', 'name email role')
      .populate('assignedTechnician', 'name email');

    if (!equipment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE equipment
export async function DELETE(request, context) {
  try {
    await connectToDatabase();

    const { id } = await context.params;
    const equipment = await Equipment.findByIdAndDelete(id);

    if (!equipment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const getEquipmentDetails = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate('assignedTechnician', 'name initials');

    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    res.status(200).json({
      equipmentId: equipment._id,
      category: equipment.category,
      department: equipment.department,
      company: equipment.company,
      technician: equipment.assignedTechnician
        ? {
            _id: equipment.assignedTechnician._id,
            name: equipment.assignedTechnician.name,
            initials: equipment.assignedTechnician.initials,
          }
        : null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch equipment details' });
  }
};