import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminStudentsPage() {
  const session = await auth();
  if (!session?.user || !["SUPER_ADMIN","HALL_ADMIN","STAFF"].includes(session.user.role)) redirect("/login");
  const students = await prisma.student.findMany({ include: { user: true, hall: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return <main className="admin-page"><header className="portal-header"><div><p className="eyebrow">HALL ADMINISTRATION</p><h1>Student Management</h1></div><a className="secondary-btn" href="/admin">← Dashboard</a></header><section className="panel"><div className="table-wrap"><table><thead><tr><th>Student</th><th>ID</th><th>Department</th><th>Hall</th><th>Phone</th><th>Status</th></tr></thead><tbody>{students.map(s=><tr key={s.id}><td><strong>{s.user.name}</strong><small>{s.user.email}</small></td><td>{s.studentId}</td><td>{s.department}</td><td>{s.hall?.name ?? "Not assigned"}</td><td>{s.phone ?? "—"}</td><td><span className={`pill ${s.user.isActive ? "approved" : "danger"}`}>{s.user.isActive ? "Active" : "Inactive"}</span></td></tr>)}</tbody></table></div></section></main>;
}
