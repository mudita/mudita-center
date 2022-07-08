/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import AudioConversionRadioGroup from "App/__deprecated__/renderer/modules/settings/components/audio-conversion-radio-group/audio-conversion-radio-group.component"
import { fireEvent } from "@testing-library/dom"

const convertRadioGroup = [
  {
    value: "Always ask",
    label: "Label1",
  },
  {
    value: "Convert automatically",
    label: "Label2",
  },
]

test("Informs consumer about the change", () => {
  const onChange = jest.fn()
  const { container } = renderWithThemeAndIntl(
    <AudioConversionRadioGroup
      radioButtonsData={convertRadioGroup}
      radioGroupName={"example name"}
      onChange={onChange}
    />
  )
  const inputs = container.querySelectorAll('[type="radio"]')
  fireEvent.click(inputs[0], { value: "cos" })
  expect(onChange).toHaveBeenCalled()
})
