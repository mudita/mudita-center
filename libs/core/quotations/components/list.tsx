/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  backgroundColor,
  borderColor,
} from "Core/core/styles/theming/theme-getters"
import React, {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
} from "react"
import styled, { css } from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import InputCheckbox, {
  Size,
} from "Core/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { Quotation } from "../store/types"

interface Props {
  quotations?: Quotation[]
  onCheckboxToggle?: (id: Quotation["id"]) => void
  selectedQuotations: Quotation["id"][]
}

export const List: FunctionComponent<Props> = ({
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
                  <Icon type={IconType.Quotations} size={IconSize.Medium} />
                </RoundIcon>
                <Checkbox
                  size={Size.Medium}
                  id={`checkbox-${quotation.id}`}
                  onChange={handleCheckboxChange}
                  checked={selectedQuotations.includes(quotation.id)}
                />
              </Selector>
              <QuotationText
                // @ts-ignore
                title={quotation.text}
              >
                {quotation.text}
              </QuotationText>
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

const Checkbox = styled(InputCheckbox)`
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
    grid-template-columns: 4rem 39rem 10rem 1fr;
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

const QuotationText = styled(Text).attrs((attrs) => ({
  ...attrs,
  displayStyle: TextDisplayStyle.Paragraph1,
}))`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const QuotationAuthor = styled(Text).attrs((attrs) => ({
  ...attrs,
  displayStyle: TextDisplayStyle.Headline4,
}))``
