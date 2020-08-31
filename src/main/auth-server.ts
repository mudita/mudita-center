import http from "http"
export const authServerPort = 3456

let server: http.Server

export const createAuthServer = (
  cb?: (body: string) => void | Promise<void>
): void => {
  server = http.createServer((req, res) => {
    if (req.method === "POST") {
      let body = ""

      req.on("data", (data) => (body += data))
      req.on("end", () => {
        cb && cb(body)
        res.end()
      })
    }
  })

  server.listen(authServerPort, () => {
    if (process.env.NODE_ENV === "development") {
      console.log("Server ready on 3456")
    }
  })
}

export const killAuthServer = (): void => {
  server.close()
}
