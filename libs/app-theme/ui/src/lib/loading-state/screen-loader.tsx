/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { Messages } from "app-localize/utils"
import { Typography } from "../typography/typography"
import { ProgressBar } from "../progress-bar/progress-bar"
import { motion } from "motion/react"

interface Props extends PropsWithChildren {
  loading?: boolean
  message: Messages["id"]
  progress?: number
}

export const ScreenLoader: FunctionComponent<
  Props & { className?: string }
> = ({ loading, message, progress = 0, children, ...props }) => {
  if (loading) {
    return (
      <LoaderWrapper
        {...props}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Typography.H3 message={message} />
        <ProgressBar value={progress} indeterminate={!progress} />
      </LoaderWrapper>
    )
  }

  return (
    <Content
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </Content>
  )
}

const LoaderWrapper = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.app.color.white};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
`

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.app.color.white};
`
