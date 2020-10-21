<script>
  // node_modules
  import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
import { logsStore } from '../store/logs';

  // file constants
  let pageName="Home Page";
  
  // handlers
  async function onClick () {
    await logsStore.addLogDirectory();
  }
</script>

<main>
  <div class="flex-box-column">
    <h1 class="text-align-center"> {pageName}!</h1>
    <p class="text-align-center">Welcome this is my <b>{pageName}</b></p>
    <Button on:click={onClick} variant="unelevated" class="button-shaped-round"><Label>Unelevated</Label></Button>
  </div>
</main>

<style>
  h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
  }
</style>