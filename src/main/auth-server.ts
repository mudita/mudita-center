import http from "http"
export const authServerPort = 3456

let server: http.Server

export const createAuthServer = (
  cb?: (body: string) => void | Promise<void>
): void => {
  server = http.createServer((req, res) => {
    if (req.method === "POST") {
      let body = ""

      res.statusCode = 200
      req.on("data", (data) => (body += data))
      req.on("end", () => {
        cb && cb(body)
      })
    } else {
      res.statusCode = 400
    }

    res.end()
  })

  server.listen(authServerPort, () => {
    if (process.env.NODE_ENV === "development") {
      console.log("Server ready on 3456")
    }
  })
}

export const killAuthServer = (): void => {
  if (server) {
    server.close()

    if (process.env.NODE_ENV === "development") {
      console.log("Server killed")
    }
  }
}
