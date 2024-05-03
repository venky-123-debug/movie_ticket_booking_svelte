import ErrorCode404 from "./Pages/404/index.svelte"
import Login from "./Pages/Login/index.svelte"
import AddNewMovie from "./Pages/Movies/AddMovies/index.svelte"
import MoviesList from "./Pages/Movies/MoviesList/index.svelte"
import MovieDetails from "./Pages/Movies/singleMovieCard/index.svelte"
import EditMovie from "./Pages/Movies/EditMovie/index.svelte"

export default {
  "/": Login,
  "/Movies/AddNewMovie": AddNewMovie,
  "/Movies/MoviesList": MoviesList,
  "/Movies/MovieDetails": MovieDetails,
  "/Movies/EditMovie": EditMovie,
  
  // The catch-all route must always be last
  "*": ErrorCode404,
}
