/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { formatMessage } from "app-localize/utils"
import { Icon, ListItem, Marker, Typography } from "app-theme/ui"
import { IconSize } from "app-theme/models"
import { FileManagerFileCategory } from "../manage-files.types"
import { manageFilesMessages } from "../manage-files.messages"
import { NavLink } from "react-router"

export interface ManageFilesCategoryListProps {
  categories: FileManagerFileCategory[]
}

export const ManageFilesCategoryList: FunctionComponent<
  ManageFilesCategoryListProps
> = ({ categories }) => {
  return (
    <Wrapper>
      {categories.map((category) => (
        <Link to={`../${category.id}`} relative={"path"}>
          {({ isActive }) => (
            <CategoryListItem key={category.id} active={isActive}>
              <CategoryListItemName>
                <CategoryListItemNameIcon
                  size={IconSize.Big}
                  type={category.icon}
                />
                <CategoryListItemNameText>
                  {category.label}
                </CategoryListItemNameText>
              </CategoryListItemName>
              <CategoryListItemStorage>
                <CategoryListItemStorageText>
                  {category.size}
                </CategoryListItemStorageText>
                <CategoryListItemStorageMarker $color={category.markerColor} />
              </CategoryListItemStorage>
              <CategoryListItemCountTextWrapper>
                {formatMessage(manageFilesMessages.categoryCount, {
                  count: Number(category.count),
                })}
              </CategoryListItemCountTextWrapper>
            </CategoryListItem>
          )}
        </Link>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Link = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`

const CategoryListItem = styled(ListItem)`
  padding: 1.2rem 3.2rem 1rem 3.2rem;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto 10rem;
`

const CategoryListItemName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CategoryListItemNameIcon = styled(Icon)`
  margin: 0 0.8rem 0 -0.8rem;
`

const CategoryListItemNameText = styled(Typography.H4)``

const CategoryListItemStorage = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const CategoryListItemStorageText = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
`

const CategoryListItemStorageMarker = styled(Marker)`
  width: 1rem;
  margin: 0 0 0 0.8rem;
`

const CategoryListItemCountTextWrapper = styled(Typography.P3)`
  grid-area: 2 / 1 / 3 / 3;
  margin: 0.8rem 0 0 0;
`
