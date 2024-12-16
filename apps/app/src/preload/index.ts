/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { contextBridge } from "electron"
import { electronAPI } from "@electron-toolkit/preload"
import initSqlJs from "sql.js"
// import initSqlJs from "sql.js"
// import fs from "fs"
import path from "path"

// Custom APIs for renderer
const api = {
  SQL: {
    init: async function () {
      const sql = initSqlJs({
        locateFile: () =>
          path.join(__dirname, "..", "renderer", "sql-wasm.wasm"),
      })
      return (await sql).Database
      // const db = new (await sql).Database()
      // console.log({ db })
      // return db
    },
  },
  // SQL: {
  //   init: () =>
  //     initSqlJs().then((SQL) => {
  //       const db = new SQL.Database(
  //         fs.readFileSync(path.join(__dirname, "test.sqlite"))
  //       )
  //       console.log(db)
  //       db.run(`CREATE TABLE test (col1, col2)`)
  //       db.run(`INSERT INTO test VALUES (1, 2)`)
  //       const res = db.exec(`SELECT * FROM test`)
  //       console.log({ res })
  //       return db
  //     }),
  // },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI)
    contextBridge.exposeInMainWorld("api", api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-expect-error (define in dts)
  window.electron = electronAPI
  // @ts-expect-error (define in dts)
  window.api = api
}
