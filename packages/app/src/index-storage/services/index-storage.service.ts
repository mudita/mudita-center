/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import elasticlunr from "elasticlunr"
import { DataIndex } from "App/index-storage/constants"
import { IndexStorage } from "App/index-storage/types"
import { FieldDefinition } from "App/core/types"

export class IndexStorageService {
  public indexesMap: IndexStorage = new Map()

  public createIndex(indexName: DataIndex, fields: FieldDefinition[]): void {
    const index = elasticlunr<any>()

    fields.forEach((field) => {
      if (field.type === "ref") {
        index.setRef(field.propertyName)
      } else {
        index.addField(field.propertyName)
      }
    })

    this.indexesMap.set(indexName, index)
  }

  // TODO Method for required for reading and saving cache to encrypted files
  // private loadIndex() {}
  // private saveIndex() {}
}
