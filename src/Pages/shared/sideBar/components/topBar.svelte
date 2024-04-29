<script>
  import { onMount } from "svelte"
  import ApplicationState from "../stores/store"
  onMount(() => {
    $ApplicationState.minMaXNav = false
    $ApplicationState.floatNavOnSm = false
  })

  const toggleNav = () => {
    $ApplicationState.minMaXNav = !$ApplicationState.minMaXNav
    if (window.innerWidth < 1024) {
      $ApplicationState.checkScreenSize = !$ApplicationState.checkScreenSize
    } else {
      $ApplicationState.floatNavOnSm = !$ApplicationState.floatNavOnSm
    }
  }
</script>

<div class="fixed {$ApplicationState.minMaXNav && window.innerWidth < 1024 ? 'z-50' : 'z-30'} flex w-full items-center" style="width: -webkit-fill-available;box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03);">
  <div class="flex h-[70px] w-full items-center justify-center bg-white shadow-md">
    <div class="flex h-full w-full items-center justify-between gap-3">
      <div class="flex items-center {$ApplicationState.minMaXNav && window.innerWidth > 1024 ? 'pl-[70px]' : ''}">
       
        <button on:click={toggleNav} type="button" class="ripple h-[70px] min-w-[52px]">
          <div class=" flex w-full items-center justify-center font-bold text-gray-800" style="color: rgb(85, 91, 109);">
            <i class="fa-solid fa-bars" />
          </div>
        </button>
        <h1 class="hidden pl-3 text-xl font-bold text-primary-default md:flex">Blockchain Based E-KYC System</h1>
      </div>

      <div class="flex gap-6">
        
      </div>
    </div>
  </div>
</div>
