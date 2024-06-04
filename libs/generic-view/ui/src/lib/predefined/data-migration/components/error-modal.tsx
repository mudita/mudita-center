/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../../interactive/modal/modal"
import { ButtonAction, IconType } from "generic-view/utils"
import { ButtonSecondary } from "../../../buttons/button-secondary"
import {
  DataMigrationStatus,
  selectDataMigrationStatus,
  setDataMigrationStatus,
} from "generic-view/store"
import { modalTransitionDuration } from "generic-view/theme"

interface Props {
  modalKey: string
  modalIcon: IconType
  statuses: DataMigrationStatus[]
  title: string
  description: string
  buttonLabel: string
  onButtonClick?: VoidFunction
}

export const ErrorModal: FunctionComponent<Props> = ({
  modalIcon,
  modalKey,
  statuses,
  title,
  description,
  buttonLabel,
  onButtonClick,
}) => {
  const dispatch = useDispatch()
  const dataMigrationStatus = useSelector(selectDataMigrationStatus)
  const [opened, setOpened] = useState(false)

  const buttonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setOpened(false)
      setTimeout(() => {
        onButtonClick?.()
        dispatch(setDataMigrationStatus("idle"))
      }, modalTransitionDuration)
    },
  }

  useEffect(() => {
    if (statuses.includes(dataMigrationStatus)) {
      setOpened(true)
    }
  }, [dataMigrationStatus, statuses])

  return (
    <Modal
      config={{ defaultOpened: opened, size: "small" }}
      componentKey={modalKey}
    >
      <Modal.TitleIcon config={{ type: modalIcon }} />
      <Modal.Title>{title}</Modal.Title>
      <p>{description}</p>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            text: buttonLabel,
            action: buttonAction,
          }}
        />
      </Modal.Buttons>
    </Modal>
  )
}
