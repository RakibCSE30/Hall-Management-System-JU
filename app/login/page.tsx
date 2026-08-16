import { signIn } from "@/auth";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  }

  return (
    <main style={{ maxWidth: 420, margin: "80px auto", padding: 24, fontFamily: "system-ui" }}>
      <h1>HallMS Login</h1>
      <p style={{ color: "#64748b" }}>Sign in to the hall administration system.</p>
      <form action={login} style={{ display: "grid", gap: 14, marginTop: 28 }}>
        <label>Email<input name="email" type="email" required placeholder="admin@hallms.ju" style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }} /></label>
        <label>Password<input name="password" type="password" required minLength={8} style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }} /></label>
        <button type="submit" style={{ padding: 11, background: "#172033", color: "white", border: 0, borderRadius: 7 }}>Sign in</button>
      </form>
    </main>
  );
}
