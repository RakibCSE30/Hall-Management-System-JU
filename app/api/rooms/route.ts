import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rooms = await prisma.room.findMany({ orderBy: { code: "asc" }, include: { floor: { include: { hall: true } }, seats: { include: { allocations: { where: { isActive: true }, select: { id: true } } }, orderBy: { number: "asc" } } } });
  return NextResponse.json(rooms.map(room => ({ id: room.id, code: room.code, floor: room.floor.name, hall: room.floor.hall.name, capacity: room.capacity, occupied: room.seats.filter(s => s.allocations.length).length, vacant: room.seats.filter(s => !s.allocations.length).length, seats: room.seats.map(s => ({ id: s.id, number: s.number, occupied: s.allocations.length > 0 })) })));
}
