# GStreamer UDP stream to browser using WebSocket

* Creates a GStreamer udp sink pipeline using device webcam (/dev/video0).
* Streams the udp stream to browser over WebSocket.
* Displays the data in browser \<canvas\>
element using built-in [WebCodecs API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) and [Svelte](https://github.com/sveltejs/svelte) for front-end.<br/><br/>

## FAQ
### Why WebSockets?

Mostly to explore the concept. Alternatively, WebTransport looks promising for this use case.

### Everything works, why am I not seeing anything?
WebCodecs support for browsers is quite bad for now and only chromium-based browsers seem to support it.

### Why does it only work on localhost?
WebCodecs requires secure context to run (see [issue #383](https://github.com/w3c/webcodecs/issues/383)) so you need to have TLS enabled for both website and websocket server if you plan to expose it to public internet.
<br/>



## Setup
Install GStreamer:
https://gstreamer.freedesktop.org/documentation/installing/index.html?gi-language=c

For Deb/Ubuntu:
```
sudo apt-get install libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libgstreamer-plugins-bad1.0-dev gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-tools gstreamer1.0-x gstreamer1.0-alsa gstreamer1.0-gl gstreamer1.0-gtk3 gstreamer1.0-qt5 gstreamer1.0-pulseaudio
```
To get list of available devices, run:
```
sudo apt install v4l-utils
v4l2-ctl --list-devices
```

Test GStreamer pipeline
```
#!/bin/bash
gst-launch-1.0 v4l2src device=/dev/video0 \
  ! autovideoconvert  ! queue \
  ! x264enc tune=zerolatency ! queue \
  ! 'video/x-h264,width=640,height=360,framerate=30/1,profile=baseline,stream-format=byte-stream' ! queue \
  ! udpsink host=127.0.0.1 port=5000
```
On GST error replace `autovideoconvert` with `videoconvert`. <br/><br/>
Install Node and npm
```
sudo apt install nodejs npm
```
In Server
```
npm install
npm start
```
In Client
```
npm install
npm run dev
```

# Screenshot
![](/screenshot.png?raw=true)
