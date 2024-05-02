<script>
  import { createEventDispatcher } from "svelte"
  import MovieImageCard from "../shared/movieImageCard.svelte"
  export let moviesList = []

  const dispatch = createEventDispatcher()
</script>

{#if moviesList.length}
  {#each moviesList as list, i}
    <button on:click={() => dispatch("movieClick", list.movieId)} type="button" class="flex h-auto w-fit min-w-fit flex-col items-center justify-center gap-2 rounded-md bg-transparent">
      <MovieImageCard bind:list />
      <div class="flex w-full text-left flex-col">
        <div class="text-lg font-semibold text-white">
          {list.title}
        </div>
        <div class=" break-words text-base font-normal text-white">
          {list.genre}
        </div>
      </div>
    </button>
  {/each}
{/if}
