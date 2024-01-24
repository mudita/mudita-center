/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FunctionComponent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getAPIConfig } from "generic-view/store"

export const APIConnectionDemo: FunctionComponent = () => {
  const [input, setInput] = useState(`{
    "endpoint": "API_CONFIGURATION",
    "method": "GET",
    "body": {}
  }`)
  const { lastResponse } = useSelector(
    (state: ReduxRootState) => state.genericViews
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>()

  return (
    <div>
      <textarea
        rows={40}
        cols={80}
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      ></textarea>
      <br />
      <button
        onClick={() => {
          const payload = JSON.parse(input)
          dispatch(getAPIConfig(payload))
        }}
      >
        get api config
      </button>
      {/* <button
        onClick={() => {
          dispatch(getOverviewConfig())
        }}
      >
        get overview config
      </button> */}
      {/* <button
        onClick={() => {
          dispatch(getOverviewData())
        }}
      >
        get overview data
      </button> */}
      <div>{JSON.stringify(lastResponse)}</div>
    </div>
  )
}
