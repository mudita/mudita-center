/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ButtonType, IconSize, IconType } from "app-theme/models"
import { Button } from "../button/button"
import { Typography } from "../typography/typography"

import React, { ComponentProps, FunctionComponent } from "react"
import styled from "styled-components"
import { Icon } from "../icon/icon"
import { motion } from "motion/react"

export enum FilePreviewErrorCode {
  NotFound = 404,
  Unknown = 500,
  UnsupportedFileType = 501,
}

interface Props extends ComponentProps<typeof ErrorWrapper> {
  error: FilePreviewErrorCode
  fileType?: string
  onClose?: VoidFunction
  onRetry?: VoidFunction
}

export const FilePreviewError: FunctionComponent<Props> = ({
  error,
  fileType,
  onClose,
  onRetry,
  ...rest
}) => {
  return (
    <ErrorWrapper {...rest}>
      <ErrorIcon type={IconType.Error} size={IconSize.Large} />
      {error === FilePreviewErrorCode.UnsupportedFileType ? (
        <>
          <Typography.P1>
            {fileType?.split("/")[1].toUpperCase()} files are not supported.
            Please convert file to a compatible format and try again.
          </Typography.P1>
          <Button type={ButtonType.Secondary} onClick={onClose}>
            Back
          </Button>
        </>
      ) : (
        <>
          <Typography.P1>
            Failed to load photo.{"\n"}Please try again.
          </Typography.P1>
          <Button type={ButtonType.Secondary} onClick={onRetry}>
            Try Again
          </Button>
        </>
      )}
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  width: 34rem;

  p {
    color: ${({ theme }) => theme.app.color.white} !important;
  }

  button {
    margin-top: 1rem;
    background-color: transparent;
    color: ${({ theme }) => theme.app.color.white};
    border-color: ${({ theme }) => theme.app.color.white};
    width: 15.6rem;

    &:hover {
      background-color: ${({ theme }) => theme.app.color.grey1};
    }

    &:active {
      background-color: transparent;
    }
  }
`

const ErrorIcon = styled(Icon)`
  width: 6.8rem;
  height: 6.8rem;
  padding: 1.2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.app.color.white};
`
