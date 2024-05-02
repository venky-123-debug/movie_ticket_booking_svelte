<script>
  export let moviesList=[]
</script>

{#each moviesList as list,i}

<div class="bg-white flex flex-col items-center gap-2 justify-center">
{list.title}
</div>

{/each}