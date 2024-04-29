<script>
  import { slide } from "svelte/transition"
  export let radius = "rounded-md"
  export let height
  export let position
  export let files
  let blob
  let loading = false
  export let imageHeight = "max-h-40 min-h-32"

  const uploadImage = (files) => {
    try {
      if (files) {
        loading = true
        setTimeout(() => {
          blob = URL.createObjectURL(files[0])
          console.log(blob)
          loading = false
          files = ""
        }, 2000)
      }
    } catch (error) {
      loading = false
      console.error(error)
    }
  }
  $: uploadImage(files)
</script>

<div class="relative flex {height} cursor-pointer flex-col items-center justify-center gap-3 {radius} {!blob ? 'border border-dashed hover:border-gray-200' : ''} border-borderClr bg-transparent">
  {#if loading}
    <div in:slide class="absolute inset-0 flex h-full w-full items-center justify-center {radius} bg-violet-500">
      <i class="fa-sharp fa-solid fa-circle-notch fa-spin flex h-7 w-7 items-center justify-center {radius} bg-[#000000cc] text-white" />
    </div>
  {/if}
  {#if blob && !loading}
    <div class="relative">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img src={blob} alt="photos" class="aspect-auto {imageHeight} {radius}" />
      <button
        on:click={() => {
          blob = ""
        }}
        class="absolute bottom-4 {position} flex h-6 w-6 items-center justify-center rounded-full bg-[#000000cc] text-white hover:bg-red-500"
      >
        <i class="fa-solid fa-xmark" />
      </button>
    </div>
  {/if}
  {#if !blob}
    <form id="formImageEdit">
      <input bind:files type="file" name="userImage" class="absolute inset-0 cursor-pointer opacity-0" accept="image/*" />
    </form>
    <div class="mb-1 text-center h-auto text-gray-500">
      <i class="fa-solid fa-image text-3xl" />
    </div>
    <p class="w-full p-2 text-center text-[13px] text-slate-700">
      Drag and drop your files or <br />
      <strong class="underline">Browse</strong>
    </p>
  {/if}
</div>
