<script>
  import axios from "axios"
  import { formdata2json } from "../Scripts/utilities"
  import Upload from "../shared/upload.svelte"
  import notify from "../shared/Notification/script/notify"
  import AddItem from "../shared/addItem.svelte"
  import ViewModal from "./ActorsList/viewModal.svelte"
  import ApplicationState from "../../stores/applicationStates"

  let directorImage = ""
  let moviePoster
  let blob
  let actors = []
  let crew = []
  let actorName = "Robert Downey Jr"
  let crewMemberName = "Guy Ritchie"
  let crewMemberRole = "Director"

  let actorImage = ""
  let crewMemberImage = ""
  let posterBlob = ""
  let crewBlob = ""

  let actorsModal = false
  let crewModal = false
  let language = []
  let Actions = ["English", "Tamil", "Telugu", "Hindi", "Malayalam", "Kannada"]
  let genreActions = ["Action", "Romance", "Adventure", "Comedy", "Crime and mystery", "Fantasy", "Historical", "Horror"]
  let genre = []
  let movieNotification = {
    close() {},
  }
  let addActorNotify = {
    close() {},
  }
  $: {
    console.log({ actors, language }, !actors.length)
  }

  const onSubmit = async (e) => {
    try {
      movieNotification.close()
      if (!language.length) throw "Language cannot be empty"
      if (!genre.length) throw "Genre cannot be empty"
      if (!actors.length) throw "Add at least one actor details"
      if (!moviePoster.length) throw "Movie poster cannot be empty"

      const movieFormData = new FormData()

      // Add non-file inputs to FormData
      movieFormData.append("title", e.target.movie.value)
      movieFormData.append("description", e.target.description.value)
      movieFormData.append("releaseDate", e.target.releaseDate.value)
      movieFormData.append("duration", e.target.duration.value)

      movieFormData.append("language", language.join(", "))
      movieFormData.append("genre", genre.join(", "))
      // movieFormData.append("genre", JSON.stringify(genre))
      movieFormData.append("poster", moviePoster[0])

      // Append actor images
      actors.forEach((actor) => {
        movieFormData.append("actorImages", actor.image)
      })
      crew.forEach((crew) => {
        movieFormData.append("crewImages", crew.image)
      })

      // Append actor details
      movieFormData.append("actors", JSON.stringify(actors.map((actor) => ({ name: actor.name }))))
      movieFormData.append("crew", JSON.stringify(crew.map((crew) => ({ name: crew.name, role: crew.role }))))

      console.log({ movieFormData })

      let data = await addNewMovie(movieFormData)
      console.log({ data })
      console.log(directorImage)
      movieNotification = notify.success(`New movie ${e.target.movie.value} added successfully.`)
    } catch (error) {
      console.error(error)
      movieNotification = notify.danger(error)
    }
  }

  const addNewMovie = (inputData) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!window.navigator.onLine) reject("Network error")
        let { data } = await axios.post(`/bookApi/movie/newMovie`, inputData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "access-token": $ApplicationState.token,
          },
        })
        if (data.error) throw data.errorCode
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
  const addActor = () => {
    try {
      addActorNotify.close()
      if (!actorName) {
        throw "Actor name cannot be empty"
      }
      if (!actorImage) {
        throw "Actor image cannot be empty"
      }
      actors.push({ name: actorName, image: actorImage[0], imageBlob: blob })
      actors = [...actors]
      actorName = ""
      actorImage = ""
      blob = ""
      addActorNotify = notify.success("Actor successfully added")
    } catch (error) {
      console.error(error)
      addActorNotify = notify.danger(error)
    }
  }
  const addCrew = () => {
    try {
      addActorNotify.close()
      if (!crewMemberName) {
        throw "Crew Member Name cannot be empty"
      }
      if (!crewMemberRole) {
        throw "Crew Member Role cannot be empty"
      }
      if (!crewMemberImage) {
        throw "Crew Member image cannot be empty"
      }
      crew.push({ name: crewMemberName, role: crewMemberRole, image: crewMemberImage[0], imageBlob: crewBlob })
      crew = [...crew]
      crewMemberName = ""
      crewMemberRole = ""
      crewBlob = ""
      addActorNotify = notify.success("Crew Member successfully added")
    } catch (error) {
      console.error(error)
      addActorNotify = notify.danger(error)
    }
  }
</script>

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
                  <input autocomplete="off" required="true" name="movie" type="text" value="Sherlock Holmes" class="formInput" placeholder="Enter movie name" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Movie Description</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" required="true" name="description" type="text" value="Good Movie" class="formInput" placeholder="Enter movie description" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Genre</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <AddItem
                    Actions={genreActions}
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
                  <input autocomplete="off" required="true" name="duration" type="number" value="120" class="formInput" placeholder="Enter movie description" />
                </div>
              </div>

              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Release Date</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" required="true" name="releaseDate" type="date" class="formInput" placeholder="enter movie release date" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start">
                <label for="moviePoster" class="formLabel">Upload Movie Poster</label>
                <div class="sm:col-span-2 sm:mt-0">
                  <Upload height="h-40" bind:files={moviePoster} blob={posterBlob} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                </div>
              </div>

              <div class="flex items-center gap-3 text-2xl font-bold text-blue-500">
                Crew Details&nbsp;:&nbsp
                <div class="relative">
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
                </button>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Member Name</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" bind:value={crewMemberName} type="text" class="formInput" placeholder="enter actor name" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Member Role</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" bind:value={crewMemberRole} type="text" class="formInput" placeholder="enter actor name" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start">
                <label for="moviePoster" class="formLabel">Upload crew Member Image</label>
                <div class="sm:col-span-2 sm:mt-0">
                  <Upload bind:blob={crewBlob} height="h-40" bind:files={crewMemberImage} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                </div>
              </div>

              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="flex items-center gap-3 text-2xl font-bold text-blue-500">
                Actor Details&nbsp;:&nbsp
                <div class="relative">
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
                </button>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Actor Name</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" bind:value={actorName} type="text" class="formInput" placeholder="enter actor name" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start">
                <label for="moviePoster" class="formLabel">Upload Actor Image</label>
                <div class="sm:col-span-2 sm:mt-0">
                  <Upload bind:blob height="h-40" bind:files={actorImage} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3">
            <button type="submit" class="w-28 rounded-md bg-blue-500 py-2 text-sm font-medium text-white hover:bg-blue-600 active:bg-blue-500">
              <i class="fa-solid fa-camera-movie" />
              &nbsp;Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  {#if actorsModal}
    <ViewModal
      bind:actorDetails={actors}
      on:click={() => {
        actorsModal = !actorsModal
      }}
    />
  {/if}
  {#if crewModal}
    <ViewModal
      bind:actorDetails={crew}
      on:click={() => {
        crewModal = !crewModal
      }}
    />
  {/if}
</div>
