/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import initSqlJs, { Database, SqlJsStatic } from "sql.js/dist/sql-wasm"

export class AppSql {
  private readonly sql: Promise<SqlJsStatic>
  private readonly instances: Map<string, Database>

  constructor() {
    this.sql = initSqlJs()
    this.instances = new Map()
  }

  private instanceExists(name: string) {
    return this.instances.has(name)
  }

  private async createInstance(name: string) {
    const sql = await this.sql
    this.instances.set(name, new sql.Database())
  }

  private async ensureInstance(name: string) {
    if (!this.instanceExists(name)) {
      await this.createInstance(name)
    }
    return this.instances.get(name) as Database
  }

  async runQuery(name: string, query: string) {
    const db = await this.ensureInstance(name)
    db.run(query)
  }

  async executeQuery(name: string, query: string) {
    const db = await this.ensureInstance(name)
    return db.exec(query)
  }
}
