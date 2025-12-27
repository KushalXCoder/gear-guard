import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/api/lib/db.js';
import User from '@/app/api/models/User.models.js';
import { jwtVerify } from 'jose';

export async function GET(req) {
    try {
        await connectToDatabase();

        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        const user = await User.findById(payload.id).select('-password');

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ status: 'success', data: user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Invalid token or session expired' }, { status: 401 });
    }
}