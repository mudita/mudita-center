/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import Image from "App/__deprecated__/renderer/components/core/image/image.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"

test("should have passed alt and src", () => {
  const srcValue = "http://placekitten.com/g/200/300"
  const altValue = "Kitten"
  const { getByAltText } = renderWithThemeAndIntl(
    <Image src={srcValue} alt={altValue} />
  )
  expect(getByAltText(altValue)).toHaveAttribute("alt", altValue)
  expect(getByAltText(altValue)).toHaveAttribute("src", srcValue)
})
