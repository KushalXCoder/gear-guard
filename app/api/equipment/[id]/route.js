import connectToDatabase from '../lib/db';
import Equipment from '@/models/Equipment';

// GET single equipment
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const equipment = await Equipment.findById(params.id).populate('assignedTeam');
    if (!equipment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update equipment
export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const equipment = await Equipment.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    if (!equipment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE equipment
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const equipment = await Equipment.findByIdAndDelete(params.id);
    if (!equipment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}