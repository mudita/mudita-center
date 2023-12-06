/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook, waitFor } from "@testing-library/react"
import useDynamicProgressValue from "Core/__deprecated__/renderer/utils/hooks/use-dynamic-progress-value.hook"

test("return the incremented progress value in the next render", async () => {
  const { result } = renderHook<number, number>((props = 0) =>
    useDynamicProgressValue(props)
  )
  await waitFor(() => {
    expect(result.current).toBe(1)
  })

  await waitFor(() => {
    expect(result.current).toBe(2)
  })
})

test("new props don't have an impact on the smooth incrementing value", async () => {
  const { result, rerender } = renderHook<number, number>((props = 0) =>
    useDynamicProgressValue(props)
  )
  await waitFor(() => {
    expect(result.current).toBe(1)
  })

  rerender(15)

  expect(result.current).not.toBe(15)
  await waitFor(() => {
    expect(result.current).toBe(2)
  })
})

test("passing the 100 number value return immediately 100 as complete progress state", async () => {
  const { result, rerender } = renderHook<number, number>((props = 0) =>
    useDynamicProgressValue(props)
  )
  await waitFor(() => {
    expect(result.current).toBe(1)
  })

  rerender(100)

  await waitFor(() => {
    expect(result.current).not.toBe(2)
    expect(result.current).toBe(100)
  })
})

test("incremental progress value does not back down", async () => {
  const { result, rerender } = renderHook<number, number>((props = 0) =>
    useDynamicProgressValue(props)
  )
  await waitFor(() => {
    expect(result.current).toBe(1)
  })

  await waitFor(() => {
    expect(result.current).toBe(2)
  })

  rerender(1)

  await waitFor(() => {
    expect(result.current).toBe(3)
  })
})

test("incremental progress value does not increase beyond the limit", async () => {
  const { result } = renderHook(() =>
    useDynamicProgressValue(0, { limitValue: 3 })
  )
  await waitFor(() => {
    expect(result.current).toBe(1)
  })

  try {
    new Error("unexpected re rendering has occurred")
  } catch {
    await waitFor(() => {
      expect(result.current).not.toBe(4)
      expect(result.current).toBe(3)
    })
  }
})
