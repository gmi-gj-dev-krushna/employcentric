
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
const session = require('express-session');
const config = require('./config/config');
const connectDB = require('./config/database');
const configurePassport = require('./config/passport');
const { httpLogger, info } = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/authRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: config.corsOrigin,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(express.json());
app.use(httpLogger);

// Session configuration
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: config.nodeEnv === 'production', maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
configurePassport();

// Make io available to routes
app.set('io', io);

// Socket.io connection handler
io.on('connection', (socket) => {
  info(`New client connected: ${socket.id}`);

  socket.on('authenticate', (userId) => {
    // Associate socket with user
    socket.join(userId);
    info(`User ${userId} authenticated on socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    info(`Client disconnected: ${socket.id}`);
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Server start
const PORT = config.port;
server.listen(PORT, () => {
  info(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
});

module.exports = { app, server };
