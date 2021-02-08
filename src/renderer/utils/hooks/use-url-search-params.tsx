/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { useLocation } from "react-router"

const useURLSearchParams = (): URLSearchParams =>
  new URLSearchParams(useLocation().search)

export default useURLSearchParams
