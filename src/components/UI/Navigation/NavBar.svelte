<script lang="ts">
import { uniq } from "lodash";

import { routerStore } from "../../../store/router";

  // components
  import NavLink from "./NavLink.svelte";

  // event handlers
  function onCurrentLocationChange(event: any) {
    routerStore.setPreviousRoute($routerStore.currentRoute);
    routerStore.setCurrentRoute(event.detail.pathname);
    console.log(`onCurrentLocationChange=`, $routerStore.currentRoute);
  }
</script>

<style>

</style>


<nav class="flex-box-row">
  {#each uniq($routerStore.currentRoute.split('/')) as urlPart, urlParIndex}
    {#if urlPart === ''}
      <div  on:click={() => {
        routerStore.navigate('')  
      }}>
        <NavLink>Logs</NavLink>
      </div>
      {#if uniq($routerStore.currentRoute.split('/')).length > 1}<div style="padding-left: 10px; padding-right: 10px;">/</div>{/if}
    {:else if urlPart === 'details'}
      {#if $routerStore.currentRoute.split('/').slice(-1)[0] === 'details'}
      <div on:click={() => {  
      }}>
        <NavLink>Details</NavLink>
      </div>
      {:else}
        <div on:click={() => {
          console.log('NavBar.onClick=')
          routerStore.navigate('details')  
        }}>
          <NavLink>Details</NavLink>
        </div>
      {/if}
      {#if uniq($routerStore.currentRoute.split('/')).length > 1}<div style="padding-left: 10px; padding-right: 10px;">/</div>{/if}
    {:else if urlPart === 'search'}
      <div  on:click={() => {
        console.log('NavBar.onClick=')
        routerStore.navigate('search')  
      }}>
        <NavLink>Search</NavLink>
      </div>
      {#if uniq($routerStore.currentRoute.split('/')).length > 1}<div style="padding-left: 10px; padding-right: 10px;">/</div>{/if}
    {/if}
  {/each}
</nav>