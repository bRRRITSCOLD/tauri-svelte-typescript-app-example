<script>
import { onMount } from 'svelte';

  // node_modules
  import Router, { location, push } from 'svelte-spa-router';

  // components
  import NavigationBar from "./components/UI/Navigation/NavBar.svelte";

  // routes
  import routes from './routes';

  // props

  onMount(() => {
    if ($location === '/') {
      push('/logs');
    }
  })
</script>

<NavigationBar />
<Router {routes}/>

<style>
  :global(*) {
  margin: 0;
  padding: 0;
  font-size: 1em;
  font-family: inherit;
}

:global(html) {
  font-size: 62.5%;
}
  :global(.flex-box-column) {
    display: flex;
    flex-direction: column;
  }

  :global(.flex-box-row) {
    display: flex;
    flex-direction: row;
  }

  :global(.align-items-center) {
    align-items: center;
  }

  :global(.text-align-center) {
    text-align: center;
  }

  :global(.text-align-right) {
    text-align: right;
  }

  :global(.text-align-left) {
    text-align: left;
  }
</style>