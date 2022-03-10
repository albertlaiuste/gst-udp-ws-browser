<script>
  import { notifications } from './store';
  import { Button, Card, CardBody, CardText } from 'sveltestrap';

  export let text;
  export let id;
  export let type;

  const removeNotification = () => {
    notifications.removeAt(id);
  }
</script>

<style>
  .card {
    width: 200px;
    margin: 5px;
    float: right;
  }
</style>

<div class="card">
<Card body color={type}>
  <Button type="button" class="btn-close btn-close-black" aria-label="Close" on:click={removeNotification} style="margin-left: 80%;"/>
  <CardBody>
    <CardText>
      {text}
    </CardText>
  </CardBody>
</Card>
</div>
