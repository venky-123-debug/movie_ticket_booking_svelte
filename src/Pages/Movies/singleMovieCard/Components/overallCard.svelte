<script>
  import Button from "../../../shared/Button.svelte"
  import ImageList from "./imageList.svelte"
  import {push} from "svelte-spa-router"

  export let list
  const toHoursAndMinutes = (t) => {
    let hours = Math.floor(t / 60)
    let minutes = t % 60
    return `${hours}h ${minutes}m`
  }

  const formatReleaseDate = (value) => {
    let date = new Date(value)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }
</script>

{#if Object.keys(list).length}
  <!-- <div class="mx-auto flex w-full flex-col items-center gap-3"> -->
  <div class="min-w-3/5 mx-auto flex w-full flex-col items-center gap-3 sm:w-4/5">
    <div class=" relative w-full rounded-md bg-black/60 bg-opacity-10 shadow-lg backdrop-blur-2xl">
      <div class="px-4 leading-none md:flex">
        <div class="flex-none p-6">
          <img src="/bookApi/files/{list.poster}" alt={list.title} class="aspect-[3/4] h-[400px] w-[300px] -translate-y-10 transform rounded-md border border-gray-300 shadow-2xl" />
        </div>

        <div class="flex-col flex gap-6 sm:pl-10">
          <p class="pt-4 text-4xl font-semibold text-white">{list.title}</p>
          <!-- <hr class="h-[0.5px] w-full bg-red-500 text-red-500" /> -->

          <div class="flex flex-col gap-3 text-white">
            <span class="text-lg font-normal">{toHoursAndMinutes(Number(list.duration))}&nbsp;|&nbsp;{list.genre}</span>
            <span class="text-lg font-normal">{formatReleaseDate(list.releaseDate)}</span>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex gap-3">
              {#each list.language.split(",") as lang}
                <span class="inline-flex min-w-[20px] items-center gap-3 rounded-sm bg-gray-900 px-2 py-1.5 text-sm font-normal text-purple-400 ring-1 ring-inset ring-purple-400/30">{lang}</span>
              {/each}
            </div>

            <div class="flex gap-3">
              {#each list.genre.split(",") as genre}
                <span class="inline-flex min-w-[20px] items-center rounded-sm bg-gray-900 px-2 py-1.5 text-sm font-normal text-teal-400 ring-1 ring-inset ring-teal-400/30">{genre}</span>
              {/each}
            </div>
          </div>

          <p class="text-md flex text-white">Rating: 9.0/10</p>
          <div class="flex items-end w-full gap-3">
            <Button on:click={() => push("/Movies/MoviesList")} additionalClass={"bg-red-500 hover:bg-red-600 active:bg-red-500"} text="Back" />
            <Button on:click={()=>push("/Movies/EditMovie")} additionalClass={"bg-blue-500 hover:bg-blue-600 active:bg-blue-500"} text="Edit" />
          </div>
        </div>
      </div>
      <!-- <div class="absolute inset-y-0 right-20 -z-30">
        <img src="/bookApi/files/{list.poster}" alt={list.title} class="aspect-[3/4] h-[400px] w-[300px] shadow-inner" />
      </div> -->
    </div>
    <div class="flex w-full flex-col items-start gap-3 text-left">
      <div class="text-2xl font-normal text-white">About the movie</div>
      <p class="my-4 px-4 text-left text-base text-gray-500">
        {list.description}
      </p>
    </div>
    <div class="flex w-full flex-col items-start gap-3 text-left">
      <div class="text-2xl font-normal text-white">Cast</div>
      <p class="my-4 px-4 text-left">
        <ImageList role="Actor" bind:actorDetails={list.actors} />
      </p>
    </div>
    <div class="flex w-full flex-col items-start gap-3 text-left">
      <div class="text-2xl font-normal text-white">Crew</div>
      <p class="my-4 px-4 text-left">
        <ImageList role="Actor" bind:actorDetails={list.crew} />
      </p>
    </div>
  </div>
{/if}
