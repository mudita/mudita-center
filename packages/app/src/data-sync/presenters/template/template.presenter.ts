/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  TemplateObject,
  TemplateInput,
  TemplateEntity,
} from "App/data-sync/types"

export class TemplatePresenter {
  public findRecords<Type extends { _id: string }>(
    data: { _id: string }[],
    recordId: string
  ): Type | undefined {
    return (data as unknown as Type[]).find((item) => item._id === recordId)
  }

  public serializeRecord<Type>(values: string[][], columns: string[]): Type[] {
    return values.map((item) => {
      return columns.reduce((acc: Record<string, string>, value, index) => {
        acc[value.trim()] = String(item[index]).trim()
        return acc
      }, {})
    }) as unknown as Type[]
  }

  public serializeToObject(data: TemplateInput): TemplateObject[] {
    if (data.templates === undefined) {
      return []
    }

    const templates = this.serializeRecord<TemplateEntity>(
      data.templates.values,
      data.templates.columns
    )

    return templates
      .map((template) => {
        return {
          id: template._id,
          text: template.text,
          lastUsedAt: template.lastUsageTimestamp,
          order: Number(template.rowOrder),
        }
      })
      .filter((thread) => typeof thread !== "undefined") as TemplateObject[]
  }
}
