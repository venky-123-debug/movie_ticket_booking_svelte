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
  let actorName = "Robert Downey Jr"

  let actorImage = ""
  let posterBlob = ""
  let dirBlob = ""

  let actorsModal = false
  let language = []
  let Actions = ["English", "Tamil", "Telugu", "Hindi", "Malayalam", "Kannada"]
  let genreActions = ["Action", "Romance", "Adventure", "Comedy", "Crime and mystery", "Fantasy", "Historical", "Horror"]
  let genre = []
  // let activeItems = []

  $: {
    console.log({ actors, language }, !actors.length)
  }
  // const onSubmit = async (e) => {
  //   try {
  //     if (!language.length) throw "Language cannot be empty"
  //     if (!genre.length) throw "Genre cannot be empty"
  //     if (!actors.length) throw "Add atleast one actor details"
  //     if (!directorImage.length) throw "Movie poster cannot be empty"
  //     const movieFormData = new FormData(e.target)
  //     const inputData = formdata2json(movieFormData)
  //     inputData.actors = actors
  //     let director = {
  //       name: inputData.directorName,
  //       image: directorImage[0],
  //     }
  //     inputData.directorImage = directorImage[0]
  //     inputData.director = director
  //     inputData.language = language
  //     inputData.genre = genre
  //     delete inputData.directorName
  //     console.log({ inputData })
  //     let data = await addNewMovie(inputData)
  //     console.log({ data })
  //     console.log(directorImage)
  //   } catch (error) {
  //     console.error(error)
  //     notify.danger(error)
  //   }
  // }

  const onSubmit = async (e) => {
  try {
    if (!language.length) throw "Language cannot be empty"
    if (!genre.length) throw "Genre cannot be empty"
    if (!actors.length) throw "Add at least one actor details"
    if (!directorImage.length) throw "Movie poster cannot be empty"

    const movieFormData = new FormData();

    // Add non-file inputs to FormData
    movieFormData.append('title', e.target.movie.value);
    movieFormData.append('description', e.target.description.value);
    movieFormData.append('releaseDate', e.target.releaseDate.value);
    movieFormData.append('directorName', e.target.directorName.value);

    // Append language and genre arrays as strings
    movieFormData.append('language', Array.from(language))
    movieFormData.append('genre',  Array.from(genre));

    // Append poster and directorImage files
    movieFormData.append('poster', directorImage[0]);
    movieFormData.append('directorImage', directorImage[0]);

    // Append actor images
    actors.forEach((actor) => {
      movieFormData.append('actorImages', actor.image);
    });

    // Append actor details
    movieFormData.append('actors', JSON.stringify(actors.map(actor => ({ name: actor.name }))));

    console.log({ movieFormData });

    let data = await addNewMovie(movieFormData);
    console.log({ data });
    console.log(directorImage);
  } catch (error) {
    console.error(error);
    notify.danger(error);
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
    } catch (error) {
      console.error(error)
      notify.danger(error)
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
                  <!-- <input autocomplete="off" required="true" name="genre" type="text" value="Crime, thriller, romance" class="formInput" placeholder="entermovie genre" /> -->
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
                  <!-- <input autocomplete="off" required="true" name="language" type="text" value="tamil,english,telugu" class="formInput" placeholder="enter languages available" /> -->
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
              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Director Name</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" required="true" name="directorName" type="text" value="Guy Ritchie" class="formInput" placeholder="enter director name" />
                </div>
              </div>

              <div class="sm:grid sm:grid-cols-3 sm:items-start">
                <label for="directorImage" class="formLabel">Upload Director Image</label>
                <div class="sm:col-span-2 sm:mt-0">
                  <Upload height="h-40" bind:files={directorImage} blob={dirBlob} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start">
                <label for="moviePoster" class="formLabel">Upload Movie Poster</label>
                <div class="sm:col-span-2 sm:mt-0">
                  <Upload height="h-40" bind:files={moviePoster} blob={posterBlob} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                </div>
              </div>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="text-2xl font-bold text-blue-500">
                Actor Details&nbsp;:&nbsp
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
                  class="text-lg text-white {actors.length ? 'cursor-pointer' : 'pointer-events-none'}"
                >
                  <i class="fa-solid fa-circle-info" />
                </button>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Actor Name</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" bind:value={actorName} type="text" class="formInput" placeholder="enter actor name" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start">
                <label for="moviePoster" class="formLabel">Upload Actor Details</label>
                <div class="sm:col-span-2 sm:mt-0">
                  <Upload bind:blob height="h-40" bind:files={actorImage} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3">
            <button type="button" on:click={addActor} class="w-28 rounded-md bg-green-500 py-2 text-sm font-medium text-white hover:bg-green-600 active:bg-green-500">
              <i class="fa-solid fa-user-plus" />
              &nbsp;Add Actor
            </button>
            <button type="submit" class="w-28 rounded-md bg-green-500 py-2 text-sm font-medium text-white hover:bg-green-600 active:bg-green-500">
              <i class="fa-solid fa-user-plus" />
              &nbsp;Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  {#if actorsModal}
    <ViewModal
      actorDetails={actors}
      on:click={() => {
        actorsModal = !actorsModal
      }}
    />
  {/if}
</div>
