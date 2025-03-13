let io;

const initializeSocket = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:5173', // React URL
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('🔥 New Client Connected');

    socket.on('disconnect', () => {
      console.log('❌ User Disconnected');
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { initializeSocket, getIO };
