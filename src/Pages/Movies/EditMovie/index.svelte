<script>
  import { onMount } from "svelte"
  import { queryStringToJSON } from "../../Scripts/queryString"
  import axios from "axios"
  import { querystring } from "svelte-spa-router"
  import notify from "../../shared/Notification/script/notify"
  import AddItem from "../../shared/addItem.svelte"
  import Upload from "../../shared/upload.svelte"

  let showloading = false
  let Actions = ["English", "Tamil", "Telugu", "Hindi", "Malayalam", "Kannada"]
  let genreActions = ["Action", "Romance", "Adventure", "Comedy", "Crime and mystery", "Fantasy", "Historical", "Horror"]
  let moviePoster
  let crewMemberImage
  let actorImage
  let movieData = {}
  let genre = []
  let language = []
  /**
   * The query string parsed as JSON using spa-router.
   * @type {Object}
   */
  let query = queryStringToJSON($querystring)
  onMount(async () => {
    try {
      let data = await movieDetail(query.id)
      movieData = data.data
      console.log({ movieData })
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

  // Function to handle changes in the releaseDate input
  const handleReleaseDateChange = (e) => {
    movieData.releaseDate = e.target.value
  }

  const onSubmit = () => {}
  const filteredGenreActions = () => {
    if (movieData && movieData.genre) {
      genreActions = genreActions.filter((action) => !movieData.genre.split(",").includes(action))
      genreActions = [...genreActions]
    }
  }

  $: filteredGenreActions()
</script>

{#if Object.keys(movieData).length}
  <div class="relative z-10 flex h-screen w-screen justify-center overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black">
    <div class="flex w-full justify-start">
      <div class="w-full overflow-auto px-10 pb-10">
        <div class="mx-auto mt-6 h-auto rounded-md bg-black/60 p-6 md:w-4/5 lg:w-2/3">
          <form action="post" class="space-y-3" on:submit|preventDefault={onSubmit}>
            <div class="flex w-full gap-3">
              <div class="flex w-full flex-col gap-3">
                <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                  <div class="formLabel">Movie Name</div>
                  <div class="sm:col-span-2 sm:mt-0">
                    <input autocomplete="off" required="true" name="movie" type="text" value={movieData.title} class="formInput" placeholder="Enter movie name" />
                  </div>
                </div>
                <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                  <div class="formLabel">Movie Description</div>
                  <div class="sm:col-span-2 sm:mt-0">
                    <input autocomplete="off" required="true" name="description" type="text" value={movieData.description} class="formInput" placeholder="Enter movie description" />
                  </div>
                </div>
                <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                  <div class="formLabel">Genre</div>
                  <div class="sm:col-span-2 sm:mt-0">
                    <AddItem
                      Actions={genreActions}
                      activeItems={movieData.genre.split(",")}
                      on:dropdown={(e) => {
                        genre = e.detail
                      }}
                      title="Genre"
                    />
                  </div>
                </div>
                <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                  <div class="formLabel">Languages available</div>
                  <div class="sm:col-span-2 sm:mt-0">
                    <AddItem
                      bind:Actions
                      activeItems={movieData.language.split(",")}
                      on:dropdown={(e) => {
                        language = e.detail
                      }}
                      title="Language"
                    />
                  </div>
                </div>
                <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                  <div class="formLabel">Duration</div>
                  <div class="sm:col-span-2 sm:mt-0">
                    <input autocomplete="off" required="true" name="duration" type="number" value={movieData.duration} class="formInput" placeholder="Enter movie description" />
                  </div>
                </div>
                <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                  <div class="formLabel">Certification</div>
                  <div class="sm:col-span-2 sm:mt-0">
                    <input autocomplete="off" required="true" name="description" type="text" value={movieData.certification} class="formInput" placeholder="Enter movie certification" />
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                  <div class="formLabel">Release Date</div>
                  <div class="sm:col-span-2 sm:mt-0">
                    <input autocomplete="off" required="true" name="releaseDate" type="date" class="formInput" bind:value={movieData.releaseDate} placeholder="Enter movie release date" on:change={handleReleaseDateChange} />
                  </div>
                </div>
                <div class="sm:grid sm:grid-cols-3 sm:items-start">
                  <label for="moviePoster" class="formLabel">Upload Movie Poster</label>
                  <div class="sm:col-span-2 sm:mt-0">
                    <Upload height="h-40" bind:files={moviePoster} blob={`bookApi/files/${movieData.poster}`} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                  </div>
                </div>

                <div class="flex items-center gap-3 text-2xl font-bold text-blue-500">
                  Crew Details&nbsp;:&nbsp
                  <!-- <div class="relative">
                  <button
                    type="button"
                    on:click|preventDefault={(e) => {
                      try {
                        if (!crew.length) throw "Add atleast one crew member details"
                        crewModal = !crewModal
                      } catch (error) {
                        console.error(error)
                        notify.danger(error)
                      }
                    }}
                    class="text-2xl text-white {crew.length ? 'cursor-pointer' : 'pointer-events-none'} hover:text-blue-500 active:scale-105"
                  >
                    <i class="fa-solid fa-circle-info" />
                  </button>
                  {#if crew.length}
                    <div class="absolute top-[-10px] right-[-12px] h-5 w-5 rounded-full bg-green-500 text-center text-xs text-white">
                      {crew.length}
                    </div>
                  {/if}
                </div>
                <button type="button" on:click={addCrew} class="text-2xl text-white hover:text-blue-500 active:scale-105">
                  <i class="fa-solid fa-octagon-plus" />
                </button> -->
                </div>
                {#each movieData.crew as crew}
                  <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                    <div class="formLabel">Member Name</div>
                    <div class="sm:col-span-2 sm:mt-0">
                      <input autocomplete="off" bind:value={crew.name} type="text" class="formInput" placeholder="enter member name" />
                    </div>
                  </div>
                  <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                    <div class="formLabel">Member Role</div>
                    <div class="sm:col-span-2 sm:mt-0">
                      <input autocomplete="off" bind:value={crew.role} type="text" class="formInput" placeholder="enter member name" />
                    </div>
                  </div>
                  <div class="sm:grid sm:grid-cols-3 sm:items-start">
                    <label for="moviePoster" class="formLabel">Upload crew Member Image</label>
                    <div class="sm:col-span-2 sm:mt-0">
                      <Upload blob={`bookApi/files/${crew.image}`} height="h-40" bind:files={crewMemberImage} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                    </div>
                  </div>
                {/each}

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="flex items-center gap-3 text-2xl font-bold text-blue-500">
                  Actor Details&nbsp;:&nbsp
                  <!-- <div class="relative">
                  <button
                    type="button"
                    on:click|preventDefault={(e) => {
                      try {
                        if (!actors.length) throw "Add atleast one actor details"

                        console.log("clicked")
                        actorsModal = !actorsModal
                        // actors = e.detail
                        console.log(actors.length)
                      } catch (error) {
                        console.error(error)
                        notify.danger(error)
                      }
                    }}
                    class="text-2xl text-white {actors.length ? 'cursor-pointer' : 'pointer-events-none'} hover:text-blue-500 active:scale-105"
                  >
                    <i class="fa-solid fa-circle-info" />
                  </button>
                  {#if actors.length}
                    <div class="absolute top-[-10px] right-[-12px] h-5 w-5 rounded-full bg-green-500 text-center text-xs text-white">
                      {actors.length}
                    </div>
                  {/if}
                </div>
                <button type="button" on:click={addActor} class="text-2xl text-white hover:text-blue-500 active:scale-105">
                  <i class="fa-solid fa-octagon-plus" />
                </button> -->
                </div>
                {#each movieData.actors as actor}
                  <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                    <div class="formLabel">Actor Name</div>
                    <div class="sm:col-span-2 sm:mt-0">
                      <input autocomplete="off" bind:value={actor.name} type="text" class="formInput" placeholder="enter actor name" />
                    </div>
                  </div>
                  <div class="sm:grid sm:grid-cols-3 sm:items-start">
                    <label for="moviePoster" class="formLabel">Upload Actor Image</label>
                    <div class="sm:col-span-2 sm:mt-0">
                      <Upload blob={`bookApi/files/${actor.image}`} height="h-40" bind:files={actorImage} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <div class="flex h-10 items-center justify-end gap-3">
              {#if showloading}
                <span class="text-white">Adding&nbsp;</span>
                <svg width="20" height="7" stroke="#8087BD" fill="#8087BD" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
                  <circle class="circle" cx="15" cy="15" r="15" />
                  <circle class="circle1" cx="60" cy="15" r="9" fill-opacity="0.9" />
                  <circle class="circle2" cx="105" cy="15" r="15" />
                </svg>
              {:else}
                <button type="submit" class="w-28 rounded-md bg-blue-500 py-2 text-sm font-medium text-white hover:bg-blue-600 active:bg-blue-500">
                  <i class="fa-solid fa-camera-movie" />
                  &nbsp;Add Movie
                </button>
              {/if}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}
