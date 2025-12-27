import { NextResponse } from 'next/server';
import connectToDatabase from '../lib/db';
import Equipment from '../models/equipment.models';

// GET all equipment
export async function GET(request) {
  try {
    await connectToDatabase();
    const equipment = await Equipment.find({}).populate('employee assignedTechnician');
    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create equipment
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const equipment = await Equipment.create(body);
    return NextResponse.json(equipment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}