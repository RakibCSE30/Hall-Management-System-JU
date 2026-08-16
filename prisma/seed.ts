import { PrismaClient, Gender, Role, RoomStatus, SeatStatus } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  const hall = await prisma.hall.upsert({
    where: { code: "JU-NIH" },
    update: {},
    create: {
      code: "JU-NIH",
      name: "Jatiya Kabi Kazi Nazrul Islam Hall",
      university: "Jahangirnagar University",
      location: "Savar, Dhaka, Bangladesh",
      gender: Gender.MALE,
    },
  });

  for (let floorNumber = 2; floorNumber <= 10; floorNumber++) {
    const roomCount = floorNumber === 2 ? 16 : floorNumber === 3 || floorNumber === 10 ? 27 : 30;
    const floor = await prisma.floor.upsert({
      where: { hallId_number: { hallId: hall.id, number: floorNumber } },
      update: {},
      create: { hallId: hall.id, number: floorNumber, name: `${floorNumber}${floorNumber === 1 ? "st" : floorNumber === 2 ? "nd" : floorNumber === 3 ? "rd" : "th"} Floor` },
    });

    for (let roomNumber = 1; roomNumber <= roomCount; roomNumber++) {
      const code = `F${floorNumber}-R${String(roomNumber).padStart(2, "0")}`;
      const room = await prisma.room.upsert({
        where: { hallId_code: { hallId: hall.id, code } },
        update: {},
        create: { hallId: hall.id, floorId: floor.id, code, capacity: 4, status: RoomStatus.ACTIVE },
      });
      for (let seatNumber = 1; seatNumber <= 4; seatNumber++) {
        await prisma.seat.upsert({
          where: { roomId_number: { roomId: room.id, number: seatNumber } },
          update: {},
          create: { roomId: room.id, number: seatNumber, status: SeatStatus.AVAILABLE },
        });
      }
    }
  }

  const adminPassword = hashPassword("Admin@12345");
  await prisma.user.upsert({
    where: { email: "admin@hallms.ju" },
    update: { passwordHash: adminPassword, role: Role.HALL_ADMIN, isActive: true },
    create: { email: "admin@hallms.ju", name: "Hall Administrator", passwordHash: adminPassword, role: Role.HALL_ADMIN },
  });

  const studentPassword = hashPassword("Student@12345");
  const studentUser = await prisma.user.upsert({
    where: { email: "student@hallms.ju" },
    update: { passwordHash: studentPassword, role: Role.STUDENT, isActive: true },
    create: { email: "student@hallms.ju", name: "Rakibul Hasan", passwordHash: studentPassword, role: Role.STUDENT },
  });

  await prisma.student.upsert({
    where: { studentId: "2023-CSE-041" },
    update: { userId: studentUser.id, hallId: hall.id },
    create: {
      userId: studentUser.id,
      studentId: "2023-CSE-041",
      registrationNumber: "REG-2023-CSE-041",
      department: "CSE",
      faculty: "Mathematical & Physical Sciences",
      session: "2022-23",
      academicYear: "2026",
      phone: "01700000000",
      gender: Gender.MALE,
      hallId: hall.id,
    },
  });

  await prisma.notice.createMany({
    data: [
      { hallId: hall.id, title: "Monthly dining fee notice", content: "Payment deadline: 25 August.", type: "IMPORTANT" },
      { hallId: hall.id, title: "Room inspection schedule", content: "Inspection starts from 20 August.", type: "HALL" },
      { hallId: hall.id, title: "Hall office timing", content: "Office remains open 9 AM–4 PM.", type: "HALL" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed complete:", hall.name);
  console.log("Admin: admin@hallms.ju / Admin@12345");
  console.log("Student: student@hallms.ju / Student@12345");
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(() => prisma.$disconnect());
