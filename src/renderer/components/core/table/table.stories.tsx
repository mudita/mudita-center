import { storiesOf } from "@storybook/react"
import Faker from "faker"
import * as React from "react"
import Table from "Renderer/components/core/table/table.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import { css } from "styled-components"

// Components
export const fakeTableRows = Array.from({
  length: Math.round(15 + Math.random() * 25),
}).map(() => ({
  id: Faker.random.uuid(),
  firstName: Faker.name.firstName(),
  lastName: Faker.name.lastName(),
  phoneNumber: Faker.phone.phoneNumber(),
  favourite: Faker.random.boolean(),
}))

export const fakeTableLabels = ["name", "phone"]

export const Sidebar: FunctionComponent = () => (
  <>
    <p>Some sidebar stuff</p>
  </>
)

// Styles
export const labelsLayout = css`
  grid-template-columns: 3fr 2fr;
  grid-template-rows: auto;
`

// Stories
storiesOf("Components|Table", module).add("Empty", () => {
  return <Table rows={[]} />
})

storiesOf("Components|Table", module).add("Basic", () => {
  return <Table rows={fakeTableRows} />
})

storiesOf("Components|Table", module).add("Basic with sidebar", () => {
  return <Table rows={fakeTableRows} sidebar={<Sidebar />} />
})

storiesOf("Components|Table", module).add(
  "Basic with labels and sidebar",
  () => {
    return (
      <Table
        rows={fakeTableRows}
        labels={fakeTableLabels}
        sidebar={<Sidebar />}
        labelsLayout={labelsLayout}
      />
    )
  }
)
