<script>
  import Button from "../../../shared/Button.svelte"
  import Modal from "../../../shared/Modals/index.svelte"

  export let actorDetails = []
  export let role = "Actor"
  // export let apiImage = false
  console.log({ actorDetails })
  const deleteActor = (index) => {
    actorDetails = actorDetails.filter((actor, i) => i !== index)
    actorDetails = [...actorDetails]
    console.log({ actorDetails })
  }
</script>

{#if actorDetails.length}
  <Modal on:click positionClasses="top-center" title="Actors Details">
    <div slot="content">
      <div class="grid-col-1 grid flex-wrap gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {#each actorDetails as actor, i}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="flex min-w-max flex-col items-center">
            <div>
              <img class="inline-block aspect-square h-20 w-20 min-w-fit rounded-md" src={actor.imageBlob} alt="" />
            </div>
            <div class="">
              <p class="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{actor.name}</p>
              <div class="flex items-center gap-3">
                <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">{actor.role ? actor.role : role}</p>
                <i class="fa-solid fa-trash h-3 w-3 cursor-pointer text-red-500" on:click|self={() => deleteActor(i)} />
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div slot="footer">
      <div class="flex items-center gap-3">
        <Button text="Close" on:click additionalClass="bg-red-500 w-fit" />
      </div>
    </div>
  </Modal>
{/if}
