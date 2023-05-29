/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  PhoneNumberInput,
  PhoneNumberObject,
  PhoneNumberEntity,
} from "App/data-sync/types"

export class PhoneNumberPresenter {
  private serializeRecord<Type>(values: string[][], columns: string[]): Type[] {
    return values.map((item) => {
      return columns.reduce((acc: Record<string, string>, value, index) => {
        acc[value.trim()] = String(item[index]).trim()
        return acc
      }, {})
    }) as unknown as Type[]
  }

  public serializeToObject(data: PhoneNumberInput): PhoneNumberObject[] {
    if (!data.numbers) {
      return []
    }

    const phoneNumbers = this.serializeRecord<PhoneNumberEntity>(
      data.numbers.values,
      data.numbers.columns
    )

    return phoneNumbers.map(({ _id, number_user }) => {
      return {
        id: _id,
        number: number_user,
      }
    })
  }
}
