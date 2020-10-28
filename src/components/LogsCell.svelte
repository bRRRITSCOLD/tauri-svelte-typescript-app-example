<script>
  import Button, { Label } from '@smui/button';
  import { navigate } from "svelte-routing";
  export let row;
  export let rowNumber;
  export let column;
  console.log('inside')
  console.log(`LogsCell::row=`, row);
  console.log(`LogsCell::column=`, column);
</script>

<div style="padding-left: 2px; width: 100%">
  <Button on:click={() => {
    navigate(`/logs/${row.data['id']}`, { replace: true });
  }}><Label>{row.data[column.dataName]}</Label></Button>
</div>