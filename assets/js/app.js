const students=[
 {name:'Rakibul Hasan',id:'2023-CSE-041',dept:'CSE',room:'F4-R12',seat:'S1',status:'Active'},
 {name:'Md. Arafat',id:'2022-PHY-018',dept:'Physics',room:'F7-R08',seat:'S2',status:'Active'},
 {name:'Saiful Noor',id:'2024-IBA-009',dept:'IBA-JU',room:'F3-R21',seat:'S3',status:'Active'},
 {name:'Tanjim Hossain',id:'2023-MATH-032',dept:'Mathematics',room:'F5-R16',seat:'S1',status:'Active'},
 {name:'Mehedi Hasan',id:'2022-CSE-112',dept:'CSE',room:'F6-R04',seat:'S4',status:'Active'},
 {name:'Fahim Rahman',id:'2024-PHY-077',dept:'Physics',room:'F7-R08',seat:'S1',status:'Active'}
];
const applications=[
 ['Rakibul Hasan','Seat allocation','CSE','17 Aug 2026','Pending'],['Md. Arafat','Room transfer','Physics','16 Aug 2026','Review'],['Saiful Noor','Seat allocation','IBA-JU','15 Aug 2026','Approved'],['Tanjim Hossain','Room transfer','Mathematics','14 Aug 2026','Pending']
];
const complaints=[
 ['Mehedi Hasan','Water supply','F4-R12','17 Aug 2026','High','Open'],['Fahim Rahman','Ceiling fan','F7-R08','16 Aug 2026','Medium','In progress'],['Shakil Ahmed','Wi-Fi issue','F3-R21','15 Aug 2026','Low','Resolved'],['Nayeem Islam','Study room light','F8-R19','14 Aug 2026','Medium','Open']
];
const notices=[
 ['Monthly dining fee notice','Payment deadline: 25 August','Important'],['Room inspection schedule','Inspection starts from 20 August','Hall'],['Hall office timing','Office remains open 9 AM–4 PM','General']
];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function showToast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2200)}
function go(section){$$('.section-view').forEach(x=>x.classList.toggle('active',x.id===section));$$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.section===section));const titles={dashboard:'Dashboard',students:'Students',rooms:'Rooms & Seats',applications:'Applications',complaints:'Complaints',notices:'Notices'};$('#pageTitle').textContent=titles[section]||'Dashboard';$('#sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
$$('.nav-item').forEach(b=>b.addEventListener('click',()=>go(b.dataset.section)));
$$('[data-section-link]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.sectionLink)));
$('#menuBtn').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
$('#notificationBtn').addEventListener('click',()=>showToast('You have 3 unread notifications'));
$('#logoutBtn').addEventListener('click',()=>showToast('Demo mode: sign out is not connected yet'));
$('#quickNotice').addEventListener('click',()=>go('notices'));
$('#newNotice').addEventListener('click',()=>showToast('Notice editor will be connected to the backend in v2'));
function renderStudents(filter=''){$('#studentRows').innerHTML=students.filter(s=>(s.name+s.id+s.dept).toLowerCase().includes(filter.toLowerCase())).map(s=>`<tr><td><strong>${s.name}</strong></td><td>${s.id}</td><td>${s.dept}</td><td>${s.room}</td><td>${s.seat}</td><td><span class="pill approved">${s.status}</span></td></tr>`).join('')}
renderStudents();$('#studentSearch').addEventListener('input',e=>renderStudents(e.target.value));
function roomNumber(i){const floor=2+Math.floor(i/30);return `F${Math.min(floor,10)}-R${String((i%30)+1).padStart(2,'0')}`}
function renderRooms(vacantOnly=false){let rooms=[];for(let i=0;i<25;i++){let occupied=(i*3)%5;let seats=[0,1,2,3].map((_,s)=>s<occupied?'occupied':(i===7&&s===3?'maintenance':'vacant'));if(vacantOnly&&!seats.includes('vacant'))continue;rooms.push(`<article class="room-card"><h4>${roomNumber(i)}</h4><p>${occupied}/4 occupied · ${4-occupied} vacant</p><div class="seats">${seats.map((x,s)=>`<span class="seat ${x==='occupied'?'occupied':''} ${x==='maintenance'?'maintenance':''}">${x==='occupied'?'S'+(s+1):x==='maintenance'?'M':'V'}</span>`).join('')}</div></article>`)}$('#roomGrid').innerHTML=rooms.join('')}
renderRooms();let vacantMode=false;$('#filterVacant').addEventListener('click',()=>{vacantMode=!vacantMode;$('#filterVacant').textContent=vacantMode?'Show all rooms':'Show vacant seats';renderRooms(vacantMode)});
function badge(status){const cls=status.toLowerCase().includes('approve')||status==='Resolved'?'approved':status.toLowerCase().includes('review')||status==='In progress'?'review':'pending';return `<span class="pill ${cls}">${status}</span>`}
$('#applicationRows').innerHTML=applications.map((a,i)=>`<tr><td><strong>${a[0]}</strong></td><td>${a[1]}</td><td>${a[2]}</td><td>${a[3]}</td><td>${badge(a[4])}</td><td><button class="text-btn action-btn" data-index="${i}">${a[4]==='Approved'?'View':'Review'}</button></td></tr>`).join('');
$$('.action-btn').forEach(b=>b.addEventListener('click',()=>showToast(`Application ${Number(b.dataset.index)+1}: demo action selected`)));
$('#complaintRows').innerHTML=complaints.map(c=>`<tr><td><strong>${c[0]}</strong></td><td>${c[1]}</td><td>${c[2]}</td><td>${c[3]}</td><td>${c[4]}</td><td>${badge(c[5])}</td></tr>`).join('');
$('#noticeCards').innerHTML=notices.map(n=>`<article class="notice-card"><span class="tag">${n[2]}</span><h3>${n[0]}</h3><p>${n[1]}</p><button class="text-btn">Edit notice →</button></article>`).join('');
