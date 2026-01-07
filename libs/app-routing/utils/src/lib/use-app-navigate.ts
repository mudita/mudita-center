/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useRef } from "react"
import { useNavigate } from "react-router"

// Workaround for the issue with `useNavigate` causing re-renders
// See: https://github.com/remix-run/react-router/issues/7634
export const useAppNavigate = () => {
  const navigate = useRef(useNavigate())

  // eslint-disable-next-line react-hooks/refs
  return navigate.current
}
