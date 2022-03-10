<script>
  import { Button } from 'sveltestrap';
  import { store } from './store';
  import { createEventDispatcher } from 'svelte';

  export let text;
  export let type;

  const dispatch = createEventDispatcher();
  let color = 'secondary';

  store.subscribe(state => color = state.camera === type ? 'primary' : 'secondary');

  const handleClick = ()=> {
    store.setCamera(type);
    dispatch('clicked', {
      type: type
    });
  }
</script>

<Button {color} on:click={handleClick}>{text}</Button>
