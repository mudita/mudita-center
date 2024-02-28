/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useState } from "react"
import { APIFC, ButtonAction } from "generic-view/utils"
import { withConfig } from "../../utils/with-config"
import { BackupFeatures, Feature } from "./backup-features"
import { BackupPassword } from "./backup-password"
import { useFormContext } from "react-hook-form"
import { BackupProgress } from "./backup-progress"
import { ModalCenteredContent, ModalCloseButton } from "../../interactive/modal"
import { BackupSuccess } from "./backup-success"
import { BackupFailure } from "./backup-failure"
import { Form } from "../../interactive/form/form"

enum Step {
  Features,
  Password,
  Progress,
  Success,
  Error,
}

interface Config {
  features?: Feature[]
  modalKey?: string
}

const BackupCreateForm: FunctionComponent<Config> = ({
  features,
  modalKey,
}) => {
  const { handleSubmit } = useFormContext()
  const [step, setStep] = useState<Step>(Step.Features)
  const closeAction: ButtonAction = {
    type: "close-modal",
    modalKey: modalKey!,
  }

  const createBackup: ButtonAction = {
    type: "custom",
    callback: () => setStep(Step.Password),
  }

  const skipPassword: ButtonAction = {
    type: "custom",
    callback: () => {
      setStep(Step.Progress)
    },
  }

  const confirmPassword: ButtonAction = {
    type: "custom",
    callback: () => {
      handleSubmit((data) => console.log(data))()
      setStep(Step.Progress)
    },
  }

  const onSuccess = () => {
    setStep(Step.Success)
  }

  const onFail = () => {
    setStep(Step.Error)
  }

  const showCloseButton = [
    Step.Features,
    Step.Password,
    Step.Progress,
    Step.Success,
  ].includes(step)

  return (
    <>
      {showCloseButton && <ModalCloseButton action={closeAction} />}
      <ModalCenteredContent>
        {step === Step.Features && (
          <BackupFeatures
            features={features || []}
            closeAction={closeAction}
            nextAction={createBackup}
          />
        )}
        {step === Step.Password && (
          <BackupPassword
            skipAction={skipPassword}
            nextAction={confirmPassword}
          />
        )}
        {step === Step.Progress && (
          <BackupProgress onSuccess={onSuccess} onFail={onFail} />
        )}
        {step === Step.Success && <BackupSuccess />}
        {step === Step.Error && <BackupFailure modalKey={modalKey!} />}
      </ModalCenteredContent>
    </>
  )
}

export const BackupCreate: APIFC<undefined, Config> = ({
  data,
  config,
  children,
  ...props
}) => {
  return (
    <Form {...props}>
      <BackupCreateForm {...config} />
    </Form>
  )
}

export default withConfig(BackupCreate)
