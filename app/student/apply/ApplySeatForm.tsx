"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplySeatForm({ hallName }: { hallName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to submit application");
      setMessage("Application submitted successfully. Status: PENDING.");
      setTimeout(() => router.push("/student"), 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit application");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="portal-card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Application details</h3>
        <p><strong>Requested hall:</strong> {hallName}</p>
        <p className="muted">The hall administrator will choose an available room and seat when approving your application.</p>
      </div>

      {error && <p style={{ color: "#b42318" }}>{error}</p>}
      {message && <p style={{ color: "#067647" }}>{message}</p>}

      <button className="primary-btn" type="button" onClick={submit} disabled={loading}>
        {loading ? "Submitting…" : "Submit Seat Application"}
      </button>
    </div>
  );
}
