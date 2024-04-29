<script>
  import RouteMap from "./routeMap.svelte"
  import ApplicationState from "../stores/store"
</script>

<div class={$ApplicationState.checkScreenSize && $ApplicationState.minMaXNav ? "absolute inset-0 flex h-screen w-screen" : ""}>
  <div class="{!$ApplicationState.minMaXNav ? 'hidden' : 'flex'} absolute top-0 left-0 z-40 h-full flex-col items-center lg:flex">
    <!-- {#if !$ApplicationState.minMaXNav || ($ApplicationState.minMaXNav && !$ApplicationState.checkScreenSize)}
      <div class="flex min-h-[70px] {!$ApplicationState.minMaXNav ? 'w-[70px] min-w-[70px] lg:w-[250px] lg:min-w-[250px] ' : 'lg:w-[70px] lg:min-w-[70px]'} items-center justify-center bg-navPrimary px-5 py-[13.008px]">
        <div class="w-full text-navBar_logo text-white">
          <div class="flex items-center justify-center gap-3">
            <img src="assets/brand-logo.png" alt="" class="h-[39.925px] w-[47.5px]" />
            {#if !$ApplicationState.minMaXNav || ($ApplicationState.checkScreenSize && $ApplicationState.minMaXNav)}
              <span class="text-2xl font-bold tracking-wide">Bank</span>
            {/if}
          </div>
        </div>
      </div>
    {/if} -->

    <div class="h-full {!$ApplicationState.minMaXNav ? 'min-w-[250px]' : 'mt-[70px] min-w-[250px] lg:mt-0 lg:w-[70px] lg:min-w-[70px]'} items-start overflow-y-auto bg-navPrimary pt-[10px] pb-[30px]">
      <RouteMap />
    </div>
  </div>
</div>
