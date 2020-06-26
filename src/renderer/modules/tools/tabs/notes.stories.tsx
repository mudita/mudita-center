import Faker from "faker"
import React from "react"
import { storiesOf } from "@storybook/react"

import Notes from "Renderer/modules/tools/tabs/notes.component"

export const exampleData = Array.from(
  Array(Faker.random.number({ min: 10, max: 20 }))
).map(_ => ({
  id: Faker.random.uuid(),
  content: Faker.lorem.paragraph(Faker.random.number({ min: 2, max: 10 })),
  date: Faker.random.boolean() ? Faker.date.past() : Faker.date.recent(),
}))

storiesOf("Views|Tools", module)
  .add("Notes – default", () => (
    <div style={{ width: "97.5rem" }}>
      <Notes data={exampleData} />
    </div>
  ))
  .add("Notes – empty", () => (
    <div style={{ width: "97.5rem" }}>
      <Notes data={[]} />
    </div>
  ))
