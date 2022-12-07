import { writable } from 'svelte/store';

export enum ROUTES {
  HOME = '/',
  AGRO = '/agro',
}

export interface RouteConfig {
  default: ConstructorOfATypedSvelteComponent;
  [key: string]: ConstructorOfATypedSvelteComponent;
}

// writable to attach subscribers
export const attach = writable(window.location.pathname);

export class Router {
  public pathname: ROUTES | string;
  public component: ConstructorOfATypedSvelteComponent;
  private routeChangeHandler() {
    this.pathname = window.location.pathname;
    attach.set(this.pathname);
    this.updateComponent();
  }
  private static _instance: Router;
  private routeConfig: RouteConfig;

  private popStateHandler: (e: PopStateEvent) => void;

  constructor(routeConfig: RouteConfig) {
    if (Router._instance) {
      Router._instance.destroy();
    }

    this.routeConfig = routeConfig;
    this.routeChangeHandler();

    this.popStateHandler = (e: PopStateEvent) => {
      e.preventDefault();
      this.routeChangeHandler();
    };

    window.addEventListener('popstate', this.popStateHandler);

    Router._instance = this;
  }

  public push(path: ROUTES) {
    if (this.pathname === path) {
      return;
    }
    window.history.pushState({}, '', path);
    this.routeChangeHandler();
  }

  public replace(path: ROUTES) {
    if (this.pathname === path) {
      return;
    }

    window.addEventListener('popstate', () => {});

    window.history.replaceState({}, '', path);
    this.routeChangeHandler();
  }

  public back() {
    window.history.back();
    this.routeChangeHandler();
  }

  private updateComponent(): void {
    this.component =
      this.routeConfig[this.pathname] ?? this.routeConfig.default;
  }

  public destroy() {
    window.removeEventListener('popstate', this.popStateHandler);
  }

  public static getInstance() {
    return Router._instance;
  }
}

export const useRouter = () => {
  const router = Router.getInstance();

  if (!router) {
    throw new Error('Router is not initialized');
  }

  return router;
};
