import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!["SUPER_ADMIN", "HALL_ADMIN", "STAFF"].includes(session.user.role)) redirect("/");

  const [students, rooms, seats, occupied, applications, complaints] = await Promise.all([
    prisma.student.count(),
    prisma.room.count(),
    prisma.seat.count(),
    prisma.seat.count({ where: { status: "OCCUPIED" } }),
    prisma.hallApplication.count({ where: { status: "PENDING" } }),
    prisma.complaint.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "IN_PROGRESS"] } } }),
  ]);

  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 1000, margin: "50px auto", padding: 24 }}>
      <p style={{ color: "#64748b", fontSize: 13 }}>JAHANGIRNAGAR UNIVERSITY · {session.user.role}</p>
      <h1>Hall Administration</h1>
      <p style={{ color: "#64748b" }}>Live statistics from PostgreSQL.</p>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginTop: 30 }}>
        {[["Students", students], ["Rooms", rooms], ["Seats", seats], ["Occupied", occupied], ["Pending applications", applications], ["Open complaints", complaints]].map(([label, value]) => (
          <article key={String(label)} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 18 }}><small>{label}</small><h2 style={{ margin: "8px 0 0" }}>{value}</h2></article>
        ))}
      </section>
      <p style={{ marginTop: 30 }}><a href="/">← Home</a> · <a href="/api/dashboard">Dashboard API</a></p>
    </main>
  );
}
