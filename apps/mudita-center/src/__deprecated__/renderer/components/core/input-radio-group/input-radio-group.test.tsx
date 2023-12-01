/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import InputRadioGroup from "App/__deprecated__/renderer/components/core/input-radio-group/input-radio-group.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"

const radioGroup = [
  {
    value: "lala1",
  },
  {
    value: "lala2",
    label: "label",
  },
  {
    value: "lala2",
  },
  {
    value: "lala2",
  },
]

const radioGroupName = "example"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <InputRadioGroup data={radioGroup} radioGroupName={radioGroupName} />
  )
  expect(container).toMatchSnapshot()
})

test("renders correct amount of radio inputs", () => {
  const { container } = renderWithThemeAndIntl(
    <InputRadioGroup data={radioGroup} radioGroupName={radioGroupName} />
  )
  const radioInputs = container.querySelectorAll("input")
  expect(radioInputs).toHaveLength(radioGroup.length)
})

test("renders correct amount of labels", () => {
  const { container } = renderWithThemeAndIntl(
    <InputRadioGroup data={radioGroup} radioGroupName={radioGroupName} />
  )
  const labels = container.querySelectorAll("label")
  expect(labels).toHaveLength(1)
})
