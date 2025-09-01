/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { motion } from "motion/react"
import React, { FunctionComponent } from "react"
import { SpinnerLoader } from "../../shared/spinner-loader"

const FilePreviewLoaderWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`

export const FilePreviewLoader: FunctionComponent = () => {
  return (
    <FilePreviewLoaderWrapper
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SpinnerLoader />
    </FilePreviewLoaderWrapper>
  )
}
