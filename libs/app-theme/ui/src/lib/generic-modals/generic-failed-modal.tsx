/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonType, IconType } from "app-theme/models"
import { Button } from "../button/button"
import { Modal } from "../modal/modal"
import { Typography } from "../typography/typography"
import { formatCustomMessage } from "app-localize/utils"

export interface FailedItem {
  id: string
  name: string
  label?: string
}

interface Props {
  opened: boolean
  onClose: VoidFunction
  title: string
  description: string
  buttonText: string
  failedItems?: FailedItem[]
}

export const GenericFailedModal: FunctionComponent<Props> = ({
  opened,
  failedItems,
  title,
  description,
  buttonText,
  onClose,
}) => {
  const showList = !!failedItems?.length

  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title>{title}</Modal.Title>
      <Typography.P1>{description}</Typography.P1>
      {showList && <FailedItemsList items={failedItems} />}
      <Modal.Buttons>
        <Button onClick={onClose} type={ButtonType.Secondary}>
          {buttonText}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}

const FailedItemsList = ({ items }: { items: FailedItem[] }) => {
  return (
    <Modal.ScrollableContent>
      <ItemsList>
        {items.map((item) => (
          <li key={item.id}>
            <ItemsListItem>
              <Typography.P1>
                {formatCustomMessage(
                  item.name,
                  formatCustomMessage.textFormatters
                )}
              </Typography.P1>
              {item.label && (
                <ItemsListItemLabel>({item.label})</ItemsListItemLabel>
              )}
            </ItemsListItem>
          </li>
        ))}
      </ItemsList>
    </Modal.ScrollableContent>
  )
}

const ItemsList = styled.ul`
  li {
    p {
      &:first-child {
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &:nth-child(2) {
        white-space: nowrap;
        color: ${({ theme }) => theme.app.color.grey2};
      }
    }
  }
`

const ItemsListItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.4rem;
  justify-content: space-between;
  overflow: hidden;
`

const ItemsListItemLabel = styled(Typography.P1)`
  color: ${({ theme }) => theme.app.color.grey2};
`
