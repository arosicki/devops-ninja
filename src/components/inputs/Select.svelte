<script lang="ts">
  import ChevronDown from '../../assets/ChevronDown.svelte';

  interface SelectItem {
    value: string;
    label: string;
  }

  export let items: SelectItem[] = [];
  export let label: string;
  export let name: string;
  export let error = false;

  let select: HTMLSelectElement;
  let selectDiv: HTMLDivElement;

  $: expanded = false;

  $: value = select
    ? items.find(item => item.value === select.value).label
    : items[0].label;

  const toggle = () => {
    expanded = !expanded;
  };

  const expand = () => {
    expanded = true;
  };

  const shrink = () => {
    expanded = false;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      shrink();
    }

    if (e.key === 'Enter') {
      toggle();
    }
  };

  const onKeyDownItem = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      shrink();
    }

    if (e.key === 'Enter') {
      const item = e.target as HTMLDivElement;
      const value = item.getAttribute('value');
      setValue(value);
    }
  };

  const onClickItem = (e: MouseEvent) => {
    const item = e.target as HTMLDivElement;
    const value = item.getAttribute('value');
    setValue(value);
  };

  const onBlur = () => {
    // Trick event loop to wait for focus to be set to next element
    setTimeout(() => {
      if (
        !selectDiv.contains(document.activeElement) &&
        selectDiv !== document.activeElement
      ) {
        shrink();
      }
    });
  };

  const setValue = (value: string) => {
    select.value = value;
    shrink();
  };

  let recentlyToggled = false;

  const onClick = () => {
    if (!recentlyToggled) {
      toggle();
    }
  };

  const onFocus = () => {
    recentlyToggled = true;
    toggle();
    // Hack to prevent toggle from being called twice
    setTimeout(() => {
      recentlyToggled = false;
    }, 150);
  };
</script>

<fieldset>
  <label for={name}>{label}</label>
  <select tabindex="-1" bind:this={select} {name}>
    {#each items as item}
      <option value={item.value}>{item.label}</option>
    {/each}
  </select>
  <div bind:this={selectDiv} class="select">
    <div
      on:blur={onBlur}
      tabindex="0"
      on:keydown={onKeyDown}
      on:focus={onFocus}
      on:click|self={onClick}
      class={error ? 'value error' : 'value'}
      role="listbox"
    >
      <span>{value}</span>
      <span class={`chevron-container ${expanded ? 'rotate' : ''}`}>
        <ChevronDown />
      </span>
    </div>
    {#if expanded}
      <div class="items">
        {#each items as item}
          <div
            on:blur={onBlur}
            on:click={onClickItem}
            on:keydown={onKeyDownItem}
            tabindex="0"
            class={`item ${item.value === select.value ? 'selected' : ''}`}
            value={item.value}
            role="option"
            aria-selected={item.value === select.value}
          >
            {item.label}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</fieldset>

<style lang="scss">
  fieldset {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 1rem;
    line-height: 1.5;
    min-height: 4.5rem;

    > label {
      font-size: 0.875rem;
      font-weight: 400;
      margin-left: 0.25rem;
      margin-bottom: 0.25rem;
    }
    select {
      opacity: 0;
      position: absolute;
      z-index: -1;
    }
    .select {
      position: relative;
      width: 100%;
      height: 2.5rem;
      .value {
        font-size: 1rem;
        border: none;
        width: calc(100% - 2rem);
        background-color: var(--input-background);
        border-bottom: 2px solid var(--color-400);
        color: var(--color-100);
        min-height: 1.5rem;
        padding: 0.5rem;
        cursor: pointer;

        &.error {
          border: 2px solid var(--color-error);
          &:focus {
            box-shadow: var(--error-focus);
          }
        }

        &:focus {
          outline: none;
          transition: all 0.2s ease-in-out;
          &:not(.error) {
            border-bottom: none;
            box-shadow: var(--focus);
          }
        }

        .chevron-container {
          right: 1.75rem;
          top: 0.6125rem;
          position: absolute;
          &.rotate {
            :global(svg) {
              transform: rotate(180deg);
            }
          }
          :global(svg) {
            transition: transform 0.2s ease-in-out;
            width: 1.25rem;
            height: 1.25rem;
            fill: var(--color-100);
          }
        }
      }
      .items {
        position: absolute;
        background-color: var(--input-background);
        color: var(--color-100);
        width: calc(100% - 1rem);
        > .item {
          min-height: 1.5rem;
          padding: 0.5rem;
          cursor: pointer;

          &:focus {
            outline: none;
            box-shadow: var(--focus);
            transition: all 0.2s ease-in-out;
          }

          &.selected {
            background-color: var(--select--hover);
          }

          &:hover {
            background-color: var(--select--hover);
          }
        }
      }
    }
  }
</style>
