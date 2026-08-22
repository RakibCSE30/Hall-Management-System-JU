import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="brand-mark">JU</div>
        <p className="eyebrow">JAHANGIRNAGAR UNIVERSITY</p>
        <h1>Hall Management System</h1>
        <p className="landing-copy">
          A centralized digital portal for hall administration, student services,
          room allocation, applications, complaints, payments and notices.
        </p>
        <div className="landing-actions">
          <a className="primary-btn" href="/login">Sign in to portal</a>
          <a className="secondary-btn" href="/api/health">System health</a>
        </div>
      </section>

      <section className="feature-grid">
        <article><span>01</span><h2>Student Portal</h2><p>View your profile, hall allocation, applications, complaints and notifications.</p></article>
        <article><span>02</span><h2>Administration</h2><p>Monitor students, rooms, seats, applications and operational issues.</p></article>
        <article><span>03</span><h2>Secure Access</h2><p>Credentials authentication with role-based sessions and protected dashboards.</p></article>
      </section>
    </main>
  );
}
