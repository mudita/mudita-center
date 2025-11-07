/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import { Outlet } from "react-router"
import styled from "styled-components"
import { ManageFilesStorageSummary } from "./manage-files-content/manage-files-storage-summary"
import { ManageFilesCategoryList } from "./manage-files-content/manage-files-category-list"
import { ManageFilesOtherFiles } from "./manage-files-content/manage-files-other-files"
import { ManageFiles2List } from "./manage-files-2-list"

type Props = ComponentProps<typeof ManageFilesStorageSummary> &
  ComponentProps<typeof ManageFilesCategoryList> &
  ComponentProps<typeof ManageFilesOtherFiles>

export const ManageFiles2: FunctionComponent<Props> & {
  List: typeof ManageFiles2List
} = ({
  otherFiles,
  categories,
  segments,
  freeSpaceBytes,
  usedSpaceBytes,
  otherSpaceBytes,
  messages,
}) => {
  return (
    <Wrapper>
      <Sidebar>
        <ManageFilesStorageSummary
          freeSpaceBytes={freeSpaceBytes}
          usedSpaceBytes={usedSpaceBytes}
          segments={segments}
          messages={messages}
        />
        <ManageFilesCategoryList categories={categories} />
        <ManageFilesOtherFiles
          otherFiles={otherFiles}
          otherSpaceBytes={otherSpaceBytes}
        />
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  )
}
ManageFiles2.List = ManageFiles2List

const Wrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 31.2rem 1fr;
  grid-template-areas: "sidebar content";
`

const Sidebar = styled.div`
  grid-area: sidebar;
  flex: 1;
  border-right: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
`

const Content = styled.div`
  grid-area: content;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`
