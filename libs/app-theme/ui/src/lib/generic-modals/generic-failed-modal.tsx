/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType } from "app-theme/models"
import { Modal } from "../modal/modal"
import { Typography } from "../typography/typography"
import { formatCustomMessage } from "app-localize/utils"
import { GenericInfoModal } from "./generic-info-modal"

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
  closeButtonText?: string
  failedItems?: FailedItem[]
}

export const GenericFailedModal: FunctionComponent<Props> = ({
  opened,
  failedItems,
  title,
  description,
  closeButtonText,
  onClose,
}) => {
  const showList = !!failedItems?.length

  return (
    <GenericInfoModal
      opened={opened}
      onClose={onClose}
      title={title}
      iconType={IconType.Failed}
      description={description}
      closeButtonText={closeButtonText}
    >
      {showList && <FailedItemsList items={failedItems} />}
    </GenericInfoModal>
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
  padding-right: 1.4rem;
  padding-left: 0;

  list-style: none;

  li {
    padding-left: 5rem;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      left: 2.1rem;
      vertical-align: middle;
      width: 0.7rem;
      height: 0.7rem;
      background-color: currentColor;
      border-radius: 50%;
      align-self: anchor-center;
    }

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
