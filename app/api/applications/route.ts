import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "STUDENT") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ error: "Student profile not found" }, { status: 404 });

  const applications = await prisma.hallApplication.findMany({
    where: { studentId: student.id },
    orderBy: { createdAt: "desc" },
    include: { hall: true },
  });

  return NextResponse.json(applications);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "STUDENT") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { hall: true },
  });
  if (!student) return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
  if (!student.hallId || !student.hall) {
    return NextResponse.json({ error: "You are not assigned to a hall yet" }, { status: 400 });
  }

  const activeAllocation = await prisma.seatAllocation.findFirst({
    where: { studentId: student.id, isActive: true },
  });
  if (activeAllocation) {
    return NextResponse.json({ error: "You already have an active seat allocation" }, { status: 409 });
  }

  const existing = await prisma.hallApplication.findFirst({
    where: {
      studentId: student.id,
      status: { in: ["PENDING", "APPROVED"] },
    },
  });
  if (existing) {
    return NextResponse.json({ error: "You already have an active hall application" }, { status: 409 });
  }

  const application = await prisma.hallApplication.create({
    data: { studentId: student.id, hallId: student.hallId },
    include: { hall: true },
  });

  return NextResponse.json(application, { status: 201 });
}
