/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useState } from "react"
import { McOverview } from "devices/api-device/models"
import styled from "styled-components"
import { Button, Modal, TextFormatted, Typography } from "app-theme/ui"
import {
  ButtonTextModifier,
  ButtonType,
  TypographyWeight,
} from "app-theme/models"

type Props = NonNullable<McOverview["about"]>

export const McOverviewAbout: FunctionComponent<Props> = ({
  title,
  subTitle,
  fields,
}) => {
  return (
    <>
      <Header>
        <Typography.H3>{title}</Typography.H3>
        {subTitle && <Typography.P4>{subTitle}</Typography.P4>}
      </Header>
      <FieldsWrapper>
        {fields.map((field, index) => (
          <AboutListItem key={index}>
            <Typography.P1>{field.title}</Typography.P1>
            {field.type === "text" && (
              <Typography.P1 color={"black"}>{field.value}</Typography.P1>
            )}
            {field.type === "modal" && (
              <Typography.P4 weight={TypographyWeight.Regular}>
                <DetailListModal
                  buttonText={field.buttonText}
                  modalText={field.value}
                />
              </Typography.P4>
            )}
          </AboutListItem>
        ))}
      </FieldsWrapper>
    </>
  )
}

const DetailListModal: FunctionComponent<{
  buttonText?: string
  modalText?: string
}> = ({ buttonText, modalText }) => {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <>
      <Button
        type={ButtonType.Text}
        modifiers={[
          ButtonTextModifier.DefaultCase,
          ButtonTextModifier.Inline,
          ButtonTextModifier.HoverUnderline,
        ]}
        onClick={() => setModalOpened(true)}
      >
        {buttonText}
      </Button>
      <Modal opened={modalOpened}>
        <Modal.CloseButton onClick={() => setModalOpened(false)} />
        <Modal.ScrollableContent fill>
          <TextFormatted text={modalText} />
        </Modal.ScrollableContent>
        <Modal.SizeController size={"large"} />
      </Modal>
    </>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 3.2rem;
  border-bottom: solid 0.1rem ${({ theme }) => theme.app.color.grey4};
`

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 3.2rem;
`

const AboutListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2.4rem;
  background-color: ${({ theme }) => theme.app.color.white};
  border-radius: ${({ theme }) => theme.app.radius.sm};
`
