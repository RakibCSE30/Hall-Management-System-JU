import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const adminRoles = ["SUPER_ADMIN", "HALL_ADMIN", "STAFF"];

export async function GET() {
  const session = await auth();
  if (!session?.user || !adminRoles.includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const applications = await prisma.hallApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      hall: true,
      student: { include: { user: true, hall: true } },
    },
  });

  return NextResponse.json(applications);
}
