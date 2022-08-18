/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { act, renderHook } from "@testing-library/react-hooks"
import {
  InitialFilesFilterState,
  useFilesFilter,
} from "App/files-manager/helpers/use-files-filter.hook"

const defaultState: InitialFilesFilterState = {
  files: [
    {
      id: "user/music/example_file_name.mp3",
      size: 1234,
      name: "example_file_name.mp3",
      type: "mp3",
    },
    {
      id: "user/music/second_example_file_name.wav",
      size: 12345,
      name: "second_example_file_name.wav",
      type: "wav",
    },
  ],
}

describe("`useFilesFilter` hook", () => {
  test("`filteredFiles` as default is equal to passed files as initial state`", () => {
    const { result } = renderHook(() => useFilesFilter(defaultState))
    expect(result.current.filteredFiles).toEqual(defaultState.files)
  })

  test("`filteredFiles` filters files when `searchValue` is set`", () => {
    const { result } = renderHook(() =>
      useFilesFilter({ ...defaultState, searchValue: "wav" })
    )
    expect(result.current.filteredFiles).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "user/music/second_example_file_name.wav",
          "name": "second_example_file_name.wav",
          "size": 12345,
          "type": "wav",
        },
      ]
    `)
  })

  test("`filteredFiles` filters files properly after triggering `handleOnSearchValueChange`", () => {
    const { result } = renderHook(() => useFilesFilter(defaultState))
    expect(result.current.filteredFiles).toEqual(defaultState.files)

    act(() => {
      result.current.handleSearchValueChange("wav")
    })
    expect(result.current.filteredFiles).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "user/music/second_example_file_name.wav",
          "name": "second_example_file_name.wav",
          "size": 12345,
          "type": "wav",
        },
      ]
    `)
  })
})
