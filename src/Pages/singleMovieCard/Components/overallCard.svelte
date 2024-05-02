<script>
  import MovieImageCard from "../../MoviesList/shared/movieImageCard.svelte"
  export let list
</script>

<div class="h-fit max-h-fit w-full bg-red-600 px-10">
  <img src="/bookApi/files/{list.poster}" alt="" class="relative flex aspect-auto h-[300px] w-[250px] justify-end rounded-md object-cover" />

  <MovieImageCard bind:list />
</div>
