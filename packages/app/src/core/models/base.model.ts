/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index, SerialisedIndexData } from "elasticlunr"
import { ModelError, ModelEvent } from "App/core/constants"
import { AppError } from "App/core/errors"
import { DataIndex } from "App/index-storage/constants"
import { IndexStorage } from "App/index-storage/types"
import { EventEmitter } from "events"

export class BaseModel<Type extends { id: string }> {
  private _modelName: DataIndex = "" as DataIndex
  public connection: Index<Type> | undefined = undefined

  constructor(public index: IndexStorage, public eventEmitter: EventEmitter) {}

  set modelName(value: DataIndex) {
    this._modelName = value
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

  public create(data: Type, skipCallbacks = false): Type | undefined {
    this.checkConnection()
    const changedData = this.beforeCreate(data)
    this.connection?.addDoc(changedData)
    const record = this.findById(data.id)

    if (record) {
      this.afterCreate(record)
    }

    if (!skipCallbacks && record) {
      this.eventEmitter.emit(ModelEvent.Created)
    }

    return record
  }

  public update(data: Type, skipCallbacks = false): Type | undefined {
    this.checkConnection()
    const changedData = this.beforeUpdate(data)
    this.connection?.updateDoc(changedData)
    const record = this.findById(data.id)

    if (record) {
      this.afterUpdate(record)
    }

    if (!skipCallbacks && record) {
      this.eventEmitter.emit(ModelEvent.Updated)
    }

    return record
  }

  public delete(id: string, skipCallbacks = false): void {
    this.checkConnection()
    const data = this.findById(id)

    if (!data) {
      return
    }

    this.beforeDelete(data)
    this.connection?.removeDocByRef(id)
    this.afterDelete(data)

    if (!skipCallbacks) {
      this.eventEmitter.emit(ModelEvent.Deleted)
    }
  }

  private checkConnection(): void {
    this.connection = this.index.get(this._modelName)

    if (!this.connection) {
      throw new AppError(
        ModelError.IndexConnection,
        `Cannot connect to '${this._modelName}' index`
      )
    }
  }

  public beforeCreate(data: Type): Type {
    return data
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public afterCreate(_data: Type): void {}

  public beforeUpdate(data: Type): Type {
    return data
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public afterUpdate(_data: Type): void {}

  public beforeDelete(data: Type): Type {
    return data
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public afterDelete(_data: Type): void {}
}
