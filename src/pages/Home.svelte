<script>
  // node_modules
  import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
import { assign } from 'lodash';
  import DataGrid from "svelte-data-grid";
  import { navigate } from "svelte-routing";
  import { watchResize } from "svelte-watch-resize";

  // stores
  import { logsStore } from '../store/logs';

  let dataGridWidth = 0;

  function handleDataGridResize(node) {
    dataGridWidth = node.clientWidth;
  }

  // file constants
  let pageName="Home Page";
  let myColumnDefinitions = [];
  $: myColumnDefinitions = [
    {
      display: 'Directory',  // What will be displayed as the column header
      dataName: 'directory',  // The key of a row to get the column's data from
      width: dataGridWidth,             // Width, in pixels, of column
      disallowResize: true    // Optional - disables resizing this column
    }];

  // handlers
  async function onClick () {
    await logsStore.addLogDirectory();
    // navigate("/about", { replace: true });
  }
</script>

<main>
  <div class="flex-box-column">
    <h1 class="text-align-center"> {pageName}!</h1>
    <p class="text-align-center">Welcome this is my <b>{pageName}</b></p>
    <div class="text-align-center">
      <Button on:click={onClick} variant="unelevated" class="button-shaped-round"><Label>Add Directory</Label></Button>
    </div>
    <div class="grid-wrap" use:watchResize={handleDataGridResize}>
      <DataGrid
        rows={$logsStore.logAuditFiles} 
        columns={myColumnDefinitions}
      />
    </div>
  </div>
</main>

<style>

.grid-wrap {
	width: 70%;
	margin: 0 auto;
	Height: calc(100vh - 300px);
	border: 1px solid black;
}

  h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
  }
</style>