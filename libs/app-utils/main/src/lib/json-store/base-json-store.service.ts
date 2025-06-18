/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app } from "electron"
import lodash from "lodash"
import path from "path"
import fs from "fs-extra"
import type { DotNotation, DotValue, NestedPartial } from "app-utils/models"
import { ExpandPaths } from "./json-store.types"

class BaseJsonStoreService {
  private data: Record<string, Record<string, unknown>> = {}

  public init<Data extends Record<string, unknown>>(
    name: string,
    data: Data = {} as Data
  ): void {
    const filePath = this.getPath(name)
    let store: Data

    if (!fs.pathExistsSync(filePath)) {
      this.save(name, data)
      store = data
    } else {
      store = fs.readJsonSync(filePath) as Data
    }

    this.data[name] = store
  }

  public has(name: string): boolean {
    return name in this.data
  }

  public get<Data extends Record<string, unknown>, P extends DotNotation<Data>>(
    name: string,
    path?: P
  ): Data | DotValue<Data, P> {
    const store = this.ensureStoreExists<Data>(name)
    return path ? (lodash.get(store, path) as DotValue<Data, P>) : store
  }

  public getBatch<
    Data extends Record<string, unknown>,
    const Paths extends readonly DotNotation<Data>[],
  >(name: string, ...paths: Paths): ExpandPaths<Paths, Data> {
    return paths.reduce(
      (acc, p) => {
        lodash.set(acc, p, this.get<Data, typeof p>(name, p))
        return acc
      },
      {} as ExpandPaths<Paths, Data>
    )
  }

  public set<Data extends Record<string, unknown>>(
    name: string,
    partial: NestedPartial<Data> | Partial<Data>
  ): Data {
    const store = this.ensureStoreExists<Data>(name)
    lodash.merge(store, partial)
    this.save(name, store)
    return store
  }

  public getPath(name: string): string {
    return path.join(app.getPath("userData"), `${name}.json`)
  }

  private save<Data extends Record<string, unknown>>(name: string, data: Data) {
    fs.writeJsonSync(this.getPath(name), data, {
      spaces: 2,
    })
  }

  private ensureStoreExists<Data extends Record<string, unknown>>(
    name: string
  ): Data {
    const store = this.data[name]
    if (!store) {
      throw new Error(
        `[BaseJsonStoreService] Store "${name}" has not been initialized. Call initStore() first.`
      )
    }
    return store as Data
  }
}

let baseStoreInstance: BaseJsonStoreService | null = null

export function getBaseJsonStoreService(): BaseJsonStoreService {
  if (!baseStoreInstance) {
    baseStoreInstance = new BaseJsonStoreService()
  }
  return baseStoreInstance
}
