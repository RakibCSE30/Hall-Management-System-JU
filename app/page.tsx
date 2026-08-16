export default function HomePage() {
  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 760, margin: "80px auto", padding: 24 }}>
      <p style={{ letterSpacing: 2, fontSize: 12, color: "#64748b" }}>JAHANGIRNAGAR UNIVERSITY</p>
      <h1>Hall Management System</h1>
      <p style={{ color: "#64748b", lineHeight: 1.7 }}>
        Version 0.2 backend foundation is ready with PostgreSQL, Prisma, Auth.js credentials authentication,
        role-based sessions, and protected dashboard statistics.
      </p>
      <ul style={{ lineHeight: 1.9 }}>
        <li>PostgreSQL + Prisma data model</li>
        <li>Admin and Student roles</li>
        <li>Secure password hashing</li>
        <li>Health endpoint: <code>/api/health</code></li>
        <li>Protected statistics endpoint: <code>/api/dashboard</code></li>
      </ul>
      <p style={{ marginTop: 32 }}>
        The existing static dashboard remains available as the first UI prototype while the Next.js application is being migrated.
      </p>
    </main>
  );
}
