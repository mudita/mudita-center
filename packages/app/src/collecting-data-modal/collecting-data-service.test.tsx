/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { handleModalFlow } from "App/collecting-data-modal/collecting-data-service"
import modalService from "Renderer/components/core/modal/modal.service"

const openModal = jest.fn()
const closeModal = jest.fn()
const setCollectingData = jest.fn()

jest.spyOn(modalService, "openModal").mockImplementation(openModal)
jest.spyOn(modalService, "closeModal").mockImplementation(closeModal)

beforeEach(() => {
  jest.clearAllMocks()
})

test("when appCollectingData is undefined openModal is fired", () => {
  handleModalFlow(undefined, setCollectingData)
  expect(openModal).toBeCalled()
})

test("when appCollectingData is false openModal is not fired", () => {
  handleModalFlow(false, setCollectingData)
  expect(openModal).not.toBeCalled()
})

test("when appCollectingData is true openModal is not fired", () => {
  handleModalFlow(true, setCollectingData)
  expect(openModal).not.toBeCalled()
})
