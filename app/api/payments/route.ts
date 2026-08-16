import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payments = await prisma.payment.findMany({ orderBy: { createdAt: "desc" }, include: { student: { include: { user: true } } } });
  return NextResponse.json(payments);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "STUDENT") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
  const body = await req.json();
  const amount = Number(body.amount);
  if (!amount || amount <= 0 || !body.purpose) return NextResponse.json({ error: "Valid amount and purpose are required" }, { status: 400 });
  const payment = await prisma.payment.create({ data: { studentId: student.id, amount, purpose: body.purpose, method: body.method ?? "ONLINE", reference: body.reference ?? null, status: "PENDING" } });
  return NextResponse.json(payment, { status: 201 });
}
