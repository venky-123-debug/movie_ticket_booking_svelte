<script>
  import { formdata2json } from "../Scripts/utilities"
  import Upload from "../shared/upload.svelte"
  let directorImage
  let moviePoster
  const onSubmit = (e) => {
    directorImage = directorImage[0]
    console.log(directorImage[0])
    const movieFormData = new FormData(e.target)

    const inputData = formdata2json(movieFormData)
    console.log({ inputData })
  }
</script>

<div class="flex h-screen w-screen justify-center overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black">
  <div class="flex w-full justify-start">
    <div class="w-full overflow-auto px-32 pb-10">
      <div class="mx-auto mt-6 h-auto w-full rounded-md bg-black/60 p-6">
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
                <div class="formLabel">Languages available</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" required="true" name="language" type="text" value="tamil,english,telugu" class="formInput" placeholder="enter languages available" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Genre</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" required="true" name="genre" type="text" value="Crime, thriller, romance" class="formInput" placeholder="entermovie genre" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Release Date</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" required="true" name="releaseDate" type="date" class="formInput" placeholder="enter movie genre" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                <div class="formLabel">Director Name</div>
                <div class="sm:col-span-2 sm:mt-0">
                  <input autocomplete="off" required="true" name="director.name" type="text" value="Guy Ritchie" class="formInput" placeholder="enter director name" />
                </div>
              </div>

              <div class="sm:grid sm:grid-cols-3 sm:items-start">
                <label for="directorImage" class="formLabel">Upload Director Image</label>
                <div class="sm:col-span-2 sm:mt-0">
                  <Upload height="h-40" bind:files={directorImage} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:items-start">
                <label for="moviePoster" class="formLabel">Upload Movie Poster</label>
                <div class="sm:col-span-2 sm:mt-0">
                  <Upload height="h-40" bind:files={moviePoster} imageHeight="max-h-32" radius="rounded-md" position="top-0 right-0" />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end">
            <button type="submit" class="w-28 rounded-md bg-green-500 py-2 text-sm font-medium text-white hover:bg-green-600 active:bg-green-500">
              <i class="fa-solid fa-user-plus" />
              &nbsp;Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
