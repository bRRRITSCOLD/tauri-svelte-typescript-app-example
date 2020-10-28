<script>
  // node_modules
  import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
  import { assign } from 'lodash';
  import DataGrid from "svelte-data-grid";
  // import { watchResize } from "svelte-watch-resize";
  import LogsCell from '../components/LogsCell.svelte';

	import VirtualList from '../components/VirtualList.svelte';
	import items from './data.js';
	// import ListItem from './ListItem.svelte';

  // stores
  import { logsStore } from '../store/logs'

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
      disallowResize: true,    // Optional - disables resizing this column
      cellComponent: LogsCell
    }];

  // handlers
  async function onClick () {
    await logsStore.addLogDirectory();
    // navigate("/about", { replace: true });
  }


	let searchTerm = "";
	
	$: filteredList = items.filter(item => item.name.indexOf(searchTerm) !== -1);
	
  let start;
  let end;
</script>

<main>
  <div class="flex-box-column">
    <h1 class="text-align-center"> {pageName}!</h1>
    <p class="text-align-center">Welcome this is my <b>{pageName}</b></p>
    <div class="text-align-center">
      <Button on:click={onClick} variant="unelevated" class="button-shaped-round"><Label>Add Directory</Label></Button>
    </div>
    <!-- <div class="grid-wrap" use:watchResize={handleDataGridResize}>
      <DataGrid
        rows={$logsStore.logAuditFiles} 
        columns={myColumnDefinitions}
        rowHeight={50}
      />
    </div> -->
    Filter: <input bind:value={searchTerm} />
    {searchTerm}
    
    <div class='container'>
      <VirtualList items={filteredList} bind:start bind:end let:item>
        <div>item</div>
      </VirtualList>
      <p>showing items {start}-{end}</p>
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

.container {
		border-top: 1px solid #333;
		border-bottom: 1px solid #333;
		min-height: 200px;
		height: calc(100vh - 15em);
	}
  h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
  }
</style>