# 🏫 Jahangirnagar University Hall Management System

A modern web-based **Hall Management System** designed for **Jahangirnagar University (JU)** to digitally manage residential halls, students, rooms, seats, applications, complaints, notices, payments, and hall administration.

> **Core Rule:** Each room contains **4 student seats**.

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Objectives](#-objectives)
* [Main Features](#-main-features)
* [Hall Structure](#-hall-structure)
* [Room & Seat Management](#-room--seat-management)
* [User Roles](#-user-roles)
* [Student Management](#-student-management)
* [Seat Allocation](#-seat-allocation)
* [Room Transfer](#-room-transfer)
* [Check-In & Check-Out](#-check-in--check-out)
* [Complaint Management](#-complaint-management)
* [Notice Management](#-notice-management)
* [Payment Management](#-payment-management)
* [Dashboard & Reports](#-dashboard--reports)
* [Database Structure](#-database-structure)
* [Security](#-security)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Installation](#-installation)
* [Environment Variables](#-environment-variables)
* [Testing](#-testing)
* [Future Improvements](#-future-improvements)
* [Contribution](#-contribution)
* [License](#-license)

---

## 📖 About the Project

The **Jahangirnagar University Hall Management System** is a centralized platform for managing university residential halls.

The system allows hall authorities to manage:

* 👨‍🎓 Students
* 🏢 Halls
* 🏬 Buildings
* 🏠 Rooms
* 💺 Seats
* 🎫 Seat Applications
* 🔄 Room Transfers
* 🚪 Check-In / Check-Out
* 📝 Complaints
* 📢 Notices
* 💰 Payments
* 👥 Hall Staff
* 📊 Reports
* 📋 Audit Logs

The main goal is to replace manual hall-management processes with an efficient, transparent, and secure digital system.

---

## 🎯 Objectives

The system is designed to:

* Reduce manual paperwork
* Digitize hall management
* Manage student information efficiently
* Manage room and seat allocation
* Track vacant and occupied seats
* Prevent duplicate seat allocation
* Allow students to apply for seats online
* Manage complaints digitally
* Publish hall notices
* Manage room transfers
* Track student check-in/check-out
* Generate administrative reports
* Improve transparency in seat allocation

---

# 🚀 Main Features

### 👨‍🎓 Student Management

* Student registration
* Student profile
* Department information
* Session information
* Contact information
* Guardian information
* Hall information
* Room and seat information
* Residence history

### 🏢 Hall Management

* Create/update/delete halls
* Hall information
* Hall administration
* Hall staff management
* Hall capacity
* Hall occupancy

### 🏠 Room Management

* Building management
* Floor management
* Room management
* Room status
* Room capacity
* Occupied seats
* Vacant seats

### 💺 Seat Management

Each room contains **4 seats**.

```text
Room A-101
│
├── Seat 1
├── Seat 2
├── Seat 3
└── Seat 4
```

### 🎫 Seat Application

Students can:

1. Apply for a hall seat
2. Track application status
3. Receive approval/rejection
4. Receive room and seat allocation

### 🔄 Room Transfer

Students can request room/seat transfers.

### 🚪 Check-In / Check-Out

Hall administrators can record:

* Student check-in
* Student check-out
* Check-in date
* Check-out date
* Previous room
* Previous seat

### 📝 Complaint Management

Students can submit complaints related to:

* Electricity
* Water
* Internet
* Cleaning
* Maintenance
* Dining
* Security
* Other issues

### 📢 Notice Management

Hall authorities can publish:

* General notices
* Emergency notices
* Maintenance notices
* Dining notices
* Meeting notices
* Event notices

### 💰 Payment Management

The system can manage:

* Hall fees
* Seat fees
* Dining fees
* Utility fees
* Fines
* Other charges

### 📊 Reports

Generate reports for:

* Students
* Rooms
* Seats
* Vacancies
* Applications
* Transfers
* Complaints
* Payments
* Check-ins
* Check-outs

---

# 🏢 Hall Structure

The system follows this hierarchy:

```text
Jahangirnagar University
│
├── Hall
│   │
│   ├── Building
│   │   │
│   │   ├── Floor
│   │   │   │
│   │   │   ├── Room
│   │   │   │   ├── Seat 1 → Student
│   │   │   │   ├── Seat 2 → Student
│   │   │   │   ├── Seat 3 → Student
│   │   │   │   └── Seat 4 → Student
│   │   │   │
│   │   │   └── Room
│   │   │
│   │   └── Floor
│   │
│   └── Building
│
└── Hall
```

---

# 🛏️ Room & Seat Management

## Room Capacity

Every room has a maximum capacity of **4 students**.

| Room  | Seat 1  | Seat 2  | Seat 3  | Seat 4  | Status  |
| ----- | ------- | ------- | ------- | ------- | ------- |
| A-101 | Student | Student | Student | Student | FULL    |
| A-102 | Student | Student | Vacant  | Student | PARTIAL |
| A-103 | Vacant  | Vacant  | Vacant  | Vacant  | EMPTY   |

### Room Status

| Status        | Description                     |
| ------------- | ------------------------------- |
| `FULL`        | All 4 seats are occupied        |
| `PARTIAL`     | 1–3 seats are occupied          |
| `EMPTY`       | No seats are occupied           |
| `MAINTENANCE` | Room is temporarily unavailable |

---

# 👥 User Roles

## 🔴 Super Admin

Has access to the entire system.

### Permissions

* Manage halls
* Manage administrators
* Manage users
* Manage students
* Manage rooms
* Manage buildings
* Manage floors
* View reports
* Manage system settings
* View audit logs

---

## 🟠 Hall Admin / Provost

Manages a specific hall.

### Permissions

* Manage students
* Manage rooms
* Manage seats
* Approve applications
* Allocate seats
* Transfer students
* Check-in students
* Check-out students
* Manage complaints
* Publish notices
* View reports

---

## 🟡 Hall Staff

Assists with daily hall operations.

### Permissions

* View students
* View rooms
* View seat occupancy
* Manage check-in/check-out
* Handle complaints
* Update room status
* Manage visitors

---

## 🟢 Student

Students can manage their own hall-related activities.

### Features

* Login
* View profile
* View hall information
* View room information
* View seat information
* Apply for a seat
* View application status
* View roommates
* Submit complaints
* View notices
* View payment information
* Request room transfer

---

# 👨‍🎓 Student Information

The system can store:

```text
Student ID
Name
University Roll
Registration Number
Department
Faculty
Session
Academic Year
Email
Phone
Gender
Blood Group
Permanent Address
Present Address
Guardian Name
Guardian Phone
Hall
Room
Seat
Admission Date
Residence Status
```

Sensitive information should only be accessible to authorized users.

---

# 🎫 Seat Allocation

The seat allocation process:

```text
Student
   │
   ▼
Login
   │
   ▼
Apply for Hall Seat
   │
   ▼
Application Submitted
   │
   ▼
Hall Admin Reviews
   │
   ├── Reject ──► Application Rejected
   │
   ▼
Approve
   │
   ▼
Select Available Room
   │
   ▼
Select Available Seat
   │
   ▼
Seat Assigned
   │
   ▼
Student Notified
```

### Important Rules

* A room cannot have more than **4 active students**
* A seat cannot be assigned to multiple active students
* A student cannot have multiple active seat allocations
* Only vacant seats can be assigned
* Maintenance rooms cannot receive new students
* All allocation history should be preserved

---

# 🔄 Room Transfer

Students can request a room/seat transfer.

```text
Student
   │
   ▼
Transfer Request
   │
   ▼
Reason Submitted
   │
   ▼
Hall Admin Review
   │
   ├── Reject
   │
   ▼
Approve
   │
   ▼
Old Seat Released
   │
   ▼
New Seat Assigned
```

The system should maintain a complete transfer history.

---

# 🚪 Check-In & Check-Out

## Check-In

```text
Student
   ↓
Application Approved
   ↓
Seat Assigned
   ↓
Check-In
```

The system records:

* Student
* Hall
* Room
* Seat
* Check-in date
* Assigned authority

## Check-Out

```text
Student
   ↓
Check-Out
   ↓
Seat Released
   ↓
Seat Available
```

Previous allocation information should remain in the student's residence history.

---

# 📝 Complaint Management

Students can submit complaints through the system.

### Complaint Categories

* ⚡ Electrical
* 💧 Water
* 🧹 Cleaning
* 🌐 Internet
* 🔧 Maintenance
* 🍽️ Dining
* 🔐 Security
* 📌 Other

### Complaint Status

```text
PENDING
    ↓
IN_PROGRESS
    ↓
RESOLVED
```

Possible final statuses:

* `RESOLVED`
* `REJECTED`

---

# 📢 Notice Management

Hall administrators can publish notices.

Example:

```text
Title
Description
Published By
Published Date
Expiry Date
Attachment
Status
```

Possible notices:

* Hall meeting
* Seat allocation
* Maintenance
* Dining
* Emergency
* Cultural event
* Sports event

---

# 💰 Payment Management

Possible payment types:

* Hall Fee
* Seat Fee
* Dining Fee
* Utility Fee
* Fine
* Other

Payment information:

```text
Payment ID
Student ID
Payment Type
Amount
Payment Date
Payment Method
Transaction ID
Status
```

Payment statuses:

```text
PENDING
PAID
FAILED
CANCELLED
```

---

# 📊 Admin Dashboard

Example dashboard:

```text
┌─────────────────────────────────────────┐
│          HALL MANAGEMENT DASHBOARD      │
├─────────────────────────────────────────┤
│                                         │
│  Total Students       : 12,500          │
│  Total Halls          : 20              │
│  Total Rooms          : 3,200           │
│  Total Seats          : 12,800          │
│                                         │
│  Occupied Seats       : 11,900          │
│  Vacant Seats         : 900             │
│                                         │
│  Full Rooms           : 2,700           │
│  Partial Rooms        : 400             │
│  Empty Rooms          : 100             │
│                                         │
│  Pending Applications : 350             │
│  Pending Complaints   : 42              │
│                                         │
└─────────────────────────────────────────┘
```

---

# 📈 Reports

The system should provide reports for:

### Student Reports

* Total students
* Students by hall
* Students by department
* Students by session
* Students by room

### Room Reports

* Total rooms
* Full rooms
* Partial rooms
* Empty rooms
* Maintenance rooms

### Seat Reports

* Total seats
* Occupied seats
* Vacant seats
* Seat utilization

### Application Reports

* Pending applications
* Approved applications
* Rejected applications

### Other Reports

* Room transfers
* Check-ins
* Check-outs
* Complaints
* Payments

---

# 🗃️ Database Structure

Suggested database tables:

```text
users
students
halls
hall_staff
buildings
floors
rooms
seats
seat_allocations
hall_applications
room_transfers
check_ins
check_outs
payments
complaints
notices
visitors
events
audit_logs
```

### Database Relationship

```text
Hall
 │
 ├── Buildings
 │     │
 │     └── Floors
 │           │
 │           └── Rooms
 │                 │
 │                 └── 4 Seats
 │                       │
 │                       └── Students
 │
 └── Hall Staff
```

---

# 🔐 Security

The application should implement:

* 🔒 Password hashing
* 🔑 Secure authentication
* 👥 Role-Based Access Control
* 🛡️ Input validation
* 🚫 CSRF protection
* ⏱️ Rate limiting
* 🔐 Secure sessions
* 📋 Audit logs
* 💾 Regular database backups
* 🔒 HTTPS in production

Passwords must **never** be stored as plain text.

---

# 🛠️ Technology Stack

The technology stack can be customized based on project requirements.

### Frontend

* React.js / Next.js
* TypeScript
* Tailwind CSS
* HTML5
* CSS3

### Backend

One of:

* Node.js + Express
* Laravel
* Django
* Spring Boot
* ASP.NET Core

### Database

* PostgreSQL
* MySQL

### Authentication

* JWT
* Session-based authentication
* Role-Based Access Control

---

# 📁 Project Structure

Example full-stack structure:

```text
ju-hall-management-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   │
│   └── package.json
│
├── database/
│   ├── migrations/
│   └── seeders/
│
├── docs/
│   ├── ERD.md
│   ├── API.md
│   └── SYSTEM_DESIGN.md
│
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/ju-hall-management-system.git

cd ju-hall-management-system
```

## 2. Install Dependencies

```bash
npm install
```

For separate frontend and backend:

```bash
cd frontend
npm install

cd ../backend
npm install
```

## 3. Configure Environment

Create a `.env` file:

```env
APP_NAME=JU Hall Management System

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ju_hall_management
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key

APP_URL=http://localhost:3000
```

## 4. Setup Database

Create the database:

```sql
CREATE DATABASE ju_hall_management;
```

Run migrations:

```bash
npm run migrate
```

Run seeders:

```bash
npm run seed
```

## 5. Start Development Server

```bash
npm run dev
```

---

# 🧪 Testing

Important test cases include:

```text
✓ User registration
✓ User login
✓ Role authorization
✓ Student creation
✓ Hall creation
✓ Building creation
✓ Floor creation
✓ Room creation
✓ Seat management
✓ Maximum 4 students per room
✓ Duplicate seat prevention
✓ Seat allocation
✓ Seat transfer
✓ Student check-in
✓ Student check-out
✓ Complaint submission
✓ Notice creation
✓ Payment recording
```

---

# 📌 Core Business Rule

The most important rule of this system is:

> **Every room has exactly 4 student seats.**

```text
Room
│
├── Seat 1
├── Seat 2
├── Seat 3
└── Seat 4
```

Therefore:

```text
ROOM_CAPACITY = 4
```

The application must prevent a fifth student from being assigned to the same room.

Example:

```javascript
if (occupiedSeats >= 4) {
    throw new Error("Room is full");
}
```

For concurrent allocation requests, database transactions/locking should be used to prevent two administrators from assigning the same final available seat.

---

# 🔮 Future Improvements

Possible future features:

* 📱 Mobile application
* 📲 SMS notifications
* 📧 Email notifications
* 💳 Online payment gateway
* 🪪 Digital hall ID card
* 📷 QR-based student verification
* 👥 Visitor management
* 🍽️ Dining management
* 🛠️ Maintenance management
* 📅 Hall event management
* 📊 Advanced analytics
* 🤖 AI-assisted room allocation
* 🔗 Integration with university systems

---

# 🤝 Contribution

Contributions are welcome!

### Contribution Workflow

```bash
# 1. Fork the repository

# 2. Clone your fork
git clone https://github.com/your-username/ju-hall-management-system.git

# 3. Create a feature branch
git checkout -b feature/room-management

# 4. Make your changes

# 5. Commit
git add .
git commit -m "Add room management module"

# 6. Push
git push origin feature/room-management

# 7. Create a Pull Request
```

---

# 📜 License

This project is developed for educational and institutional purposes.

Add an appropriate license before publicly distributing the project.

---

# 👨‍💻 Developer

**Jahangirnagar University Hall Management System**

Built to simplify and digitize university residential hall management.

---

## ⭐ Project Vision

The goal of this project is to build a **transparent, secure, and efficient digital hall management platform** for Jahangirnagar University.

The core structure is:

```text
University
     │
     ▼
    Hall
     │
     ▼
  Building
     │
     ▼
    Floor
     │
     ▼
    Room
     │
     ▼
  4 Seats
     │
     ▼
  Students
```

> **One Room → Four Seats → Four Students Maximum**

---

## 📚 References

* [Jahangirnagar University](https://www.juniv.edu/)
* [JU Student Accommodation](https://development.juniv.edu/facility/134)
