/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react"
import { ModalDialog } from "Core/ui"
import styled from "styled-components"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import {
  backgroundColor,
  borderColor,
} from "Core/core/styles/theming/theme-getters"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { CreatorInput } from "./creator-input"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { CreatorPreview } from "./creator-preview"

const messages = defineMessages({
  title: {
    id: "module.quotations.creatorModal.title",
  },
  description: {
    id: "module.quotations.creatorModal.description",
  },
  quotationLabel: {
    id: "module.quotations.creatorModal.quotationLabel",
  },
  authorLabel: {
    id: "module.quotations.creatorModal.authorLabel",
  },
  cancelButtonLabel: {
    id: "module.quotations.creatorModal.cancelButton",
  },
  saveButtonLabel: {
    id: "module.quotations.creatorModal.saveButton",
  },
})

interface Props {
  opened?: boolean
  onClose: VoidFunction
  onSave: (quotation: string, author?: string) => void
}

export const QuotationsCreator: FunctionComponent<Props> = ({
  opened = false,
  onClose,
  onSave,
}) => {
  const [quotation, setQuotation] = useState("")
  const [author, setAuthor] = useState("")
  const [quotationError, setQuotationError] = useState<boolean>()
  const [authorError, setAuthorError] = useState<boolean>()

  const handleQuotationChange = useCallback((value: string) => {
    setQuotation(value)
  }, [])

  const handleAuthorChange = useCallback((value: string) => {
    setAuthor(value)
  }, [])

  const handleSave = useCallback(() => {
    const trimmedQuotation = quotation
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
    onSave(trimmedQuotation, author.trim())
  }, [author, onSave, quotation])

  useEffect(() => {
    if (!opened) {
      setQuotation("")
      setAuthor("")
    }
  }, [opened])

  return (
    <ModalDialog
      open={opened}
      closeable={false}
      closeButton={false}
      size={ModalSize.LargeNew}
    >
      <Wrapper>
        <Form>
          <Header>
            <RoundIcon>
              <Icon type={IconType.Quotations} size={IconSize.Enormous} />
            </RoundIcon>
            <Text
              displayStyle={TextDisplayStyle.Headline3}
              message={messages.title}
            />
            <Text
              displayStyle={TextDisplayStyle.Paragraph3}
              color={"secondary"}
              message={messages.description}
            />
          </Header>
          <CreatorInput
            label={intl.formatMessage(messages.quotationLabel)}
            rows={2}
            glyphsType={"light"}
            limits={[440, 440]}
            onChange={handleQuotationChange}
            onError={setQuotationError}
          />
          <CreatorInput
            label={intl.formatMessage(messages.authorLabel)}
            rows={1}
            glyphsType={"bold"}
            limits={[365]}
            onChange={handleAuthorChange}
            onError={setAuthorError}
          />
          <Buttons>
            <ButtonComponent
              label={intl.formatMessage(messages.cancelButtonLabel)}
              displayStyle={DisplayStyle.Secondary}
              onClick={onClose}
            />
            <ButtonComponent
              label={intl.formatMessage(messages.saveButtonLabel)}
              displayStyle={DisplayStyle.Primary}
              disabled={!quotation.trim() || quotationError || authorError}
              onClick={handleSave}
            />
          </Buttons>
        </Form>
        <Preview>
          <CreatorPreview quotation={quotation} author={author} />
        </Preview>
      </Wrapper>
    </ModalDialog>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Form = styled.div`
  flex: 1;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.6rem;

  h3 {
    font-size: 2rem;
    line-height: 3.2rem;
    margin: 1.4rem 0 2.2rem;
    text-align: center;
  }
  p {
    margin: 0;
    text-align: center;
    max-width: 37rem;
  }
`

const RoundIcon = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.8rem;
  height: 6.8rem;
  background-color: ${backgroundColor("icon")};
  border-radius: 50%;
`

const Preview = styled.div`
  flex: 1;
  max-width: 41rem;
  border-left: 0.1rem solid ${borderColor("separator")};
  padding: 2.4rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2.4rem;

  button {
    width: 15.6rem;
  }
`
