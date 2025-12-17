/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { Contact, DuplicateContactsGroup } from "devices/common/models"
import { Card } from "./card"

interface Props {
  contacts: DuplicateContactsGroup[]
  onMerge: (toKeepId: Contact["contactId"]) => void
}

export const List: FunctionComponent<Props> = ({ contacts, onMerge }) => {
  return (
    <Wrapper>
      {contacts.map(({ toKeep, toMerge }) => {
        const handleMerge = () => {
          onMerge(toKeep.contactId)
        }
        return (
          <Card
            key={toKeep.contactId}
            toKeep={toKeep}
            toMerge={toMerge}
            onMerge={handleMerge}
          />
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3.2rem;
  gap: 2.4rem;
  flex: 1;
  overflow-y: auto;
  width: 100%;
`
