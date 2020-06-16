import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import styled, { css } from "styled-components"
import { defineMessages, FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  mediumTextSharedStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  borderColor,
  borderRadius,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import { InputComponent } from "Renderer/components/core/input-text/input-text.component"
import { Message } from "Renderer/interfaces/message.interface"
import InputFile from "Renderer/components/core/input-file/input-file.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import { useForm } from "react-hook-form"
import { InputComponentProps } from "Renderer/components/core/input-text/input-text.interface"

const messages = defineMessages({
  actionButton: {
    id: "component.modal.support.actionButton",
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

const Form = styled.form<{ detailsEnabled?: boolean }>`
  margin-bottom: 0.8rem;
  display: flex;
  flex-direction: column;

  ${({ detailsEnabled }) =>
    detailsEnabled &&
    css`
      margin-bottom: -3.2rem;
    `};
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

const ModalComponent = styled(Modal)`
  h2 {
    ~ p {
      ${mediumTextSharedStyles};
      color: ${textColor("faded")};
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
`

const Log = styled.pre<{ enabled?: boolean }>`
  width: 100%;
  overflow: hidden;
  max-height: 4rem;
  padding: 0.4rem 1.2rem;
  border-radius: ${borderRadius("medium")};
  border: 0.1rem solid ${borderColor("default")};
  box-sizing: border-box;
  resize: none;
  margin-top: 0;

  ${({ enabled }) =>
    enabled &&
    css`
      overflow: auto;
      max-height: 8rem;
    `}
`

interface FormInputLabelProps {
  label: Message
  optional?: boolean
}

const FormInputLabelComponent: FunctionComponent<FormInputLabelProps> = ({
  className,
  label,
  optional = true,
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

interface FormData {
  email?: string
  message?: string
  attachments?: File[]
}

export interface ContactModalProps extends ModalProps {
  onSend?: (data?: FormData) => void
  log?: string
}

const ContactModal: FunctionComponent<ContactModalProps> = ({
  onSend = noop,
  log,
  ...rest
}) => {
  const [detailsEnabled, setDetailsState] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])

  const { register, watch } = useForm({
    mode: "onChange",
  })

  const toggleDetails = () => setDetailsState(!detailsEnabled)

  const handleSend = () => {
    const fields = watch()

    onSend({
      ...fields,
      attachments,
    })
  }

  return (
    <ModalComponent
      closeButton={false}
      size={ModalSize.Medium}
      onActionButtonClick={handleSend}
      actionButtonLabel={intl.formatMessage(messages.actionButton)}
      actionButtonIcon={Type.SendButton}
      title={intl.formatMessage(messages.title)}
      subtitle={intl.formatMessage(messages.description)}
      {...rest}
    >
      <Form detailsEnabled={detailsEnabled}>
        <FormInputLabel label={messages.emailLabel} />
        <InputComponent
          type={"text"}
          label={intl.formatMessage(messages.emailPlaceholder)}
          outlined
          condensed
          name="email"
          inputRef={register}
        />
        <FormInputLabel label={messages.messageLabel} />
        <MessageInput
          type="textarea"
          label={intl.formatMessage(messages.messagePlaceholder)}
          name="message"
          inputRef={register}
          maxRows={3}
        />
        <FormInputLabel label={messages.filesLabel} />
        <FileInput name="attachments" multiple onUpdate={setAttachments} />
        <DetailsLabel>
          <FormInputLabel label={messages.detailsLabel} optional={false} />
          <ButtonComponent
            labelMessage={
              detailsEnabled
                ? messages.detailsHideButton
                : messages.detailsShowButton
            }
            displayStyle={DisplayStyle.Link3}
            onClick={toggleDetails}
          />
        </DetailsLabel>
        <Log enabled={detailsEnabled}>{log}</Log>
      </Form>
    </ModalComponent>
  )
}

export default ContactModal
