<script>
  import NavLink from "./NavLink.svelte";
  console.log(window.location.pathname)
  let splitLocation;
  $: splitLocation = window.location.pathname.split('/')
  export let to = "";

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: "active" };
    }
    return {};
  }
</script>

<nav>
  <NavLink to="/">Home</NavLink>
  <NavLink to="about">About</NavLink>
</nav>