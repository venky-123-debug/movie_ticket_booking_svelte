import { writable } from "svelte/store"

/**
 * Application state store managing boolean flags.
 *
 * @typedef {Object} ApplicationStateData
 * @property {boolean} minMaXNav - Navigation menu minimized or maximized.
 * @property {boolean} checkScreenSize - Screen size checking enabled.
 * @property {boolean} floatNavOnSm - Navigation floats on small navs.
 *
 * @type {import("svelte/store").Writable<ApplicationStateData>}
 */
const ApplicationState = writable({
  /** @type {boolean} */
  minMaXNav: false,

  /** @type {boolean} */
  checkScreenSize: false,

  /** @type {boolean} */
  floatNavOnSm: false,
})

export default ApplicationState
