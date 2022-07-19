/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HashTable } from "App/core/data-structures"
import { Contact } from "App/contacts/dto"

export class ContactsHashTable extends HashTable<Contact> {
  constructor() {
    super()
  }

  public hash(value: Contact): string {
    return value.lastName ? value.lastName[0].toLocaleLowerCase() : ""
  }

  get length(): number {
    return Object.keys(this.table).length
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public map(callback: (key: string, value: Contact[]) => any): any {
    const results = []
    const keys = Object.keys(this.table).sort((first, second) => {
      if (first === "" || second === "") {
        return -1
      }
      if (first < second) {
        return -1
      }
      if (first > second) {
        return 1
      }
      return 0
    })

    for (const key of keys) {
      results.push(callback(key, this.table[key]))
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return results
  }

  public flat(): Contact[] {
    return Object.values(this.table).flat()
  }
}
