/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputRadioGroup from "App/__deprecated__/renderer/components/core/input-radio-group/input-radio-group.component"
import styled from "styled-components"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"

const radioGroup = [
  {
    value: "lala1",
    id: "id1",
    label: "label",
    subLabel: "sublabel",
  },
  {
    value: "lala2",
    id: "id2",
    label: "label",
    subLabel: "sublabel",
  },
  {
    value: "lala2",
    id: "id3",
    label: "label",
    subLabel: "sublabel",
  },
  {
    value: "lala2",
    id: "id4",
    label: "label",
    subLabel: "sublabel",
  },
]

const ColumnRadioGroup = styled(InputRadioGroup)`
  flex-direction: column;
`

storiesOf("Components|Core/InputRadioGroup ", module).add("Default", () => (
  <>
    <Story title="Horizontal">
      <InputRadioGroup data={radioGroup} radioGroupName={"radiogroupname"} />
    </Story>
    <Story title="Vertical">
      <ColumnRadioGroup data={radioGroup} radioGroupName={"radiogroupname"} />
    </Story>
  </>
))
