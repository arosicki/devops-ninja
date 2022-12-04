<script lang="ts">
  import { type ROUTES, router, pathname } from '../router/router';

  export let tabItems: { label: string; content: string; href: ROUTES }[];

  $: activeTab = tabItems.find(tab => tab.href === $pathname);

  const onTabClick = (e: MouseEvent, pathname: ROUTES) => {
    e.preventDefault();
    router.navigateTo(pathname);
  };
</script>

<div class="main">
  <div class="tab-container">
    {#each tabItems as tab}
      <a
        class={`tab ${tab.href === activeTab.href ? 'active' : ''}`}
        on:click={e => onTabClick(e, tab.href)}
        href={tab.href}>{tab.label}</a
      >
    {/each}
  </div>
  <section>{activeTab.content}</section>
</div>

<style lang="scss">
  .main {
    width: 100%;
    height: 100%;
    background: rgb(8, 36, 157);
    background: linear-gradient(
      0deg,
      rgba(8, 36, 157, 1) 0%,
      rgba(19, 166, 184, 1) 100%
    );
    .tab-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      .tab {
        border-radius: 0.5rem;
        padding: 1rem 0.5rem;
        width: 100%;
        cursor: pointer;
        text-decoration: none;
      }
      :not(.active) {
        background-color: #222;
      }
    }

    section {
      height: 100%;
    }
  }
</style>
