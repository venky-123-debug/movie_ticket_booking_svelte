<script>
  export let additionalClass
  export let text
  export let state = false
</script>

<button on:click disabled={state} type="button" class="flex items-center justify-center rounded py-1.5 px-4 min-w-[36px] md:w-28 text-buttonText text-white hover:opacity-90 active:opacity-100 {additionalClass}">{text}</button>
