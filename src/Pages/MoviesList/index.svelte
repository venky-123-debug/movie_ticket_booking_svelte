<script>
  import MovieDetails from "./Components/movieDetails.svelte"
  import { onMount } from "svelte"
  import axios from "axios"

  let moviesList = []
  let fetchNotification = {
    close(){}
  }
  const FetchList = async () => {
    fetchNotification.close()


    try {
      // Show a loading indicator while waiting for the response.
      showloading = true

      let data = await movieList(inputData)
      console.log({data});

      fetchNotification = notify.success("Movies list fetched successfully")
    } catch (error) {
      console.error(error)
      fetchNotification = notify.danger(error)
    } finally {
      showloading = false
    }
  }
  const movieList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!window.navigator.onLine) reject("Network error")
        let { data } = await axios.get(`/bookApi/movie/`, {})
        if (data.error) throw data.errorCode
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
</script>

<div class="relative z-10 flex h-screen w-screen justify-center overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black">
  <div class="flex w-full justify-start">
    <MovieDetails bind:moviesList />
  </div>
</div>
