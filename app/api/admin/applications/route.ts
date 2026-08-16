import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user || !["SUPER_ADMIN","HALL_ADMIN","STAFF"].includes(session.user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id, status, remarks } = await req.json();
  if (!id || !["APPROVED","REJECTED","CANCELLED"].includes(status)) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const application = await prisma.hallApplication.update({ where: { id }, data: { status, remarks: remarks ?? null, reviewedAt: new Date() } });
  return NextResponse.json(application);
}
