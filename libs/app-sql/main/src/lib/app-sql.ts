/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import initSqlJs, { Database, SqlJsStatic } from "sql.js/dist/sql-wasm"
import { AppSqlInitializationOptions } from "app-sql/models"
import { AppFileSystemService } from "app-utils/main"
import { AppResult, AppResultFactory } from "app-utils/models"

export class AppSql {
  private readonly sql: Promise<SqlJsStatic>
  private readonly instances: Map<string, Database>

  constructor(private appFileSystemService: AppFileSystemService) {
    this.sql = initSqlJs()
    this.instances = new Map()
  }

  async initialize(options: AppSqlInitializationOptions): Promise<AppResult> {
    const name = options.name
    const readFileResult = await this.appFileSystemService.readFile({
      ...options,
      encoding: "buffer",
    })

    if (!readFileResult.ok) {
      return readFileResult
    }

    if (this.instances.has(name)) {
      this.instances.get(name)?.close()
      this.instances.delete(name)
    }

    const db = new (await this.sql).Database(
      readFileResult.data as unknown as Buffer
    )

    this.instances.set(name, db)

    return AppResultFactory.success()
  }

  async runQuery(name: string, query: string) {
    const db = await this.ensureInstance(name)
    db.run(query)
  }

  async executeQuery(name: string, query: string) {
    const db = await this.ensureInstance(name)
    return db.exec(query)
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
}
