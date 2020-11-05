// node_modules
import { writable } from "svelte/store";
import { navigate } from "svelte-routing";
import { get as _get, assign } from 'lodash';

// libraries
import { _ } from '../../lib/utils';

// models

// services

// store specific
import { initialRouterStoreState } from "./state";

function createRouterStore() {
  // create writable
  const { subscribe, update } = writable(initialRouterStoreState);

  return {
    update,
    subscribe,
    setCurrentRoute(location: string) {
      update(state => {
        const newState = assign({}, state, { currentRoute: location });
        return newState;
      })
    },
    setPreviousRoute(location: string) {
      update(state => {
        const newState = assign({}, state, { previousRoute: location });
        return newState;
      })
    },
    navigate(route: string) {
      this.setPreviousRoute(window.location.pathname);
      this.setCurrentRoute(`${window.location.pathname}/${route}`);
      navigate(route, { replace: true });
      console.log(window.location.pathname)
    }
  }
}

const routerStore = createRouterStore();

export { routerStore };

// /* computed values */
// export const getTotalHeroes = derived(
//   heroStore,
//   $heroStore => $heroStore.heroes.length
// );