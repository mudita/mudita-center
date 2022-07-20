/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css, FlattenSimpleInterpolation } from "styled-components"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  boxShadowColor,
  textColor,
  transitionTime,
  transitionTimingFunction,
  zIndex,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { getTextStyles, TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import SearchableText from "App/__deprecated__/renderer/components/core/searchable-text/searchable-text.component"

export const ListItem = styled.li<{
  empty?: boolean
  selected?: boolean
  disabled?: boolean
}>`
  cursor: pointer;
  padding: 1.2rem 2.4rem;
  ${getTextStyles(TextDisplayStyle.Paragraph3)};
  font-weight: 300;

  :not(:last-of-type) {
    border-bottom: solid ${borderColor("list")} 0.1rem;
  }

  ${({ empty }) =>
    empty &&
    css`
      color: ${textColor("secondary")};
    `}

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${backgroundColor("minor")};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${backgroundColor("minor")};
      cursor: not-allowed;

      &:active {
        pointer-events: none;
      }
    `};
`

export const upperDropdownListStyles = css`
  top: auto;
  bottom: 100%;
  margin-top: 0;
  margin-bottom: 0.8rem;
`

export const List = styled.ul<{
  expanded?: boolean
  listStyles?: FlattenSimpleInterpolation
}>`
  z-index: ${zIndex("dropdown")};
  top: 100%;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  list-style: none;
  background-color: ${backgroundColor("row")};
  box-shadow: 0 0.5rem 1.5rem 0 ${boxShadowColor("light")};
  border-radius: ${borderRadius("medium")};
  margin: 0.8rem 0 0 0;
  padding: 0;
  transform: translateY(-0.8rem);
  opacity: 0;
  visibility: hidden;
  transition: all ${transitionTime("veryQuick")}
    ${transitionTimingFunction("smooth")};
  overflow: auto;
  border: solid 0.1rem ${borderColor("secondary")};

  ${({ listStyles }) =>
    css`
      ${listStyles}
    `};

  ${({ expanded }) =>
    expanded &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `};
`

export type ItemValue = string | number

type RenderableListItem = ItemValue | JSX.Element

interface RenderListItemProps<Item, Props> {
  item: Item
  props: Props
  searchString: string
}

export type RenderListItem<Item, Props = any> = ({
  item,
  props,
  searchString,
}: RenderListItemProps<Item, Props>) => RenderableListItem

export const renderListItemSearchable: RenderListItem<unknown> = ({
  item,
  props,
  searchString,
}) => (
  <ListItem {...props}>
    <SearchableText text={String(item)} search={searchString} />
  </ListItem>
)
