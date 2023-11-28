/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Dispatch } from "App/__deprecated__/renderer/store"
import { uploadFile } from "App/files-manager/actions"

const useUploadFile = () => {
  const dispatch = useDispatch<Dispatch>()
  const uploadActionRef = useRef<ReturnType<typeof dispatch>>()
  const [uploadActionTimestamp, setUploadActionTimestamp] = useState<number>()

  const handleUploadFiles = () => {
    setUploadActionTimestamp(new Date().getTime())
  }

  useEffect(() => {
    if (!uploadActionTimestamp) {
      return
    }

    uploadActionRef.current = dispatch(uploadFile())

    return () => {
      if (uploadActionRef.current?.abort) {
        uploadActionRef.current.abort()
      }
    }
  }, [uploadActionTimestamp])

  return {
    handleUploadFiles,
  }
}

export default useUploadFile
