/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useButtonAction } from "./use-button-action"
import { renderHook } from "@testing-library/react"

jest.mock("generic-view/store", () => ({
  openModal: jest.fn(),
  closeModal: jest.fn(),
  closeAllModals: jest.fn(),
  replaceModal: jest.fn(),
  closeDomainModals: jest.fn(),
  useScreenTitle: jest.fn().mockReturnValue("testScreenTitle"),
}))

jest.mock("./use-select-files-button-action", () => ({
  useSelectFilesButtonAction: jest.fn().mockReturnValue(jest.fn()),
}))

jest.mock("./use-mtp-upload-files-button-action", () => ({
  useMtpUploadFilesButtonAction: jest.fn().mockReturnValue(jest.fn()),
}))

jest.mock("./use-upload-files-button-action", () => ({
  useUploadFilesButtonAction: jest.fn().mockReturnValue(jest.fn()),
}))

jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest.fn(),
}))

jest.mock("react-router", () => ({
  useHistory: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

describe("useButtonAction", () => {
  it("calls the correct action for 'open-modal'", () => {
    const openModal = jest.requireMock("generic-view/store").openModal
    const { result } = renderHook(() => useButtonAction("testKey"))
    result.current([
      {
        type: "open-modal",
        modalKey: "testModalKey",
        domain: "testDomain",
        permanent: false,
      },
    ])

    expect(openModal).toHaveBeenCalledWith({
      key: "testModalKey",
      domain: "testDomain",
      permanent: false,
    })
  })

  it("calls multiple actions", () => {
    const openModal = jest.requireMock("generic-view/store").openModal
    const closeModal = jest.requireMock("generic-view/store").closeModal
    const { result } = renderHook(() => useButtonAction("testKey"))
    result.current([
      {
        type: "open-modal",
        modalKey: "testModalKey",
        domain: "testDomain",
        permanent: false,
      },
      {
        type: "close-modal",
        modalKey: "testModalKey",
      },
    ])

    expect(openModal).toHaveBeenCalledWith({
      key: "testModalKey",
      domain: "testDomain",
      permanent: false,
    })
    expect(closeModal).toHaveBeenCalledWith({
      key: "testModalKey",
    })
  })

  it("calls the correct action for 'close-modal'", () => {
    const closeModal = jest.requireMock("generic-view/store").closeModal
    const { result } = renderHook(() => useButtonAction("testKey"))
    result.current([
      {
        type: "close-modal",
        modalKey: "testModalKey",
      },
    ])

    expect(closeModal).toHaveBeenCalledWith({
      key: "testModalKey",
    })
  })

  it("calls the correct action for 'replace-modal'", () => {
    const replaceModal = jest.requireMock("generic-view/store").replaceModal
    const { result } = renderHook(() => useButtonAction("testKey"))
    result.current([
      {
        type: "replace-modal",
        modalKey: "testModalKey",
        domain: "testDomain",
        permanent: false,
      },
    ])

    expect(replaceModal).toHaveBeenCalledWith({
      key: "testModalKey",
      domain: "testDomain",
      permanent: false,
    })
  })

  it("calls the correct action for 'close-all-modals'", () => {
    const closeAllModals = jest.requireMock("generic-view/store").closeAllModals
    const { result } = renderHook(() => useButtonAction("testKey"))
    result.current([
      {
        type: "close-all-modals",
      },
    ])

    expect(closeAllModals).toHaveBeenCalled()
  })

  it("calls the correct action for 'navigate'", () => {
    const push = jest.fn()
    jest
      .requireMock("react-router")
      .useHistory.mockImplementation(() => ({ push }))
    const { result } = renderHook(() => useButtonAction("testKey"))
    result.current([
      {
        type: "navigate",
        viewKey: "testViewKey",
      },
    ])

    expect(push).toHaveBeenCalledWith({
      pathname: "/generic/testViewKey",
      state: {
        previousViewName: "testScreenTitle",
      },
    })
  })
})
