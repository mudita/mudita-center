/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useEffect } from "react"
import { defineMessages, FormattedMessage } from "react-intl"
import { FieldValues, useForm } from "react-hook-form"
import styled from "styled-components"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { borderRadius } from "Core/core/styles/theming/theme-getters"
import InputComponent from "Core/__deprecated__/renderer/components/core/input-text/input-text.component"
import { Message } from "Core/__deprecated__/renderer/interfaces/message.interface"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Type,
} from "Core/__deprecated__/renderer/components/core/button/button.config"
import { InputComponentProps } from "Core/__deprecated__/renderer/components/core/input-text/input-text.interface"
import { emailValidator } from "Core/__deprecated__/renderer/utils/form-validators"
import { getModalButtonsSize } from "Core/__deprecated__/renderer/components/core/modal/modal.helpers"
import { ContactSupportModalTestIds } from "Core/contact-support/components/contact-support-modal-test-ids.enum"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalDialog } from "Core/ui/components/modal-dialog"
import FileList from "Core/__deprecated__/renderer/components/core/file-list/file-list.component"
import { SendTicketPayload } from "Core/contact-support/actions/send-ticket.action"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Core/__deprecated__/common/enums/help-actions.enum"
import { ModalTestIds } from "Core/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { Close } from "Core/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { SpinnerLoader } from "../../../generic-view/ui/src/lib/shared/spinner-loader"

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
  sendingTitle: { id: "component.contactSupportModalSendingTitle" },
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
`

const ButtonWrapper = styled.div`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  margin-bottom: 0.8rem;

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
    watch,
  } = useForm<ContactSupportFieldValues>({
    mode: "onChange",
    defaultValues: {
      [FieldKeys.Email]: "",
      [FieldKeys.Description]: "",
    },
  })
  const email = watch(FieldKeys.Email)

  const sendEmail = handleSubmit((data) => {
    onSubmit(data)
  })

  const handleCloseModal = () => {
    reset()
    closeModal()
    ipcRenderer.callMain(HelpActions.CustomerIsSendingToMain, false)
  }

  useEffect(() => {
    ipcRenderer.callMain(HelpActions.CustomerIsSendingToMain, sending)
  }, [sending])

  return (
    <ModalDialog
      closeButton={false}
      size={sending ? ModalSize.Small : ModalSize.MediumNew}
      closeModal={handleCloseModal}
      close={
        <ModalClose
          hidden={sending}
          displayStyle={DisplayStyle.IconOnly}
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          onClick={closeModal}
          Icon={IconType.Close}
          data-testid={ModalTestIds.CloseButton}
        />
      }
      {...rest}
    >
      {sending ? (
        <>
          <ModalHeader>
            <IconWrapper>
              <LoaderIcon dark />
            </IconWrapper>
            <h1>
              <FormattedMessage {...messages.sendingTitle} />
            </h1>
          </ModalHeader>
        </>
      ) : (
        <>
          <ModalHeader>
            <IconWrapper>
              <Icon type={IconType.Support} />
            </IconWrapper>
            <h1>
              <FormattedMessage {...messages.title} />
            </h1>
            <p>
              <FormattedMessage {...messages.description} />
            </p>
          </ModalHeader>
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
            <FilesDescription
              displayStyle={TextDisplayStyle.Paragraph3}
              element={"p"}
              message={messages.filesLabelDescription}
            />
            <Files
              files={files}
              data-testid={ContactSupportModalTestIds.FileList}
            />
            <ButtonWrapper>
              <Button
                type={Type.Submit}
                displayStyle={DisplayStyle.Primary}
                data-testid={ContactSupportModalTestIds.SubmitButton}
                size={getModalButtonsSize(ModalSize.Medium)}
                label={intl.formatMessage(messages.actionButton)}
                disabled={
                  (!isValid && isDirty) ||
                  (!isValid && isSubmitted) ||
                  sending ||
                  !email
                }
              />
            </ButtonWrapper>
          </Form>
        </>
      )}
    </ModalDialog>
  )
}

export default ContactSupportModal

// Override styles to match new design
const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -4rem;
  padding: 0 1rem;

  & + * {
    margin-top: 2.4rem;
  }

  p {
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: #3b3f42;
    margin: 0;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    line-height: 3.2rem;
    margin: 1.4rem 0 0;

    & + * {
      margin-top: 2.4rem;
    }
  }
`

const LoaderIcon = styled((props) => <SpinnerLoader {...props} />)`
  width: 4.1rem;
  height: 4.1rem;
`

const ModalClose = styled(Close)<{ hidden?: boolean }>`
  visibility: ${({ hidden }) => (hidden ? "hidden" : "visible")};
  position: absolute;
  width: 3.2rem;
  height: 3.2rem;
  right: 2.4rem;
  top: 2.4rem;

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`

const IconWrapper = styled.div`
  width: 6.8rem;
  height: 6.8rem;
  border-radius: 50%;
  background-color: #f4f5f6;
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    width: 2.7rem;
    height: 2.7rem;
  }
`

const FilesDescription = styled(Text)`
  color: #3b3f42;
  font-weight: 300;
  letter-spacing: 0.05em;
`

const Files = styled(FileList)`
  justify-content: flex-start;

  li {
    min-width: 34%;
    width: auto;
  }

  span {
    width: 2.2rem;
    height: 2.2rem;
  }
  p {
    font-size: 1.4rem;
    font-weight: 400;
    color: #000;
  }
`
