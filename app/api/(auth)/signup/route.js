import connectToDatabase from '@/app/api/lib/db.js';
import User from '@/app/api/models/User.models.js';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectToDatabase();
        const { name, email, password, role, department } = await req.json();
        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const newUser = await User.create({ name, email, password, role, department });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return NextResponse.json({
            status: 'success',
            token,
            user: { id: newUser._id, name, email, role }
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}