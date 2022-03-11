/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexStorageService } from "App/index-storage/services"
import { Model, Field } from "App/core/decorators"
import { ReflectKey } from "App/core/constants"
import { BaseModel } from "App/core/models"
import { DataIndexInitializer } from "./data-index.initializer"

type TestingRecord = { id: string; text: string }

@Model("fake-model")
class FakeModel extends BaseModel<TestingRecord> {
  @Field("ref")
  public id: string | undefined

  @Field()
  public text: string | undefined
}

const fakeIndex = new IndexStorageService()
const fakeInstance = new FakeModel(fakeIndex.indexesMap)
const subject = new DataIndexInitializer(fakeIndex)

test("registers model metadata", () => {
  subject.initialize([fakeInstance])
  expect(
    Reflect.getMetadata(ReflectKey.Model, fakeInstance.constructor)
  ).toEqual("fake-model")
  expect(
    Reflect.getMetadata(ReflectKey.Field, fakeInstance.constructor)
  ).toEqual([
    {
      propertyName: "id",
      type: "ref",
    },
    {
      propertyName: "text",
      type: "",
    },
  ])
})
