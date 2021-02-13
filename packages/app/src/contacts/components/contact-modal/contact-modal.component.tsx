import React, { useEffect, useRef, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import styled, { css, keyframes } from "styled-components"
import { defineMessages, FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  mediumTextSharedStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderRadius,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import { InputComponent } from "Renderer/components/core/input-text/input-text.component"
import { Message } from "Renderer/interfaces/message.interface"
import InputFile from "Renderer/components/core/input-file/input-file.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import Button from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Type,
} from "Renderer/components/core/button/button.config"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import { useForm } from "react-hook-form"
import { InputComponentProps } from "Renderer/components/core/input-text/input-text.interface"
import { disabledPrimaryStyles } from "Renderer/components/core/button/button.styled.elements"
import { emailValidator } from "Renderer/utils/form-validators"
import { getModalButtonsSize } from "Renderer/components/core/modal/modal.helpers"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import { IconSize } from "Renderer/components/core/icon/icon.component"

const messages = defineMessages({
  actionButton: {
    id: "component.modal.support.actionButton",
  },
  actionButtonProgress: {
    id: "component.modal.support.actionButtonProgress",
  },
  title: {
    id: "component.modal.support.title",
  },
  description: {
    id: "component.modal.support.description",
  },
  emailLabel: { id: "component.modal.support.form.email.label" },
  emailPlaceholder: { id: "component.modal.support.form.email.placeholder" },
  messageLabel: { id: "component.modal.support.form.message.label" },
  messagePlaceholder: {
    id: "component.modal.support.form.message.placeholder",
  },
  filesLabel: { id: "component.modal.support.form.files.label" },
  detailsLabel: { id: "component.modal.support.form.details.label" },
  detailsShowButton: { id: "component.modal.support.form.details.showButton" },
  detailsHideButton: { id: "component.modal.support.form.details.hideButton" },
  optional: { id: "component.modal.support.form.optional" },
  emailRequiredError: { id: "form.error.requiredEmail" },
})

const MessageInput = styled(InputComponent)<InputComponentProps>`
  min-height: 8rem;
  align-items: flex-start;
  padding: 0 1.2rem;
  border-radius: ${borderRadius("medium")};

  textarea {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`

const FileInput = styled(InputFile)`
  label {
    padding-left: 1.3rem;
    padding-right: 1.3rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
`

const DetailsLabel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  button {
    padding: 0.5rem;
    height: auto;
    width: auto;
    margin-bottom: 0.7rem;
  }
`

const iconAnimation = keyframes`
  from {
    transform: rotateZ(0deg)
  }
  to {
    transform: rotateZ(360deg)
  }
`

const ButtonWrapper = styled.div`
  margin-top: 4rem;
`

const ModalComponent = styled(Modal)<{ sending?: boolean }>`
  h2 {
    ~ p {
      ${mediumTextSharedStyles};
      color: ${textColor("secondary")};
    }
  }

  > div {
    &:first-of-type {
      grid-row-gap: 1.6rem;
    }

    &:last-of-type {
      justify-content: flex-start;
    }
  }

  button[type="submit"] {
    svg {
      fill: ${backgroundColor("lightIcon")};
    }
    ${({ sending }) =>
      sending &&
      css`
        pointer-events: none;
        ${disabledPrimaryStyles};

        svg {
          animation: ${iconAnimation} 1s infinite linear;
        }
      `};
  }
`

const Log = styled.pre<{ enabled?: boolean }>`
  width: 100%;
  overflow: hidden;
  max-height: 4rem;
  padding: 0.4rem 1.2rem;
  border: 0.1rem solid transparent;
  box-sizing: border-box;
  resize: none;
  margin-top: 0;
  background-color: ${backgroundColor("main")};

  ${({ enabled }) =>
    enabled &&
    css`
      overflow: auto;
      max-height: 8rem;
    `}
`

const LogWrapper = styled.div`
  height: 8rem;
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

export interface SupportFormData {
  email?: string
  message?: string
  attachments?: File[]
}

export interface ContactModalProps extends ModalProps {
  onSend?: (data: SupportFormData) => void
  log?: string
  sending?: boolean
}

const ContactModal: FunctionComponent<ContactModalProps> = ({
  onSend = noop,
  log,
  sending,
  ...rest
}) => {
  const [moreDetailsEnabled, enableMoreDetails] = useState(false)
  const [showingDetails, showDetails] = useState(false)
  const logRef = useRef<HTMLPreElement>(null)

  const { register, errors, handleSubmit, setValue } = useForm({
    mode: "onChange",
  })

  const toggleDetails = () => showDetails((prevState) => !prevState)

  const updateAttachments = (attachments: File[]) => {
    setValue("attachments", attachments)
  }

  const sendEmail = handleSubmit((data) => {
    onSend(data)
  })

  useEffect(() => {
    if (logRef.current) {
      if (logRef.current.scrollHeight > 38) {
        enableMoreDetails(true)
      }
    }
  }, [logRef])

  useEffect(() => {
    if (!showingDetails && logRef.current) {
      logRef.current.scrollTop = 0
    }
  }, [showingDetails])

  return (
    <ModalComponent
      closeButton={false}
      size={ModalSize.Medium}
      title={intl.formatMessage(messages.title)}
      subtitle={intl.formatMessage(messages.description)}
      {...rest}
      sending={sending}
    >
      <Form onSubmit={sendEmail}>
        <FormInputLabel label={messages.emailLabel} />
        <InputComponent
          data-testid={ModalTestIds.Email}
          type={"text"}
          label={intl.formatMessage(messages.emailPlaceholder)}
          outlined
          condensed
          name="email"
          inputRef={register({
            ...emailValidator,
            required: {
              value: true,
              message: intl.formatMessage(messages.emailRequiredError),
            },
          })}
          errorMessage={errors.email?.message}
        />
        <FormInputLabel label={messages.messageLabel} optional />
        <MessageInput
          type="textarea"
          label={intl.formatMessage(messages.messagePlaceholder)}
          name="message"
          inputRef={register}
          maxRows={3}
        />
        <FormInputLabel label={messages.filesLabel} optional />
        <FileInput name="attachments" multiple onUpdate={updateAttachments} />
        <DetailsLabel>
          <FormInputLabel label={messages.detailsLabel} optional={false} />
          {moreDetailsEnabled && (
            <ButtonComponent
              labelMessage={
                showingDetails
                  ? messages.detailsHideButton
                  : messages.detailsShowButton
              }
              displayStyle={DisplayStyle.Link3}
              onClick={toggleDetails}
            />
          )}
        </DetailsLabel>
        <LogWrapper>
          <Log enabled={showingDetails} ref={logRef}>
            {log}
          </Log>
        </LogWrapper>
        <ButtonWrapper>
          <Button
            displayStyle={DisplayStyle.Primary}
            size={getModalButtonsSize(ModalSize.Medium)}
            label={intl.formatMessage(
              sending ? messages.actionButtonProgress : messages.actionButton
            )}
            data-testid={ModalTestIds.ModalActionButton}
            iconSize={IconSize.Small}
            Icon={sending ? IconType.Refresh : IconType.SendButton}
            type={Type.Submit}
          />
        </ButtonWrapper>
      </Form>
    </ModalComponent>
  )
}

export default ContactModal
