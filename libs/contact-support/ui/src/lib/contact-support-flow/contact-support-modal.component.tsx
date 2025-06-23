/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, ComponentProps, useEffect } from "react"
import { defineMessages, FormattedMessage, useIntl } from "react-intl"
import { FieldValues, useForm } from "react-hook-form"
import styled from "styled-components"
import {
  Button,
  Modal,
  SpinnerLoader,
  TextInput,
  Typography,
} from "app-theme/ui"
import { ButtonType, IconType, TextInputVariant } from "app-theme/models"
import {
  ContactSupportModalTestIds,
  SendTicketPayload,
} from "contact-support/models"

const messages = defineMessages({
  actionButton: {
    id: "component.contactSupport.modal.actionButton",
  },
  actionButtonProgress: {
    id: "ccomponent.contactSupport.modal.actionButtonProgress",
  },
  title: {
    id: "component.contactSupport.modal.title",
  },
  description: {
    id: "component.contactSupport.modal.description",
  },
  emailLabel: { id: "component.contactSupport.modal.emailLabel" },
  emailPlaceholder: { id: "component.contactSupport.modal.emailPlaceholder" },
  messageLabel: { id: "component.contactSupport.modal.messageLabel" },
  descriptionPlaceholder: {
    id: "component.contactSupport.modal.descriptionPlaceholder",
  },
  filesLabel: { id: "component.contactSupport.modal.filesLabel" },
  filesLabelDescription: {
    id: "component.contactSupport.modal.filesLabelDescription",
  },
  optional: { id: "component.contactSupport.modal.optional" },
  sendingTitle: { id: "component.contactSupport.modal.sendingTitle" },
})

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

interface ContactSupportModalProps {
  files: { name: string }[]
  onSubmit?: (data: ContactSupportFieldValues) => void
  sending?: boolean
  onClose?: () => void
}

interface FormInputLabelProps {
  label: {
    id: string
  }
  optional?: boolean
  className?: string
}

export const FormInputLabelComponent: FunctionComponent<
  FormInputLabelProps
> = ({ className, label, optional }) => (
  <div>
    <Typography.P3 className={className}>
      <FormattedMessage {...label} />
      {optional && (
        <Typography.P3 color="grey3" as={"span"}>
          {" "}
          (<FormattedMessage {...messages.optional} />)
        </Typography.P3>
      )}
    </Typography.P3>
  </div>
)

export const ContactSupportModal: FunctionComponent<
  ContactSupportModalProps
> = ({ files, onSubmit = () => {}, sending = false, onClose = () => {} }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitted },
    watch,
  } = useForm<ContactSupportFieldValues>({
    mode: "onChange",
    defaultValues: {
      [FieldKeys.Email]: "",
      [FieldKeys.Description]: "",
    },
  })
  const emailValue = watch(FieldKeys.Email)

  const submitForm = handleSubmit((data) => {
    onSubmit(data)
  })

  const handleCloseModal = () => {
    reset()
    onClose()
    console.log("close")
    // ipcRenderer.callMain(HelpActions.CustomerIsSendingToMain, false)
  }

  const intl = useIntl()

  useEffect(() => {
    // ipcRenderer.callMain(HelpActions.CustomerIsSendingToMain, sending)
  }, [sending])

  const emailValidator = {}

  return (
    <>
      {sending ? (
        <>
          <Modal.TitleIcon type={IconType.SpinnerDark} />
          <Modal.Title>{intl.formatMessage(messages.sendingTitle)}</Modal.Title>
          {/* No close button or form fields while sending */}
        </>
      ) : (
        // Form state: show contact form fields
        <>
          <Modal.TitleIcon type={IconType.Support} />
          <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
          <Modal.CloseButton onClick={handleCloseModal} />
          <Modal.ScrollableContent>
            <Typography.P1>
              {intl.formatMessage(messages.description)}
            </Typography.P1>
            <form onSubmit={submitForm}>
              <FormInputLabel label={messages.emailLabel} />
              <TextInput
                id="contact-support-email"
                variant={TextInputVariant.Outlined}
                type="text"
                placeholder={intl.formatMessage(messages.emailPlaceholder)}
                data-testid={ContactSupportModalTestIds.EmailInput}
                {...register(FieldKeys.Email, emailValidator)}
              />
              {errors.email?.message && (
                <p style={{ color: "red", fontSize: "1.2rem" }}>
                  {errors.email.message}
                </p>
              )}

              <FormInputLabel label={messages.messageLabel} optional={true} />
              <DescriptionInput
                id="contact-support-message"
                placeholder={intl.formatMessage(
                  messages.descriptionPlaceholder
                )}
                data-testid={ContactSupportModalTestIds.DescriptionInput}
                {...register(FieldKeys.Description)}
              />

              <p style={{ marginTop: "1.6rem", marginBottom: "0.4rem" }}>
                <strong>{intl.formatMessage(messages.filesLabel)}</strong>
              </p>
              <p
                style={{
                  color: "#3b3f42",
                  fontWeight: 300,
                  fontSize: "1.4rem",
                  marginTop: 0,
                  marginBottom: "0.8rem",
                }}
              >
                {intl.formatMessage(messages.filesLabelDescription)}
              </p>
              {/* <FileList
                files={files}
                data-testid={ContactSupportModalTestIds.FileList}
              /> */}

              <div style={{ textAlign: "center", marginTop: "2.4rem" }}>
                <Button
                  type={ButtonType.Primary}
                  onClick={submitForm}
                  disabled={!isValid || !emailValue || sending}
                  data-testid={ContactSupportModalTestIds.SubmitButton}
                >
                  {intl.formatMessage(messages.actionButton)}
                </Button>
              </div>
            </form>
          </Modal.ScrollableContent>
        </>
      )}
    </>
  )
}

const DescriptionInput = styled.textarea`
  height: 8rem;
  border: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
  border-radius: ${({ theme }) => theme.app.radius.sm};
  background: ${({ theme }) => theme.app.color.grey6};
  padding: 1rem;
  font: inherit;
  resize: none;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.app.color.black};
  }
  &::placeholder {
    color: ${({ theme }) => theme.app.color.grey3};
  }
`

const FormInputLabel = styled(FormInputLabelComponent)`
  margin-bottom: 0.8rem;
  text-align: left !important;

  &:not(:first-of-type) {
    margin-top: 2.4rem;
  }
`
