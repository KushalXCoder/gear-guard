import connectToDatabase from '../lib/db';
import Team from '@/models/MaintenanceTeam';

export async function GET() {
  try {
    await connectToDatabase();
    const teams = await Team.find().populate('members', 'name email');
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const team = await Team.create(body);
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}