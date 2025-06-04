/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router"
import styled from "styled-components"
import { selectHelpCategoriesList } from "help/feature"
import { helpPaths } from "help/routes"
import { HelpTestId } from "help/models"

export const CategoryTabs: FunctionComponent = () => {
  const categories = useSelector(selectHelpCategoriesList)

  return (
    <Wrapper data-testid={HelpTestId.CategoriesList}>
      {categories?.map((category) => {
        return (
          <Tab
            key={category.id}
            to={`${helpPaths.index}/${category.id}`}
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

const Wrapper = styled.nav`
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
  font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
  color: ${({ theme }) => theme.app.color.grey1};
  position: relative;

  span {
    text-decoration: none;
    &.normal {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      visibility: visible;
      white-space: nowrap;
    }
    &.bold {
      font-weight: ${({ theme }) => theme.app.fontWeight.bold};
      visibility: hidden;
    }
  }

  &:hover,
  &.active {
    background-color: ${({ theme }) => theme.app.color.grey7};
    color: ${({ theme }) => theme.app.color.black};
  }

  &.active {
    text-decoration: none;
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
