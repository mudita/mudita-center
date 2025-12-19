/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { Button, Typography } from "app-theme/ui"
import { ButtonSize } from "app-theme/models"
import { defineMessages } from "app-localize/utils"
import { ConfirmationModal } from "./confirmation-modal"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.duplicates.header.title",
  },
  description: {
    id: "apiDevice.contacts.duplicates.header.description",
  },
  info: {
    id: "apiDevice.contacts.duplicates.header.info",
  },
  mergeAllButton: {
    id: "apiDevice.contacts.duplicates.header.mergeAllButton",
  },
})

interface Props {
  duplicatesCount: number
  onMergeAll: VoidFunction
  loading?: boolean
}

export const Header: FunctionComponent<Props> = ({
  duplicatesCount,
  onMergeAll,
  loading,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const showConfirmationModal = () => {
    setShowConfirmation(true)
  }

  const closeConfirmationModal = () => {
    setShowConfirmation(false)
  }

  return (
    <>
      <Wrapper>
        <Typography.H3 message={messages.title.id} />
        <Typography.P3 message={messages.description.id} />
        <Button
          size={ButtonSize.Small}
          message={messages.mergeAllButton.id}
          values={{ count: duplicatesCount }}
          onClick={showConfirmationModal}
        />
        <Typography.H4 message={messages.info.id} />
      </Wrapper>
      <ConfirmationModal
        opened={showConfirmation && !loading}
        duplicatesCount={duplicatesCount}
        onConfirm={onMergeAll}
        onCancel={closeConfirmationModal}
      />
    </>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "heading button"
    "description button"
    "info info";
  grid-template-columns: 35.6rem auto;
  grid-auto-rows: auto;
  column-gap: 6.2rem;
  padding: 3.2rem;
  background-color: ${({ theme }) => theme.app.color.grey6};
  border-bottom: 0.1rem solid ${({ theme }) => theme.app.color.grey4};

  h3 {
    grid-area: heading;
    font-size: 1.8rem;
    line-height: 2.4rem;
    margin-bottom: 1.4rem;
  }

  h3 + p {
    grid-area: description;
  }

  button {
    grid-area: button;
    align-self: center;
  }

  h4 {
    grid-area: info;
    margin-top: 3.2rem;
  }
`
