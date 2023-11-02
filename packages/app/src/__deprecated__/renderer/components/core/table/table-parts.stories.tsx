/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { action } from "@storybook/addon-actions"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import {
  Col,
  Group,
  Labels,
  NestedGroup,
  Row,
  RowSize,
  Sidebar,
  SidebarHeaderButton,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import theme from "App/__deprecated__/renderer/styles/theming/theme"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import {
  Checkbox,
  Files,
  SelectableFiles,
} from "App/__deprecated__/renderer/components/core/table/table-grouped.stories"
import { partsStoryStyles } from "App/__deprecated__/renderer/components/core/table/table-shared.stories"

const partsStoryContainerStyles = css`
  main {
    ${partsStoryStyles};
  }
`

const CustomSidebarTitle = styled(Text)`
  margin: 0 !important;
`

const sidebarStoryStyles = css`
  > * {
    margin-right: 0 !important;
  }
`

export default {
  title: "Components|Core/Table/Parts"
}

export const LabelsView = () => (
  <>
    <Story title="Column labels" customStyle={partsStoryStyles}>
      <Files>
        <Labels>
          <Col>File type</Col>
          <Col>Last backup</Col>
          <Col>Size</Col>
        </Labels>
      </Files>
    </Story>
    <Story title="Group label" customStyle={partsStoryStyles}>
      <Files>
        <Group>
          <Labels>
            <Col>Favourites</Col>
          </Labels>
        </Group>
      </Files>
    </Story>
  </>
)

LabelsView.story = {
  name: "Labels view",
}

export const RowsView = () => (
  <>
    <StoryContainer
      title="Sizes"
      column
      customStyle={partsStoryContainerStyles}
    >
      <Story title="Big">
        <Files>
          <Row size={RowSize.Big}>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </Files>
      </Story>
      <Story title="Medium (default)">
        <Files>
          <Row size={RowSize.Medium}>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </Files>
      </Story>
      <Story title="Small">
        <Files>
          <Row size={RowSize.Small}>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </Files>
      </Story>
      <Story title="Tiny">
        <Files>
          <Row size={RowSize.Tiny}>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </Files>
      </Story>
    </StoryContainer>
    <StoryContainer
      title="Types"
      column
      customStyle={partsStoryContainerStyles}
    >
      <Story title="Nested (big and default)">
        <Files>
          <Row size={RowSize.Big}>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
          <NestedGroup>
            <Row>
              <Col>Ringtones</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>10 MB</Col>
            </Row>
            <Row>
              <Col>Songs</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>40 MB</Col>
            </Row>
          </NestedGroup>
        </Files>
      </Story>
      <Story title="Nested (default and small)">
        <Files>
          <Row>
            <Col>Music</Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
          <NestedGroup>
            <Row size={RowSize.Small}>
              <Col>Ringtones</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>10 MB</Col>
            </Row>
            <Row size={RowSize.Small}>
              <Col>Songs</Col>
              <Col>{new Date().toLocaleString()}</Col>
              <Col>40 MB</Col>
            </Row>
          </NestedGroup>
        </Files>
      </Story>
    </StoryContainer>
    <StoryContainer
      title="States"
      column
      customStyle={partsStoryContainerStyles}
    >
      <Story title="Default">
        <SelectableFiles>
          <Row>
            <Col>
              <Checkbox checked={false} onChange={noop} />
              <div>Music</div>
            </Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </SelectableFiles>
      </Story>
      <Story title="Hovered">
        <SelectableFiles>
          <Row style={{ backgroundColor: theme.color.background.minor }}>
            <Col>
              <Checkbox checked={false} onChange={noop} />
              <div>Music</div>
            </Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </SelectableFiles>
      </Story>
      <Story title="Active">
        <SelectableFiles>
          <Row active onClick={noop}>
            <Col>
              <Checkbox checked={false} onChange={noop} />
              <div>Music</div>
            </Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </SelectableFiles>
      </Story>
      <Story title="Selected">
        <SelectableFiles>
          <Row selected>
            <Col>
              <Checkbox checked onChange={noop} />
              <div>Music</div>
            </Col>
            <Col>{new Date().toLocaleString()}</Col>
            <Col>50 MB</Col>
          </Row>
        </SelectableFiles>
      </Story>
    </StoryContainer>
  </>
)

RowsView.story = {
  name: "Rows view",
}

export const SidebarView = () => {
  const HeaderLeft = () => (
    <CustomSidebarTitle displayStyle={TextDisplayStyle.Headline4}>
      Sidebar title
    </CustomSidebarTitle>
  )
  const HeaderRight = () => (
    <>
      <SidebarHeaderButton
        iconType={IconType.Notes}
        onClick={action("Notes icon click")}
        description={{ id: "Notes icon click" }}
      />
      <SidebarHeaderButton
        iconType={IconType.Upload}
        onClick={action("Upload icon click")}
        description={{ id: "Upload icon click" }}
      />
      <SidebarHeaderButton
        iconType={IconType.Delete}
        onClick={action("Delete icon click")}
        description={{ id: "Delete icon click" }}
      />
    </>
  )
  return (
    <>
      <Story title="Default" customStyle={sidebarStoryStyles} transparentMode>
        <Sidebar onClose={action("Close sidebar")}>
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
        </Sidebar>
      </Story>
      <Story
        title="With title"
        customStyle={sidebarStoryStyles}
        transparentMode
      >
        <Sidebar onClose={action("Close sidebar")} headerLeft={<HeaderLeft />}>
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
        </Sidebar>
      </Story>
      <Story
        title="With icons"
        customStyle={sidebarStoryStyles}
        transparentMode
      >
        <Sidebar
          onClose={action("Close sidebar")}
          headerRight={<HeaderRight />}
        >
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
        </Sidebar>
      </Story>
      <Story
        title="With title and icons"
        customStyle={sidebarStoryStyles}
        transparentMode
      >
        <Sidebar
          onClose={action("Close sidebar")}
          headerLeft={<HeaderLeft />}
          headerRight={<HeaderRight />}
        >
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
        </Sidebar>
      </Story>
    </>
  )
}

SidebarView.story = {
  name: "Sidebar view",
}
