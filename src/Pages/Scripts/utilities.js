import QRCode from "qrcode"

/**
 * Function for loading JS library
 * @param id {String} - id for the newly creating script element
 * @param location {String} - path for the library
 */
export const loadJS = async (id, location) => {
  return new Promise((resolve) => {
    if (!document.getElementById(id)) {
      let elem = document.createElement("script")
      elem.id = id
      elem.type = "application/javascript"
      elem.src = location
      document.body.appendChild(elem)
      elem.onload = async function () {
        resolve()
      }
    }
  })
}

/**
 * Converts FormData object to JSON object.
 * @param {FormData} formData - The FormData object to be converted.
 * @returns {Object} - The JSON object representing the FormData data.
 */
export const formdata2json = (formData) => {
  const data = {}
  for (let field of formData) {
    const [key, value] = field
    data[key] = value
  }
  return data
}

export const copyToClipboard = async (textToCopy) => {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy)
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea")
    textArea.value = textToCopy

    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute"
    textArea.style.left = "-999999px"

    document.body.prepend(textArea)
    textArea.select()

    try {
      document.execCommand("copy")
    } catch (error) {
      console.error(error)
    } finally {
      textArea.remove()
    }
  }
}

/**
 * Generates a QR code image as a Data URL based on the given value.
 * @param {string} value - The data or value for which to generate the QR code.
 * @returns {Promise<string>} A Promise that resolves with the Data URL representing the QR code image.
 */
export const loadQR = async (value) => {
  /**
   * @typedef {string} DataURL - Represents a Data URL, which is a URL that embeds data directly in the URL.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs Data URLs}
   */

  try {
    /**
     * The QRCode library is used to generate a Data URL for the given value.
     * @function QRCode.toDataURL
     * @param {string} value - The data or value for which to generate the QR code.
     * @returns {Promise<DataURL>} A Promise that resolves with the Data URL representing the QR code image.
     */
    let qrImage = await QRCode.toDataURL(value)

    // Return the generated Data URL representing the QR code image.
    return qrImage
  } catch (err) {
    // If there's an error during the QR code generation, log the error and return undefined.
    console.error(err)
    return undefined
  }
}
