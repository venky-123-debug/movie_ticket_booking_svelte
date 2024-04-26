<script>
  export let notification
  import { fade } from "svelte/transition"
  import notificationStore from "../../../../stores/notification"

  let showCloseDuration, backgroundColor, icon
  let color
  switch (notification.type) {
    case "primary":
      showCloseDuration = notification.duration
      backgroundColor = "bg-alert-primary"
      color = "text-alert-primary"
      icon = "fa-bell"
      break
    case "secondary":
      showCloseDuration = notification.duration
      backgroundColor = "bg-alert-secondary"
      icon = "fa-lightbulb"
      color = "text-alert-secondary"
      break
    case "danger":
      showCloseDuration = notification.duration
      backgroundColor = "bg-alert-danger"
      icon = "fa-triangle-exclamation"
      color = "text-alert-danger"

      break
    case "warning":
      showCloseDuration = notification.duration
      backgroundColor = "bg-alert-warning"
      icon = "fa-shield-exclamation"
      color = "text-alert-warning"

      break
    case "info":
      showCloseDuration = notification.duration
      backgroundColor = "bg-alert-info"
      icon = "fa-circle-exclamation"
      color = "text-alert-info"

      break
    case "success":
      showCloseDuration = notification.duration
      backgroundColor = "bg-alert-success"
      icon = "fa-circle-check"
      color = "text-alert-success"

      break
  }
  const closeNotification = (id) => {
    notificationStore.update((notificationStore) => {
      return notificationStore.filter((notificationStore) => notificationStore.id != id)
    })
  }

  setTimeout(closeNotification, notification.duration, notification.id)

  /**
   * @type {String}
   */
  let message = notification.message

  let countdown
  if (typeof message === "string") {
    countdown = notification.duration / 1000
    if (message.indexOf("%COUNT%") != -1) {
      // count exists
      let countDownTimer = setInterval(() => {
        if (countdown > 0) {
          countdown = Math.round((countdown - 0.1) * 10) / 10
        } else {
          clearInterval(countDownTimer)
        }
      }, 100)
    }
  }
  $: if (typeof notification.message === "string") {
    message = notification.message.replace("%COUNT%", countdown)
  }

  let progress = 100 // Initially set to 100%
  let progressBarInterval

  if (notification.duration) {
    const intervalDuration = notification.duration / 100
    const intervalStep = 1

    progressBarInterval = setInterval(() => {
      progress -= intervalStep
      if (progress <= 0) {
        clearInterval(progressBarInterval)
      }
    }, intervalDuration)
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={() => closeNotification(notification.id)}
  transition:fade={{ duration: 300 }}
  class="pointer-events-auto flex w-full select-none flex-col rounded-md bg-black"
>
  <div class="flex items-center justify-between gap-4 p-3">
    <div class="flex items-center gap-4">
      <div class={color}>
        <i class="{icon} fa-solid fa-xl" />
      </div>
      <h1 class="break-words text-base font-medium tracking-wide text-white">
        {@html message}
      </h1>
    </div>
    <!-- event forwarding -->
    <!-- <button
    on:click={() => closeNotification(notification.id)}
    on:click|preventDefault
  >
    <Close class="h-5 w-5 fill-white" />
  </button> -->

    <button on:click={() => closeNotification(notification.id)} on:click|preventDefault>
      <div class={color}>
        <i class="fa-light fa-xmark fa-lg" />
      </div>
    </button>
  </div>

  {#if notification.duration}
    <div class="relative h-[3px] w-full bg-transparent">
      <div class="absolute h-full rounded-full {backgroundColor} progress-bar" style="width: {progress}%;" />
    </div>
  {/if}
</div>

<style>
  .progress-bar {
    transition: width 0.2s ease;
  }
</style>
