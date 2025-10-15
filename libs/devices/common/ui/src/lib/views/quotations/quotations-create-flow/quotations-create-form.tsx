/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Button, Icon, Modal, Typography } from "app-theme/ui"
import { ButtonType, IconType } from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import { backgroundColor, borderColor } from "app-theme/utils"
import { quotationsMessages } from "../quotations.messages"
import { NewQuotation } from "../quotations.types"
import { CreateFormInput } from "./create-form-input"
import { CreateFormPreview } from "./create-form-preview"

export interface QuotationsCreateFormProps {
  opened?: boolean
  onClose: VoidFunction
  onSave: (quotation: NewQuotation) => void
}

export const QuotationsCreateForm: FunctionComponent<
  QuotationsCreateFormProps
> = ({ opened = false, onClose, onSave }) => {
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
    onSave({
      quote: trimmedQuotation,
      author: author.trim() ? author.trim() : undefined,
    })
  }, [author, onSave, quotation])

  useEffect(() => {
    if (!opened) {
      setQuotation("")
      setAuthor("")
    }
  }, [opened])

  return (
    <Modal opened={opened} size={92.3}>
      <Wrapper>
        <Form>
          <Header>
            <RoundIcon>
              <Icon type={IconType.Quote} size={4.8} />
            </RoundIcon>
            <Typography.H3
              color={"black"}
              message={quotationsMessages.quotationsCreateFormTitle.id}
            />
            <Typography.P3
              color={"grey2"}
              message={quotationsMessages.quotationsCreateFormDescription.id}
            />
          </Header>
          <CreateFormInput
            label={formatMessage(
              quotationsMessages.quotationsCreateFormQuotationLabel
            )}
            rows={2}
            glyphsType={"light"}
            limits={[440, 440]}
            onChange={handleQuotationChange}
            onError={setQuotationError}
          />
          <CreateFormInput
            label={formatMessage(
              quotationsMessages.quotationsCreateFormAuthorLabel
            )}
            rows={1}
            glyphsType={"bold"}
            limits={[365]}
            onChange={handleAuthorChange}
            onError={setAuthorError}
          />
          <Buttons>
            <Button
              message={
                quotationsMessages.quotationsCreateFormCancelButtonLabel.id
              }
              type={ButtonType.Secondary}
              onClick={onClose}
            />
            <Button
              message={
                quotationsMessages.quotationsCreateFormSaveButtonLabel.id
              }
              type={ButtonType.Primary}
              disabled={!quotation.trim() || quotationError || authorError}
              onClick={handleSave}
            />
          </Buttons>
        </Form>
        <Preview>
          <CreateFormPreview quotation={quotation} author={author} />
        </Preview>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
