import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const adminRoles = ["SUPER_ADMIN", "HALL_ADMIN", "STAFF"];

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const notices = await prisma.notice.findMany({ orderBy: { publishedAt: "desc" }, include: { hall: true } });
  return NextResponse.json(notices);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || !adminRoles.includes(session.user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const b = await req.json();
  if (!b.title || !b.content) return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  const notice = await prisma.notice.create({ data: { title: b.title, content: b.content, hallId: b.hallId || null, type: b.type || "HALL", isPublished: b.isPublished !== false, publishedAt: new Date() } });
  return NextResponse.json(notice, { status: 201 });
}
