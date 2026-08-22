import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ApplySeatForm from "./ApplySeatForm";

export default async function ApplySeatPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "STUDENT") redirect("/admin");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { hall: true },
  });
  if (!student) redirect("/login");

  const existing = await prisma.hallApplication.findFirst({
    where: { studentId: student.id, status: { in: ["PENDING", "APPROVED"] } },
    orderBy: { createdAt: "desc" },
    include: { hall: true },
  });

  return (
    <main className="portal-page">
      <header className="portal-header">
        <div>
          <p className="eyebrow">JAHANGIRNAGAR UNIVERSITY</p>
          <h1>Apply for a Seat</h1>
        </div>
        <a className="secondary-btn" href="/student">Back to Student Portal</a>
      </header>

      <section className="panel" style={{ maxWidth: 760 }}>
        <h2 style={{ marginTop: 0 }}>Hall seat application</h2>
        <p className="muted">
          Your application will be sent to the hall administration for review. A room and seat will be assigned after approval.
        </p>

        <div className="detail-list" style={{ margin: "24px 0" }}>
          <span>Student <b>{student.userId ? session.user.name : "Student"}</b></span>
          <span>Student ID <b>{student.studentId}</b></span>
          <span>Assigned Hall <b>{student.hall?.name ?? "Not assigned"}</b></span>
        </div>

        {existing ? (
          <div className="portal-card">
            <strong>Active application already exists</strong>
            <p className="muted">{existing.hall.name} · {existing.status}</p>
            <a href="/student">Return to portal</a>
          </div>
        ) : !student.hallId ? (
          <div className="portal-card">
            <strong>Hall assignment required</strong>
            <p className="muted">Please contact hall administration before applying for a seat.</p>
          </div>
        ) : (
          <ApplySeatForm hallName={student.hall?.name ?? "Assigned hall"} />
        )}
      </section>
    </main>
  );
}
