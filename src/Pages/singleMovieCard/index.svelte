<script>
  import { onMount } from "svelte"
  import { queryStringToJSON } from "../Scripts/queryString"
  import axios from "axios"
  import { querystring } from "svelte-spa-router"
  import notify from "../shared/Notification/script/notify"
  import OverallCard from "./Components/overallCard.svelte"

  let imageDetails = {}
  /**
   * The query string parsed as JSON using spa-router.
   * @type {Object}
   */
  let query = queryStringToJSON($querystring)
  onMount(async () => {
    try {
      let data = await movieDetail(query.id)
      imageDetails = data.data
    } catch (error) {
      console.error(error)
      notify.danger(error)
    }
  })

  const movieDetail = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!window.navigator.onLine) reject("Network error")
        let { data } = await axios.get(`/bookApi/movie/${id}`)
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
      <OverallCard bind:list={imageDetails} />
    </div>
  </div>
</div>
