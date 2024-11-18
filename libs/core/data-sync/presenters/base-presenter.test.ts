/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BasePresenter } from "Core/data-sync/presenters/base-presenter"

class TestPresenter extends BasePresenter {
  public serializeRecord<Type>(values: string[][], columns: string[]): Type[] {
    return super.serializeRecord(values, columns)
  }
}

const presenter = new TestPresenter()

test("`serializeRecord` serialize record properly", async () => {
  const contactNameEntity = {
    _id: "4",
    contact_id: "4",
    name_primary: "Theron",
    name_alternative: "Paucek",
  }

  const values: string[][] = [["4", "4", "Theron", "Paucek"]]

  const columns: string[] = [
    "_id",
    "contact_id",
    "name_primary",
    "name_alternative",
  ]

  const records = presenter.serializeRecord<typeof contactNameEntity>(values, columns)
  expect(records).toHaveLength(1)
  expect(records).toEqual([contactNameEntity])
})
