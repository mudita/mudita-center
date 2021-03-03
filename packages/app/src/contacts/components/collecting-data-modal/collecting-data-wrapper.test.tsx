/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import CollectingDataWrapper from "App/contacts/components/collecting-data-modal/collecting-data-wrapper.component"

const renderer = (extraProps?: {}) => {
  const props = {
    setCollectingData: jest.fn(),
    appCollectingData: undefined,
  }
  return renderWithThemeAndIntl(
    <CollectingDataWrapper {...props} {...extraProps} />
  )
}

test("when appCollectingData is undefined openModal is fired", () => {
  const openModal = jest.fn()
  renderer({ openModal })
  expect(openModal).toBeCalled()
})

test("when appCollectingData is false openModal is not fired", () => {
  const openModal = jest.fn()
  renderer({ openModal, appCollectingData: false })
  expect(openModal).not.toBeCalled()
})

test("when appCollectingData is true openModal is not fired", () => {
  const openModal = jest.fn()
  renderer({ openModal, appCollectingData: true })
  expect(openModal).not.toBeCalled()
})
