/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index, SerialisedIndexData } from "elasticlunr"
import { IndexStorage } from "App/index-storage/types"
import { DataIndex } from "App/index-storage/constants"
import { IndexConnectionError } from "App/core/errors"

export class BaseModel<Type extends { id: string }> {
  private _modelName: DataIndex = "" as DataIndex
  public connection: Index<Type> | undefined = undefined

  constructor(public index: IndexStorage) {}

  set modelName(value: DataIndex) {
    this._modelName = value
  }

  get modelName() {
    return this._modelName
  }

  public all(): Type[] {
    this.checkConnection()
    return Object.values(
      (this.connection as unknown as SerialisedIndexData<Type>)?.documentStore
        .docs
    )
  }

  public findById(id: string): Type | undefined {
    this.checkConnection()
    return this.connection?.documentStore.getDoc(id)
  }

  public create(data: Type): Type | undefined {
    this.checkConnection()
    const changedData = this.beforeCreate(data)
    this.connection?.addDoc(changedData)
    const record = this.findById(data.id)

    if (record) {
      this.afterCreate(record)
    }

    return record
  }

  public update(data: Type): Type | undefined {
    this.checkConnection()
    const changedData = this.beforeUpdate(data)
    this.connection?.updateDoc(changedData)
    const record = this.findById(data.id)

    if (record) {
      this.afterUpdate(record)
    }

    return record
  }

  public delete(id: string): void {
    this.checkConnection()
    this.beforeDelete(id)
    this.connection?.removeDocByRef(id)
    this.afterDelete(id)
  }

  private checkConnection(): void {
    this.connection = this.index.get(this._modelName)

    if (!this.connection) {
      throw new IndexConnectionError(
        `Cannot connect to '${this._modelName}' index`
      )
    }
  }

  public beforeCreate(data: Type): Type {
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public afterCreate(_data: Type): void {}

  public beforeUpdate(data: Type): Type {
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public afterUpdate(_data: Type): void {}

  public beforeDelete(id: string): string {
    return id
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public afterDelete(_id: string): void {}
}
