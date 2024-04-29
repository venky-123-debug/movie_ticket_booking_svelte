<script>
  import SubMenu from "../shared/subMenu.svelte"
  import sitemap from "../scripts/sitemap"
  import { push } from "svelte-spa-router"
  import { onMount } from "svelte"
  import ApplicationState from "../stores/store"
  import FloatingSubNav from "../shared/floatingSubNav.svelte"

  let subMenuItems = sitemap[location.hash.split("/")[1]] || []
  let showSubnav = {}
  let showSubOnHover = false
  let itemToShowSubNav

  onMount(() => {
    // if ($oppstate.isAdmin) sitemap = Admin
    // else sitemap = User
    Object.keys(sitemap).forEach((item) => (showSubnav[item] = false))
    
    let activeItem = location.hash.split("/")[1]
    showSubnav[activeItem] = true
  })

  const toggleSubnav = (item) => {
    Object.keys(showSubnav).forEach((key) => key !== item && (showSubnav[key] = false))
    showSubnav[item] = !showSubnav[item]
    console.log({ $ApplicationState })
  }
  const handleNavigation = (item, subNavs, route) => {
    if (!$ApplicationState.minMaXNav || ($ApplicationState.minMaXNav && $ApplicationState.checkScreenSize)) {
      if (subNavs && subNavs.length) {
        subMenuItems = sitemap[item]
      } else {
        push(route)
        $ApplicationState.minMaXNav = false
        $ApplicationState.minMaXNav = false
        $ApplicationState.checkScreenSize = false
      }
      toggleSubnav(item)
    }
  }
  // const showSubMenuOnHover = (item) => {
  //   if ($ApplicationState.minMaXNav && window.innerWidth > 1024) {
  //     showSubOnHover = !showSubOnHover
  //     itemToShowSubNav = item
  //   }
  // }
</script>

<div class="flex w-full flex-col">
  {#each Object.keys(sitemap) as item}
    <div class="flex w-full">
      <div class="flex w-full flex-col">
        <!-- {#if !$ApplicationState.minMaXNav || ($ApplicationState.checkScreenSize && $ApplicationState.minMaXNav)}
          <div class="px-5 py-3 text-1xs uppercase text-navBar_header first:my-0">
            {item}
          </div>
        {/if} -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <div class="relative flex w-full flex-col">
          <!-- <div on:mouseover={() => showSubMenuOnHover(item)} class="relative flex w-full flex-col"> -->
          <button type="button" on:click|stopPropagation={() => handleNavigation(item, sitemap[item][0].subNavs, sitemap[item][0].route)} class="group relative flex w-full items-center justify-between hover:bg-floatBgColor active:bg-gray-900 {location.hash.indexOf(item) == 2 || (showSubnav[item] && sitemap[item][0].subNavs) ? '' : 'group-hover:text-white'}">
            <div class="navButton group relative flex w-full cursor-pointer items-center {$ApplicationState.minMaXNav ? 'h-[55.4px] ' : 'h-[45px]'} px-6 py-[10px] capitalize text-navBar_subItems {location.hash.indexOf(item) == 2 || (showSubnav[item] && sitemap[item][0].subNavs) ? 'text-white' : 'group-hover:text-white'}">
              <span class=" {$ApplicationState.minMaXNav ? 'h-8 w-8 text-lg' : 'h-6 w-6 text-base'}  {location.hash.indexOf(item) == 2 || (showSubnav[item] && sitemap[item][0].subNavs) ? ' font-semibold text-white' : 'text-navBar_header group-hover:text-white'}">
                <i class={sitemap[item][0].iconClasses} />
              </span>
              {#if !$ApplicationState.minMaXNav || ($ApplicationState.checkScreenSize && $ApplicationState.minMaXNav)}
                <span class="inline-block pl-[10px] text-navBar_logo font-semibold">{sitemap[item][0].title}</span>
              {/if}
            </div>
            {#if (!$ApplicationState.minMaXNav || ($ApplicationState.checkScreenSize && $ApplicationState.minMaXNav)) && sitemap[item][0].subNavs && sitemap[item][0].subNavs.length}
              <div class="{location.hash.indexOf(item) == 2 || (showSubnav[item] && sitemap[item][0].subNavs) ? 'text-white ' : 'text-slate-500 group-hover:text-white'} cursor-pointer pr-5 text-xs">
                <i class="fa-solid {showSubnav[item] ? 'fa-chevron-up' : 'fa-chevron-down'} fa-sm" />
              </div>
            {/if}
          </button>

          {#if showSubOnHover && itemToShowSubNav === item}
            <FloatingSubNav on:click={() => push(sitemap[item][0].route)} {sitemap} bind:showSubOnHover items={sitemap[item][0].subNavs} item={itemToShowSubNav} />
          {/if}
          {#if showSubnav[item] && sitemap[item][0].subNavs && (!$ApplicationState.minMaXNav || (!$ApplicationState.floatNavOnSm && !$ApplicationState.minMaXNav) || (!$ApplicationState.floatNavOnSm && $ApplicationState.minMaXNav))}
            <SubMenu extraClass="py-[6.4px] pl-14 pr-6" items={sitemap[item][0].subNavs} />
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>
