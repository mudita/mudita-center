/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEventHandler, FunctionComponent, useCallback } from "react"
import styled, { css } from "styled-components"
import { Checkbox as BaseCheckbox, Icon, Typography } from "app-theme/ui"
import { CheckboxSize, IconSize, IconType } from "app-theme/models"
import { backgroundColor, borderColor } from "app-theme/utils"
import { Quotation } from "./quotations.types"

interface Props {
  quotations?: Quotation[]
  onCheckboxToggle?: (id: Quotation["id"]) => void
  selectedQuotations: Quotation["id"][]
}

export const QuotationsList: FunctionComponent<Props> = ({
  quotations,
  onCheckboxToggle,
  selectedQuotations,
}) => {
  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const id = event.target.id.replace("checkbox-", "")
        onCheckboxToggle?.(id)
      },
      [onCheckboxToggle]
    )

  return (
    <Wrapper $selectMode={selectedQuotations.length > 0}>
      {quotations?.map((quotation) => {
        return (
          <ListItem key={quotation.id}>
            <label htmlFor={`checkbox-${quotation.id}`}>
              <Selector>
                <RoundIcon>
                  <Icon type={IconType.Quote} size={IconSize.Medium} />
                </RoundIcon>
                <Checkbox
                  id={`checkbox-${quotation.id}`}
                  onChange={handleCheckboxChange}
                  size={CheckboxSize.Small}
                  checked={selectedQuotations.includes(quotation.id)}
                />
              </Selector>
              <QuotationText>{quotation.quote}</QuotationText>
              <div />
              <QuotationAuthor>{quotation.author || "-"}</QuotationAuthor>
            </label>
          </ListItem>
        )
      })}
    </Wrapper>
  )
}

const RoundIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${backgroundColor("icon")};
  border-radius: 50%;
  z-index: 1;

  opacity: 1;
  visibility: visible;
  transition-property: opacity, visibility;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
`

const Wrapper = styled.ul<{ $selectMode: boolean }>`
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0;
  padding: 0;

  ${({ $selectMode }) =>
    $selectMode &&
    css`
      ${RoundIcon} {
        opacity: 0;
        visibility: hidden;
      }

      ${Checkbox} {
        opacity: 1;
        visibility: visible;
      }
    `};
`

const Checkbox = styled(BaseCheckbox)`
  opacity: 0;
  visibility: hidden;
  transition-property: opacity, visibility;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
`

const ListItem = styled.li`
  list-style: none;

  label {
    cursor: pointer;
    height: 8.2rem;
    display: grid;
    grid-template-columns: 4rem 46.5rem 1.5rem 1fr;
    align-items: center;
    gap: 1.6rem;
    padding-left: 3.2rem;
  }

  &:not(:last-of-type) {
    border-bottom: 0.1rem solid ${borderColor("deviceListSeparator")};
  }

  &:hover {
    background-color: ${backgroundColor("main")};

    ${RoundIcon} {
      opacity: 0;
      visibility: hidden;
    }

    ${Checkbox} {
      opacity: 1;
      visibility: visible;
    }
  }

  &:has(input:checked) {
    background-color: ${backgroundColor("minor")};
  }
`

const Selector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  position: relative;
`

const QuotationText = styled(Typography.P1)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ theme }) => theme.app.color.black};
`

const QuotationAuthor = styled(Typography.H4)``
