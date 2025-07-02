/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, useIntl } from "react-intl"
import { FieldValues, useForm } from "react-hook-form"
import styled from "styled-components"
import { noop } from "lodash"
import { Button, Modal, TextInput, Typography } from "app-theme/ui"
import {
  ButtonSize,
  ButtonType,
  IconType,
  ModalLayer,
  ModalSize,
  TextInputVariant,
  TypographyAlign,
} from "app-theme/models"
import {
  ContactSupportFlowTestIds,
  ContactSupportModalTestIds,
  SendTicketPayload,
} from "contact-support/models"
import { ContactSupportInputLabel } from "./contact-support-input-label"
import { ContactSupportFileList } from "./contact-support-file-list"
import { contactSupportEmailValidator } from "./contact-support-form-validators"

const messages = defineMessages({
  buttonText: {
    id: "general.contactSupport.formModal.buttonText",
  },
  title: {
    id: "general.contactSupport.formModal.title",
  },
  description: {
    id: "general.contactSupport.formModal.description",
  },
  emailLabel: {
    id: "general.contactSupport.formModal.emailLabel",
  },
  emailPlaceholder: {
    id: "general.contactSupport.formModal.emailPlaceholder",
  },
  messageLabel: {
    id: "general.contactSupport.formModal.messageLabel",
  },
  descriptionPlaceholder: {
    id: "general.contactSupport.formModal.descriptionPlaceholder",
  },
  filesLabel: {
    id: "general.contactSupport.formModal.filesLabel",
  },
  filesLabelDescription: {
    id: "general.contactSupport.formModal.filesLabelDescription",
  },
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
  onClose?: () => void
}

export const ContactSupportFormModal: FunctionComponent<
  ContactSupportModalProps
> = ({ files = [], onSubmit = noop, onClose = noop }) => {
  const intl = useIntl()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
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
  }

  return (
    <Modal
      opened={true}
      layer={ModalLayer.ContactSupport}
      size={ModalSize.Medium}
      customStyles={{ maxHeight: "66rem", width: "56.6rem" }}
      data-testid={ContactSupportFlowTestIds.ContactSupportModal}
    >
      <Modal.TitleIcon type={IconType.Support} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <Modal.CloseButton onClick={handleCloseModal} />
      <Modal.ScrollableContent>
        <Typography.P1>
          {intl.formatMessage(messages.description)}
        </Typography.P1>
        <form onSubmit={submitForm}>
          <InputLabel label={messages.emailLabel} />
          <Input
            id="contact-support-email"
            variant={TextInputVariant.Outlined}
            type="text"
            placeholder={intl.formatMessage(messages.emailPlaceholder)}
            data-testid={ContactSupportModalTestIds.EmailInput}
            error={errors.email?.message}
            {...register(FieldKeys.Email, contactSupportEmailValidator)}
          />
          <InputLabel label={messages.messageLabel} optional={true} />
          <Input
            id="contact-support-message"
            variant={TextInputVariant.Outlined}
            type="textarea"
            rows={3}
            placeholder={intl.formatMessage(messages.descriptionPlaceholder)}
            data-testid={ContactSupportModalTestIds.DescriptionInput}
            {...register(FieldKeys.Description)}
          />
          <InputLabel label={messages.filesLabel} />
          <FilesLabelDescription textAlign={TypographyAlign.Left}>
            {intl.formatMessage(messages.filesLabelDescription)}
          </FilesLabelDescription>
          <ContactSupportFileList
            files={files}
            data-testid={ContactSupportModalTestIds.FileList}
          />
          <FormSendButtonWrapper>
            <Button
              type={ButtonType.Primary}
              onClick={submitForm}
              disabled={!isValid || !emailValue}
              data-testid={ContactSupportModalTestIds.SubmitButton}
              size={ButtonSize.Large}
            >
              {intl.formatMessage(messages.buttonText)}
            </Button>
          </FormSendButtonWrapper>
        </form>
      </Modal.ScrollableContent>
    </Modal>
  )
}

const Input = styled(TextInput)`
  p {
    text-align: left;
  }
`
const InputLabel = styled(ContactSupportInputLabel)`
  margin-bottom: 0.8rem;
`

const FilesLabelDescription = styled(Typography.P4)`
  margin-bottom: 1.4rem;
`

const FormSendButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.4rem;
`
