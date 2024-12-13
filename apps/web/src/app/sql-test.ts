/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import initSqlJs from "sql.js"

export const useSql = () => {
  useEffect(() => {
    void (async () => {
      const sql = initSqlJs({
        locateFile: () => "sql-wasm.wasm",
      })

      const db = new (await sql).Database()

      const sqlstr = `
      CREATE TABLE hello (a int, b char);
      INSERT INTO hello VALUES (0, 'hello');
      INSERT INTO hello VALUES (1, 'world');`
      db.run(sqlstr)

      const stmt = db.prepare(`SELECT * FROM hello WHERE a=:aval AND b=:bval`)
      const result = stmt.getAsObject({ ":aval": 1, ":bval": "world" })
      console.log(result)
    })()
  }, [])
  //
  //   // Create a database
  //   const db = new SQL.Database()
  //   // NOTE: You can also use new SQL.Database(data) where
  //   // data is an Uint8Array representing an SQLite database file
  //
  //   // Execute a single SQL string that contains multiple statements

  //
  //   // Prepare an sql statement
  //   const stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval")
  //
  //   // Bind values to the parameters and fetch the results of the query
  //   const result = stmt.getAsObject({ ":aval": 1, ":bval": "world" })
  //   console.log(result) // Will print {a:1, b:'world'}
  //
  //   // Bind other values
  //   stmt.bind([0, "hello"])
  //   while (stmt.step()) console.log(stmt.get()) // Will print [0, 'hello']
  //   // free the memory used by the statement
  //   stmt.free()
  //   // You can not use your statement anymore once it has been freed.
  //   // But not freeing your statements causes memory leaks. You don't want that.
  //
  //   const res = db.exec("SELECT * FROM hello")
}
