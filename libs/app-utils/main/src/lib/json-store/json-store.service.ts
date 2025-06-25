/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ExpandPaths } from "./json-store.types"
import { DotNotation, DotValue, NestedPartial } from "app-utils/models"
import { getBaseJsonStoreService } from "./base-json-store.service"

export class JsonStoreService<Data extends Record<string, unknown>> {
  private base = getBaseJsonStoreService()

  constructor(
    private name: string,
    defaultData: Data
  ) {
    this.base.init(name, defaultData)
  }

  get path() {
    return this.base.getPath(this.name)
  }

  get(): Data
  get<P extends DotNotation<Data>>(path: P): DotValue<Data, P>
  get<P extends DotNotation<Data>>(path?: P): DotValue<Data, P> | Data {
    return this.base.get<Data, P>(this.name, path)
  }

  getBatch<const Paths extends readonly DotNotation<Data>[]>(
    ...paths: Paths
  ): ExpandPaths<Paths, Data> {
    return this.base.getBatch<Data, Paths>(
      this.name,
      ...paths
    )
  }

  set<D extends NestedPartial<Data> | Partial<Data>>(data: D): Data {
    return this.base.set<Data>(this.name, data)
  }
}
