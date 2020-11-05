<script>
  // node_modules
  import { Router, Route, Link } from "svelte-routing";

  // pages
  import Home from "./pages/Logs.svelte";
  import LogSearch from "./pages/LogSearch.svelte";
  import LogDetail from "./pages/LogDetail.svelte";

  // components
  import NavigationBar from "./components/UI/Navigation/NavBar.svelte";

  // props
  export let url = ""; //This property is necessary declare to avoid ignore the Router
</script>

<Router url="{url}">
  <NavigationBar />
   <div>
     <Route path="/:logId/search" component="{LogSearch}" /> 
     <Route path="/:logId/details" component="{LogDetail}" /> 
     <Route path="/"><Home /></Route>
   </div>
</Router>

<style>
  :global(.flex-box-column) {
    display: flex;
    flex-direction: column;
  }

  :global(.flex-box-row) {
    display: flex;
    flex-direction: row;
  }

  :global(.align-items-center) {
    align-items: center;
  }

  :global(.text-align-center) {
    text-align: center;
  }

  :global(.text-align-right) {
    text-align: right;
  }

  :global(.text-align-left) {
    text-align: left;
  }
</style>