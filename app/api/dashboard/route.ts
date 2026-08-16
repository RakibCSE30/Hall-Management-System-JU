import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [students, rooms, seats, occupied, pendingApplications, openComplaints] = await Promise.all([
    prisma.student.count(),
    prisma.room.count(),
    prisma.seat.count(),
    prisma.seat.count({ where: { status: "OCCUPIED" } }),
    prisma.hallApplication.count({ where: { status: "PENDING" } }),
    prisma.complaint.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "IN_PROGRESS"] } } }),
  ]);

  return NextResponse.json({
    students,
    rooms,
    seats,
    occupiedSeats: occupied,
    vacantSeats: seats - occupied,
    occupancyRate: seats ? Number(((occupied / seats) * 100).toFixed(1)) : 0,
    pendingApplications,
    openComplaints,
  });
}
