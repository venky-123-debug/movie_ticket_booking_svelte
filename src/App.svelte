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
</style>
