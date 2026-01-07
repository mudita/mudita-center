/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import styled from "styled-components"
import { Table } from "./table"

const Decorator = styled.div`
  width: 100%;
  max-width: 800px;
  height: 24rem;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.app.color.grey4};
  border-radius: 8px;
  background: ${({ theme }) => theme.app.color.white};
`

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
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
          "Virtualized `<Table />` with sticky header and list-like row styles. " +
          "Rows can be highlighted as active and optionally clickable.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Table>

const makeIds = (n: number) =>
  Array.from({ length: n }, (_, i) => `row-${i + 1}`)

export const Default: Story = {
  args: {
    dataIds: makeIds(1),
    activeRowId: undefined,
    children: (
      <>
        <Table.HeaderCell>Column A</Table.HeaderCell>
        <Table.HeaderCell>Column B</Table.HeaderCell>
        <Table.Cell>Cell A</Table.Cell>
        <Table.Cell>Cell B</Table.Cell>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Basic table with 1 row",
      },
    },
  },
}

export const LargeData: Story = {
  args: {
    dataIds: makeIds(500),
    activeRowId: undefined,
    children: (
      <>
        <Table.HeaderCell>Column A</Table.HeaderCell>
        <Table.HeaderCell>Column B</Table.HeaderCell>
        <Table.Cell>Cell A</Table.Cell>
        <Table.Cell>Cell B</Table.Cell>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Virtualization preview with 500 rows to showcase performance and placeholders outside the viewport.",
      },
    },
  },
}
