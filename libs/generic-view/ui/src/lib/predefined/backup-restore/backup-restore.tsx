/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useRef, useState } from "react"
import { APIFC, ButtonAction } from "generic-view/utils"
import { Form } from "../../interactive/form/form"
import { ModalCenteredContent, ModalCloseButton } from "../../interactive/modal"
import { closeModal as closeModalAction } from "generic-view/store"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { BackupRestoreSelect } from "./backup-restore-select"
import { useFormContext } from "react-hook-form"
import { BackupRestorePassword } from "./backup-restore-password"
import { BackupRestoreProgress } from "./backup-restore-progress"
import { BackupRestoreSuccess } from "./backup-restore-success"
import { BackupRestoreError } from "./backup-restore-error"

enum Step {
  Select,
  Password,
  Progress,
  Success,
  Error,
}

interface Feature {
  label: string
  keys: string[]
}

interface Config {
  features?: Feature[]
  modalKey?: string
}

export const BackupRestoreForm: FunctionComponent<Config> = ({
  features,
  modalKey,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const { handleSubmit } = useFormContext()
  const restoreAbortReference = useRef<VoidFunction>()

  const [step, setStep] = useState<Step>(Step.Select)
  const closeButtonVisible = [
    Step.Select,
    Step.Password,
    Step.Success,
  ].includes(step)
  const abortButtonVisible = step === Step.Progress

  const closeModal = () => {
    dispatch(closeModalAction({ key: modalKey! }))
  }

  const startRestore = (password?: string) => {
    // const promise = dispatch(
    //
    // )
    // restoreAbortReference.current = (
    //   promise as unknown as {
    //     abort: VoidFunction
    //   }
    // ).abort
  }

  const restoreCloseButtonAction: ButtonAction = {
    type: "custom",
    callback: closeModal,
  }

  const selectionConfirmButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setStep(Step.Password)
    },
  }

  const passwordConfirmButtonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setStep(Step.Progress)
    },
  }

  const onSuccess = () => {
    setStep(Step.Success)
  }

  const confirmAction: ButtonAction = {
    type: "custom",
    callback: () => {
      handleSubmit((data) => {
        console.log(data)
      })()
    },
  }

  return (
    <>
      {closeButtonVisible && (
        <ModalCloseButton action={restoreCloseButtonAction} />
      )}
      {abortButtonVisible && (
        <ModalCloseButton action={restoreCloseButtonAction} />
      )}
      <ModalCenteredContent>
        {step === Step.Select && (
          <BackupRestoreSelect
            closeAction={restoreCloseButtonAction}
            nextAction={selectionConfirmButtonAction}
          />
        )}
        {step === Step.Password && (
          <BackupRestorePassword nextAction={passwordConfirmButtonAction} />
        )}
        {step === Step.Progress && (
          <BackupRestoreProgress
            onSuccess={onSuccess}
            features={[
              {
                key: "contacts",
                label: "Contacts",
              },
              {
                key: "messages",
                label: "Messages",
              },
              {
                key: "notes",
                label: "Notes",
              },
              {
                key: "calendar",
                label: "Calendar",
              },
              {
                key: "settings",
                label: "Settings",
              },
            ]}
          />
        )}
        {step === Step.Success && <BackupRestoreSuccess onClose={closeModal} />}
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

export default BackupRestore
