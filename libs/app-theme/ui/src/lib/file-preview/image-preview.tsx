/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"

interface Props {
  src?: string
}

export const ImagePreview: FunctionComponent<Props> = ({ src }) => {
  if (!src) {
    return null
  }
  return (
    <>
      <BackgroundImage style={{ backgroundImage: `url("${src}")` }} />
      <MainImage style={{ backgroundImage: `url("${src}")` }} />
    </>
  )
}

const MainImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
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
