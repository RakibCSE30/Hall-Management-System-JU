import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user || !["SUPER_ADMIN","HALL_ADMIN","STAFF"].includes(session.user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id, status, resolution } = await req.json();
  const allowed = ["SUBMITTED","UNDER_REVIEW","IN_PROGRESS","RESOLVED","REJECTED","CLOSED"];
  if (!id || !allowed.includes(status)) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const complaint = await prisma.complaint.update({ where: { id }, data: { status, resolution: resolution ?? null, resolvedAt: status === "RESOLVED" ? new Date() : null } });
  return NextResponse.json(complaint);
}
