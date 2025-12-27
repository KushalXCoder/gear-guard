import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/api/lib/db.js';
import User from '@/app/api/models/User.models.js';

export async function GET(req) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('id');
        const nameQuery = searchParams.get('name');
        if (userId) {
            const user = await User.findById(userId);
            if (!user) {
                return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: user });
        }
        if (nameQuery) {
            const users = await User.find({
                name: { $regex: nameQuery, $options: 'i' }
            }).limit(10);
            return NextResponse.json({ success: true, data: users });
        }
        const allUsers = await User.find({}).sort({ name: 1 });
        return NextResponse.json({ success: true, count: allUsers.length, data: allUsers });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}