/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { APIFC, ButtonAction } from "generic-view/utils"
import { Form } from "../../interactive/form/form"
import { ModalCenteredContent, ModalCloseButton } from "../../interactive/modal"
import {
  cleanRestoreProcess,
  closeModal as closeModalAction,
  loadBackupMetadata,
  restoreBackup,
  selectBackupRestoreStatus,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { BackupRestoreSelect } from "./backup-restore-select"
import { useFormContext } from "react-hook-form"
import { BackupRestorePassword } from "./backup-restore-password"
import { BackupRestoreProgress } from "./backup-restore-progress"
import { BackupRestoreSuccess } from "./backup-restore-success"
import { BackupRestoreError } from "./backup-restore-error"
import { RestoreFeature } from "device/models"
import { withConfig } from "../../utils/with-config"

enum Step {
  Select,
  Password,
  Progress,
  Success,
  Error,
}

interface Config {
  features?: RestoreFeature[]
  modalKey?: string
}

export const BackupRestoreForm: FunctionComponent<Config> = ({
  features,
  modalKey,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const { handleSubmit, getValues } = useFormContext()
  const restoreAbortReference = useRef<VoidFunction>()
  const restoreStatus = useSelector(selectBackupRestoreStatus)

  const [step, setStep] = useState<Step>(Step.Select)
  const closeButtonVisible = [
    Step.Select,
    Step.Password,
    Step.Success,
  ].includes(step)
  const abortButtonVisible = step === Step.Progress

  const closeModal = () => {
    dispatch(closeModalAction({ key: modalKey! }))
    dispatch(cleanRestoreProcess())
  }

  const startRestore = (password?: string) => {
    if (!features) return
    const promise = dispatch(restoreBackup({ features, password }))
    restoreAbortReference.current = (
      promise as unknown as {
        abort: VoidFunction
      }
    ).abort
  }

  const restoreCloseButtonAction: ButtonAction = {
    type: "custom",
    callback: closeModal,
  }

  const abortButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      restoreAbortReference.current?.()
      // closeModal()
    },
  }

  const selectionConfirmButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      dispatch(loadBackupMetadata({ filePath: getValues("file") }))
    },
  }

  const confirmAction: ButtonAction = {
    type: "custom",
    callback: () => {
      handleSubmit((data) => {
        startRestore(data.password)
      })()
    },
  }

  useEffect(() => {
    return () => {
      console.log("elo elo")
      restoreAbortReference.current?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    switch (restoreStatus) {
      case "PASSWORD_NOT_REQUIRED":
        startRestore()
        break
      case "PASSWORD_REQUIRED":
        setStep(Step.Password)
        break
      case "FAILED":
        setStep(Step.Error)
        break
      case "DONE":
        setStep(Step.Success)
        break
      case "PRE_RESTORE":
      case "FILES_TRANSFER":
      case "RESTORING":
        setStep(Step.Progress)
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restoreStatus])

  return (
    <>
      {closeButtonVisible && (
        <ModalCloseButton action={restoreCloseButtonAction} />
      )}
      {abortButtonVisible && <ModalCloseButton action={abortButtonAction} />}
      <ModalCenteredContent>
        {step === Step.Select && (
          <BackupRestoreSelect
            closeAction={restoreCloseButtonAction}
            nextAction={selectionConfirmButtonAction}
          />
        )}
        {step === Step.Password && (
          <BackupRestorePassword nextAction={confirmAction} />
        )}
        {step === Step.Progress && (
          <BackupRestoreProgress features={features!} />
        )}
        {step === Step.Success && (
          <BackupRestoreSuccess onClose={restoreCloseButtonAction.callback} />
        )}
        {step === Step.Error && (
          <BackupRestoreError closeAction={restoreCloseButtonAction} />
        )}
      </ModalCenteredContent>
    </>
  )
}

const BackupRestore: APIFC<undefined, Config> = ({
  data,
  config,
  children,
  ...props
}) => {
  return (
    <Form
      {...props}
      config={{
        formOptions: {
          mode: "onSubmit",
          reValidateMode: "onSubmit",
        },
      }}
    >
      <BackupRestoreForm {...config} />
    </Form>
  )
}

export default withConfig(BackupRestore)