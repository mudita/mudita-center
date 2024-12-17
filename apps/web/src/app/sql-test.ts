/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useRef } from "react"
import { AppSql } from "app-sql/renderer"

export const useSql = () => {
  const ref = useRef(0)

  useEffect(() => {
    ref.current += 1
    void (async () => {
      if (ref.current > 1) return
      const dbName = "test"

      const sqlstr = `
      CREATE TABLE IF NOT EXISTS hello (a int, b char);
      INSERT INTO hello VALUES (0, 'hello');
      INSERT INTO hello VALUES (1, 'world');`
      await AppSql.run(dbName, sqlstr)

      const result = await AppSql.exec(
        dbName,
        `SELECT * FROM hello WHERE a=1 OR b='hello'`
      )
      console.log(result)
    })()
  }, [])
}
