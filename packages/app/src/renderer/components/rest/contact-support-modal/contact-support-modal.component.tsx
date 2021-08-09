/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { defineMessages, FormattedMessage } from "react-intl"
import { FieldValues, useForm } from "react-hook-form"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderRadius,
} from "Renderer/styles/theming/theme-getters"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { Message } from "Renderer/interfaces/message.interface"
import Button from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Type,
} from "Renderer/components/core/button/button.config"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import { InputComponentProps } from "Renderer/components/core/input-text/input-text.interface"
import { emailValidator } from "Renderer/utils/form-validators"
import { getModalButtonsSize } from "Renderer/components/core/modal/modal.helpers"
import { ContactSupportModalTestIds } from "Renderer/components/rest/contact-support-modal/contact-support-modal-test-ids.enum"
import { IconSize } from "Renderer/components/core/icon/icon.component"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import FileList from "Renderer/components/core/file-list/file-list.component"

const messages = defineMessages({
  actionButton: {
    id: "component.contactSupportModalActionButton",
  },
  actionButtonProgress: {
    id: "component.contactSupportModalActionButtonProgress",
  },
  title: {
    id: "component.contactSupportModalTitle",
  },
  description: {
    id: "component.contactSupportModalDescription",
  },
  emailLabel: { id: "component.contactSupportModalFormEmailLabel" },
  emailPlaceholder: { id: "component.contactSupportModalFormEmailPlaceholder" },
  messageLabel: { id: "component.contactSupportModalFormMessageLabel" },
  descriptionPlaceholder: {
    id: "component.contactSupportModalFormDescriptionPlaceholder",
  },
  filesLabel: { id: "component.contactSupportModalFormFilesLabel" },
  filesLabelDescription: {
    id: "component.contactSupportModalFormFilesLabelDescription",
  },
  optional: { id: "component.contactSupportModalFormOptional" },
})

const DescriptionInput = styled(InputComponent)<InputComponentProps>`
  min-height: 8rem;
  align-items: flex-start;
  padding: 0 1.2rem;
  border-radius: ${borderRadius("medium")};

  textarea {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
`

const ButtonWrapper = styled.div`
  margin-top: 4rem;
`

const ButtonWithRotatingIcon = styled(Button)`
  svg {
    fill: ${backgroundColor("lightIcon")};
  }
`

interface FormInputLabelProps {
  label: Message
  optional?: boolean
}

const FormInputLabelComponent: FunctionComponent<FormInputLabelProps> = ({
  className,
  label,
  optional,
}) => (
  <Text className={className} displayStyle={TextDisplayStyle.MediumText}>
    <FormattedMessage {...label} />
    {optional && (
      <Text
        displayStyle={TextDisplayStyle.MediumFadedLightText}
        element={"span"}
      >
        {" "}
        (<FormattedMessage {...messages.optional} />)
      </Text>
    )}
  </Text>
)

const FormInputLabel = styled(FormInputLabelComponent)`
  margin-bottom: 1.2rem;

  &:not(:first-of-type) {
    margin-top: 2.4rem;
  }
`

enum FieldKeys {
  Email = "email",
  Description = "description",
}

export interface ContactSupportFieldValues extends FieldValues {
  [FieldKeys.Email]: string
  [FieldKeys.Description]: string
}

interface Props
  extends ComponentProps<typeof ModalDialog>,
    Pick<ComponentProps<typeof FileList>, "files"> {
  onSubmit?: (data: ContactSupportFieldValues) => void
  sending?: boolean
}

const ContactSupportModal: FunctionComponent<Props> = ({
  sending,
  onSubmit = noop,
  closeModal = noop,
  files,
  ...rest
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitted },
  } = useForm<ContactSupportFieldValues>({
    mode: "onChange",
  })

  const sendEmail = handleSubmit((data) => {
    onSubmit(data)
  })

  const handleCloseModal = () => {
    reset()
    closeModal()
  }

  return (
    <ModalDialog
      closeButton={false}
      size={ModalSize.Medium}
      title={intl.formatMessage(messages.title)}
      subtitle={intl.formatMessage(messages.description)}
      closeModal={handleCloseModal}
      {...rest}
    >
      <Form onSubmit={sendEmail}>
        <FormInputLabel label={messages.emailLabel} />
        <InputComponent
          outlined
          condensed
          type={"text"}
          data-testid={ContactSupportModalTestIds.EmailInput}
          errorMessage={errors.email?.message}
          label={intl.formatMessage(messages.emailPlaceholder)}
          {...register(FieldKeys.Email, emailValidator)}
        />
        <FormInputLabel optional label={messages.messageLabel} />
        <DescriptionInput
          type="textarea"
          maxRows={3}
          label={intl.formatMessage(messages.descriptionPlaceholder)}
          data-testid={ContactSupportModalTestIds.DescriptionInput}
          {...register(FieldKeys.Description)}
        />
        <FormInputLabel label={messages.filesLabel} />
        <Text
          displayStyle={TextDisplayStyle.SmallFadedText}
          element={"p"}
          message={messages.filesLabelDescription}
        />
        <FileList
          files={files}
          data-testid={ContactSupportModalTestIds.FileList}
        />
        <ButtonWrapper>
          <ButtonWithRotatingIcon
            type={Type.Submit}
            iconSize={IconSize.Small}
            displayStyle={DisplayStyle.Primary}
            data-testid={ContactSupportModalTestIds.SubmitButton}
            size={getModalButtonsSize(ModalSize.Medium)}
            label={intl.formatMessage(
              sending ? messages.actionButtonProgress : messages.actionButton
            )}
            Icon={sending ? IconType.Refresh : IconType.SendButton}
            disabled={
              (!isValid && isDirty) || (!isValid && isSubmitted) || sending
            }
          />
        </ButtonWrapper>
      </Form>
    </ModalDialog>
  )
}

export default ContactSupportModal
