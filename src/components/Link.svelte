<script lang="ts">
  import { ROUTES, useRouter } from '../router/router';

  let className: string = undefined;
  let href: ROUTES;

  export { href, className as class };

  const router = useRouter();
</script>

<a on:click|preventDefault={() => router.push(href)} {href} class={className}
  ><slot /></a
>

<style lang="scss">
  a {
    text-decoration: none;
    color: var(--color-1000);
    font-size: var(--font-14);
    font-weight: 500;
    &:focus {
      outline: none;
      box-shadow: var(--focus);
      transition: box-shadow 0.2s ease-in-out;
    }
  }
</style>
