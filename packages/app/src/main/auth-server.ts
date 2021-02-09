/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import http from "http"
export const authServerPort = 3456

let server: http.Server | null = null

export const createAuthServer = (
  callback: (body: string) => void | Promise<void>
): void => {
  if (server) {
    killAuthServer()
  }

  server = http.createServer((req, res) => {
    if (req.method === "POST") {
      let rawData = ""

      res.statusCode = 200
      req.on("data", (chunk) => (rawData += chunk))
      req.on("end", () => {
        callback(rawData)
      })
    } else {
      res.statusCode = 400
    }

    res.end()
  })

  server.listen(authServerPort, () => {
    if (process.env.NODE_ENV === "development") {
      console.log(`Server ready on ${authServerPort}`)
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
