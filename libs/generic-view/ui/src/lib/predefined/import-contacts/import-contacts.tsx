/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, ButtonAction } from "generic-view/utils"
import React, { useEffect, useState } from "react"
import { withConfig } from "../../utils/with-config"
import { Form } from "../../interactive/form/form"
import { ModalCenteredContent, ModalCloseButton } from "../../interactive/modal"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  cleanImportProcess,
  closeModal as closeModalAction,
  importContactsFromExternalSource,
  ImportStatus,
  importStatusSelector,
} from "generic-view/store"
import { ImportContactsProvider } from "./import-contacts-provider"
import { ImportContactsLoader } from "./import-contats-loader"
import { ImportContactsList } from "./import-contacts-list"
import styled from "styled-components"

interface Config {
  modalKey?: string
}

const ImportContactsForm: React.FC<Config> = ({ modalKey }) => {
  const [freezedStatus, setFreezedStatus] = useState<ImportStatus | undefined>()
  const importStatus = useSelector(importStatusSelector)

  const dispatch = useDispatch<Dispatch>()

  const currentStatus = freezedStatus || importStatus

  useEffect(() => {
    if (currentStatus === "AUTH") {
      dispatch(importContactsFromExternalSource())
    }
  }, [dispatch, currentStatus])

  const closeModal = () => {
    setFreezedStatus(importStatus)
    dispatch(closeModalAction({ key: modalKey! }))
    dispatch(cleanImportProcess())
  }

  const backupCloseButtonAction: ButtonAction = {
    type: "custom",
    callback: closeModal,
  }

  const showCloseButton = importStatus !== "PENDING-AUTH"
  const smallModal =
    currentStatus === undefined ||
    currentStatus === "PENDING-AUTH" ||
    currentStatus === "IMPORT-INTO-MC-IN-PROGRESS"

  return (
    <>
      {showCloseButton && <ModalCloseButton action={backupCloseButtonAction} />}
      <Content $size={smallModal ? "small" : "medium"}>
        {currentStatus === undefined && <ImportContactsProvider />}
        {(currentStatus === "PENDING-AUTH" ||
          currentStatus === "AUTH" ||
          currentStatus === "IMPORT-INTO-MC-IN-PROGRESS") && (
          <ImportContactsLoader />
        )}
        {currentStatus === "FAILED" && <div>FAILED</div>}
        {currentStatus === "IMPORT-INTO-MC-DONE" && <ImportContactsList />}
      </Content>
    </>
  )
}

const Content= styled(ModalCenteredContent)`
  //min-height: var(--min-height);
`

export const ImportContacts: APIFC<undefined, Config> = ({
  data,
  config,
  children,
  ...props
}) => {
  return (
    <Form {...props}>
      <ImportContactsForm {...config} />
    </Form>
  )
}

export default withConfig(ImportContacts)
