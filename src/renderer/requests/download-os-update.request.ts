import { ipcRenderer } from "electron-better-ipc"

const downloadOsUpdateRequest = (file: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      let startTime = 0
      let currentTime = 0

      ipcRenderer.send("download", {
        url: `https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/${file}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLNHCTENZY3X4VS4/20200221/eu-central-1/s3/aws4_request&X-Amz-Date=20200221T153012Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=82579e455cd4f9c740423073e072c74c8403274ce0c16c93c4903cd8fb029348`,
      })

      ipcRenderer.on("download-progress", (event, args) => {
        currentTime = new Date().getTime()
        if (!startTime) {
          startTime = currentTime - 1
        }

        const {
          status,
          data: { total, received },
        } = args

        const timeDiff = (currentTime - startTime) / 1000
        const percent = Math.round((received / total) * 100)
        const percentLeft = 100 - percent

        if (status === "progressing") {
          console.log(
            `Download progress: ${percent}%, estimated time left: ${(timeDiff /
              percent) *
              percentLeft}`
          )
        } else {
          console.log(`Download ${status}.`)
        }
      })

      ipcRenderer.on("download-finished", (event, args) => {
        console.log(`Download ${args.status}.`)
        resolve(args)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export default downloadOsUpdateRequest
