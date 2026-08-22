import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const adminRoles = ["SUPER_ADMIN", "HALL_ADMIN", "STAFF"];

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || !adminRoles.includes(session.user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  const { studentId, roomId, seatId, startDate } = body;
  if (!studentId || !roomId || !seatId) return NextResponse.json({ error: "studentId, roomId and seatId are required" }, { status: 400 });

  const result = await prisma.$transaction(async tx => {
    const seat = await tx.seat.findUnique({ where: { id: seatId } });
    if (!seat || seat.roomId !== roomId) throw new Error("Invalid seat");
    const existing = await tx.seatAllocation.findFirst({ where: { seatId, isActive: true } });
    if (existing) throw new Error("Seat is already occupied");
    const studentActive = await tx.seatAllocation.findFirst({ where: { studentId, isActive: true } });
    if (studentActive) throw new Error("Student already has an active allocation");
    return tx.seatAllocation.create({ data: { studentId, roomId, seatId, startDate: startDate ? new Date(startDate) : new Date(), isActive: true } });
  });
  return NextResponse.json(result, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user || !adminRoles.includes(session.user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { allocationId } = await req.json();
  if (!allocationId) return NextResponse.json({ error: "allocationId is required" }, { status: 400 });
  const allocation = await prisma.seatAllocation.update({ where: { id: allocationId }, data: { isActive: false, endDate: new Date() } });
  return NextResponse.json(allocation);
}
