import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const payment = await prisma.payment.findUnique({ where: { id }, include: { student: { include: { user: true, hall: true } } } });
  if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  if (session.user.role === "STUDENT" && payment.student.userId !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (payment.status !== "PAID") return NextResponse.json({ error: "Receipt is available only for paid payments" }, { status: 409 });
  return NextResponse.json({ receiptNo: `JU-HALL-${payment.id.slice(-8).toUpperCase()}`, student: payment.student.user.name, studentId: payment.student.studentId, hall: payment.student.hall?.name ?? "Not assigned", amount: Number(payment.amount), purpose: payment.purpose, method: payment.method, reference: payment.reference, paidAt: payment.paidAt, status: payment.status });
}
