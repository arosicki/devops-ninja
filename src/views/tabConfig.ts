import { ROUTES } from '../router/router';
import type { TabItem } from '../types/tabs.type';
import AgroView from './AgroView.svelte';
import HomeView from './HomeView.svelte';

export const tabConfig: TabItem[] = [
  {
    label: 'Kredyt Inwestycyjny',
    href: ROUTES.HOME,
    content: HomeView,
  },
  {
    label: 'Pożyczka AGRO',
    href: ROUTES.AGRO,
    content: AgroView,
  },
];
