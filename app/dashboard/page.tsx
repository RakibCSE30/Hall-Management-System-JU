import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardRouterPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  if (session.user.role === "STUDENT") redirect("/student");
  if (["SUPER_ADMIN", "HALL_ADMIN", "STAFF"].includes(session.user.role)) redirect("/admin");

  redirect("/login");
}
