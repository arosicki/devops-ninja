import { writable } from 'svelte/store';

export enum ROUTES {
  HOME = '/',
  AGRO = '/agro',
}

export const pathname = writable<string | ROUTES>(window.location.pathname);

export const router = {
  is404: () =>
    !Object.values(ROUTES).includes(window.location.pathname as ROUTES),
  navigateTo: (url: string) => {
    window.history.pushState({}, '', url);
    pathname.set(url);
  },
};
