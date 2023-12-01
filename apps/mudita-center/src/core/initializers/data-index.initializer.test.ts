/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { EventEmitter } from "events"
import { IndexFactory } from "App/index-storage/factories"
import { DataIndex } from "App/index-storage/constants"
import { Model, Field } from "App/core/decorators"
import { BaseModel } from "App/core/models"
import { DataIndexInitializer } from "./data-index.initializer"

type TestingRecord = { id: string; text: string }

@Model(DataIndex.Message)
class FakeModel extends BaseModel<TestingRecord> {
  @Field("ref")
  public id: string | undefined

  @Field()
  public text: string | undefined
}

const fakeEventEmitter = new EventEmitter()
const fakeIndex = new IndexFactory().create()
const fakeInstance = new FakeModel(fakeIndex, fakeEventEmitter)
const subject = new DataIndexInitializer(fakeIndex)

describe("Method: initialize", () => {
  test("fills index map with `DataIndex.Message` model data", () => {
    expect(fakeIndex.size).toEqual(0)

    subject.initialize([fakeInstance])

    expect(fakeIndex.size).toEqual(1)
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fakeIndex.get(DataIndex.Message) as Index<any> & { _fields: string[] })
        ._fields
    ).toEqual(["text"])
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fakeIndex.get(DataIndex.Message) as Index<any> & { _ref: string })._ref
    ).toEqual("id")
  })
})
