export interface RouterStoreStateInterface {
  currentRoute: string;
  previousRoute: string;
}

export const initialRouterStoreState: RouterStoreStateInterface = {
  currentRoute: window && window.location && window.location.pathname ? window.location.pathname : '/',
  previousRoute: window && window.location && window.location.pathname ? window.location.pathname : '/'
};
