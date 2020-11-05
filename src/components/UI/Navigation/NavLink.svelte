<script>
  // noce_modules
  import { createEventDispatcher } from "svelte";
  import { Link } from "svelte-routing";
  

  // props
  export let to = "";

  // script consts/vars
  const dispatch = createEventDispatcher();

  // helpers
  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      dispatch('currenLocationChange', location);
      return { class: "active" };
    }
    return {};
  }
</script>

{#if to && to !== ''}
  <Link to="{to}" getProps="{getProps}">
    <slot />
  </Link>
{:else}
  <Link getProps="{getProps}">
    <slot />
  </Link>
{/if}