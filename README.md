# GearGuard - Unified Maintenance Management System

A comprehensive web-based platform designed to streamline equipment tracking, automate maintenance workflows, and provide data-driven insights into asset health and team performance. GearGuard enables organizations to efficiently manage maintenance operations, optimize technician utilization, and extend equipment lifespan.

## 🎯 Project Overview

**GearGuard** is a Next.js-based full-stack application that serves as a centralized hub for:
- 🏭 **Equipment Management**: Track and monitor all organizational assets in real-time
- 👥 **Team Management**: Organize technicians into specialized maintenance teams
- 🔧 **Maintenance Requests**: Create, assign, and track both corrective and preventive maintenance tasks
- 📊 **Analytics & Reporting**: Visualize equipment health, technician utilization, and maintenance trends
- 🛠️ **Kanban Workflow**: Visual task management for technicians with drag-and-drop board
- 🔐 **Role-Based Access Control**: Secure multi-role authorization system

---

## 🏗️ Technology Stack

### Frontend
- **Next.js 16.1.1** - React framework with app router
- **React 19.2.3** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Recharts 3.6.0** - Data visualization and charts

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.2.1** - API middleware (configured but Next.js API routes used primarily)
- **MongoDB 9.0.2** - Document database via Mongoose

### Authentication & Security
- **JWT (jsonwebtoken 9.0.3)** - Token-based authentication
- **bcryptjs 3.0.3** - Password hashing
- **JOSE 6.1.3** - JWT operations
- **CORS 2.8.5** - Cross-origin resource sharing

### Additional Tools
- **OpenAI 6.15.0** - AI integration capability
- **ESLint 9** - Code quality and linting
- **Dotenv 17.2.3** - Environment variable management

---

## 📁 Project Structure

```
gear-guard/
├── app/
│   ├── (routes)/
│   │   ├── auth/              # Login/signup pages
│   │   ├── dashboard/         # Main maintenance dashboard
│   │   ├── equipment/         # Equipment listing and details
│   │   │   └── [id]/          # Individual equipment detail view
│   │   ├── maintenance/       # Calendar-based maintenance scheduling
│   │   ├── reporting/         # Analytics and reporting views
│   │   ├── teams/             # Team management and assignments
│   │   │   ├── [id]/          # Team detail view
│   │   │   └── new/           # Create new team
│   │   └── tech-workspace/    # Technician's Kanban board
│   ├── api/
│   │   ├── (auth)/
│   │   │   ├── login/         # User login endpoint
│   │   │   ├── logout/        # User logout endpoint
│   │   │   ├── signup/        # User registration endpoint
│   │   │   └── me/            # Current user info endpoint
│   │   ├── equipment/         # Equipment CRUD endpoints
│   │   │   └── [id]/          # Equipment details & update
│   │   ├── maintenance-requests/  # Maintenance request endpoints
│   │   ├── teams/             # Team management endpoints
│   │   │   ├── [id]/          # Team details
│   │   │   │   └── getTasks/  # Fetch team-specific tasks
│   │   │   └── [id]/          # Team operations
│   │   ├── tasks/             # Task management endpoints
│   │   ├── users/             # User management endpoints
│   │   ├── models/            # Database schemas
│   │   │   ├── User.models.js
│   │   │   ├── equipment.models.js
│   │   │   ├── equipment-request.models.js
│   │   │   └── maintainance-teams.models.js
│   │   └── lib/
│   │       └── db.js          # MongoDB connection manager
│   ├── maintainance-request/  # Maintenance request pages
│   │   ├── page.jsx           # View maintenance request
│   │   ├── new/page.jsx       # Create new request
│   │   └── comp.jsx           # Maintenance request component
│   ├── layout.js              # Root layout
│   ├── page.js                # Landing page
│   └── globals.css            # Global styles
├── components/
│   ├── equipement-table.js    # Equipment table component
│   ├── equipment-toolbar.js   # Equipment filter/search toolbar
│   ├── navbar.jsx             # Navigation component
│   └── input.jsx              # Reusable input component
├── context/
│   └── AuthContext.js         # Authentication context provider
├── lib/
│   └── utils.js               # Utility functions
├── public/                    # Static assets
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── next.config.mjs            # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── eslint.config.mjs          # ESLint configuration
```

---

## 🗄️ Database Models

### 1. **User Model** (`User.models.js`)
Stores user account information with role-based authorization:
```
- name: String (required)
- email: String (required, unique, lowercase)
- password: String (required, bcrypt hashed, min 6 chars)
- role: String (enum: admin, manager, technician, user, viewer)
- department: String
- active: Boolean (default: true)
- timestamps: Automatically tracked
```

### 2. **Equipment Model** (`equipment.models.js`)
Manages all organizational equipment and assets:
```
- name: String (required)
- serialNumber: String (required, unique)
- category: String (Vehicle, Machine, IT Equipment, Tools, etc.)
- department: String
- assignedTechnician: Reference to User
- company: String (default: "My Company")
- status: String (operational, under_maintenance, scrapped, inactive)
- location: String
- workCenter: String (IT Operations, Production Floor, etc.)
- assignedDate: Date
- description: String
- healthPercentage: Number (0-100)
- lastMaintenanceDate: Date
- nextMaintenanceDate: Date
- timestamps: Automatically tracked
```

### 3. **Maintenance Request Model** (`equipment-request.models.js`)
Tracks maintenance tasks and repair requests:
```
- subject: String (required)
- reference: String (unique, auto-generated: MAINT/YYYY/XXXX)
- createdBy: String
- maintenanceFor: String (Internal Maintenance, Customer Repair)
- equipment: Reference to Equipment (required)
- category: String
- maintenanceType: String (Corrective, Preventive)
- team: String
- technician: Reference to User
- scheduledDate: Date
- duration: Number (in hours)
- priority: Number (1-3, default: 2)
- notes: String
- instructions: String
- status: String (pending, in-progress, completed, cancelled)
- timestamps: Automatically tracked
```

### 4. **Maintenance Team Model** (`maintainance-teams.models.js`)
Organizes technicians into specialized teams:
```
- name: String (required)
- companyName: String
- specialization: String
- members: Array of User references
- isActive: Boolean (default: true)
- timestamps: Automatically tracked
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# MongoDB Connection String
MONGODB_URI="mongodb+srv://[username]:[password]@[cluster].mongodb.net/?appName=[appname]"

# JWT Secret for token signing (minimum 32 characters recommended)
JWT_SECRET=[your-secure-random-key]
```

### Environment Variables Explained:

| Variable | Purpose | Format | Security Notes |
|----------|---------|--------|-----------------|
| `MONGODB_URI` | MongoDB Atlas connection string for database | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` | Store securely, never commit to version control |
| `JWT_SECRET` | Secret key for JWT token signing and verification | String (min 32 chars recommended) | Use strong random string, rotate periodically |

### Security Best Practices:
- ✅ Never commit `.env` file to version control (add to `.gitignore`)
- ✅ Use strong, randomly generated JWT_SECRET (minimum 32 characters)
- ✅ Rotate JWT_SECRET periodically for production environments
- ✅ Store credentials in secure secret management systems:
  - AWS Secrets Manager
  - GitHub Secrets
  - Azure Key Vault
  - HashiCorp Vault
- ✅ Use environment-specific values for different deployment stages

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- MongoDB Atlas account or local MongoDB instance
- Git for version control

### Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd gear-guard
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Create .env file in root directory
# Add your credentials:
MONGODB_URI="your-mongodb-connection-string"
JWT_SECRET="your-jwt-secret-key-minimum-32-chars"
```

4. **Start development server**
```bash
npm run dev
```
Access the application at [http://localhost:3000](http://localhost:3000)

5. **Build for production**
```bash
npm run build    # Creates optimized production bundle
npm start        # Starts production server
```

---

## 📋 Available npm Scripts

```bash
npm run dev      # Start development server with hot-reload (port 3000)
npm run build    # Build optimized production bundle
npm start        # Start production server
npm run lint     # Run ESLint to check code quality
```

---

## 🔐 Authentication System

### Key Features
- **JWT-based Stateless Authentication** with 24-hour token expiration
- **Role-Based Access Control (RBAC)** with 5-tier permission system
- **Secure Password Storage** using bcryptjs with automatic salt generation
- **HTTP-Only Cookies** preventing XSS vulnerabilities
- **CSRF Protection** via SameSite cookie attribute

### User Roles & Permissions

| Role | Permissions | Use Case |
|------|-------------|----------|
| **Admin** | Full system access, user management, team configuration | System administrator |
| **Manager** | Team assignment, request approval, reporting access | Maintenance manager |
| **Technician** | Task execution, maintenance logging | Field technician |
| **User** | Basic access, request creation | General staff |
| **Viewer** | Read-only reports and dashboards | Stakeholder reports |

### Authentication Flow

```
1. User submits credentials (email/password)
   ↓
2. Server validates against database
   ↓
3. Password verified using bcrypt.compare()
   ↓
4. JWT token generated (payload: id, role)
   ↓
5. Token stored in HTTP-only secure cookie
   ↓
6. User state managed via AuthContext
   ↓
7. Protected routes validate token on each request
```

### Protected Routes
- `/dashboard` - Requires authentication
- `/equipment` - Requires authentication
- `/teams` - Requires authentication (manager/admin)
- `/tech-workspace` - Requires technician role
- Admin endpoints require admin role verification

---

## 📊 Core Features

### 1. Equipment Tracking Dashboard
**Purpose**: Real-time monitoring of all organizational assets

**Features**:
- Equipment status visualization (operational, maintenance, scrapped)
- Health percentage tracking (0-100%)
- Critical equipment alerts (health < 30%)
- Location-based tracking
- Multi-category support (Vehicles, Machines, IT Equipment, Tools)

**Routes**:
- `GET /equipment` - Equipment listing page
- `GET /equipment/[id]` - Equipment detail view
- `GET /api/equipment` - Fetch all equipment
- `POST /api/equipment` - Create new equipment
- `GET/PUT/DELETE /api/equipment/[id]` - Equipment CRUD

### 2. Maintenance Request Management
**Purpose**: Track and manage maintenance tasks

**Features**:
- Corrective maintenance (reactive repairs)
- Preventive maintenance (scheduled maintenance)
- Auto-generated reference numbers (MAINT/YYYY/XXXX)
- Priority-based routing (1=Low, 2=Medium, 3=High)
- Status tracking (pending → in-progress → completed)
- Duration and instructions tracking

**Routes**:
- `GET /maintainance-request/new` - Create request form
- `GET /maintainance-request` - Request detail view
- `GET/POST /api/maintenance-requests` - Request API endpoints

### 3. Team & Technician Management
**Purpose**: Organize workforce and manage assignments

**Features**:
- Team creation and member assignment
- Specialization tracking
- Utilization metrics (0-100%)
- Workload distribution visualization
- Active/inactive status management

**Routes**:
- `GET /teams` - Teams listing
- `GET /teams/new` - Create new team
- `GET /teams/[id]` - Team details
- `GET/POST/PUT/DELETE /api/teams` - Team API endpoints

### 4. Kanban Board (Technician Workspace)
**Purpose**: Visual task management for technicians

**Features**:
- Four-stage workflow: New → In Progress → Repaired → Scrap
- Drag-and-drop task management
- Status color-coding
- Maintenance type indicators (Corrective=Red, Preventive=Blue)
- Priority indicators
- Task filtering and sorting

**Route**: `/tech-workspace` - Interactive Kanban board

### 5. Maintenance Calendar
**Purpose**: Schedule and visualize maintenance events

**Features**:
- Calendar-based event scheduling
- Color-coded maintenance types
- Overdue task highlighting
- Department-based filtering
- Event details preview
- Date-range navigation

**Route**: `/maintenance` - Calendar view

### 6. Analytics & Reporting
**Purpose**: Gain insights into maintenance operations

**Features**:
- Equipment health overview
- Technician utilization metrics
- Open requests tracking
- Recent activity logs
- KPI dashboard (critical equipment, technician load)
- Trend analysis

**Routes**:
- `GET /dashboard` - Main analytics dashboard
- `GET /reporting` - Advanced reporting interface

### 7. User Management
**Purpose**: Control access and user permissions

**Features**:
- Multi-role user system
- Department assignment
- Active/inactive status
- User CRUD operations
- Role-based access control

**Routes**:
- `GET /auth` - Login/signup interface
- `GET/POST/PUT/DELETE /api/users` - User management

---

## 🔌 Complete API Reference

### Authentication Endpoints
```
POST   /api/login              # User login
       Body: { email, password }
       Response: { status, user, token (cookie) }

POST   /api/signup             # User registration
       Body: { name, email, password }
       Response: { status, user, token (cookie) }

GET    /api/me                 # Get current user
       Headers: { Authorization: Bearer token }
       Response: { status, data: user }

POST   /api/logout             # User logout
       Response: { status }
```

### Equipment Endpoints
```
GET    /api/equipment          # List all equipment
       Response: { equipment array }

POST   /api/equipment          # Create equipment
       Body: { name, serialNumber, category, ... }
       Response: { equipment object }

GET    /api/equipment/[id]     # Equipment details
       Response: { equipment object }

PUT    /api/equipment/[id]     # Update equipment
       Body: { updated fields }
       Response: { equipment object }

DELETE /api/equipment/[id]     # Delete equipment
       Response: { success message }
```

### Maintenance Request Endpoints
```
GET    /api/maintenance-requests      # List requests
       Response: { requests array }

POST   /api/maintenance-requests      # Create request
       Body: { subject, equipment, maintenanceType, ... }
       Response: { request object }

GET    /api/maintenance-requests/[id] # Request details
       Response: { request object }

PUT    /api/maintenance-requests/[id] # Update request
       Body: { status, notes, ... }
       Response: { request object }
```

### Team Endpoints
```
GET    /api/teams              # List teams
       Response: { teams array with member count }

POST   /api/teams              # Create team
       Body: { name, companyName, members, ... }
       Response: { team object }

GET    /api/teams/[id]         # Team details
       Response: { team object with populated members }

PUT    /api/teams/[id]         # Update team
       Headers: { x-user-role: admin }
       Body: { updated fields }
       Response: { team object }

DELETE /api/teams/[id]         # Delete team
       Headers: { x-user-role: admin }
       Response: { success message }

GET    /api/teams/[id]/getTasks # Team's tasks
       Response: { tasks array }
```

### Task Endpoints
```
GET    /api/tasks              # List all tasks
       Response: { tasks array }

POST   /api/tasks              # Create task
       Body: { subject, equipment, team, ... }
       Response: { task object }

PUT    /api/tasks/[id]         # Update task status
       Body: { status }
       Response: { task object }

DELETE /api/tasks/[id]         # Delete task
       Response: { success message }
```

### User Endpoints
```
GET    /api/users              # List users
       Response: { users array }

POST   /api/users              # Create user
       Body: { name, email, password, role, ... }
       Response: { user object }

GET    /api/users/[id]         # User details
       Response: { user object }

PUT    /api/users/[id]         # Update user
       Body: { updated fields }
       Response: { user object }

DELETE /api/users/[id]         # Delete user
       Response: { success message }
```

---

## 🎨 Frontend Components

### Layout Components
- **Navbar** (`navbar.jsx`)
  - Navigation header with role-based menu
  - User profile dropdown
  - Logout functionality
  - Mobile responsive

- **Layout** (`layout.js`)
  - Root wrapper component
  - AuthContext provider setup
  - Global styles injection

### Data Display Components
- **EquipmentTable** (`equipement-table.js`)
  - Sortable equipment list
  - Serial number display
  - Status indicators
  - Click-to-detail navigation

- **EquipmentToolbar** (`equipment-toolbar.js`)
  - Search functionality
  - Filter by category/status
  - Action buttons (add, export)

- **MaintenanceRequestComponent** (`maintainance-request/comp.jsx`)
  - Multi-tab request view (Notes, Details, History)
  - Editable fields
  - Status update capability

### Form Components
- **Input** (`input.jsx`)
  - Reusable form input
  - Error state handling
  - Validation display

- **Maintenance Request Form** (`maintainance-request/new/page.jsx`)
  - Multi-step form wizard
  - Equipment selection with auto-population
  - Date/time scheduling
  - Priority selection

- **Team Creation Form** (`teams/new/page.jsx`)
  - Team setup wizard
  - Member selection
  - Specialization assignment

### Dashboard & Analytics Components
- **MaintenanceDashboard** (`/dashboard`)
  - KPI cards (critical equipment, technician load, open requests)
  - Recent activity feed
  - Quick action buttons

---

## 🔄 Authentication Context Usage

The `AuthContext` provides global authentication state via React Context API:

```javascript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, login, signup, logout, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) return <div>Please login</div>;
  
  return <div>Welcome {user.name}</div>;
}
```

**Available Methods**:
- `login(email, password)` - Authenticate user
  - Returns: `{ success: boolean, user: object, message: string }`
  - Sets user state and stores token in cookie

- `signup(name, email, password)` - Register new user
  - Returns: `{ success: boolean, user: object, message: string }`
  - Creates account and auto-logs in

- `logout()` - Clear session
  - Removes cookie
  - Clears user state
  - Redirects to login

**Context State**:
- `user` - Current user object or null
- `loading` - Auth verification in progress
- `authenticated` - Boolean user logged-in status

---

## 🛡️ Security Features & Implementation

### 1. JWT Token Authentication
- **Token Expiration**: 24 hours (`maxAge: 60 * 60 * 24`)
- **Secure Storage**: HTTP-only cookie (JavaScript cannot access)
- **CORS Protection**: Enabled in configuration
- **Token Verification**: Checked on protected routes

### 2. Password Security
- **Hashing Algorithm**: bcryptjs with automatic salt generation
- **Minimum Length**: 6 characters
- **Comparison Method**: bcrypt.compare() for constant-time comparison
- **Pre-hashing Check**: Prevents double-hashing

### 3. Role-Based Access Control (RBAC)
- **Five-tier System**: admin, manager, technician, user, viewer
- **Route Protection**: Validated at page/component level
- **API Verification**: Admin check on delete/update operations
- **Header Validation**: x-user-role header verification

### 4. Input Validation
- **Email Format**: Regex validation (^[^\s@]+@[^\s@]+\.[^\s@]+$)
- **Password Confirmation**: Match validation on signup
- **Required Fields**: Frontend and backend validation
- **SQL Injection Prevention**: Mongoose schema validation

### 5. Database Security
- **Connection Pooling**: Managed connection reuse
- **Environment Variables**: Credentials never hardcoded
- **Unique Constraints**: Email and serialNumber uniqueness
- **Pre-hashing Middleware**: Mongoose pre-save hook

### 6. Network Security
- **HTTPS Enforcement**: Production mode only
- **CORS Configuration**: Controlled cross-origin access
- **CSRF Protection**: SameSite cookie attribute (strict)
- **Secure Flag**: HTTPS-only cookie transmission

---

## 📈 Performance & Scalability

### Architecture Highlights
- **Serverless-Ready**: Next.js API routes for AWS Lambda/Vercel compatibility
- **Connection Pooling**: MongoDB connection reuse for optimal database performance
- **Code Splitting**: Automatic by Next.js for faster page loads
- **Responsive Design**: Mobile-first Tailwind CSS approach
- **Component Reusability**: Modular component structure

### Optimization Strategies
- Next.js image optimization for asset delivery
- Automatic static optimization where possible
- API route compression
- Client-side caching strategies
- Database index optimization (unique constraints)

---

## 🐛 Troubleshooting Guide

### MongoDB Connection Issues
**Error**: `Please define the MONGODB_URI environment variable`
```
Solution:
1. Verify .env file exists in root directory
2. Check MONGODB_URI format is correct
3. Test connection string in MongoDB Atlas console
4. Ensure whitelist IP includes your machine
```

**Error**: `MongoDB connection timeout`
```
Solution:
1. Check internet connectivity
2. Verify MongoDB Atlas cluster is active
3. Confirm VPN/firewall settings
4. Test with simpler connection string first
```

### Authentication Issues
**Error**: `Invalid email or password`
```
Solution:
1. Verify user account exists
2. Check email case-sensitivity
3. Reset password if forgotten
4. Confirm account is active (not disabled)
```

**Error**: `JWT token expired`
```
Solution:
1. User must login again
2. Token automatically refreshed on login
3. Clear browser cookies if stuck
4. Check server time sync
```

### Equipment/Request Issues
**Error**: `Equipment not found`
```
Solution:
1. Verify equipment exists in database
2. Check serial number uniqueness
3. Ensure correct equipment ID is used
4. Refresh equipment list from UI
```

---

## 📦 Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.1.1 | React framework |
| react | 19.2.3 | UI library |
| react-dom | 19.2.3 | React DOM rendering |
| tailwindcss | 4 | Styling utility framework |
| mongoose | 9.0.2 | MongoDB ODM |
| jsonwebtoken | 9.0.3 | JWT authentication |
| bcryptjs | 3.0.3 | Password hashing |
| lucide-react | 0.562.0 | Icon library |
| recharts | 3.6.0 | Chart components |
| openai | 6.15.0 | AI integration |
| eslint | 9 | Code quality |

---

## 🤝 Contributing Guidelines

1. **Create Feature Branch**
```bash
git checkout -b feature/YourFeatureName
```

2. **Make Changes**
- Follow ESLint configuration
- Use functional components with hooks
- Add comments for complex logic
- Maintain existing code style

3. **Commit Changes**
```bash
git commit -m 'Add YourFeatureName with description'
```

4. **Push & Create PR**
```bash
git push origin feature/YourFeatureName
# Create Pull Request on GitHub
```

---

## 📝 Future Roadmap

### Q1 2025
- [ ] Real-time push notifications
- [ ] Equipment QR code scanning
- [ ] Mobile app (React Native)

### Q2 2025
- [ ] AI-powered predictive maintenance
- [ ] PDF/Excel report export
- [ ] Email notification system

### Q3 2025
- [ ] Spare parts inventory module
- [ ] Third-party integrations (ERP)
- [ ] Advanced analytics dashboard

### Q4 2025
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Performance optimization updates

---

## 📞 Support & Documentation

### Official Resources
- [Next.js Documentation](https://nextjs.org/docs) - Framework docs
- [MongoDB Mongoose](https://mongoosejs.com/docs) - Database ODM
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling docs
- [JWT.io](https://jwt.io) - JWT token information

### Community Support
- GitHub Issues - Bug reports and feature requests
- Stack Overflow - General development questions
- Discord - Real-time community discussion

---

## 📄 License & Legal

This project is proprietary software. All rights reserved.

**Ownership**: [Your Company/Organization]
**Copyright**: [Year] - All Rights Reserved

---

## 📋 Changelog

### Version 0.1.0 (Current)
- Initial project setup
- Core equipment management features
- Authentication system
- Team management
- Maintenance request workflow
- Kanban board
- Analytics dashboard

---

**Project**: GearGuard - Unified Maintenance Management System
**Version**: 0.1.0
**Status**: Active Development
**Last Updated**: December 27, 2025
**Maintained By**: Development Team
