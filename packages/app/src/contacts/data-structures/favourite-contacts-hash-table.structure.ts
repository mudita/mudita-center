/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HashTable } from "App/core/data-structures"
import { Contact } from "App/contacts/dto"

export class FavouriteContactsHashTable extends HashTable<Contact> {
  constructor() {
    super()
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public hash(_: Contact): string {
    return ""
  }

  get length(): number {
    return Object.keys(this.table).length
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public map(callback: (key: string, value: Contact[]) => any): any {
    const results = []

    for (const key of Object.keys(this.table)) {
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
