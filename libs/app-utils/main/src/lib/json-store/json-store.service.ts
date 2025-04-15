/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { app } from "electron"
import fs from "fs-extra"
import lodash from "lodash"
import { DotNotation, DotValue, ExpandPaths } from "./json-store.types"
import { NestedPartial } from "app-utils/models"
import logger from "electron-log"

export class JsonStoreService<Data extends Record<string, unknown>> {
  private readonly data: Data

  constructor(
    private name: string,
    defaultData: Data
  ) {
    this.data = this.readData(defaultData)
  }

  private readData(defaultData: Data) {
    const pathExists = fs.pathExistsSync(this.path)
    if (!pathExists) {
      logger.info("Creating new json-store file:", this.name)
      fs.writeJsonSync(this.path, defaultData, {
        spaces: 2,
      })
      return defaultData
    } else {
      return fs.readJsonSync(this.path)
    }
  }

  private writeData() {
    fs.writeJsonSync(this.path, this.data, {
      spaces: 2,
    })
  }

  get path() {
    return path.join(app.getPath("userData"), `${this.name}.json`)
  }

  get(): Data
  get<P extends DotNotation<Data>>(path: P): DotValue<Data, P>
  get<P extends DotNotation<Data>>(path?: P): DotValue<Data, P> | Data {
    if (path) {
      return lodash.get(this.data, path) as DotValue<Data, P>
    }
    return this.data as Data
  }

  getBatch<const Paths extends readonly DotNotation<Data>[]>(
    ...paths: Paths
  ): ExpandPaths<Paths, Data> {
    return paths.reduce((acc, path) => {
      const value = this.get(path)
      lodash.set(acc, path, value)
      return acc
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any)
  }

  set<D extends NestedPartial<Data> | Partial<Data>>(data: D): Data {
    lodash.merge(this.data, data)
    this.writeData()
    return this.data as Data
  }
}
