import { action } from "@storybook/addon-actions"
import React from "react"
import { Type } from "Renderer/components/core/icon/icon.config"
import {
  CustomizedSidebar,
  CustomSidebarTitle,
  Part,
} from "Renderer/components/core/table/stories/styles"
import {
  Sidebar,
  SidebarHeaderIcon,
} from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

export default () => {
  const HeaderLeft = () => (
    <CustomSidebarTitle displayStyle={TextDisplayStyle.LargeBoldText}>
      Sidebar title
    </CustomSidebarTitle>
  )
  const HeaderRight = () => (
    <>
      <SidebarHeaderIcon
        Icon={Type.Notes}
        onClick={action("Notes icon click")}
      />
      <SidebarHeaderIcon
        Icon={Type.Upload}
        onClick={action("Upload icon click")}
      />
      <SidebarHeaderIcon
        Icon={Type.Delete}
        onClick={action("Delete icon click")}
      />
    </>
  )
  return (
    <>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
        <Sidebar onClose={action("Close sidebar")}>
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
        </Sidebar>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>With title</Text>
        <Sidebar onClose={action("Close sidebar")} headerLeft={<HeaderLeft />}>
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
        </Sidebar>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>With icons</Text>
        <Sidebar
          onClose={action("Close sidebar")}
          headerRight={<HeaderRight />}
        >
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
        </Sidebar>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          With title and icons
        </Text>
        <Sidebar
          onClose={action("Close sidebar")}
          headerLeft={<HeaderLeft />}
          headerRight={<HeaderRight />}
        >
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
        </Sidebar>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          With custom header styles
        </Text>
        <CustomizedSidebar
          onClose={action("Close sidebar")}
          headerLeft={<HeaderLeft />}
          headerRight={<HeaderRight />}
        >
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
        </CustomizedSidebar>
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          With scrollable content
        </Text>
        <CustomizedSidebar
          onClose={action("Close sidebar")}
          headerLeft={<HeaderLeft />}
          headerRight={<HeaderRight />}
        >
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
          <p>Some content</p>
        </CustomizedSidebar>
      </Part>
    </>
  )
}
