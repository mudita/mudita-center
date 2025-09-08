/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import styled from "styled-components"
import { ListItem } from "./list-item"

const Decorator = styled.div`
  display: flex;
  flex-direction: column;
  width: 24rem;
  margin: 0 auto;
  > div {
    padding: 1rem;
  }
`

const meta: Meta<typeof ListItem> = {
  title: "UI/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "The `<ListItem />` component represents a single row in a list or table-like layout. " +
          "It supports hover and active styles and can be used as a clickable element when an `onClick` handler is provided.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof ListItem>

export const Default: Story = {
  args: {
    children: "Default list item",
  },
}

export const Active: Story = {
  args: {
    children: "Active list item",
    active: true,
  },
}

export const Clickable: Story = {
  args: {
    children: "Clickable list item",
    onClick: () => alert("List item clicked!"),
  },
}

export const Mixed: Story = {
  render: () => (
    <>
      <ListItem>Default</ListItem>
      <ListItem onClick={() => alert("clicked")}>Clickable</ListItem>
      <ListItem active onClick={() => alert("clicked")}>
        Active + Clickable
      </ListItem>
      <ListItem onClick={() => alert("clicked")}>Clickable 2</ListItem>
      <ListItem onClick={() => alert("clicked")}>Clickable 3</ListItem>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example rendering multiple variants of `<ListItem />` together – default, clickable, active, and active+clickable.",
      },
    },
  },
}
