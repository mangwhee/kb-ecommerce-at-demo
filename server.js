const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const session = require('express-session');
const crypto = require('crypto');
const expressLayouts = require('express-ejs-layouts');

// ----------------------------------------
// 1. MongoDB Connection
// ----------------------------------------
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// ----------------------------------------
// 2. Middlewares
// ----------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

// New: Session Middleware (required for login state)
app.use(
  session({
    secret: "demo-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// ----------------------------------------
//  3. IMPORTANT FIX: Inject into ALL views BEFORE any route renders
// ----------------------------------------
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  res.locals.crmid = req.session.crmid || null;
  res.locals.justLoggedOut = false;  // default unless logout route sets it
  next();
});

// ----------------------------------------
// 3. LOGIN ROUTES
// ----------------------------------------

// Show login page
app.get("/login", (req, res) => {
  res.render("login", {
    username: req.session.username || null,
    crmid: req.session.crmid || null // ✅ updated to crmid
  });
});

// Process login form
app.post("/login", (req, res) => {
  const { username } = req.body;

  // Generate unique CRM ID (hash)
  const crmid = "crm_" + crypto
    .createHash("sha256")
    .update(username)
    .digest("hex")
    .substring(0, 12);

  // Store in session
  req.session.username = username;
req.session.crmid = crmid; // ✅ updated to crmid

  console.log("User logged in:", username, "CRM ID:", crmid);

  res.redirect("/");
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});


// ----------------------------------------
// 4. PRODUCT ROUTES
// ----------------------------------------
const productRoutes = require('./routes/productRoutes');

// New: Inject username + CRM ID into ALL routes
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  res.locals.crmid = req.session.crmid || null;
  next();
});

app.use('/', productRoutes);


// ----------------------------------------
// 5. START SERVER
// ----------------------------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
