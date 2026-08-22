import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  async function login(formData: FormData) {
    "use server";
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="brand-mark">JU</div>
        <p className="eyebrow">JAHANGIRNAGAR UNIVERSITY</p>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to your Hall Management System portal.</p>
        <form action={login} className="auth-form">
          <label>
            Email
            <input name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
          </label>
          <label>
            Password
            <input name="password" type="password" required minLength={8} placeholder="••••••••" autoComplete="current-password" />
          </label>
          <button type="submit" className="primary-btn full">Sign in</button>
        </form>
        <div className="demo-box">
          <strong>Demo accounts</strong>
          <span>Admin: admin@hallms.ju / Admin@12345</span>
          <span>Student: student@hallms.ju / Student@12345</span>
        </div>
        <p className="muted" style={{ marginTop: 18, fontSize: 12 }}>
          Your role determines which portal you can access.
        </p>
      </div>
    </main>
  );
}
