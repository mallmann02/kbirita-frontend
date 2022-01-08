const { io } = require('socket.io-client');

export default function socketInstance() {
  const socketServerUrl = process.env.REACT_APP_API_BASE_URL;
  return io(socketServerUrl);
}
