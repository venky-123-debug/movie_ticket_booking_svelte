<script>
  import SubMenu from "./subMenu.svelte"
  export let sitemap
  export let item
  export let showSubOnHover
  export let items = []
</script>

<div
  class="fixed left-[70px] z-9999 flex w-[190px] cursor-pointer flex-col
items-center"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click class="bg-floatBgColor flex min-h-[55.4px] w-full items-center pl-[15px] text-navBar_logo font-semibold text-white">
    {sitemap[item][0].title}
  </div>
  {#if showSubOnHover && sitemap[item][0].subNavs}
    <div class="w-full bg-navPrimary text-white">
      <SubMenu extraClass="py-[8px] pl-5" {items} />
    </div>
  {/if}
</div>

