<script>
  import { Button, Col, Container, FormGroup, Input, Row, Styles } from 'sveltestrap';
  import { socket } from './lib/components/socket';
  import { store, notifications } from './lib/components/store';

  import CameraButton from './lib/components/CameraButton.svelte';
  import Notification from './lib/components/Notification.svelte';
  import Player from './lib/components/Player.svelte';

  const handlePlay = event => {
    notifications.add('Play clicked', 'info');
    socket.send(event.detail.type);
  }

  const handlePause = event => {
    notifications.add('Pause clicked', 'info');
    socket.send(event.detail.type);
  }

  socket.onerror = event => {
    console.log(event);
    notifications.add(`Socket error`, 'warning');
  }

  socket.onclose = event => {
    notifications.add('Socket closed', 'danger');
  }
</script>

<main>
  <Styles/> <!--Add Bootstrap/Sveltestrap-->

  <Container>
    <Row>
    <Col md={{size: 2}}>
      <Row>
      </Row>
    </Col>

    <Col md={{size: 8}}>
      <Row>
        <h1>WS Streaming</h1>
      </Row>
      <Row>
        <Player/>
      </Row>
      <br/>
      <CameraButton text="Play"  type="play" on:clicked={handlePlay}/>
      <CameraButton text="Pause" type="pause" on:clicked={handlePause}/>
      <br/><br/>
      <FormGroup>
        <Input type="textarea" value={`global store state:\n${JSON.stringify($store)}`} readonly style="resize: none;"/>
      </FormGroup>
      <br/><br/>
      <Button class="btn btn-danger" on:click={()=>{notifications.clear()}}>Clear All</Button>
    </Col>

    <Col md={{size: 2}}>
      {#each $notifications as n}
          <svelte:component this={Notification} text={n.text} id={n.id} type={n.type}/>
      {/each}
    </Col>
  </Row>
  </Container>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #00c3ff;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 300;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
