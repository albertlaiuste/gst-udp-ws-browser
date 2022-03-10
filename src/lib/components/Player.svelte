<script>
  import { socket } from './socket';
  import { notifications } from './store';
  import { onMount } from 'svelte';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');

    const decoder = new VideoDecoder({
      output: frame => {
        ctx.drawImage(frame, 0, 0, 640, 360);
        frame.close();
      },
      error: e => console.log(`error: ${e}`),
    });

    decoder.configure({
      codec: "avc1.42E01E",
      codedWidth: 640,
      codedHeight: 360,
    });

    socket.onopen = event => {
      notifications.add('Socket connected', 'success');
      socket.onmessage = message => {
        decoder.decode(new EncodedVideoChunk({
          type: 'key',
          data: new Uint8Array(message.data),
          timestamp: 0,
          duration: 333333
        }));
      }
    }
  });
</script>

<style>
  #canvas-container {
    margin-left: auto;
    margin-right: auto;
  }
</style>

<div id="canvas-container">
  <canvas width={640} height={320} bind:this={canvas}></canvas>
</div>
