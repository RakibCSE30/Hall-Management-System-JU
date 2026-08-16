 
 
# 🏛️ Jahangirnagar University Hall Management System

### Digital Hall Management Platform for Jatiya Kabi Kazi Nazrul Islam Hall

A modern, secure, and scalable **Hall Management System** designed for **Jahangirnagar University**, initially focused on **Jatiya Kabi Kazi Nazrul Islam Hall**.

The system digitizes hall administration, student accommodation, room and seat allocation, notices, complaints, applications, room transfers, payments, facilities, reports, and other hall-related services.

---

## 📌 About the Project

Managing a residential hall manually can involve a large amount of paperwork and administrative work.

This project provides a centralized digital platform where:

- Hall administrators can manage rooms, students, seats, facilities, and services.
- Staff can handle daily hall operations.
- Students can access their personal hall information.
- Students can receive notices and notifications.
- Students can submit and track complaints.
- Students can apply for seats and room transfers.
- Administrators can monitor hall occupancy.
- Reports can be generated from real-time database information.

The system is designed to be **scalable to all Jahangirnagar University residential halls**, while the initial implementation focuses on Jatiya Kabi Kazi Nazrul Islam Hall.

---

## 🏠 Initial Hall

### Jatiya Kabi Kazi Nazrul Islam Hall

**Type:** Male Residential Hall  
**University:** Jahangirnagar University  
**Location:** Savar, Dhaka, Bangladesh

The official Jahangirnagar University website lists Jatiya Kabi Kazi Nazrul Islam Hall among the university's residential halls. :contentReference[oaicite:1]{index=1}

### Hall Structure

| Property | Information |
|---|---|
| Hall | Jatiya Kabi Kazi Nazrul Islam Hall |
| Gender | Male |
| Floors | 10 |
| Blocks per Floor | 3 |
| Known Residential Rooms | 250 |
| Seats per Room | 4 |
| Known Residential Capacity | 1,000 |

> **Note:** The room counts and internal structural details in this project are based on the hall information supplied for this implementation. Where exact real-world details are unavailable, the system keeps them configurable rather than inventing information.

---

# 🏢 Hall Floor Structure

```text
Jatiya Kabi Kazi Nazrul Islam Hall
│
├── Basement
│   ├── Bicycle Parking
│   └── Motorcycle Parking
│
├── 1st Floor
│   ├── Shops
│   ├── Dining Room
│   ├── Guest Room
│   └── Provost Room
│
├── 2nd Floor
│   ├── 16 Residential Rooms
│   └── Canteen
│
├── 3rd Floor
│   └── 27 Residential Rooms
│
├── 4th Floor
│   └── 30 Residential Rooms
│
├── 5th Floor
│   └── 30 Residential Rooms
│
├── 6th Floor
│   └── 30 Residential Rooms
│
├── 7th Floor
│   └── 30 Residential Rooms
│
├── 8th Floor
│   └── 30 Residential Rooms
│
├── 9th Floor
│   └── 30 Residential Rooms
│
└── 10th Floor
    └── 27 Residential Rooms

### Residential Room Calculation

```text
2nd Floor  = 16 rooms
3rd Floor  = 27 rooms
4th Floor  = 30 rooms
5th Floor  = 30 rooms
6th Floor  = 30 rooms
7th Floor  = 30 rooms
8th Floor  = 30 rooms
9th Floor  = 30 rooms
10th Floor = 27 rooms

Total = 250 Residential Rooms
```

### Capacity

```text
250 Rooms × 4 Students = 1,000 Seats
```

---

# ⭐ Key Features

## 👨‍🎓 Student Portal

Each student gets a personalized dashboard.

Students can access:

* Personal profile
* Hall information
* Floor and block
* Room number
* Seat number
* Roommates
* Residence history
* Hall applications
* Seat allocation
* Room transfer requests
* Notices
* Notifications
* Complaints/issues
* Issue reports
* Payment information
* Hall facilities
* Dining and canteen information
* Hall rules
* Emergency contacts
* Personal reports

---

## 👤 Student Profile

Students can view:

* Name
* Student ID
* University Roll
* Registration Number
* Department
* Faculty
* Session
* Academic Year
* Email
* Phone
* Gender
* Blood Group
* Guardian Information
* Address
* Hall
* Room
* Seat
* Residence Status

Only permitted fields can be edited by the student.

---

# 🛏️ Room & Seat Management

Every residential room contains exactly **4 seats**.

Example:

```text
Room F4-R12

┌─────────────────────────────┐
│ Seat 1 → Student            │
│ Seat 2 → Student            │
│ Seat 3 → Student            │
│ Seat 4 → VACANT             │
└─────────────────────────────┘

Occupancy: 3 / 4
Status: PARTIAL
```

### Room Status

```text
EMPTY
PARTIAL
FULL
MAINTENANCE
```

### Important Rules

The system enforces:

```text
One Room
    ↓
Exactly 4 Seats

One Seat
    ↓
Maximum 1 Active Student

One Student
    ↓
Maximum 1 Active Allocation

One Room
    ↓
Maximum 4 Active Students
```

Seat allocation is protected using server-side validation, database constraints, and transactions.

---

# 📢 Notice Management

Students receive personalized notices.

Notice types include:

* Hall Notices
* University Notices
* Important Notices
* Emergency Notices

Students can:

* View notices
* Search notices
* Filter notices
* Mark notices as read
* Download attachments
* View unread notice count

---

# 🔔 Notification System

Students receive notifications for:

* New notices
* Seat allocation
* Application approval
* Application rejection
* Room transfer
* Complaint updates
* Complaint resolution
* Payment due
* Payment received
* Check-in
* Check-out
* Important announcements

---

# 🛠️ Complaint & Issue Management

Students can report hall-related problems.

### Issue Categories

* Electrical
* Water
* Cleaning
* Internet
* Room Maintenance
* Furniture
* Dining
* Canteen
* Security
* Bathroom
* Common Room
* Other

### Issue Priority

```text
LOW
MEDIUM
HIGH
URGENT
```

### Issue Status

```text
SUBMITTED
UNDER_REVIEW
IN_PROGRESS
RESOLVED
REJECTED
CLOSED
```

Each complaint receives a unique tracking ID.

Example:

```text
ISS-2026-00124
```

Students can follow the complete issue lifecycle:

```text
Submitted
    ↓
Under Review
    ↓
Assigned to Staff
    ↓
In Progress
    ↓
Resolved
    ↓
Student Confirmation
    ↓
Closed
```

---

# 📊 Student Issue Reports

Students can see:

* Total issues
* Open issues
* In-progress issues
* Resolved issues
* Rejected issues
* Issues by category
* Issues by month
* Resolution time
* Recent complaints

Charts are generated using **Recharts**.

---

# 🔄 Room Transfer

Students can request room transfers.

The transfer workflow:

```text
Student
   ↓
Transfer Request
   ↓
Admin Review
   ↓
Approve / Reject
   ↓
Release Previous Seat
   ↓
Allocate New Seat
```

The complete transfer history is preserved.

---

# 📝 Hall Seat Application

Students can submit hall/seat applications.

Application statuses:

```text
PENDING
APPROVED
REJECTED
CANCELLED
```

Students can track:

* Application ID
* Hall
* Application date
* Status
* Review date
* Reviewer
* Remarks

---

# 💳 Payment & Dues

Students can view:

* Hall fees
* Seat fees
* Dining fees
* Utility fees
* Fines
* Other charges

Payment status:

```text
PENDING
PAID
FAILED
CANCELLED
```

The system provides:

* Total due
* Total paid
* Remaining amount
* Payment history
* Transaction ID
* Payment status

---

# 🕌 Hall Facilities

The system supports management of:

* Mosque
* Reading Room
* Hall Sangsad Room
* Common Room
* Dining Room
* Canteen
* Guest Room
* Shops
* Bicycle Parking
* Motorcycle Parking
* Provost Room

Facility information can include:

* Name
* Type
* Description
* Location
* Opening Hours
* Rules
* Status

---

# 📚 Hall Rules & Guidelines

Students can access:

* Hall rules
* Room rules
* Guest rules
* Dining rules
* Parking rules
* Complaint guidelines
* Emergency instructions

Administrators can update the rules from the management panel.

---

# 📞 Emergency Contacts

The system supports configurable emergency contacts such as:

* Hall Office
* Hall Administration
* Security
* Maintenance
* Electrical Support
* Water Support
* Medical/Emergency Service

Phone numbers are configurable by the administrator and are not hard-coded.

---

# 📑 Personal Reports

Students can generate:

### Accommodation Report

Contains:

* Student information
* Hall
* Floor
* Block
* Room
* Seat
* Allocation date
* Current status

### Complaint Report

Contains:

* Issue ID
* Category
* Description
* Priority
* Status
* Submitted date
* Resolved date

### Payment Report

Contains:

* Payment date
* Payment type
* Amount
* Transaction ID
* Status

### Residence History

Contains:

* Hall
* Room
* Seat
* Start date
* End date
* Status

Reports are designed to be print-friendly and PDF-friendly.

---

# 👨‍💼 Administration

## Super Admin

Can manage the complete system:

* All halls
* Users
* Students
* Staff
* Rooms
* Seats
* Applications
* Allocations
* Transfers
* Complaints
* Notices
* Payments
* Facilities
* Reports
* Audit logs
* System settings

---

## Hall Admin

Can manage:

* Hall students
* Rooms
* Seats
* Applications
* Allocations
* Transfers
* Complaints
* Notices
* Facilities
* Check-in/check-out
* Hall reports

---

## Staff

Can manage assigned operational tasks such as:

* Check-in
* Check-out
* Complaints
* Maintenance
* Student information
* Hall operations

---

## Student

Can manage and view their own:

* Profile
* Accommodation
* Roommates
* Notices
* Notifications
* Applications
* Seat allocation
* Transfers
* Complaints
* Payments
* Residence history
* Reports
* Hall services

---

# 🔐 Security & Privacy

Security is a core part of the system.

Students can only access their own private information.

The system uses:

* Authentication
* Role-based authorization
* Server-side authorization
* Password hashing
* Secure sessions
* Database constraints
* Transaction-based operations
* Audit logging
* Input validation
* Zod validation

A student cannot access another student's private profile simply by changing a URL or ID.

Example:

```text
/student/profile/123
```

The server must verify that the authenticated user actually owns that profile.

Unauthorized access returns:

```text
403 Forbidden
```

---

# 🗃️ Database Architecture

The project uses **PostgreSQL + Prisma ORM**.

Main entities:

```text
User
Student
Hall
HallStaff
Floor
Block
Room
Seat
Facility
SeatAllocation
HallApplication
RoomTransfer
CheckIn
CheckOut
Payment
Complaint
Notice
Notification
Visitor
Event
AuditLog
```

Relationship overview:

```text
Hall
 │
 ├── Floors
 │    │
 │    └── Blocks
 │         │
 │         └── Rooms
 │              │
 │              └── 4 Seats
 │
 ├── Students
 ├── Staff
 ├── Facilities
 ├── Notices
 └── Complaints
```

---

# 🧰 Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React
* Recharts

### Backend

* Next.js App Router
* Server Actions / API Routes
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### Authentication

* Auth.js / NextAuth
* Secure sessions
* Role-based access control

### Validation

* Zod
* React Hook Form

---

# 📁 Project Structure

```text
hall-management-system/
│
├── app/
│   ├── (auth)/
│   ├── admin/
│   ├── student/
│   ├── api/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── rooms/
│   ├── students/
│   ├── complaints/
│   └── ...
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── validations/
│   ├── permissions/
│   └── utils/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│
├── tests/
│
├── .env.example
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

cd YOUR_REPOSITORY
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Configure:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/hall_management"
AUTH_SECRET="your-secure-secret"
```

Never commit your real `.env` file.

---

# 🗄️ Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Seed demo data:

```bash
npx prisma db seed
```

Optional Prisma Studio:

```bash
npx prisma studio
```

---

# ▶️ Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Testing

Run tests:

```bash
npm test
```

Run lint:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npm run typecheck
```

Build production version:

```bash
npm run build
```

---

# 📊 Demo Data

The seed script creates a demo environment for:

```text
Jatiya Kabi Kazi Nazrul Islam Hall
```

Including:

* 10 floors
* 3 blocks per floor
* 250 residential rooms
* 4 seats per room
* 1,000 known residential seats
* Demo students
* Demo administrators
* Demo staff
* Demo notices
* Demo complaints
* Demo applications
* Demo facilities

The seed data is for development/testing purposes and should not be treated as official university records.

---

# ⚡ Core Business Rules

The following rules are enforced by the application:

```text
Room Capacity = 4

Maximum Students per Room = 4

Maximum Active Allocation per Student = 1

Maximum Active Allocation per Seat = 1

Maintenance Room = No Allocation

Checkout = Seat Becomes Available

Transfer = Old Allocation Ends + New Allocation Created

Historical Records = Never Deleted
```

---

# 📈 Hall Statistics

The system dynamically calculates:

* Total rooms
* Total seats
* Occupied seats
* Available seats
* Room occupancy
* Full rooms
* Partial rooms
* Empty rooms
* Maintenance rooms
* Students per floor
* Students per block
* Pending applications
* Pending transfers
* Pending complaints

No dynamic statistics are hard-coded.

---

# 📱 Responsive Design

The application is designed for:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

The Student Portal is especially optimized for mobile devices.

---

# 🎯 Project Goals

The main goals of this project are:

1. Digitize hall administration.
2. Reduce manual paperwork.
3. Simplify room and seat allocation.
4. Improve student access to hall services.
5. Provide transparent complaint tracking.
6. Centralize hall notices.
7. Improve communication between students and administration.
8. Provide real-time occupancy information.
9. Maintain historical records.
10. Build a scalable platform for all university halls.

---

# 🛣️ Future Improvements

Potential future features include:

* QR-based student verification
* QR-based room/seat verification
* Digital hall ID card
* Online payment gateway
* SMS notifications
* Email notifications
* Push notifications
* Dining meal management
* Visitor management with QR codes
* Maintenance staff assignment
* Inventory management
* Hall event management
* Attendance management
* Digital signature
* Advanced analytics
* Multi-hall administration
* University-wide integration
* Mobile application
* PWA support

---

# 🏗️ Scalability

Although the initial implementation focuses on Jatiya Kabi Kazi Nazrul Islam Hall, the architecture is designed to support the university's broader residential hall ecosystem.

The university's official website maintains a list of its residential halls, including Jatiya Kabi Kazi Nazrul Islam Hall. ([Jahangirnagar University][2])

Future halls can be added through the database without rewriting the core application.

```text
University
    │
    ├── Hall 01
    ├── Hall 02
    ├── Hall 03
    ├── ...
    └── Nazrul Hall
          │
          ├── Floors
          ├── Blocks
          ├── Rooms
          ├── Seats
          ├── Students
          └── Facilities
```

---

# 🤝 Contributing

Contributions are welcome.

### Development Workflow

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run tests.
5. Run lint and type checks.
6. Commit your changes.
7. Push your branch.
8. Open a Pull Request.

Example:

```bash
git checkout -b feature/student-complaints

npm test
npm run lint
npm run typecheck

git add .
git commit -m "feat: add student complaint tracking"

git push origin feature/student-complaints
```

---

# 🔒 Security

If you discover a security vulnerability, please do not publicly disclose it through a GitHub issue.

Contact the project maintainer privately.

---

# 📄 License

This project is intended for educational and software development purposes.

Add an appropriate open-source license before public distribution.

---

# 👨‍💻 Author

**Rakib**

Student & Web Developer

Interested in:

* Web Development
* Software Engineering
* Full-Stack Development
* Database Systems
* Modern Web Technologies

---

# ⭐ Project Status

```text
Status: 🚧 Active Development

Version: 0.1.0

Initial Module:
Jatiya Kabi Kazi Nazrul Islam Hall
```

---

# 💡 Vision

The long-term vision is to transform traditional university hall administration into a modern digital ecosystem where students and administrators can access the services they need quickly, securely, and transparently.

```text
Traditional Hall Management
          ↓
     Digital System
          ↓
 ┌──────────────────────┐
 │ Students             │
 │ Administration       │
 │ Staff                │
 │ Rooms & Seats        │
 │ Complaints           │
 │ Notices              │
 │ Payments             │
 │ Reports              │
 └──────────────────────┘
          ↓
 Better Hall Management
```

> **Built with ❤️ for a smarter and more connected campus.**

```

You can also add the official Jahangirnagar University hall page to the README's **About** section if you want a verified reference: :contentReference[oaicite:3]{index=3}. 
```

[1]: https://www.development.juniv.edu/hall/jatiya-kabi-kazi-nazrul-islam-hall?utm_source=chatgpt.com "Jahangirnagar University"
[2]: https://www.juniv.edu/public/hall/15-no?utm_source=chatgpt.com "Jahangirnagar University"
