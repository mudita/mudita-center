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
import { AnimatePresence } from "motion/react"
import { FilePreviewLoader } from "./shared-components"

interface Props {
  src?: string
  onError?: () => void
}

export const ImagePreview: FunctionComponent<Props> = ({ src, onError }) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  const onLoad = useCallback(async () => {
    const img = imgRef.current

    try {
      if (!img) {
        throw new Error("Image not found")
      }
      await img.decode()
      setLoaded(true)
    } catch {
      onError?.()
    }
  }, [onError])

  useEffect(() => {
    setLoaded(false)
  }, [src])

  return (
    <>
      <Wrapper $loaded={loaded}>
        <BackgroundImage style={{ backgroundImage: `url("${src}")` }} />
        <MainImage
          ref={imgRef}
          key={src}
          src={src}
          alt={""}
          aria-labelledby={"file-preview-name"}
          onLoad={onLoad}
          onError={onError}
          decoding={"async"}
        />
      </Wrapper>
      <AnimatePresence initial={true} mode={"popLayout"}>
        {!loaded && <FilePreviewLoader />}
      </AnimatePresence>
    </>
  )
}

const Wrapper = styled.div<{ $loaded?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
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

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;

  background-position: center;
  background-size: cover;
  filter: blur(5rem) brightness(0.4);
`
