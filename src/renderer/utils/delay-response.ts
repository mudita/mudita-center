/**
 * Delays async function to be resolved not earlier than after given time.
 *
 * @param {Promise} promise - Promise to delay
 * @param {number} delay=1000 - Minimum time to resolve function (in milliseconds)
 * @returns {Promise} - Rejected or fulfilled promise
 *
 */
const delayResponse = async <T>(
  promise: Promise<T>,
  delay = 500
): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    const startTime = new Date().getTime()
    let timeDiff = 0

    const delayTimeout = (callback: () => void) => {
      if (timeDiff < delay) {
        const timeout = setTimeout(() => {
          callback()
          clearTimeout(timeout)
        }, delay - timeDiff)
      } else {
        callback()
      }
    }

    try {
      const result = await promise
      timeDiff = new Date().getTime() - startTime
      delayTimeout(() => resolve(result))
    } catch (error) {
      timeDiff = new Date().getTime() - startTime
      delayTimeout(() => reject(error))
    }
  })
}

export default delayResponse
