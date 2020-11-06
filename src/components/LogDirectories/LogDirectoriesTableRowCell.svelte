<script>
  export let data;
  export let dataName;
</script>

<button
  class="mdc-button"
  style="width: 100%; padding-bottom: 10px; font-size: 10px; height: 100%;"
>
  <div
    class="mdc-button__ripple"
  >
  </div>
  <span
    class="mdc-button__label"
  >
    {data[dataName]}
  </span>
</button>
