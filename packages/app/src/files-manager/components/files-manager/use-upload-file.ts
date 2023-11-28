/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import { Dispatch } from "App/__deprecated__/renderer/store"
import { useEffect, useRef, useState } from "react"
import { uploadFile } from "App/files-manager/actions"

const useUploadFile = () => {
  const dispatch = useDispatch<Dispatch>()
  const ref = useRef<ReturnType<typeof dispatch>>();
  const [uploadTrigger, setUploadTrigger] = useState(false);


  const handleUploadFiles = () => {
    console.log("handleUploadFiles called", uploadFile);
    ref.current = dispatch(uploadFile());
    setUploadTrigger(prevTrigger => !prevTrigger);

    console.log("handleUploadFiles after", ref);
  };

  useEffect(() => {
    console.log("useEffect: ", )
    return () => {
      console.log("Abort outside: ");
      if (ref.current !== undefined && "abort" in ref.current) {
        console.log("Abort inside: ", 2);
        ref.current.abort();
        console.log("Abort inside: ", 3);
      }
    };
  }, [uploadTrigger]);

  return {
    handleUploadFiles,
  };
};

export default useUploadFile
