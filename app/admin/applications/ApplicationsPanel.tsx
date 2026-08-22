"use client";

import { useEffect, useState } from "react";

interface Application {
  id: string;
  status: string;
  createdAt: string;
  hall: { id: string; name: string };
  student: { studentId: string; department: string; user: { name: string; email: string }; hall: { name: string } | null };
}

interface Room {
  id: string;
  code: string;
  hall: string;
  vacant: number;
  seats: { id: string; number: number; occupied: boolean }[];
}

export default function ApplicationsPanel() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomByApplication, setRoomByApplication] = useState<Record<string, string>>({});
  const [seatByApplication, setSeatByApplication] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [applicationsResponse, roomsResponse] = await Promise.all([
        fetch("/api/admin/applications/list"),
        fetch("/api/rooms"),
      ]);
      const applicationsData = await applicationsResponse.json();
      const roomsData = await roomsResponse.json();
      if (!applicationsResponse.ok) throw new Error(applicationsData.error ?? "Unable to load applications");
      if (!roomsResponse.ok) throw new Error(roomsData.error ?? "Unable to load rooms");
      setApplications(applicationsData);
      setRooms(roomsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load applications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function review(id: string, status: "APPROVED" | "REJECTED") {
    setBusy(id);
    setError("");
    try {
      const roomId = roomByApplication[id];
      const seatId = seatByApplication[id];
      if (status === "APPROVED" && (!roomId || !seatId)) {
        throw new Error("Select an available room and seat before approving");
      }
      const response = await fetch("/api/admin/applications/review", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, roomId, seatId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to review application");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to review application");
    } finally {
      setBusy(null);
    }
  }

  if (loading) return <section className="panel"><p className="muted">Loading applications…</p></section>;

  const pending = applications.filter((application) => application.status === "PENDING");
  const other = applications.filter((application) => application.status !== "PENDING");

  return (
    <>
      {error && <section className="panel"><p style={{ color: "#b42318" }}>{error}</p></section>}
      <section className="panel">
        <h2 style={{ marginTop: 0 }}>Pending applications ({pending.length})</h2>
        {!pending.length && <p className="muted">No pending seat applications.</p>}
        {pending.map((application) => {
          const selectedRoom = rooms.find((room) => room.id === roomByApplication[application.id]);
          const availableSeats = selectedRoom?.seats.filter((seat) => !seat.occupied) ?? [];
          return (
            <article className="portal-card" key={application.id} style={{ marginBottom: 16 }}>
              <div className="detail-list">
                <span>Student <b>{application.student.user.name}</b></span>
                <span>Student ID <b>{application.student.studentId}</b></span>
                <span>Department <b>{application.student.department}</b></span>
                <span>Hall <b>{application.hall.name}</b></span>
                <span>Applied <b>{new Date(application.createdAt).toLocaleDateString()}</b></span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
                <label>Room
                  <select
                    value={roomByApplication[application.id] ?? ""}
                    onChange={(event) => {
                      setRoomByApplication((current) => ({ ...current, [application.id]: event.target.value }));
                      setSeatByApplication((current) => ({ ...current, [application.id]: "" }));
                    }}
                  >
                    <option value="">Select room</option>
                    {rooms.filter((room) => room.hall === application.hall.name && room.vacant > 0).map((room) => (
                      <option key={room.id} value={room.id}>{room.code} · {room.vacant} vacant</option>
                    ))}
                  </select>
                </label>
                <label>Seat
                  <select
                    value={seatByApplication[application.id] ?? ""}
                    onChange={(event) => setSeatByApplication((current) => ({ ...current, [application.id]: event.target.value }))}
                    disabled={!selectedRoom}
                  >
                    <option value="">Select seat</option>
                    {availableSeats.map((seat) => <option key={seat.id} value={seat.id}>Seat {seat.number}</option>)}
                  </select>
                </label>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <button className="primary-btn" disabled={busy === application.id} onClick={() => review(application.id, "APPROVED")}>Approve & Allocate</button>
                <button className="secondary-btn" disabled={busy === application.id} onClick={() => review(application.id, "REJECTED")}>Reject</button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="panel">
        <h2 style={{ marginTop: 0 }}>Application history</h2>
        {!other.length && <p className="muted">No reviewed applications yet.</p>}
        {other.map((application) => (
          <div className="portal-row" key={application.id}>
            <div><strong>{application.student.user.name} · {application.student.studentId}</strong><small>{application.hall.name}</small></div>
            <span className={`pill ${application.status === "APPROVED" ? "approved" : "danger"}`}>{application.status}</span>
          </div>
        ))}
      </section>
    </>
  );
}
