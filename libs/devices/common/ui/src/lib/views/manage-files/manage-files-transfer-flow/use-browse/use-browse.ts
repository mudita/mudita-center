/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useRef } from "react"

type UseBrowseArgs<T> = {
  opened: boolean
  runDialog: () => Promise<T | null>
  onSelect: (value: T) => void
  onCancel: () => void
}

export function useBrowse<T>({
  opened,
  runDialog,
  onSelect,
  onCancel,
}: UseBrowseArgs<T>) {
  const inFlightRef = useRef(false)
  const lastOpenedRef = useRef(false)

  const run = useCallback(async () => {
    try {
      const result = await runDialog()

      if (result != null) {
        onSelect(result)
      } else {
        onCancel()
      }
    } catch {
      onCancel()
    } finally {
      inFlightRef.current = false
    }
  }, [runDialog, onSelect, onCancel])

  useEffect(() => {
    const shouldRun = opened && !lastOpenedRef.current && !inFlightRef.current

    if (shouldRun) {
      inFlightRef.current = true
      void run()
    }

    lastOpenedRef.current = opened
  }, [opened, run])
}
