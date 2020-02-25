/**
 * Delays async function to be resolved not earlier than after given time.
 *
 * @param {Promise} promise - Promise to delay
 * @param {number} delay=1000 - Minimum time to resolve function (in milliseconds)
 * @returns {Promise} - Rejected or fulfilled promise
 *
 */
const delayResponse = async (
  promise: Promise<any>,
  delay: number = 1000
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const startTime = new Date().getTime()
      const result = await promise
      const timeDiff = new Date().getTime() - startTime
      if (timeDiff < delay) {
        const timeout = setTimeout(() => {
          resolve(result)
          clearTimeout(timeout)
        }, delay - timeDiff)
      } else {
        resolve(result)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export default delayResponse
