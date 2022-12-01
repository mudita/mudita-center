/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { DeviceType } from "App/device/constants"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  IconWrapper,
  ContentWrapper,
  Form,
  SubmitButton,
} from "App/crash-dump/components/crash-dump-modal/crash-dump-modal.styled"
import { CrashDumpModalTestingIds } from "App/crash-dump/components/crash-dump-modal/crash-dump-modal-testing-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import {
  FormInputLabel,
  DescriptionInput,
} from "App/contact-support/components/contact-support-modal.component"
import InputComponent from "App/__deprecated__/renderer/components/core/input-text/input-text.component"
import { useForm } from "react-hook-form"
import { ContactSupportFieldValues } from "App/contact-support/components/contact-support-modal.component"
import { emailValidatorNotRequired } from "App/__deprecated__/renderer/utils/form-validators"
import {
  DisplayStyle,
  Type,
} from "App/__deprecated__/renderer/components/core/button/button.config"
import { noop } from "App/__deprecated__/renderer/utils/noop"

export interface CrashDumpProps {
  open: boolean
  deviceType: DeviceType
  onClose: () => void
  onSubmit?: (data: ContactSupportFieldValues) => void
}

const messages = defineMessages({
  title: { id: "component.crashDumpModal.title" },
  pureLabel: { id: "component.crashDumpModal.pureLabel" },
  harmonyLabel: { id: "component.crashDumpModal.harmonyLabel" },
  text: { id: "component.crashDumpModal.text" },
  accept: { id: "component.crashDumpModal.accept" },
  close: { id: "component.crashDumpModal.close" },
  emailLabel: { id: "component.crashDumpModal.formEmailLabel" },
  emailPlaceholder: { id: "component.crashDumpModal.formEmailPlaceholder" },
  messageLabel: { id: "component.crashDumpModal.formMessageLabel" },
  descriptionPlaceholder: {
    id: "component.crashDumpModal.formMessagePlaceholder",
  },
})

enum FieldKeys {
  Email = "email",
  Description = "description",
}

export const CrashDumpModal: FunctionComponent<CrashDumpProps> = ({
  open,
  deviceType,
  onClose,
  onSubmit = noop,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSupportFieldValues>({
    mode: "onChange",
  })

  const sendEmail = handleSubmit((data) => {
    onSubmit(data)
  })

  const handleCloseModal = () => {
    reset()
    onClose()
  }
  return (
    <ModalDialog
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Medium}
      open={open}
      closeModal={handleCloseModal}
      closeButton={false}
    >
      <ContentWrapper data-testid={CrashDumpModalTestingIds.Content}>
        <IconWrapper>
          <Icon type={IconType.ThinFail} width={3.2} height={3.2} />
        </IconWrapper>
        {deviceType === DeviceType.MuditaPure ? (
          <Text
            data-testid={CrashDumpModalTestingIds.Label}
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.pureLabel}
          />
        ) : (
          <Text
            data-testid={CrashDumpModalTestingIds.Label}
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.harmonyLabel}
          />
        )}
        <Text
          data-testid={CrashDumpModalTestingIds.Text}
          displayStyle={TextDisplayStyle.Paragraph4}
          message={messages.text}
        />
        <Form onSubmit={sendEmail}>
          <FormInputLabel optional label={messages.emailLabel} />
          <InputComponent
            outlined
            condensed
            type={"text"}
            errorMessage={errors.email?.message}
            label={intl.formatMessage(messages.emailPlaceholder)}
            {...register(FieldKeys.Email, emailValidatorNotRequired)}
          />
          <FormInputLabel optional label={messages.messageLabel} />
          <DescriptionInput
            type="textarea"
            maxRows={3}
            label={intl.formatMessage(messages.descriptionPlaceholder)}
            {...register(FieldKeys.Description)}
          />
          <SubmitButton
            labelMessage={messages.accept}
            type={Type.Submit}
            displayStyle={DisplayStyle.Primary}
            data-testid={CrashDumpModalTestingIds.Submit}
          />
        </Form>
      </ContentWrapper>
    </ModalDialog>
  )
}
