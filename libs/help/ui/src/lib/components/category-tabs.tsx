/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectHelpCategoriesList } from "help/store"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { HelpTestId } from "../test-ids"

export const CategoryTabs: FunctionComponent = () => {
  const categories = useSelector(selectHelpCategoriesList)

  return (
    <Wrapper data-testid={HelpTestId.CategoriesList}>
      {categories?.map((category) => {
        return (
          <Tab
            key={category.id}
            to={`${URL_MAIN.help}/${category.id}`}
            data-testid={HelpTestId.CategoriesListItem}
          >
            <span className={"normal"}>{category.name}</span>
            <span className={"bold"} aria-hidden={true}>
              {category.name}
            </span>
          </Tab>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
`

const Tab = styled(NavLink)`
  padding: 0.4rem 1.6rem;
  border-radius: 2rem;
  min-width: 7.2rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  color: ${({ theme }) => theme.color.grey1};
  position: relative;

  span {
    &.normal {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      visibility: visible;
      white-space: nowrap;
    }
    &.bold {
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      visibility: hidden;
    }
  }

  &:hover,
  &.active {
    background-color: ${({ theme }) => theme.color.grey7};
    color: ${({ theme }) => theme.color.black};
  }

  &.active {
    span {
      &.normal {
        visibility: hidden;
      }
      &.bold {
        visibility: visible;
      }
    }
  }
`
