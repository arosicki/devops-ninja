<script lang="ts">
  import { useRouter, type ROUTES } from '../router/router';
  import type { TabItem } from '../types/tabs.type';
  import Link from './Link.svelte';

  export let tabItems: TabItem[];

  const { push, pathname } = useRouter();

  $: activeTab = tabItems.find(tab => tab.href === pathname);

  const onTabClick = (pathname: ROUTES) => {
    push(pathname);
  };
</script>

<div class="container">
  <div class="tab-container">
    {#each tabItems as tab}
      <Link
        class={`tab ${tab.href === activeTab.href ? 'active' : ''}`}
        href={tab.href}
        ><div class="inner">{tab.label}</div>
      </Link>
    {/each}
  </div>
  <section>
    <svelte:component this={activeTab.content} />
  </section>
</div>

<style lang="scss">
  .container {
    background-color: var(--color-300);
    width: 100%;
    height: 100%;

    section {
      background-color: var(--color-500);
      height: 100%;
    }

    .tab-container {
      width: 100%;
      display: flex;

      .inner {
        margin: 1rem 0;
        border-bottom: 3px solid var(--color-400);
        height: calc(100% - 3px);
      }

      :global(.tab) {
        width: 100%;
        font-size: var(--font-18);
        padding: 1rem;
        &:hover {
          background-color: var(--color-400);
        }
      }

      :global(.tab.active) {
        background-color: var(--color-500);
        &:hover {
          background-color: var(--color-600);
        }
      }
    }
  }
</style>
