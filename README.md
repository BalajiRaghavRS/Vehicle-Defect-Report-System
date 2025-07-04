## 📦 Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Authentication**: Passport.js (local strategy with sessions)
- **Database**: PostgreSQL
- **Session Store**: express-session
- **Hashing**: bcryptjs

---

## 🔧 Setup Instructions
✅ Install Frontend Dependencies
bash
Copy
Edit
cd client
npm install
✅ Run frontend:
bash
Copy
Edit
npm run dev
✅ Install Backend Dependencies
bash
Copy
Edit
cd ../server
✅ npm install
✅ Required backend packages:
bash
Copy
Edit
✅ npm install express express-session passport passport-local bcryptjs pg dotenv cors
✅ Run backend:

bash
Copy
Edit
node index.js
Or if you're using nodemon:

bash
Copy
Edit
npm install -g nodemon
nodemon index.js
✅ PostgreSQL Setup
Create 3 tables in your PostgreSQL database using pgAdmin or SQL CLI:

sql
Copy
Edit
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Admins table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Vehicle reports table
CREATE TABLE vehicle_reports (
  id SERIAL PRIMARY KEY,
  vehicle_name TEXT NOT NULL,
  defect TEXT NOT NULL,
  user_email TEXT NOT NULL
);
✅ Create .env File (Inside server Folder)
env
Copy
Edit
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

🚀 App Pages
Path	Description
/user	User login/signup
/admin	Admin login/signup
/user/home	Submit vehicle defect
/admin/home	View/delete all reports

✨ Features
Session-based authentication (protected routes)

Separate user and admin login

Form submission and defect tracking

Admin-only delete access

PostgreSQL integration
