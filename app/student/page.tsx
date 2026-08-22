import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/app/components/SignOutButton";

export default async function StudentPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "STUDENT") redirect("/admin");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      user: true,
      hall: true,
      allocations: { where: { isActive: true }, include: { room: true, seat: true }, take: 1 },
      applications: { orderBy: { createdAt: "desc" }, take: 5, include: { hall: true } },
      complaints: { orderBy: { createdAt: "desc" }, take: 5 },
      notifications: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });
  if (!student) redirect("/login");

  const allocation = student.allocations[0];
  const hasActiveApplication = student.applications.some((application) => ["PENDING", "APPROVED"].includes(application.status));

  return (
    <main className="portal-page">
      <header className="portal-header">
        <div><p className="eyebrow">JAHANGIRNAGAR UNIVERSITY</p><h1>Student Portal</h1></div>
        <div className="profile-chip">
          <div className="avatar">{student.user.name.charAt(0)}</div>
          <div><strong>{student.user.name}</strong><small>{student.studentId}</small></div>
          <SignOutButton />
        </div>
      </header>
      <section className="portal-hero">
        <div><span className="pill approved">ACTIVE STUDENT</span><h2>Welcome, {student.user.name.split(" ")[0]} 👋</h2><p>{student.department} · {student.session ?? "Current session"}</p></div>
        <a className="secondary-btn" href="/">Home</a>
      </section>
      <div className="portal-grid">
        <article className="portal-card allocation"><h3>My Seat</h3>{allocation ? <><strong>{allocation.room.code} · Seat {allocation.seat.number}</strong><p>{student.hall?.name ?? "Hall"}</p><small>Allocated {new Date(allocation.startDate).toLocaleDateString()}</small></> : <><strong>No active allocation</strong><p>You do not currently have an allocated seat.</p>{hasActiveApplication ? <a href="#applications">View application status</a> : <a href="/student/apply">Apply for a seat</a>}</>}</article>
        <article className="portal-card"><h3>Profile</h3><div className="detail-list"><span>Student ID <b>{student.studentId}</b></span><span>Department <b>{student.department}</b></span><span>Phone <b>{student.phone ?? "Not added"}</b></span><span>Hall <b>{student.hall?.name ?? "Not assigned"}</b></span></div></article>
        <article className="portal-card" id="applications"><h3>Applications</h3>{student.applications.length ? <>{student.applications.map(a => <div className="portal-row" key={a.id}><div><strong>{a.hall.name}</strong><small>{new Date(a.createdAt).toLocaleDateString()}</small></div><span className={`pill ${a.status === "APPROVED" ? "approved" : a.status === "REJECTED" ? "danger" : "pending"}`}>{a.status}</span></div>)}{!hasActiveApplication && !allocation && student.hallId && <a className="primary-btn" href="/student/apply" style={{ display: "inline-block", marginTop: 14 }}>Apply for a seat</a>}</> : <><p className="muted">No applications yet.</p>{!allocation && student.hallId && <a className="primary-btn" href="/student/apply" style={{ display: "inline-block", marginTop: 10 }}>Start application</a>}</>}</article>
        <article className="portal-card"><h3>Complaints</h3>{student.complaints.length ? student.complaints.map(c => <div className="portal-row" key={c.id}><div><strong>{c.title}</strong><small>{c.trackingId}</small></div><span className="pill review">{c.status.replaceAll("_", " ")}</span></div>) : <p className="muted">No complaints yet.</p>}</article>
        <article className="portal-card full-card"><h3>Notifications</h3>{student.notifications.length ? student.notifications.map(n => <div className="notification-row" key={n.id}><span>●</span><div><strong>{n.title}</strong><p>{n.message}</p><small>{new Date(n.createdAt).toLocaleDateString()}</small></div></div>) : <p className="muted">No notifications.</p>}</article>
      </div>
    </main>
  );
}
