/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, ButtonAction } from "generic-view/utils"
import React from "react"
import { withConfig } from "../../utils/with-config"
import { Form } from "../../interactive/form/form"
import { ModalCenteredContent, ModalCloseButton } from "../../interactive/modal"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  closeModal as closeModalAction,
  importStatusSelector,
} from "generic-view/store"
import { ImportContactsProvider } from "./import-contacts-provider"

interface Config {
  modalKey?: string
}

const ImportContactsForm: React.FC<Config> = ({ modalKey }) => {
  const importStatus = useSelector(importStatusSelector)

  const dispatch = useDispatch<Dispatch>()

  const closeModal = () => {
    dispatch(closeModalAction({ key: modalKey! }))
  }

  const backupCloseButtonAction: ButtonAction = {
    type: "custom",
    callback: closeModal,
  }

  return (
    <>
      <ModalCloseButton action={backupCloseButtonAction} />
      <ModalCenteredContent>
        <ImportContactsProvider />
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
