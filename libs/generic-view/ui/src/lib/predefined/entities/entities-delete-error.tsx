/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useMemo } from "react"
import { APIFC, IconType } from "generic-view/utils"
import { ButtonAction, EntitiesDeleteErrorConfig } from "generic-view/models"
import { Modal } from "../../interactive/modal/modal"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { Typography } from "../../typography"
import { useDispatch, useSelector } from "react-redux"
import {
  clearAfterDeleteEntities,
  selectActiveApiDeviceId,
  selectFailedEntities,
  selectSuccessDeletedEntitiesIds,
} from "generic-view/store"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import styled from "styled-components"
import { modalTransitionDuration } from "generic-view/theme"

const messages = defineMessages({
  allModalTitle: {
    id: "module.genericViews.entities.delete.failure.all.modalTitle",
  },
  someModalTitle: {
    id: "module.genericViews.entities.delete.failure.some.modalTitle",
  },
  allModalDescription: {
    id: "module.genericViews.entities.delete.failure.all.modalDescription",
  },
  someModalDescription: {
    id: "module.genericViews.entities.delete.failure.some.modalDescription",
  },
})

export const EntitiesDeleteError: APIFC<
  undefined,
  EntitiesDeleteErrorConfig
> = ({ config, data }) => {
  const dispatch = useDispatch<Dispatch>()
  const deviceId = useSelector(selectActiveApiDeviceId)!

  const successIds = useSelector((state: ReduxRootState) => {
    return selectSuccessDeletedEntitiesIds(state, {
      deviceId,
      entitiesType: config.entitiesType,
    })
  })

  const failedFiles = useSelector((state: ReduxRootState) => {
    return selectFailedEntities(state, {
      deviceId,
      entitiesType: config.entitiesType,
    })
  })

  const title = useMemo(() => {
    if (failedFiles && failedFiles?.length > 0) {
      return intl.formatMessage(messages.someModalTitle)
    } else {
      return intl.formatMessage(messages.allModalTitle)
    }
  }, [failedFiles])

  const description = useMemo(() => {
    if (failedFiles && failedFiles?.length > 0) {
      return intl.formatMessage(messages.someModalDescription, {
        succeededFiles: successIds.length,
        failedFiles: failedFiles.length,
      })
    } else {
      return intl.formatMessage(messages.allModalDescription)
    }
  }, [failedFiles])

  const closeActions: ButtonAction[] = [
    {
      type: "close-modal",
      modalKey: config.modalKey,
    },
    {
      type: "custom",
      callback: () => {
        setTimeout(() => {
          dispatch(
            clearAfterDeleteEntities({
              deviceId,
              entitiesType: config.entitiesType,
            })
          )
        }, modalTransitionDuration)
      },
    },
  ]

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.Failure }} />
      <Modal.Title>{title}</Modal.Title>
      <Typography.P1>{description}</Typography.P1>
      {failedFiles && failedFiles.length > 0 && (
        <Modal.ScrollableContent>
          <FilesList>
            {failedFiles.map((file) => (
              <li key={file.id as string}>
                <FileListItem>
                  <Typography.P1>{file.fileName as string}</Typography.P1>
                </FileListItem>
              </li>
            ))}
          </FilesList>
        </Modal.ScrollableContent>
      )}
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary config={{ text: "Close", actions: closeActions }} />
      </Modal.Buttons>
    </>
  )
}

const FilesList = styled.ul`
  li {
    p {
      &:first-child {
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:nth-child(2) {
        white-space: nowrap;
        color: ${({ theme }) => theme.color.grey2};
      }
    }
  }
`

const FileListItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.4rem;
  justify-content: space-between;
  overflow: hidden;
`
