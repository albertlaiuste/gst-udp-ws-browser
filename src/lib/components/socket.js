const createWebSocket = () => {
  const url = "ws://127.0.0.1:1234";
  const ws = new WebSocket(url);
  ws.binaryType = 'arraybuffer';

  return ws;
}

export const socket = createWebSocket();
