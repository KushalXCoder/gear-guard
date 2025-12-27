import { NextResponse } from "next/server";
import equipmentRequestModels from "../models/equipment-request.models";

export const GET = async () => {
    try {
        const tasks = await equipmentRequestModels.find({}).populate('equipment technician');
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch tasks", error: error.message }, { status: 500 });
    }
}