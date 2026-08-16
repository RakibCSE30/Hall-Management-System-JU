"use client";
import { useEffect, useState } from "react";

type Room={id:string;code:string;floor:string;hall:string;capacity:number;occupied:number;vacant:number;seats:{id:string;number:number;occupied:boolean}[]};
export default function RoomManagement(){
 const [rooms,setRooms]=useState<Room[]>([]); const [loading,setLoading]=useState(true); const [message,setMessage]=useState("");
 const load=async()=>{setLoading(true); const r=await fetch("/api/rooms"); if(r.ok)setRooms(await r.json()); setLoading(false)};
 useEffect(()=>{load()},[]);
 const release=async(allocationId:string)=>{const r=await fetch("/api/allocations",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({allocationId})}); setMessage(r.ok?"Seat released successfully":"Unable to release seat"); load()};
 return <main className="admin-page"><header className="admin-title"><div><p className="eyebrow">HALL ADMINISTRATION</p><h1>Rooms & Seats</h1><p className="muted">Monitor occupancy and manage available seats.</p></div><button className="primary-btn" onClick={load}>↻ Refresh</button></header>
 <div className="room-summary"><div><span>Total rooms</span><strong>{rooms.length}</strong></div><div><span>Capacity</span><strong>{rooms.reduce((n,r)=>n+r.capacity,0)}</strong></div><div><span>Occupied</span><strong>{rooms.reduce((n,r)=>n+r.occupied,0)}</strong></div><div><span>Vacant</span><strong>{rooms.reduce((n,r)=>n+r.vacant,0)}</strong></div></div>
 {message&&<div className="success-box">{message}</div>}
 {loading?<div className="panel">Loading rooms…</div>:<div className="room-admin-grid">{rooms.map(room=><article className="room-admin-card" key={room.id}><div className="room-head"><div><h3>{room.code}</h3><p>{room.hall} · {room.floor}</p></div><span className={room.vacant?"availability open":"availability full"}>{room.vacant} vacant</span></div><div className="seat-grid">{room.seats.map(seat=><button key={seat.id} className={`seat ${seat.occupied?"occupied":"vacant"}`} title={seat.occupied?"Occupied":"Available"}>{seat.number}<small>{seat.occupied?"Occupied":"Vacant"}</small></button>)}</div><div className="room-foot"><span>{room.occupied}/{room.capacity} occupied</span><div className="bar"><i style={{width:`${room.capacity?room.occupied/room.capacity*100:0}%`}}/></div></div></article>)}</div>}
 </main>
}
