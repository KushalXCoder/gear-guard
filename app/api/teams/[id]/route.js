import connectToDatabase from '../lib/db';
import Team from '@/models/MaintenanceTeam';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const team = await Team.findById(params.id).populate('members');
    if (!team) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}