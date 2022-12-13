<script lang="ts">
  import { useRouter, type ROUTES } from '../router/router';
  import type { TabItem } from '../types/tabs.type';
  import Link from './Link.svelte';

  export let tabItems: TabItem[];

  const { pathname } = useRouter();

  $: activeTab = tabItems.find(tab => tab.href === pathname);
</script>

<div class="container">
  <div class="tab-container">
    {#each tabItems as tab}
      <Link
        class={`tab ${tab.href === activeTab.href ? 'active' : ''}`}
        href={tab.href}
        disabled={tab.href === activeTab.href}
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
    width: calc(100% - 3rem);
    height: 100%;
    margin: 0 1.5rem;

    @media screen and (max-width: 968px) {
      width: 100%;
      margin: 0;
    }

    section {
      background-color: var(--tabs-background);
      height: 100%;
      padding-bottom: 2rem;
    }

    .tab-container {
      width: 100%;
      display: flex;

      .inner {
        margin: 1rem 0;
        border-bottom: 3px solid var(--color-400);
        height: calc(100% - 3px);
      }

      :global(.tab:focus .inner) {
        border-bottom: none;
        transition: border 0.2s ease-in-out;
      }

      :global(.tab) {
        width: 100%;
        font-size: var(--font-18);
        background-color: var(--tabs);
        padding: 1rem;
        &:hover {
          background-color: var(--tabs--hover);
        }
      }

      :global(.tab.active) {
        background-color: var(--tabs-background);
        pointer-events: none;
      }
    }
  }
</style>
