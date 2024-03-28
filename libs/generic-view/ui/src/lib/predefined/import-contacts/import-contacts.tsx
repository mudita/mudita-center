/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, ButtonAction } from "generic-view/utils"
import React, { useState } from "react"
import { withConfig } from "../../utils/with-config"
import { Form } from "../../interactive/form/form"
import { ModalCenteredContent, ModalCloseButton } from "../../interactive/modal"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  ImportStatus,
  closeModal as closeModalAction,
  importStatusSelector,
} from "generic-view/store"
import { ImportContactsProvider } from "./import-contacts-provider"
import { ImportContactsLoader } from "./import-contats-loader"
import { cleanImportProcess } from "generic-view/store"

interface Config {
  modalKey?: string
}

const ImportContactsForm: React.FC<Config> = ({ modalKey }) => {
  const [freezedStatus, setFreezedStatus] = useState<ImportStatus | undefined>()
  const importStatus = useSelector(importStatusSelector)

  const dispatch = useDispatch<Dispatch>()

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

  const currentStatus = freezedStatus || importStatus

  return (
    <>
      {showCloseButton && <ModalCloseButton action={backupCloseButtonAction} />}
      <ModalCenteredContent>
        {currentStatus === undefined && <ImportContactsProvider />}
        {currentStatus === "PENDING-AUTH" && <ImportContactsLoader />}
        {currentStatus === "FAILED" && <div>FAILED</div>}
        {currentStatus === "AUTH" && <div>SUCCESS</div>}
      </ModalCenteredContent>
    </>
  )
}

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
