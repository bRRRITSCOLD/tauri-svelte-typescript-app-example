<script lang="ts">
  // node_modules
  import { push } from 'svelte-spa-router'
  import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
  import { watchResize } from "svelte-watch-resize";

  // libraries

  // models

  // components
  import LogDirectoriesRowCell from '../components/LogDirectories/LogDirectoriesTableRowCell.svelte';
  import LogDirectoriesHeaderCell from '../components/LogDirectories/LogsDirectoriesTableHeaderCell.svelte';
	import VirtualTable from '../components/UI/Table/VirtualTable.svelte';

  // stores
  import { logsStore } from '../store/logs'

  // file constants
  let virtualTableWidth = 0;

  let virtualTableColumns = [];
  $: virtualTableColumns = [
    {
      display: 'Directory',  // What will be displayed as the column header
      dataName: 'directory',  // The key of a row to get the column's data from
      width: virtualTableWidth,
      cellComponent: LogDirectoriesRowCell,
      headerComponent: LogDirectoriesHeaderCell,
      onCellClick(event) {
        // find the log audit file clicked on
        const clickedLogAudigFile = $logsStore.logAuditFiles[event.rowIndex];
        // route to correct details page
        push(`/logs/${clickedLogAudigFile.id}/details`);
      },
      onCellDoubleClick(event) {
        console.log(event.rowIndex);
      }
    }
  ];
  console.log($logsStore);
  // props
  export let params: any = {};
</script>

<main>
  <div class="flex-box-column">
    <div class="text-align-right">
      <Button on:click={async () => {
        await logsStore.addLogDirectory();
      }} variant="unelevated" class="button-shaped-round"><Label>Add Directory</Label></Button>
    </div>
    <div
      class='container'
      style="height: calc(100vh - 15em); min-height: 200px;"
      use:watchResize={(node) => {
        virtualTableWidth = node.clientWidth;
      }}
    >
      <VirtualTable
        rows={$logsStore.logAuditFiles} 
        columns={virtualTableColumns}
      />
    </div>
  </div>
</main>


<style></style>
