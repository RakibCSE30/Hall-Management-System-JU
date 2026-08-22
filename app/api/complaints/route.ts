import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const staffRoles = ["SUPER_ADMIN", "HALL_ADMIN", "STAFF"];

export async function GET() {
  const s = await auth();
  if (!s?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const where = s.user.role === "STUDENT" ? { student: { userId: s.user.id } } : {};
  return NextResponse.json(await prisma.complaint.findMany({ where, orderBy: { createdAt: "desc" }, include: { student: { include: { user: true } }, assignedTo: { include: { user: true } } } }));
}

export async function POST(req: Request) {
  const s = await auth();
  if (!s?.user || s.user.role !== "STUDENT") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const st = await prisma.student.findUnique({ where: { userId: s.user.id } });
  if (!st) return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
  if (!st.hallId) return NextResponse.json({ error: "Student is not assigned to a hall" }, { status: 409 });
  const b = await req.json();
  if (!b.title || !b.description) return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  const trackingId = `CMP-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json(await prisma.complaint.create({ data: { trackingId, title: b.title, description: b.description, category: b.category || "OTHER", priority: b.priority || "MEDIUM", studentId: st.id, hallId: st.hallId, roomId: b.roomId || null } }), { status: 201 });
}
