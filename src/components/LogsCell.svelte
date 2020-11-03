<script>
  export let row;
  export let column;
</script>

<button
  class="mdc-button"
  style="width: 100%; padding-bottom: 10px;"
>
  <div
    class="mdc-button__ripple"
  >
  </div>
  <span
    class="mdc-button__label"
  >
    {row.data[column.dataName]}
  </span>
</button>
