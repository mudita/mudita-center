/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HashTable } from "App/core/data-structures"
import { Contact } from "App/contacts/dto"
import { intl } from "App/__deprecated__/renderer/utils/intl"

export class ContactsHashTable extends HashTable<Contact> {
  private favouriteKey = intl.formatMessage({
    id: "module.contacts.listFavourites",
  })

  constructor() {
    super()
  }

  public push(value: Contact): void {
    const hash = this.hash(value)

    if (!this.table[hash]) {
      this.table[hash] = []
    }

    if (value.favourite) {
      if (!this.table[this.favouriteKey]) {
        this.table[this.favouriteKey] = []
      }

      this.table[this.favouriteKey].push(value)
    }

    this.table[hash].push(value)
  }

  public hash(value: Contact): string {
    if (value.lastName) {
      return value.lastName[0].toLocaleLowerCase()
    }
    if (value.firstName) {
      return value.firstName[0].toLocaleLowerCase()
    }

    return ""
  }

  get length(): number {
    return Object.keys(this.table).length
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public map(callback: (key: string, value: Contact[]) => any): any {
    const results = []
    const keys = Object.keys(this.table)
      .filter((key) => key !== this.favouriteKey && key !== "")
      .sort((first, second) => {
        if (first < second) {
          return -1
        }
        if (first > second) {
          return 1
        }
        return 0
      })

    if (this.table[this.favouriteKey]) {
      results.push(callback(this.favouriteKey, this.table[this.favouriteKey]))
    }

    for (const key of keys) {
      results.push(callback(key, this.table[key]))
    }

    if (this.table[""]) {
      results.push(callback("", this.table[""]))
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return results
  }

  public flat(): Contact[] {
    return Object.values(this.table).flat()
  }
}
