/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { handleModalFlow } from "App/collecting-data-modal/collecting-data-service"
import modalService from "Renderer/components/core/modal/modal.service"

const openModal = jest.fn()

jest.spyOn(modalService, "openModal").mockImplementation(openModal)

beforeEach(() => {
  jest.clearAllMocks()
})

test("when appCollectingData is undefined openModal is fired", () => {
  handleModalFlow(undefined, jest.fn())
  expect(openModal).toBeCalled()
})

test("when appCollectingData is false openModal is not fired", () => {
  handleModalFlow(false, jest.fn())
  expect(openModal).not.toBeCalled()
})

test("when appCollectingData is true openModal is not fired", () => {
  handleModalFlow(true, jest.fn())
  expect(openModal).not.toBeCalled()
})
