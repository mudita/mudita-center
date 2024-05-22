/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import { renderHook } from "@testing-library/react"
import { useModalsQueue } from "./use-modals-queue"
import { useSelector } from "react-redux"

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}))

describe("useModalsQueue", () => {
  it("returns opened as false when the queue is empty", () => {
    ;(useSelector as jest.Mock).mockReturnValue([])
    const { result } = renderHook(() => useModalsQueue("testKey"))
    expect(result.current.opened).toBe(false)
  })

  it("returns opened as false when the modal is not in the queue", () => {
    ;(useSelector as jest.Mock).mockReturnValue([{ key: "otherKey" }])
    const { result } = renderHook(() => useModalsQueue("testKey"))
    expect(result.current.opened).toBe(false)
  })

  it("returns opened as false when a different modal is the last one in queue", () => {
    ;(useSelector as jest.Mock).mockReturnValue([
      { key: "testKey" },
      { key: "otherKey" },
    ])
    const { result } = renderHook(() => useModalsQueue("testKey"))
    expect(result.current.opened).toBe(false)
  })

  it("returns opened as true when modal is the last one in queue", () => {
    ;(useSelector as jest.Mock).mockReturnValue([
      { key: "otherKey" },
      { key: "testKey" },
    ])
    const { result } = renderHook(() => useModalsQueue("testKey"))
    expect(result.current.opened).toBe(true)
  })

  it("returns opened as true when the modal is not the last one in queue but is permanent", () => {
    ;(useSelector as jest.Mock).mockReturnValue([
      { key: "testKey", permanent: true },
      { key: "otherKey" },
    ])
    const { result } = renderHook(() => useModalsQueue("testKey"))
    expect(result.current.opened).toBe(true)
  })
})
