<script>
  export let moviesList = []
  console.log({ moviesList })
</script>

{#if moviesList.length}
  {#each moviesList as list, i}
    <div class="flex h-auto min-w-fit flex-col items-center justify-center gap-2 rounded-md bg-transparent">
      <div class="relative">
        <img src="/bookApi/files/{list.poster}" alt="" class="aspect-auto h-[300px] w-[250px] rounded-md object-cover" />
        <div class="absolute inset-x-0 px-3 bottom-0 flex h-14 items-center bg-black text-center rounded-b-md text-base font-normal text-white">
          <i class="fa-solid fa-star text-rose-500"/><span class="">&ensp;55.7k&nbsp;Likes</span>
        </div>
      </div>
      <div>
        <div class="text-lg font-semibold text-white">
          {list.title}
        </div>
        <div class=" break-words text-base font-normal text-white">
          {list.genre}
        </div>
      </div>
    </div>
  {/each}
{/if}
