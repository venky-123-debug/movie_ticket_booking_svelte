<script>
  export let additionalClass
  export let text
  export let state = false
</script>

<button on:click disabled={state} type="button" class="active:opacity-100 flex items-center justify-center rounded py-[7.52px] px-4 text-navBar_logo h-[36.13px] text-white hover:opacity-90 {additionalClass}">{text}</button>
