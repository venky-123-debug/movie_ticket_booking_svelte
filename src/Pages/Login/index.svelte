<script>
  import { push } from "svelte-spa-router"
  import axios from "axios"
  import { formdata2json } from "../Scripts/utilities"
  import sha256 from "crypto-js/sha256"
  import { parseJWT } from "../Scripts/token"
  import { onMount } from "svelte"
  import ApplicationState from "../../stores/applicationStates"

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
      } else {
        push("/home")
      }
    } catch (error) {
      console.error(error)
      notify.danger(error)
      $ApplicationState = {}
    }
  }
</script>

<div class="relative flex h-screen w-screen overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black">
  <div class=" h-full w-full select-none">
    <!-- login form -->
    <div class="mobile:inset-auto mobile:left-0 mobile:w-[500px] mobile:p-0 absolute inset-0 flex h-full items-center bg-black/60 p-5">
      <!-- <div
      class="absolute inset-0 flex h-full items-center bg-black/60 p-5 mobile:inset-auto mobile:left-auto mobile:right-0 mobile:w-[500px] mobile:p-0"
    > -->
      <div class="mobile:h-full mobile:items-start mobile:justify-start mobile:rounded-none mobile:p-16 flex w-full flex-col rounded-2xl bg-transparent p-5">
        
        <!-- heading  -->
        <div class="mobile:items-start mobile:justify-start flex items-center justify-center">
          <h1 class="mb-10 text-2xl font-bold text-white">Login</h1>
        </div>

        <form class="flex w-full flex-col items-center justify-center" on:submit|preventDefault={onLogin}>
          <div class="w-full">
            <!-- <p class="mb-2 text-sm text-white">Email Address</p> -->
            <div class="group">
              <div class=" mobile:mb-10 relative mb-3 w-full border-b-2 border-gray-500 group-focus-within:border-blue-500">
                <input name="email" required="true" type="email" value="admin@email.com" class="w-full rounded-md border border-none bg-transparent pl-8 text-white focus:ring-0" placeholder="Email" />
                <div class="absolute inset-y-0 left-0 flex aspect-square items-center text-gray-500 group-focus-within:text-blue-500">
                  <i class="fa-solid fa-envelope" />
                </div>
              </div>
            </div>

            <!-- <p class="mb-2 text-sm text-white">Password</p> -->
            <div class="group">
              <div class="mobile:mb-10 group relative mb-3 w-full border-b-2 border-gray-500 group-focus-within:border-blue-500">
                <input bind:this={passwordField} bind:value={passwordValue} name="password" type="password" class="w-full rounded-md border-none bg-transparent pl-8 text-white focus:ring-0" placeholder="Password" />
                <div class="absolute inset-y-0 left-0 flex aspect-square items-center text-gray-500 focus:bg-blue-500 group-focus-within:text-blue-500">
                  <i class="fa-regular fa-key fa-rotate-270" />
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
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

            <div class="mobile:mt-0 mt-6 flex w-full items-center justify-center">
              {#if showloading}
                <span class="text-white">Logging in&ensp;</span>
                <svg width="20" height="7" stroke="#8087BD" fill="#8087BD" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
                  <circle class="circle" cx="15" cy="15" r="15" />
                  <circle class="circle1" cx="60" cy="15" r="9" fill-opacity="0.9" />
                  <circle class="circle2" cx="105" cy="15" r="15" />
                </svg>
              {:else}
                <button type="submit" class="mobile:w-2/6 w-full rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none">
                  <i class="fa-solid fa-right-to-bracket" />
                  &nbsp;Login
                </button>
              {/if}
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- footer -->
    <div class="mobile:left-0 mobile:bottom-8 mobile:w-[500px] absolute bottom-8 flex w-full select-none items-center justify-center">
      <!-- <div
      class="absolute bottom-8 flex w-full select-none items-center justify-center mobile:right-0 mobile:bottom-8 mobile:w-[500px]"
    > -->
      <p class="text-center text-base text-white">
        &copy; {new Date().getFullYear()} Print2Block.com, Inc.
        <br />
        All rights reserved.
      </p>
    </div>
  </div>
</div>
