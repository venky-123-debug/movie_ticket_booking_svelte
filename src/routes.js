import ErrorCode404 from "./Pages/404/index.svelte"
import Login from "./Pages/Login/index.svelte"

export default {
  "/": Login,
  // The catch-all route must always be last
  "*": ErrorCode404,
}
