<script>
  import { Router, Route, Link } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import LogsDetail from "./pages/LogsDetail.svelte";
  export let url = ""; //This property is necessary declare to avoid ignore the Router
</script>

<Router url="{url}">
  <nav>
     <Link to="/">Home</Link>
     <Link to="about">About</Link>
   </nav>
   <div>
     <Route path="about" component="{About}" /> 
     <Route path="logs/:id" component="{LogsDetail}" /> 
     <!--for now the router just support case sensitive,
         one workaround colud be add two time the route
         Example.
        <Route path="About" component="{About}" /> 
     -->
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