import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/app/components/SignOutButton";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!["SUPER_ADMIN", "HALL_ADMIN", "STAFF"].includes(session.user.role)) redirect("/student");

  const [students, rooms, seats, occupied, applications, complaints] = await Promise.all([
    prisma.student.count(),
    prisma.room.count(),
    prisma.seat.count(),
    prisma.seat.count({ where: { status: "OCCUPIED" } }),
    prisma.hallApplication.count({ where: { status: "PENDING" } }),
    prisma.complaint.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "IN_PROGRESS"] } } }),
  ]);

  const stats = [
    ["Students", students],
    ["Rooms", rooms],
    ["Seats", seats],
    ["Occupied", occupied],
    ["Pending applications", applications],
    ["Open complaints", complaints],
  ];

  return (
    <main className="admin-page">
      <header className="admin-title">
        <div>
          <p className="eyebrow">JAHANGIRNAGAR UNIVERSITY · {session.user.role}</p>
          <h1>Hall Administration</h1>
          <p className="muted">Live operational overview from PostgreSQL.</p>
        </div>
        <div className="profile-chip">
          <div className="avatar">{session.user.name?.charAt(0) ?? "A"}</div>
          <div><strong>{session.user.name ?? "Administrator"}</strong><small>{session.user.email}</small></div>
        </div>
      </header>

      <nav className="admin-nav" aria-label="Administration navigation">
        <a href="/admin">Overview</a>
        <a href="/admin/rooms">Rooms & Seats</a>
        <a href="/admin/complaints">Complaints</a>
        <a href="/">Home</a>
        <SignOutButton />
      </nav>

      <section className="room-summary">
        {stats.map(([label, value]) => (
          <div key={String(label)}><span>{label}</span><strong>{value}</strong></div>
        ))}
      </section>

      <section className="panel">
        <h2 style={{ marginTop: 0 }}>Version 0.3 control center</h2>
        <p className="muted">Authentication and role-based routing are now connected to the first administration portal.</p>
        <div className="detail-list">
          <span>Signed in as <b>{session.user.role}</b></span>
          <span>Database <b>PostgreSQL · hall_management</b></span>
          <span>Dashboard API <b><a href="/api/dashboard">/api/dashboard</a></b></span>
        </div>
      </section>
    </main>
  );
}
