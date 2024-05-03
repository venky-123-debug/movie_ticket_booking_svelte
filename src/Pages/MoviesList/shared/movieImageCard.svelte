<script>
  export let list
  export let likes = false
</script>

<div class="relative z-30">
  <img src="/bookApi/files/{list.poster}" alt="" class="aspect-auto h-[300px] w-[250px] rounded-md object-cover" />
  {#if likes}
  <div class="absolute inset-x-0 bottom-0 flex h-10 items-center rounded-b-md bg-black px-3 text-center text-base font-normal text-white">
    <i class="fa-solid fa-star text-rose-500" />
    <span class="">&ensp;55.7k&nbsp;Likes</span>
  </div>
  {/if}
</div>
