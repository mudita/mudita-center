/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { IconSize, IconType } from "app-theme/models"
import { Icon, Typography } from "app-theme/ui"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.duplicates.emptyState.title",
  },
  description: {
    id: "apiDevice.contacts.duplicates.emptyState.description",
  },
})

export const Empty = () => {
  return (
    <Wrapper>
      <RoundIcon>
        <Icon type={IconType.ContactsBook} size={IconSize.AutoMax} />
      </RoundIcon>
      <Text>
        <Typography.H3 message={messages.title.id} />
        <Typography.P1 message={messages.description.id} />
      </Text>
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
