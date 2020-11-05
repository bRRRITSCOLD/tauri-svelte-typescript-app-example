<script lang="ts">
  export let logId: string = '';
  let pageName="Success Page";
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