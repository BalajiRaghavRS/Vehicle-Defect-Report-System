import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { q } from './db.js'

import session from 'express-session'
import passport from 'passport'



const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// Utility
const hash = pwd => bcrypt.hashSync(pwd, 10)
const compare = (pwd, hashed) => bcrypt.compareSync(pwd, hashed)
// session middleware
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
// Signup
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, role } = req.body
  const table = role === 'Admin' ? 'admins' : 'users'
  try {
    const { rows } = await q(
      `INSERT INTO ${table} (email, password) VALUES ($1, $2) RETURNING id`,
      [email, hash(password)]
    )
    res.json({ ok: true, userId: rows[0].id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password, role } = req.body
  const table = role === 'Admin' ? 'admins' : 'users'
  try {
    const { rows } = await q(
      `SELECT id, password FROM ${table} WHERE email = $1`,
      [email]
    )
    if (rows.length === 0) throw new Error('User not found')
    const match = compare(password, rows[0].password)
    if (!match) throw new Error('Invalid password')
    res.json({ ok: true, userId: rows[0].id })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
})

// Add vehicle report
app.post('/api/reports', async (req, res) => {
  const { userId, vehicleName, defect } = req.body
  try {
    await q(
      `INSERT INTO vehicle_reports (user_id, vehicle_name, defect) VALUES ($1, $2, $3)`,
      [userId, vehicleName, defect]
    )
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Admin fetch reports
app.get('/api/reports', async (req, res) => {
  try {
    const { rows } = await q(
      `SELECT id, user_id, vehicle_name, defect, created_at FROM vehicle_reports ORDER BY id`
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Admin delete report
app.delete('/api/reports/:id', async (req, res) => {
  const { id } = req.params
  try {
    await q(`DELETE FROM vehicle_reports WHERE id = $1`, [id])
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/auth/logout', (req, res, next) => {
  if (typeof req.logout === 'function') {
    req.logout(function (err) {
      if (err) return next(err)
      res.json({ ok: true })
    })
  } else {
    // fallback if logout is not available
    req.session.destroy(() => {
      res.json({ ok: true })
    })
  }
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})


// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import session from 'express-session'
// import passport from 'passport'
// import { Strategy as LocalStrategy } from 'passport-local'
// import bcrypt from 'bcryptjs'
// import { q } from './db.js'

// dotenv.config()
// const app = express()
// const PORT = 5000

// // CORS must allow credentials
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }))
// app.use(express.json())

// // Sessions
// app.use(session({
//   secret: 'supersecret',
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

// // ---------------- Passport Strategies ----------------
// passport.use('local-user', new LocalStrategy(
//   { usernameField: 'email' },
//   async (email, password, done) => {
//     try {
//       const { rows } = await q('SELECT * FROM users WHERE email = $1', [email])
//       if (!rows.length) return done(null, false, { message: 'No user' })
//       const user = rows[0]
//       const match = bcrypt.compareSync(password, user.password)
//       if (!match) return done(null, false, { message: 'Wrong password' })
//       return done(null, { id: user.id, role: 'User' })
//     } catch (err) {
//       return done(err)
//     }
//   }
// ))

// passport.use('local-admin', new LocalStrategy(
//   { usernameField: 'email' },
//   async (email, password, done) => {
//     try {
//       const { rows } = await q('SELECT * FROM admins WHERE email = $1', [email])
//       if (!rows.length) return done(null, false, { message: 'No admin' })
//       const admin = rows[0]
//       const match = bcrypt.compareSync(password, admin.password)
//       if (!match) return done(null, false, { message: 'Wrong password' })
//       return done(null, { id: admin.id, role: 'Admin' })
//     } catch (err) {
//       return done(err)
//     }
//   }
// ))

// passport.serializeUser((user, done) => {
//   done(null, user)
// })

// passport.deserializeUser((user, done) => {
//   done(null, user)
// })

// // ---------------- Middleware ----------------
// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) return next()
//   res.status(401).json({ error: 'Not authenticated' })
// }

// // ---------------- Routes ----------------

// // User login
// app.post('/api/auth/user/login', passport.authenticate('local-user'), (req, res) => {
//   res.json({ message: 'User logged in', id: req.user.id })
// })

// // Admin login
// app.post('/api/auth/admin/login', passport.authenticate('local-admin'), (req, res) => {
//   res.json({ message: 'Admin logged in', id: req.user.id })
// })

// // Logout
// app.post('/api/auth/logout', (req, res) => {
//   req.logout(() => {
//     res.json({ ok: true })
//   })
// })

// // User Home Protected
// app.get('/api/user/home', checkAuthenticated, (req, res) => {
//   if (req.user.role !== 'User') return res.status(403).json({ error: 'Forbidden' })
//   res.json({ message: 'Welcome, user' })
// })

// // Admin Home Protected
// app.get('/api/admin/home', checkAuthenticated, (req, res) => {
//   if (req.user.role !== 'Admin') return res.status(403).json({ error: 'Forbidden' })
//   res.json({ message: 'Welcome, admin' })
// })

// app.listen(PORT, () => {
//   console.log(`Server running: http://localhost:${PORT}`)
// })
