<script>
  import TopBar from "../components/topBar.svelte"
  import Navbar from "../index.svelte"
  import ApplicationState from "../stores/store"
</script>

<div class="relative flex h-screen w-screen overflow-auto overflow-x-hidden">
  <Navbar />
  <div
    class="relative h-full w-full overflow-auto {!$ApplicationState.minMaXNav && !$ApplicationState.checkScreenSize && window.innerWidth > 1024 && $ApplicationState.floatNavOnSm ? 'pl-[80px]' : (!$ApplicationState.minMaXNav && !$ApplicationState.checkScreenSize) || ($ApplicationState.minMaXNav && $ApplicationState.checkScreenSize && window.innerWidth < 1024) ? 'dynamic-padding ' : 'min-padding'} "
  >
    <TopBar />
    <div class="{$ApplicationState.minMaXNav && window.innerWidth > 1024 ? 'ml-[70px]' : ''} overall-padding min-h-full bg-slotBgPrimary">
      <div class="px-[6px]">
        <slot />
      </div>
    </div>
  </div>
</div>
