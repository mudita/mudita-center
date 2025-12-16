/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { Button, Icon, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconSize, IconType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.emptyState.title",
  },
  description: {
    id: "apiDevice.contacts.emptyState.description",
  },
  importButton: {
    id: "apiDevice.contacts.importButton",
  },
})

interface Props {
  onImportClick: VoidFunction
}

export const Empty: FunctionComponent<Props> = ({ onImportClick }) => {
  return (
    <Wrapper>
      <RoundIcon>
        <Icon type={IconType.ContactsBook} size={IconSize.AutoMax} />
      </RoundIcon>
      <Text>
        <Typography.H3 message={messages.title.id} />
        <Typography.P1 message={messages.description.id} />
      </Text>
      <Button
        type={ButtonType.Primary}
        message={messages.importButton.id}
        onClick={onImportClick}
        size={ButtonSize.Medium}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  padding-bottom: 5.6rem;
`

const RoundIcon = styled.div`
  width: 6.8rem;
  height: 6.8rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.app.color.grey5};
  border-radius: 50%;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`
