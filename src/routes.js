import ErrorCode404 from "./Pages/404/index.svelte"
import Login from "./Pages/Login/index.svelte"
import AddNewMovie from "./Pages/AddMovies/index.svelte"
import MoviesList from "./Pages/MoviesList/index.svelte"
import MovieDetails from "./Pages/singleMovieCard/index.svelte"

export default {
  "/": Login,
  "/Movies/AddNewMovie": AddNewMovie,
  "/Movies/MoviesList": MoviesList,
  "/Movies/MovieDetails": MovieDetails,
  
  // The catch-all route must always be last
  "*": ErrorCode404,
}
