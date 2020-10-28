<script>
  let pageName="Logs Detail Page";
  let myColumnDefinitions = [];
  $: myColumnDefinitions = [
    {
      display: 'Selected',  // What will be displayed as the column header
      dataName: 'selected',  // The key of a row to get the column's data from
      width: 100,             // Width, in pixels, of column
      disallowResize: true,    // Optional - disables resizing this column
      cellComponent: LogsCell
    },
    {
      display: 'Name',  // What will be displayed as the column header
      dataName: 'name',  // The key of a row to get the column's data from
      width: 100,             // Width, in pixels, of column
      disallowResize: true,    // Optional - disables resizing this column
      cellComponent: LogsCell
    },
    {
      display: 'Hash',  // What will be displayed as the column header
      dataName: 'hash',  // The key of a row to get the column's data from
      width: 100,             // Width, in pixels, of column
      disallowResize: true,    // Optional - disables resizing this column
      cellComponent: LogsCell
    },
    {
      display: 'Date',  // What will be displayed as the column header
      dataName: 'date',  // The key of a row to get the column's data from
      width: 100,             // Width, in pixels, of column
      disallowResize: true,    // Optional - disables resizing this column
      cellComponent: LogsCell
    }
  ];
</script>
<!-- { id: 'selected', label: 'Selected', minWidth: 170, align: 'center' },
{ id: 'name', label: 'Name', minWidth: 170, align: 'center', format: (value: string) => value.split('/').slice(-1)[0] },
{ id: 'hash', label: 'Hash', minWidth: 170, align: 'center' },
{ id: 'date', label: 'Date', minWidth: 170, align: 'center', format: (value: any) => new Date(value).toISOString() } -->

<main>
  <div class="flex-box-column">
    <h1 class="text-align-center"> {pageName}!</h1>
    <p class="text-align-center">Welcome this is my <b>{pageName}</b></p>
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