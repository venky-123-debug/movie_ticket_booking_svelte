<script>
  import MovieDetails from "./Components/movieDetails.svelte"
  import { onMount } from "svelte"
  import axios from "axios"
  import notify from "../shared/Notification/script/notify"

  let moviesList = []
  let showloading = true
  let fetchNotification = {
    close() {},
  }
  onMount(async () => {
    try {
      showloading = true
      await fetchList()
    } catch (error) {
      console.error(error)
      notify.danger(error)
    } finally {
      showloading = false
    }
  })
  const fetchList = async () => {
    fetchNotification.close()
    try {
      // Show a loading indicator while waiting for the response.
      showloading = true

      let data = await movieList()
      console.log({ data })
      moviesList = data.data

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
        let { data } = await axios.get(`/bookApi/movie/`)
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
    <div class="w-full overflow-auto p-10">
      <div class="mx-auto ">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <MovieDetails {moviesList} on:movieClick={(e)=>console.log(e.detail)}/>
        </div>
      </div>
    </div>
  </div>
</div>
