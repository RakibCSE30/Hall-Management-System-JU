import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const roles = ["SUPER_ADMIN", "HALL_ADMIN", "STAFF"];
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || !roles.includes(session.user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const body = await req.json();
  const status = body.status;
  if (!["PAID", "FAILED", "PENDING"].includes(status)) return NextResponse.json({ error: "Invalid payment status" }, { status: 400 });
  const payment = await prisma.payment.update({ where: { id }, data: { status, paidAt: status === "PAID" ? new Date() : null } });
  return NextResponse.json(payment);
}
