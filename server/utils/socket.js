const jwt = require('jsonwebtoken');
const { redis } = require('./cache');

class SocketManager {
  constructor(io) {
    this.io = io;
    this.rooms = new Map();
    this.userSessions = new Map();
  }

  // Initialize socket manager
  initialize() {
    this.io.use(this.authMiddleware.bind(this));
    this.setupEventHandlers();
  }

  // Authentication middleware
  async authMiddleware(socket, next) {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;

      // Store user session
      this.userSessions.set(socket.id, {
        userId: decoded._id,
        role: decoded.role,
        connectedAt: new Date()
      });

      next();
    } catch (err) {
      next(new Error('Authentication failed'));
    }
  }

  // Setup event handlers
  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Handle room management
      socket.on('join_room', (roomData) => this.handleJoinRoom(socket, roomData));
      socket.on('leave_room', (roomData) => this.handleLeaveRoom(socket, roomData));

      // Handle real-time collaboration
      socket.on('resume_edit', (data) => this.handleResumeEdit(socket, data));
      socket.on('cursor_move', (data) => this.handleCursorMove(socket, data));
      socket.on('selection_change', (data) => this.handleSelectionChange(socket, data));

      // Handle chat and comments
      socket.on('send_message', (data) => this.handleMessage(socket, data));
      socket.on('add_comment', (data) => this.handleComment(socket, data));

      // Handle presence and typing
      socket.on('start_typing', (data) => this.handleTyping(socket, data, true));
      socket.on('stop_typing', (data) => this.handleTyping(socket, data, false));

      // Handle disconnect
      socket.on('disconnect', () => this.handleDisconnect(socket));
    });
  }

  // Room management
  async handleJoinRoom(socket, { roomId, type }) {
    try {
      // Validate room access
      const canJoin = await this.validateRoomAccess(socket.user, roomId, type);
      if (!canJoin) {
        socket.emit('room_error', { message: 'Access denied' });
        return;
      }

      // Join room
      socket.join(roomId);
      this.rooms.set(roomId, {
        ...(this.rooms.get(roomId) || {}),
        [socket.id]: {
          userId: socket.user._id,
          username: socket.user.username
        }
      });

      // Notify room members
      this.io.to(roomId).emit('user_joined', {
        userId: socket.user._id,
        username: socket.user.username
      });

      // Send room state
      const roomState = await this.getRoomState(roomId, type);
      socket.emit('room_state', roomState);
    } catch (err) {
      socket.emit('room_error', { message: 'Error joining room' });
    }
  }

  // Real-time collaboration handlers
  async handleResumeEdit(socket, { resumeId, changes }) {
    const roomId = `resume:${resumeId}`;
    
    try {
      // Validate edit permissions
      const canEdit = await this.validateEditPermission(socket.user, resumeId);
      if (!canEdit) {
        socket.emit('edit_error', { message: 'Edit permission denied' });
        return;
      }

      // Apply and broadcast changes
      const updatedResume = await this.applyResumeChanges(resumeId, changes);
      this.io.to(roomId).emit('resume_updated', {
        changes,
        userId: socket.user._id,
        timestamp: new Date()
      });

      // Cache the latest state
      await redis.setex(`resume:${resumeId}:latest`, 3600, JSON.stringify(updatedResume));
    } catch (err) {
      socket.emit('edit_error', { message: 'Error applying changes' });
    }
  }

  // Cursor and selection tracking
  handleCursorMove(socket, { resumeId, position }) {
    const roomId = `resume:${resumeId}`;
    socket.to(roomId).emit('cursor_moved', {
      userId: socket.user._id,
      username: socket.user.username,
      position
    });
  }

  handleSelectionChange(socket, { resumeId, selection }) {
    const roomId = `resume:${resumeId}`;
    socket.to(roomId).emit('selection_changed', {
      userId: socket.user._id,
      username: socket.user.username,
      selection
    });
  }

  // Chat and comments
  async handleMessage(socket, { roomId, message }) {
    try {
      // Store message
      const storedMessage = await this.storeMessage(roomId, socket.user._id, message);
      
      // Broadcast to room
      this.io.to(roomId).emit('new_message', {
        ...storedMessage,
        username: socket.user.username
      });
    } catch (err) {
      socket.emit('message_error', { message: 'Error sending message' });
    }
  }

  // Presence management
  async handleDisconnect(socket) {
    try {
      const session = this.userSessions.get(socket.id);
      if (session) {
        // Update presence
        await this.updateUserPresence(session.userId, false);
        
        // Clean up session
        this.userSessions.delete(socket.id);
        
        // Notify rooms
        this.notifyUserDisconnect(socket, session);
      }
    } catch (err) {
      console.error('Error handling disconnect:', err);
    }
  }

  // Utility methods
  async validateRoomAccess(user, roomId, type) {
    // Implement access validation logic
    return true;
  }

  async getRoomState(roomId, type) {
    // Implement room state retrieval logic
    return {};
  }

  async validateEditPermission(user, resumeId) {
    // Implement edit permission validation logic
    return true;
  }

  async applyResumeChanges(resumeId, changes) {
    // Implement changes application logic
    return {};
  }

  async storeMessage(roomId, userId, message) {
    // Implement message storage logic
    return {};
  }

  async updateUserPresence(userId, isOnline) {
    // Implement presence update logic
    return true;
  }

  notifyUserDisconnect(socket, session) {
    // Implement disconnect notification logic
  }
}

module.exports = SocketManager;
