<script>
  import { fade, fly } from "svelte/transition"
  import { quintOut } from "svelte/easing"

  export let title
  export let positionClasses

  switch (positionClasses ? positionClasses : "center") {
    case "top-left":
      positionClasses = "items-start"
      break
    case "top-center":
      positionClasses = "justify-center"
      break
    case "center":
      positionClasses = "justify-center items-center"
      break
    case "top-right":
      positionClasses = "justify-end"
      break
    case "bottom-left":
      positionClasses = "flex-col-reverse items-start"
      break
    case "bottom-center":
      positionClasses = "flex-col-reverse items-center"
      break
    case "bottom-right":
      positionClasses = "flex-col-reverse items-end"
      break
  }
</script>

<div
  transition:fade={{
    delay: 250,
    duration: 300,
  }}
  class="fixed inset-0 z-50 mb-6 h-screen w-screen overflow-auto bg-black/50 p-6"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="flex min-h-full {positionClasses}" on:click|self>
    <div
      transition:fly={{
        delay: 250,
        duration: 300,
        y: -100,
        easing: quintOut,
      }}
      class="flex h-fit w-full flex-col rounded-md bg-white mobile:max-w-[498.5px]"
    >
      <div class=" flex w-full items-center justify-between border-b border-[#E8E8F7]/70 p-4">
        <h1 class="font-Poppins-Medium text-[16.25px] font-medium text-[#495057]">{title}</h1>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button on:click class="cursor-pointer text-black/70 hover:text-black">
          <i class="fa-regular fa-xmark-large fa-sm" />
        </button>
      </div>
      <div class="w-full border-b border-[#E8E8F7]/70 p-4">
        <slot name="content" />
      </div>
      <div class="flex w-full items-center justify-center gap-2 p-3 mobile:justify-end">
        <slot name="footer" />
      </div>
    </div>
  </div>
</div>
