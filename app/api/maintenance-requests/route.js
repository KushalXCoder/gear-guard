import { NextResponse } from "next/server";
import connectToDatabase from "../lib/db";
import MaintenanceRequest from "@/app/api/models/equipment-request.models";
import equipmentModels from "../models/equipment.models";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const {
      subject,
      createdBy,
      maintenanceFor,
      equipment,
      maintenanceType,
      scheduledDate,
      duration,
      priority,
      notes,
      instructions,
    } = body;

    // 🔹 Fetch equipment to derive dependent fields
    const equipmentDoc = await equipmentModels.findById(equipment).populate(
      "assignedTechnician"
    );

    if (!equipmentDoc) {
      return NextResponse.json(
        { message: "Equipment not found" },
        { status: 404 }
      );
    }

    // 🔹 Generate reference number
    const reference = `MAINT/${new Date().getFullYear()}/${Date.now()
      .toString()
      .slice(-4)}`;

    const request = await MaintenanceRequest.create({
      subject,
      reference,
      createdBy,
      maintenanceFor,
      equipment: equipmentDoc._id,
      category: equipmentDoc.category,
      maintenanceType,
      team: equipmentDoc.department,
      technician: equipmentDoc.assignedTechnician?._id || null,
      scheduledDate,
      duration,
      priority,
      notes,
      instructions,
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    console.error("Create maintenance request error:", error);
    return NextResponse.json(
      { message: "Failed to create maintenance request" },
      { status: 500 }
    );
  }
}