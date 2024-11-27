/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export abstract class BasePresenter {
  protected serializeRecord<Type>(
    values: string[][],
    columns: string[]
  ): Type[] {
    return values.map((value) => {
      return columns.reduce((acc: Record<string, string>, column, index) => {
        acc[column.trim()] = this.normalizeToString(value[index])
        return acc
      }, {})
    }) as unknown as Type[]
  }

  private normalizeToString(value: number | string | undefined | null): string {
    if (value === undefined || value === null) {
      return ""
    } else {
      return String(value).trim()
    }
  }
}
