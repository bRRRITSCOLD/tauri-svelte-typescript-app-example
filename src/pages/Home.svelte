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

<!-- <div class="mdc-data-table">
  <div class="mdc-data-table__table-container">
    <table class="mdc-data-table__table" aria-label="Dessert calories">
      <thead>
        <tr class="mdc-data-table__header-row">
          <th class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" role="columnheader" scope="col">
            <div class="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected">
              <input type="checkbox" class="mdc-checkbox__native-control" aria-label="Toggle all rows"/>
              <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                  <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
              </div>
              <div class="mdc-checkbox__ripple"></div>
            </div>
          </th>
          <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Signal name</th>
          <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Status</th>
          <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Severity</th>
          <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Stage</th>
          <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Time</th>
          <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Roles</th>
        </tr>
      </thead>
      <tbody class="mdc-data-table__content">
        <tr data-row-id="u0" class="mdc-data-table__row">
          <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
            <div class="mdc-checkbox mdc-data-table__row-checkbox">
              <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u0"/>
              <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                  <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
              </div>
              <div class="mdc-checkbox__ripple"></div>
            </div>
          </td>
          <th class="mdc-data-table__cell" scope="row" id="u0">Arcus watch slowdown</th>
          <td class="mdc-data-table__cell">Online</td>
          <td class="mdc-data-table__cell">Medium</td>
          <td class="mdc-data-table__cell">Triaged</td>
          <td class="mdc-data-table__cell mdc-data-table__cell--numeric">0:33</td>
          <td class="mdc-data-table__cell">Allison Brie</td>
        </tr>
        <tr data-row-id="u1" class="mdc-data-table__row mdc-data-table__row--selected" aria-selected="true">
          <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
            <div class="mdc-checkbox mdc-data-table__row-checkbox mdc-checkbox--selected">
              <input type="checkbox" class="mdc-checkbox__native-control" checked aria-labelledby="u1"/>
              <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                  <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
              </div>
              <div class="mdc-checkbox__ripple"></div>
            </div>
          </td>
          <th class="mdc-data-table__cell" scope="row" id="u1">monarch: prod shared ares-managed-features-provider-heavy</th>
          <td class="mdc-data-table__cell">Offline</td>
          <td class="mdc-data-table__cell">Huge</td>
          <td class="mdc-data-table__cell">Triaged</td>
          <td class="mdc-data-table__cell mdc-data-table__cell--numeric">0:33</td>
          <td class="mdc-data-table__cell">Brie Larson</td>
        </tr>
        <tr data-row-id="u2" class="mdc-data-table__row mdc-data-table__row--selected" aria-selected="true">
          <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
            <div class="mdc-checkbox mdc-data-table__row-checkbox mdc-checkbox--selected">
              <input type="checkbox" class="mdc-checkbox__native-control" checked aria-labelledby="u2"/>
              <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                  <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
              </div>
              <div class="mdc-checkbox__ripple"></div>
            </div>
          </td>
          <th class="mdc-data-table__cell" scope="row" id="u2">monarch: prod shared ares-managed-features-provider-heavy</th>
          <td class="mdc-data-table__cell">Online</td>
          <td class="mdc-data-table__cell">Minor</td>
          <td class="mdc-data-table__cell">Not triaged</td>
          <td class="mdc-data-table__cell mdc-data-table__cell--numeric">0:33</td>
          <td class="mdc-data-table__cell">Jeremy Lake</td>
        </tr>
        <tr data-row-id="u3" class="mdc-data-table__row">
          <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
            <div class="mdc-checkbox mdc-data-table__row-checkbox">
              <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u3"/>
              <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                  <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
              </div>
              <div class="mdc-checkbox__ripple"></div>
            </div>
          </td>
          <th class="mdc-data-table__cell" scope="row" id="u3">Arcus watch slowdown</th>
          <td class="mdc-data-table__cell">Online</td>
          <td class="mdc-data-table__cell">Negligible</td>
          <td class="mdc-data-table__cell">Triaged</td>
          <td class="mdc-data-table__cell mdc-data-table__cell--numeric">0:33</td>
          <td class="mdc-data-table__cell">Angelina Cheng</td>
        </tr>
      </tbody>
    </table>
  </div>
</div> -->