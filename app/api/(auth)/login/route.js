import connectToDatabase from '@/app/api/lib/db.js';
import User from '@/app/api/models/User.models.js';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectToDatabase();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return NextResponse.json({
            status: 'success',
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong while logging in', error: error.message }, { status: 500 });
    }
}
