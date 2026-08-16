import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  async function login(formData: FormData) {
    "use server";
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="brand-mark">JU</div>
        <p className="eyebrow">JAHANGIRNAGAR UNIVERSITY</p>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to the Hall Management System.</p>
        <form action={login} className="auth-form">
          <label>Email<input name="email" type="email" required placeholder="admin@hallms.ju" /></label>
          <label>Password<input name="password" type="password" required minLength={8} placeholder="••••••••" /></label>
          <button type="submit" className="primary-btn full">Sign in</button>
        </form>
        <div className="demo-box"><strong>Demo accounts</strong><span>Admin: admin@hallms.ju / Admin@12345</span><span>Student: student@hallms.ju / Student@12345</span></div>
      </div>
    </main>
  );
}
