import { writable } from "svelte/store"
/**
 * @type {ApplicationState}
 */
let storedApplicationState = localStorage.getItem("BOOKMYSHOW")
if (typeof storedApplicationState != "Object") {
  try {
    storedApplicationState = JSON.parse(storedApplicationState)
    if (!storedApplicationState) {
      throw new Error("storedApplicationState value is null")
    }
  } catch (error) {
    // console.error(error)
    storedApplicationState = {}
    storedApplicationState.notificationPosition = "top-right"
    // storedApplicationState.currentContent = "settings-settings"
  } finally {
    storedApplicationState.checkUpdateValue = {}
  }
}

/**
 * @typedef {Object} ApplicationState - represents application states during its operations
 * @type {Object}
 * represents application states during its operations
 *
 * @property {string} token - x-accesss-token to be used for authenticating other request
 * @property {string} created - ISO8601 Date of when the user was created
 * @property {string} email - Registered email of the user
 * @property {string} issuerID - ID of the currently logged in user
 * @property {string} name - Registered Name of the user
 * @property {string} pubkey - Public Key of the user
 * @property {string} tokenhmac - hmac value for the generated token
 * @property {Object} section - indicates the section shows in the main container
 * @property {"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center"| "bottom-right"} notificationPosition - position of the notification that given by user
 * @property {string} bulkId - Bulk ID.
 * @property {Boolean} showExpiryNotification - Bulk ID.
 */

/**
 * @type {import("svelte/store").Writable<ApplicationState>}
 */
const ApplicationState = writable(storedApplicationState)

ApplicationState.subscribe((value) => {
  localStorage.setItem("BOOKMYSHOW", JSON.stringify(value))
})

export default ApplicationState
