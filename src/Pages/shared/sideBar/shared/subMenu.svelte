<script>
  import ApplicationState from "../stores/store"

  export let items = []
  export let extraClass = ""
  let currentContent = location.hash
</script>

<div class="flex flex-col">
  {#each items as item}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <a
      on:click={() => {
        currentContent = item.route
        $ApplicationState.minMaXNav = false
        $ApplicationState.minMaXNav = false
        $ApplicationState.checkScreenSize = false
      }}
      href={item.route}
      class="flex cursor-pointer items-center {extraClass} justify-start text-navBar_logo font-medium text-slate-500 hover:text-white {currentContent == item.route ? 'text-white' : ''}"
    >
      {item.title}
    </a>
  {/each}
</div>
