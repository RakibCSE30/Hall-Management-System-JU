import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const adminRoles = ["SUPER_ADMIN", "HALL_ADMIN", "STAFF"];

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user || !adminRoles.includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { id, status, roomId, seatId, remarks } = body;
  if (!id || !["APPROVED", "REJECTED"].includes(status)) {
    return NextResponse.json({ error: "id and a valid status are required" }, { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const application = await tx.hallApplication.findUnique({
        where: { id },
        include: { hall: true, student: { include: { user: true } } },
      });
      if (!application) throw new Error("Application not found");
      if (application.status !== "PENDING") throw new Error("Only pending applications can be reviewed");

      const staff = await tx.hallStaff.findUnique({ where: { userId: session.user.id } });

      if (status === "REJECTED") {
        return tx.hallApplication.update({
          where: { id },
          data: { status: "REJECTED", remarks: remarks ?? null, reviewedAt: new Date(), reviewerId: staff?.id ?? null },
        });
      }

      if (!roomId || !seatId) throw new Error("roomId and seatId are required to approve an application");

      const room = await tx.room.findUnique({ where: { id: roomId } });
      const seat = await tx.seat.findUnique({ where: { id: seatId } });
      if (!room || room.hallId !== application.hallId) throw new Error("Selected room does not belong to the application hall");
      if (!seat || seat.roomId !== room.id || seat.status === "MAINTENANCE") throw new Error("Invalid or unavailable seat");

      const studentActive = await tx.seatAllocation.findFirst({ where: { studentId: application.studentId, isActive: true } });
      if (studentActive) throw new Error("Student already has an active allocation");

      const seatActive = await tx.seatAllocation.findFirst({ where: { seatId, isActive: true } });
      if (seatActive) throw new Error("Seat is already occupied");

      const allocation = await tx.seatAllocation.create({
        data: { studentId: application.studentId, roomId, seatId, isActive: true },
      });

      await tx.seat.update({ where: { id: seatId }, data: { status: "OCCUPIED" } });

      const updated = await tx.hallApplication.update({
        where: { id },
        data: { status: "APPROVED", remarks: remarks ?? null, reviewedAt: new Date(), reviewerId: staff?.id ?? null },
      });

      await tx.notification.create({
        data: {
          studentId: application.studentId,
          title: "Seat application approved",
          message: `Your hall seat application has been approved. Room ${room.code}, Seat ${seat.number}.`,
        },
      });

      return { application: updated, allocation };
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to review application";
    const status = /not found|invalid|already|only pending|required|unavailable|does not belong/i.test(message) ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
