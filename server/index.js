
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');

// Mock database (In production, you would use a real database)
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$XFE5kTcQYFO8OC3qj8KoB.kY/CfuoJZxT2DreXzZe0G5KA17Yzrwy', // "password"
    role: 'admin'
  },
  {
    id: '2',
    name: 'HR Manager',
    email: 'hr@example.com',
    password: '$2a$10$XFE5kTcQYFO8OC3qj8KoB.kY/CfuoJZxT2DreXzZe0G5KA17Yzrwy', // "password"
    role: 'hr'
  },
  {
    id: '3',
    name: 'Employee',
    email: 'employee@example.com',
    password: '$2a$10$XFE5kTcQYFO8OC3qj8KoB.kY/CfuoJZxT2DreXzZe0G5KA17Yzrwy', // "password"
    role: 'employee'
  }
];

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = users.find(u => u.email === email);
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  if (!user) {
    return done(new Error('User not found'));
  }
  done(null, user);
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('authenticate', (userId) => {
    // Associate socket with user
    socket.join(userId);
    console.log(`User ${userId} authenticated on socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

// Role-based access control middleware
const hasRole = (roles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (roles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
  };
};

// Auth routes
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      return res.status(200).json({ user: userWithoutPassword });
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return res.status(500).json({ message: 'Logout failed' }); }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

app.get('/api/me', isAuthenticated, (req, res) => {
  const { password, ...userWithoutPassword } = req.user;
  res.json({ user: userWithoutPassword });
});

// API routes for Leave Management
const leaves = [];

app.get('/api/leaves', isAuthenticated, (req, res) => {
  let userLeaves;
  if (req.user.role === 'employee') {
    userLeaves = leaves.filter(leave => leave.userId === req.user.id);
  } else {
    userLeaves = leaves; // HR and Admin can see all leaves
  }
  res.json(userLeaves);
});

app.post('/api/leaves', isAuthenticated, (req, res) => {
  const newLeave = {
    id: Date.now().toString(),
    userId: req.user.id,
    userName: req.user.name,
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  leaves.push(newLeave);
  
  // Notify HR and Admins about new leave request
  io.to('admin').to('hr').emit('new-leave-request', {
    message: `New leave request from ${req.user.name}`,
    leave: newLeave
  });
  
  res.status(201).json(newLeave);
});

app.put('/api/leaves/:id/approve', isAuthenticated, hasRole(['admin', 'hr']), (req, res) => {
  const leaveId = req.params.id;
  const leaveIndex = leaves.findIndex(leave => leave.id === leaveId);
  
  if (leaveIndex === -1) {
    return res.status(404).json({ message: 'Leave request not found' });
  }
  
  leaves[leaveIndex].status = 'approved';
  leaves[leaveIndex].approvedBy = req.user.name;
  leaves[leaveIndex].updatedAt = new Date().toISOString();
  
  // Notify the employee about leave approval
  io.to(leaves[leaveIndex].userId).emit('leave-status-update', {
    message: 'Your leave request has been approved',
    leave: leaves[leaveIndex]
  });
  
  res.json(leaves[leaveIndex]);
});

app.put('/api/leaves/:id/reject', isAuthenticated, hasRole(['admin', 'hr']), (req, res) => {
  const leaveId = req.params.id;
  const leaveIndex = leaves.findIndex(leave => leave.id === leaveId);
  
  if (leaveIndex === -1) {
    return res.status(404).json({ message: 'Leave request not found' });
  }
  
  leaves[leaveIndex].status = 'rejected';
  leaves[leaveIndex].rejectedBy = req.user.name;
  leaves[leaveIndex].rejectionReason = req.body.reason;
  leaves[leaveIndex].updatedAt = new Date().toISOString();
  
  // Notify the employee about leave rejection
  io.to(leaves[leaveIndex].userId).emit('leave-status-update', {
    message: 'Your leave request has been rejected',
    leave: leaves[leaveIndex]
  });
  
  res.json(leaves[leaveIndex]);
});

// Server start
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
