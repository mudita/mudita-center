import { storiesOf } from "@storybook/react"
import * as React from "react"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"

storiesOf("Components|InputCheckbox/checked", module)
  .add("Large", () => {
    return (
      <InputCheckbox
        name={"Example1"}
        value={"value1"}
        id={"id1"}
        defaultChecked
      />
    )
  })
  .add("Medium", () => {
    return (
      <InputCheckbox
        name={"Example1"}
        value={"value1"}
        id={"id1"}
        size={Size.Medium}
        defaultChecked
      />
    )
  })
  .add("Small", () => {
    return (
      <InputCheckbox
        name={"Example1"}
        value={"value1"}
        id={"id1"}
        size={Size.Small}
        defaultChecked
      />
    )
  })

storiesOf("Components|InputCheckbox/unchecked", module)
  .add("Large", () => {
    return <InputCheckbox name={"Example1"} value={"value2"} id={"id2"} />
  })
  .add("Medium", () => {
    return (
      <InputCheckbox
        name={"Example1"}
        value={"value2"}
        id={"id2"}
        size={Size.Medium}
      />
    )
  })
  .add("Small", () => {
    return (
      <InputCheckbox
        name={"Example1"}
        value={"value2"}
        id={"id2"}
        size={Size.Small}
      />
    )
  })

storiesOf("Components|InputCheckbox/with label", module)
  .add("Large", () => {
    return (
      <InputCheckbox
        name={"Example1"}
        value={"value2"}
        id={"id2"}
        label={"label"}
      />
    )
  })
  .add("Medium", () => {
    return (
      <InputCheckbox
        name={"Example1"}
        value={"value2"}
        id={"id2"}
        label={"label"}
        size={Size.Medium}
      />
    )
  })
  .add("Small", () => {
    return (
      <InputCheckbox
        name={"Example1"}
        value={"value2"}
        id={"id2"}
        label={"label"}
        size={Size.Small}
      />
    )
  })
