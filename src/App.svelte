<script>
  import Router from "svelte-spa-router"
  import routes from "./routes"
  import NotificationSystem from "./Pages/shared/Notification/index.svelte"
  import ApplicationState from "./stores/applicationStates"
  import {onMount} from "svelte"


  onMount(() => {
    const load = document.getElementById("mainLoader")
    load.style.display = "none"
    const mainContent = document.getElementById("mainContent")
    mainContent.style.display = "block"
  })

  const routeEvent = (event) => {
    // console.log(event.detail.location)
    if (event.detail.location != "/") {
      if (!$ApplicationState.token) {
        return push("/")
      }
      let parsedJwt = parseJWT($ApplicationState.token)
      if (Date.now() > parsedJwt.exp * 1000) {
        return push("/")
      }
      if (sha256($ApplicationState.token).toString() != $ApplicationState.tokenhmac) {
        return push("/")
      }
    }
  }
</script>

<Router {routes} on:routeLoaded={routeEvent} />
<NotificationSystem />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    html {
      -webkit-tap-highlight-color: transparent;
    }
  }
  body {
    font-family: "Nunito", sans-serif;
  }
  .formInput {
    @apply w-full rounded-md border-none bg-transparent text-white focus:ring-0
    /* @apply block w-full appearance-none rounded-md border border-[#a0a1a580] px-3 py-[0.47rem] text-formInput font-normal text-gray-400 focus:border-blue-500 focus:bg-transparent focus:outline-none focus:ring-0; */
  }


</style>
