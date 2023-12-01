/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Model } from "./model.decorator"
import { Field } from "./field.decorator"
import { ReflectKey } from "App/core/constants"

@Model("fake-model")
class FakeModel {
  @Field("ref")
  public id: string | undefined

  @Field()
  public text: string | undefined
}

const fakeInstance = new FakeModel()

test("registers fields metadata", () => {
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
