<script>
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  let openModal = false
  let dropdown
  export let activeItems = []
  export let Actions
  export let title = "Language"
  const removeActiveItem = (activeItem, index) => {
    // Check if activeItem is already present in Actions array
    let actionIndex = Actions.indexOf(activeItem)
    if (actionIndex === -1) {
      // If not present, remove from activeItems and add to Actions
      activeItems.splice(index, 1)
      Actions.push(activeItem)
    } else {
      // If present, remove from Actions and add back to activeItems
      Actions.splice(actionIndex, 1)
      activeItems.push(activeItem)
    }
    // Update both arrays
    activeItems = [...activeItems]
    Actions = [...Actions]
  }
</script>

<svelte:window
  on:click={(e) => {
    if (dropdown.contains(e.target) == false) openModal = false
  }}
  on:keyup={(e) => {
    if (openModal == true && (e.key === "Backspace" || e.key === "Delete")) {
      console.log("yes")
      let value = activeItems.pop()
      Actions = [...Actions, value]
      activeItems = [...activeItems]
    }
  }}
/>
<div class="group relative w-full" bind:this={dropdown}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={() => {
      openModal = !openModal
      console.log(openModal)
    }}
    class="group flex w-full"
  >
    <button type="button" class="flex w-full flex-wrap items-center justify-start gap-3 break-words rounded-l border border-r-0 px-3 {activeItems.length ? 'py-1.5' : ''} {openModal ? 'border-blue-500' : 'border-borderClr'}">
      {#if activeItems.length}
        {#each activeItems as activeItem, i}
          <div class="">
            <button on:click|self={() => removeActiveItem(activeItem, i)} type="button" class="rounded-md bg-blue-500 px-2 py-[0.4px] text-sm text-white">{activeItem}</button>
          </div>
        {/each}
      {:else}
        <div class="flex h-full w-full items-center px-3 pl-2 text-left text-sm text-gray-200">
          Select {title}
        </div>
      {/if}
      <span />
    </button>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="cursor-pointer rounded-r border border-l-0 px-5 py-1.5 text-gray-400 {openModal ? 'border-blue-500' : 'border-borderClr'}">
      <i class="fa-sharp fa-play fa-rotate-by fa-xs" style="--fa-rotate-angle: 210deg;" />
    </span>
  </div>
  {#if openModal}
    <div class="absolute left-0 z-20 mt-3 max-h-[200px] w-full overflow-auto rounded-md border-b border-borderClr bg-black drop-shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
      {#each Actions as Action, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <ul
          on:click={(e) => {
            activeItems.push(Action)
            Actions.splice(i, 1)
            activeItems = [...activeItems]
            dispatch("dropdown", activeItems)
            openModal = false
          }}
          class="hover:text-prbg-primary-default cursor-pointer p-3 py-1.5 pl-2 text-sm text-gray-200 hover:bg-blue-500"
        >
          {Action}
        </ul>
      {/each}
    </div>
  {/if}
</div>
