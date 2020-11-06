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
      cellComponent: LogDirectoriesRowCell,
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
  <!-- <div class="flex-box-column">
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
        on:cellClick={(event) => {
          // find the log audit file clicked on
          const clickedLogAudigFile = $logsStore.logAuditFiles[event.detail.rowNumber];
          // route to correct details page
          push(`/logs/${clickedLogAudigFile.id}/details`);
        }}
        on:cellDoubleClick={() => {
          console.log('cellDoubleClick');
        }}
      />
    </div>
  </div> -->
  <div>
    {JSON.stringify(selectedLogAuditFileLogFiles, null, 2)}
  </div>
  <div class="mdc-form-field">
    <div class="mdc-checkbox">
      <input type="checkbox"
             class="mdc-checkbox__native-control"
             id="checkbox-1"/>
      <div class="mdc-checkbox__background">
        <svg class="mdc-checkbox__checkmark"
             viewBox="0 0 24 24">
          <path class="mdc-checkbox__checkmark-path"
                fill="none"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"
          ></path>
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
      </div>
      <div class="mdc-checkbox__ripple"></div>
    </div>
    <label for="checkbox-1">Checkbox 1</label>
  </div>
</main>


<style></style>
