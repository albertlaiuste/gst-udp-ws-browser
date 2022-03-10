const udp = require('dgram');
const ws = require('ws');
const gstreamer = require('gstreamer-superficial');

const pipeline = new gstreamer.Pipeline(`v4l2src device=/dev/video0
! autovideoconvert ! queue
! x264enc tune=zerolatency ! queue
! video/x-h264,width=640,height=360,framerate=30/1,profile=baseline,stream-format=byte-stream ! queue
! udpsink host=127.0.0.1 port=5000`
);

const udpServer = udp.createSocket('udp4');
udpServer.bind({
  address: '127.0.0.1',
  port: 5000
});

const websocketServer = new ws.Server({
  host: '127.0.0.1',
  port: 1234
});

websocketServer.on('connection', (socket) => {
  console.log("connected\nstarting pipeline");
  try {
    pipeline.play();
    console.log('pipeline.play succeeded');
  } catch (error) {
    console.log(`pipeline.play failed: ${error}`);
  }
  udpServer.on('message', (stream) => {
   socket.send(stream);
  });

  socket.on('message', (message) => {
    console.log(`received: ${message}`)
    if (message === 'play') {
      pipeline.play();
    }
    if (message === 'pause') {
      pipeline.pause();
    }
  });

  socket.on('error', (error) => {
    console.log(`${error}, stopping pipeline`);
    pipeline.stop();
  });

  socket.on('close', () => {
    console.log("disconnected, stopping pipeline");
    pipeline.stop();
  });
});
