/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useRef, useState } from "react"
import { MemorySpace } from "Core/files-manager/components/files-manager-core/files-manager.interface"
import { getSpaces } from "Core/files-manager/components/files-manager-core/use-spaces/get-spaces.helper"
import { State } from "Core/core/constants"
import { File } from "Core/files-manager/dto"
import { Spaces } from "Core/files-manager/components/files-manager-core/use-spaces/spaces.interface"

const useSpaces = (
  files: File[] | null,
  memorySpace: MemorySpace,
  loading: State
): Spaces => {
  const rendered = useRef<boolean>(false)
  const [otherSpace, setOtherSpace] = useState<number>(0)
  const { otherSpace: notFixedOtherSpace, ...spaces } = getSpaces(
    files,
    memorySpace
  )

  useEffect(() => {
    if (!rendered.current && loading === State.Loaded) {
      rendered.current = true
      setOtherSpace(notFixedOtherSpace)
    }
  }, [notFixedOtherSpace, loading, rendered])

  return {
    otherSpace,
    ...spaces,
  }
}

export default useSpaces
