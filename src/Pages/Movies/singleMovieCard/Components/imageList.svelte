<script>
  export let actorDetails = []
  export let role = "actor"
</script>

{#if actorDetails.length}
  <div class="flex w-full items-center justify-center gap-3">
    {#each actorDetails as actor, i}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="flex min-w-max flex-col gap-2 items-center">
        <div>
          <img class="inline-block aspect-3/4 h-32 w-24 rounded-md" src="/bookApi/files/{actor.image}" alt="" />
        </div>
        <div class="w-full">
          <p class="text-sm font-semibold text-gray-200 group-hover:text-gray-900">{actor.name}</p>
          <div class="flex items-center gap-3">
            <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">{actor.role ? actor.role : role}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
