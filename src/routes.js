import ErrorCode404 from "./Pages/404/index.svelte"
import Login from "./Pages/Login/index.svelte"
import AddNewMovie from "./Pages/AddMovies/index.svelte"

export default {
  "/": Login,
  "/Movies/AddNewMovie": AddNewMovie,
  
  // The catch-all route must always be last
  "*": ErrorCode404,
}
