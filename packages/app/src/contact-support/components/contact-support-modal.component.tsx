/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { defineMessages, FormattedMessage } from "react-intl"
import { FieldValues, useForm } from "react-hook-form"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderRadius,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import InputComponent from "App/__deprecated__/renderer/components/core/input-text/input-text.component"
import { Message } from "App/__deprecated__/renderer/interfaces/message.interface"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Type,
} from "App/__deprecated__/renderer/components/core/button/button.config"
import { InputComponentProps } from "App/__deprecated__/renderer/components/core/input-text/input-text.interface"
import { emailValidator } from "App/__deprecated__/renderer/utils/form-validators"
import { getModalButtonsSize } from "App/__deprecated__/renderer/components/core/modal/modal.helpers"
import { ContactSupportModalTestIds } from "App/contact-support/components/contact-support-modal-test-ids.enum"
import { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalDialog } from "App/ui/components/modal-dialog"
import FileList from "App/__deprecated__/renderer/components/core/file-list/file-list.component"
import { SendTicketPayload } from "App/contact-support/actions/send-ticket.action"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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

export const DescriptionInput = styled(InputComponent)<InputComponentProps>`
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

export const FormInputLabelComponent: FunctionComponent<
  FormInputLabelProps
> = ({ className, label, optional }) => (
  <Text className={className} displayStyle={TextDisplayStyle.Paragraph3}>
    <FormattedMessage {...label} />
    {optional && (
      <Text
        displayStyle={TextDisplayStyle.Paragraph3}
        element={"span"}
        color="disabled"
      >
        {" "}
        (<FormattedMessage {...messages.optional} />)
      </Text>
    )}
  </Text>
)

export const FormInputLabel = styled(FormInputLabelComponent)`
  margin-bottom: 0.4rem;

  &:not(:first-of-type) {
    margin-top: 2.4rem;
  }
`

enum FieldKeys {
  Email = "email",
  Description = "description",
}

export interface ContactSupportFieldValues
  extends FieldValues,
    SendTicketPayload {
  [FieldKeys.Email]: string
  [FieldKeys.Description]: string
}

interface Props
  extends ComponentProps<typeof ModalDialog>,
    Pick<ComponentProps<typeof FileList>, "files"> {
  onSubmit?: (data: ContactSupportFieldValues) => void
  sending?: boolean
}

// TODO: Provide some abstraction to hide structure modal behind core
//  https://appnroll.atlassian.net/browse/CP-757
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
          disabled={sending}
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
          disabled={sending}
          type="textarea"
          maxRows={3}
          label={intl.formatMessage(messages.descriptionPlaceholder)}
          data-testid={ContactSupportModalTestIds.DescriptionInput}
          {...register(FieldKeys.Description)}
        />
        <FormInputLabel label={messages.filesLabel} />
        <Text
          displayStyle={TextDisplayStyle.Label}
          element={"p"}
          color="secondary"
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
