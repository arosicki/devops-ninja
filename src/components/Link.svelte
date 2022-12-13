<script lang="ts">
  import { ROUTES, useRouter } from '../router/router';

  let className: string = undefined;
  let disabled = false;
  let href: ROUTES;

  export { disabled, href, className as class };

  const router = useRouter();
</script>

{#if !disabled}
  <a on:click|preventDefault={() => router.push(href)} {href} class={className}>
    <slot />
  </a>
{:else}
  <div class={className}>
    <slot />
  </div>
{/if}

<style lang="scss">
  a,
  div {
    text-decoration: none;
    color: var(--color-100);
    font-size: var(--font-14);
    font-weight: 500;
    &:focus {
      outline: none;
      box-shadow: var(--focus);
      transition: box-shadow 0.2s ease-in-out;
    }
  }
</style>
