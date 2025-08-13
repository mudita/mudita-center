/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import styled from "styled-components"
import {
  FilePreviewErrorHandler,
  FilePreviewErrorType,
} from "./file-preview-error.types"

interface Props {
  src?: string
  onError?: FilePreviewErrorHandler
}

export const ImagePreview: FunctionComponent<Props> = ({ src, onError }) => {
  const loadedTimeoutRef = useRef<NodeJS.Timeout>()
  const [loaded, setLoaded] = useState(false)

  const onLoad = useCallback(() => {
    console.log("LOADED:", src)
    loadedTimeoutRef.current = setTimeout(() => {
      // Ensure bigger images are fully rendered
      setLoaded(true)
    }, 100)
  }, [src])

  const handleError = useCallback(() => {
    if (!src) {
      return
    }
    console.log("FAILED:", src)
    if (src.endsWith(".heic")) {
      onError?.({
        type: FilePreviewErrorType.UnsupportedFileType,
        details: "HEIC",
      })
    } else if (src.endsWith(".heif")) {
      onError?.({
        type: FilePreviewErrorType.UnsupportedFileType,
        details: "HEIF",
      })
    } else {
      onError?.({ type: FilePreviewErrorType.Unknown })
    }
  }, [onError, src])

  useEffect(() => {
    clearTimeout(loadedTimeoutRef.current)
    setLoaded(false)
  }, [src])

  return (
    <Wrapper $loaded={loaded}>
      <BackgroundImage $url={src} />
      <MainImage key={src} src={src} onLoad={onLoad} onError={handleError} />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $loaded?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
`

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0;
  position: relative;
  z-index: 1;
`

const BackgroundImage = styled.div<{ $url?: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;

  background-image: url("${({ $url }) => $url}");
  background-position: center;
  background-size: cover;
  filter: blur(5rem) brightness(0.4);
`
