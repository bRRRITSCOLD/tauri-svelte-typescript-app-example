<script lang="ts">
  // node_modules
  import { push } from 'svelte-spa-router'
  import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
  import { watchResize } from "svelte-watch-resize";
  import { find, get } from 'lodash';

  // libraries

  // models

  // components
  import LogDirectoriesRowCell from '../components/LogDirectories/LogDirectoriesTableRowCell.svelte';
  import LogDirectoriesHeaderCell from '../components/LogDirectories/LogsDirectoriesTableHeaderCell.svelte';
	import VirtualTable from '../components/UI/Table/VirtualTable.svelte';

  // stores
  import { logsStore } from '../store/logs'
  import Checkbox from '../components/UI/Input/Checkbox.svelte';

  // props
  export let params: any = {};

  // file constants
  let virtualTableWidth = 0;

  let virtualTableColumns = [];
  $: virtualTableColumns = [
    {
      display: 'Selected',  // What will be displayed as the column header
      dataName: 'selected',  // The key of a row to get the column's data from
      width: virtualTableWidth * .20,
      cellComponent: Checkbox,
      headerComponent: LogDirectoriesHeaderCell,
      onCellClick(event) {
        console.log(event)
      }
    },
    {
      display: 'Date',  // What will be displayed as the column header
      dataName: 'date',  // The key of a row to get the column's data from
      width: virtualTableWidth * .30,
      cellComponent: LogDirectoriesRowCell,
      headerComponent: LogDirectoriesHeaderCell,
      onCellClick(event) {
        console.log(event)
      }
    },
    {
      display: 'Name',  // What will be displayed as the column header
      dataName: 'name',  // The key of a row to get the column's data from
      width: virtualTableWidth * .50,
      cellComponent: LogDirectoriesRowCell,
      headerComponent: LogDirectoriesHeaderCell,
      onCellClick(event) {
        console.log(event)
      }
    }
  ];

  let selectedLogAuditFileLogFiles;
  $: selectedLogAuditFileLogFiles = get(find($logsStore.logAuditFiles, { id: params.logAuditFileId }), 'files', []);
</script>

<main>
  <div class="flex-box-column">
    <div
      class='container'
      style="height: calc(100vh - 15em); min-height: 200px;"
      use:watchResize={(node) => {
        virtualTableWidth = node.clientWidth;
      }}
    >
      <VirtualTable
        rows={selectedLogAuditFileLogFiles} 
        columns={virtualTableColumns}
        rowHeight={55}
      />
    </div>
  </div>
</main>


<style></style>
