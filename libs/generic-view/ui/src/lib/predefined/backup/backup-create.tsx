/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import styled from "styled-components"
import { APIFC, ButtonAction } from "generic-view/utils"
import { withConfig } from "../../utils/with-config"
import { BackupFeatures, Feature } from "./backup-features"
import { BackupPassword } from "./backup-password"
import { FormProvider, useForm } from "react-hook-form"

enum Step {
  Features,
  Password,
  Progress,
  Success,
  Error,
}

interface Config {
  features: Feature[]
  modalKey: string
}

export const BackupCreate: APIFC<undefined, Config> = ({
  data,
  config,
  children,
  ...props
}) => {
  const methods = useForm({ mode: "onBlur", reValidateMode: "onChange" })
  const [step, setStep] = useState<Step>(Step.Features)
  const closeAction: ButtonAction = {
    type: "close-modal",
    modalKey: config!.modalKey,
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
      methods.handleSubmit((data) => console.log(data))()
      // setStep(Step.Progress)
    },
  }

  return (
    <FormProvider {...methods}>
      <Wrapper {...props}>
        {step === Step.Features && (
          <BackupFeatures
            features={config!.features}
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
      </Wrapper>
    </FormProvider>
  )
}

export default withConfig(BackupCreate)

const Wrapper = styled.form`
  --mainGap: 2.4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 var(--modal-padding) var(--modal-padding);
  gap: var(--mainGap);
`
