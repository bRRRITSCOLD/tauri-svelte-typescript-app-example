<script>
  // node_modules
  import { navigate } from "svelte-routing";
  import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
  import { watchResize } from "svelte-watch-resize";

  // libraries

  // models

  // components
  import LogDirectoriesRowCell from '../components/LogDirectories/LogDirectoriesRowCell.svelte';
  import LogDirectoriesHeaderCell from '../components/LogDirectories/LogsDirectoriesHeaderCell.svelte';
	import VirtualTable from '../components/UI/Table/VirtualTable.svelte';

  // stores
  import { logsStore } from '../store/logs'

  let virtualTableWidth = 0;
  let virtualTableHeight = 0;

  function handleDataGridResize(node) {
    virtualTableWidth = node.clientWidth;
    virtualTableHeight = node.clientHeight;
  }

  // file constants
  let pageName="Home Page";
  let myColumnDefinitions = [];
  $: myColumnDefinitions = [
    {
      display: 'Directory',  // What will be displayed as the column header
      dataName: 'directory',  // The key of a row to get the column's data from
      width: virtualTableWidth,
      cellComponent: LogDirectoriesRowCell,
      headerComponent: LogDirectoriesHeaderCell,
      onCellClick(event) {
        console.log('lol')
        console.log(event)
      }
    }];

  // handlers
  async function onClick () {
    await logsStore.addLogDirectory();
    // navigate("/about", { replace: true });
  }
</script>

<main>
  <div class="flex-box-column">
    <div class="text-align-right">
      <Button on:click={onClick} variant="unelevated" class="button-shaped-round"><Label>Add Directory</Label></Button>
    </div>
    <div
      class='container'
      style="height: calc(100vh - 15em); min-height: 200px;"
      use:watchResize={handleDataGridResize}
    >
      <!-- <VirtualTable
        rows={Array.from({ length: 10000 }).map((__, index) => ({
          directory: `HELLO WORLD! ${index}`
        }))} 
        columns={myColumnDefinitions}
        on:cellClick={() => {
          console.log('cellClick');
        }}
        on:cellDoubleClick={() => {
          console.log('cellDoubleClick');
        }}
        on:cellTouchStart={() => {
          console.log('cellTouchStart');
        }}
      /> -->
      <VirtualTable
        rows={$logsStore.logAuditFiles} 
        columns={myColumnDefinitions}
        on:cellClick={() => {
          navigate("/success", { replace: true });
          console.log('cellClick');
        }}
        on:cellDoubleClick={() => {
          console.log('cellDoubleClick');
        }}
      />
    </div>
  </div>
</main>


<style></style>
