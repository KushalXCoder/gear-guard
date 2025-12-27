import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/api/lib/db.js';
import MaintenanceTeam from '@/app/api/models/maintainance-teams.models.js';

const verifyAdmin = (req) => {
    const role = req.headers.get('x-user-role');
    return role === 'admin';
};

export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const team = await MaintenanceTeam.findById(id).populate('members', 'name email avatar role');

        if (!team) {
            return NextResponse.json({ success: false, message: 'Team not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: team });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ success: false, message: 'Forbidden: Admin access required' }, { status: 403 });
        }

        await connectToDatabase();
        const { id } = await params;
        const body = await req.json();

        const { name, companyName, specialization, members, isActive } = body;

        const updatedTeam = await MaintenanceTeam.findByIdAndUpdate(
            id,
            {
                name,
                companyName,
                members,
                isActive,
                specialization
            },
            { new: true, runValidators: true }
        ).populate('members', 'name email');

        if (!updatedTeam) {
            return NextResponse.json({ success: false, message: 'Team not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedTeam });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        if (!verifyAdmin(req)) {
            return NextResponse.json({ success: false, message: 'Forbidden: Admin access required' }, { status: 403 });
        }

        await connectToDatabase();
        const { id } = await params;

        const deletedTeam = await MaintenanceTeam.findByIdAndDelete(id);

        if (!deletedTeam) {
            return NextResponse.json({ success: false, message: 'Team not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Team deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}