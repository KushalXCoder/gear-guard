import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/api/lib/db.js';
import MaintenanceTeam from '@/app/api/models/maintainance-teams.models.js';

export async function GET() {
    try {
        await connectToDatabase();

        const teams = await MaintenanceTeam.find({})
            .populate('members', 'name email avatar role')
            .sort({ createdAt: -1 });

        return NextResponse.json(
            {
                count: teams.length,
                data: teams
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Teams GET Error:", error);
        return NextResponse.json(
            {
                message: 'Failed to fetch maintenance teams',
                error: error.message
            },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectToDatabase();
        const body = await req.json();

        // Basic validation
        if (!body.name) {
            return NextResponse.json(
                { message: 'Team name is required' },
                { status: 400 }
            );
        }

        const { name, companyName, specialization, members, isActive } = body;

        const newTeam = await MaintenanceTeam.create({
            name,
            companyName,
            specialization,
            members: members || [],
            isActive: isActive !== undefined ? isActive : true
        });

        return NextResponse.json(
            {
                status: 'success',
                data: newTeam
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Teams POST Error:", error);
        return NextResponse.json(
            {
                message: 'Failed to create maintenance team',
                error: error.message
            },
            { status: 500 }
        );
    }
}