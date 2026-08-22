import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ApplicationsPanel from "./ApplicationsPanel";

export default async function AdminApplicationsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!["SUPER_ADMIN", "HALL_ADMIN", "STAFF"].includes(session.user.role)) redirect("/student");

  return (
    <main className="admin-page">
      <header className="admin-title">
        <div>
          <p className="eyebrow">JAHANGIRNAGAR UNIVERSITY · APPLICATIONS</p>
          <h1>Seat Applications</h1>
          <p className="muted">Review pending applications and assign an available room and seat.</p>
        </div>
        <a className="secondary-btn" href="/admin">Back to Admin</a>
      </header>
      <ApplicationsPanel />
    </main>
  );
}
