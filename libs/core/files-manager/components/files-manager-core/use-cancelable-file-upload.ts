/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { uploadFile } from "Core/files-manager/actions"

/**
 * Custom React hook facilitating file uploads with Redux. Offers a simple interface through `handleUploadFiles`
 * while ensuring upload cancellation on component unmount.
 */
const useCancelableFileUpload = () => {
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
  }, [dispatch, uploadActionTimestamp])

  return {
    handleUploadFiles,
  }
}

export default useCancelableFileUpload
