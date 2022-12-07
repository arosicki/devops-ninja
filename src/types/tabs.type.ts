import type { ROUTES } from '../router/router';

export interface TabItem {
  label: string;
  content: ConstructorOfATypedSvelteComponent;
  href: ROUTES;
}
