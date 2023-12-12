/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { getAPIConfig } from "./store/actions/get-api-config.action"

export const APIConnectionDemo: FunctionComponent = () => {
  const [input, setInput] = useState(`{
    "endpoint": "API_CONFIGURATION",
    "method": "GET",
    "body": {}
  }`)
  const { lastResponse } = useSelector(
    (state: ReduxRootState) => state.genericViews
  )
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
      <button
        onClick={() => {
          const payload = JSON.parse(input)
          dispatch(getAPIConfig(payload))
        }}
      >
        get api config
      </button>
      <div>{JSON.stringify(lastResponse)}</div>
    </div>
  )
}
