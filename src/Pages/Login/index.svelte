<script>
  import { push } from "svelte-spa-router"
  import axios from "axios"
  import { formdata2json } from "../Scripts/utilities"
  import sha256 from "crypto-js/sha256"
  import { parseJWT } from "../Scripts/token"
  import { onMount } from "svelte"
  import ApplicationState from "../../stores/applicationStates"
  import notify from "../../Pages/shared/Notification/script/notify"

  let showPassword

  let passwordValue = "password"
  // let passwordValue = "NewPass@12345"

  let passwordField

  /**
   * @type {Boolean} showloading- to display status on login button click
   */
  let showloading = false
  /**
   * @typedef {Object} loginNotification
   * @property {Function} close - Closes the notification.
   */

  /**
   * @type {loginNotification}
   */
  let loginNotification = {
    /**
     * Closes the notification.
     */
    close() {},
  }
  onMount(async () => {
    setTimeout(async () => {
      if ($ApplicationState.token && $ApplicationState.tokenhmac) await checkTokenExpiry()
    }, 50)
  })

  const checkTokenExpiry = async () => {
    try {
      let parsedJwt = parseJWT($ApplicationState.token)
      // console.log({ parsedJwt })
      if (Date.now() > parsedJwt.exp * 1000 || Date.now() - parsedJwt.iat * 1000 > 86400000) {
        throw "Token expired"
      } 
      // else {
      //   push("#/addNewMovie")
      // }
    } catch (error) {
      console.error(error)
      notify.danger(error)
      $ApplicationState = {}
    }
  }
  /**
   * Function for submitting the login details
   */
  const onLogin = async (e) => {
    // Close the login notification, if it exists.
    loginNotification.close()

    // Create a new FormData object from the form data.
    const formData = new FormData(e.target)

    // Convert the FormData object to a JSON object using the formdata2json function.
    const inputData = formdata2json(formData)

    try {
      // Show a loading indicator while waiting for the response.
      showloading = true

      let data = await logIn(inputData)
      console.log({data});
      // Save the authentication token received from the server in the application state.
      $ApplicationState.token = data.token
      $ApplicationState.tokenhmac = sha256(data.token).toString()
      $ApplicationState.showExpiryNotification = false

      // Create a success notification to inform the user about successful login.
      loginNotification = notify.success("You have successfully logged in.")
      push("/Movies/AddNewMovie")
    } catch (error) {
      console.error(error)
      loginNotification = notify.danger(error)
    } finally {
      // After completing the login process (whether successful or not),
      // hide the loading indicator.
      showloading = false
    }
  }

  const logIn = (inputData) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(!window.navigator.onLine) reject("Network error")
        let { data } = await axios.post(`/bookApi/admin/login`, inputData, {})
        if (data.error) throw data.errorCode
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
</script>

<div class="object_cover relative flex h-screen w-screen overflow-hidden object-contain" style="background-image: url(assets/img/bg_img.png);">
  <!-- <div class="relative flex h-screen w-screen overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black"> -->
  <div class=" flex  w-full select-none items-center justify-center m-20">
    <!-- login form -->
    <div class="absolute inset-0 m-5 md:m-auto flex min-h-[60%] h-[60%] rounded-md items-center justify-center bg-black/90 p-5 mobile:w-[450px] mobile:p-0">
      <div class="flex w-full flex-col rounded-2xl bg-transparent p-5 ">
        <div class="flex items-center justify-center ">
          <h1 class="mb-10 text-4xl font-bold text-white">Admin</h1>
        </div>

        <!-- heading  -->
        <div class="flex items-center justify-center mobile:items-start mobile:justify-start">
          <h1 class="mb-10 text-2xl font-bold text-white">Login</h1>
        </div>

        <form class="flex w-full flex-col items-center justify-center" on:submit|preventDefault={onLogin}>
          <div class="w-full">
            <div class="group">
              <div class=" relative mb-3 w-full rounded-md border border-gray-500 px-2 group-focus-within:border-blue-500 mobile:mb-10">
                <input name="email" required="true" type="email" value="admin@email.com" class="w-full rounded-md border border-none bg-transparent pl-8 text-gray-200 focus:ring-0" placeholder="Email" />
                <div class="absolute inset-y-0 left-2 flex aspect-square items-center text-gray-500 group-focus-within:text-blue-500">
                  <i class="fa-solid fa-envelope" />
                </div>
              </div>
            </div>

            <div class="group">
              <div class="group relative mb-3 w-full rounded-md border border-gray-500 px-2 group-focus-within:border-blue-500 mobile:mb-10">
                <input bind:this={passwordField} bind:value={passwordValue} name="password" type="password" class="w-full border-none bg-transparent pl-8 text-gray-200 focus:ring-0" placeholder="Password" />
                <div class="absolute inset-y-0 left-2 flex aspect-square items-center text-gray-500 focus:bg-blue-500 group-focus-within:text-blue-500">
                  <i class="fa-regular fa-key fa-rotate-270" />
                </div>
                <button
                  type="button"
                  on:click={() => {
                    showPassword = !showPassword
                    passwordField.type = showPassword ? "text" : "password"
                  }}
                  class:hidden={!passwordValue}
                  class="absolute inset-y-0 right-0 flex aspect-square items-center justify-center text-gray-500 disabled:cursor-not-allowed"
                >
                  {#if showPassword}
                    <i class="fa-solid fa-eye group-focus-within:text-blue-500" />
                  {:else}
                    <i class="fa-solid fa-eye-slash group-focus-within:text-blue-500" />
                  {/if}
                </button>
              </div>
            </div>

            <div class="mt-6 flex w-full items-center h-10 justify-center mobile:mt-0">
              {#if showloading}
                <span class="text-white">Logging in&ensp;</span>
                <svg width="20" height="7" stroke="#8087BD" fill="#8087BD" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
                  <circle class="circle" cx="15" cy="15" r="15" />
                  <circle class="circle1" cx="60" cy="15" r="9" fill-opacity="0.9" />
                  <circle class="circle2" cx="105" cy="15" r="15" />
                </svg>
              {:else}
                <button type="submit" class="w-full rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none mobile:w-2/6">
                  <i class="fa-solid fa-right-to-bracket" />
                  &nbsp;Login
                </button>
              {/if}
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  .object_cover {
    background-size: contain;
    background-position: center;
  }
</style>
