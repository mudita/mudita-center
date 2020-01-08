import { button, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import FunctionComponent from "Renderer/types/function-component.interface"

export const Icon: FunctionComponent = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#000" fillRule="evenodd">
      <path d="M5.306 10.148A4.857 4.857 0 01.444 5.296 4.857 4.857 0 015.306.444a4.857 4.857 0 014.86 4.852 4.857 4.857 0 01-4.86 4.852zm0-1.167A3.69 3.69 0 009 5.296 3.69 3.69 0 005.306 1.61 3.69 3.69 0 001.61 5.296 3.69 3.69 0 005.306 8.98z" />
      <path d="M8.568 8.137l4.32 4.313a.61.61 0 010 .862.612.612 0 01-.863 0L7.703 9a.61.61 0 010-.863.612.612 0 01.865 0z" />
    </g>
  </svg>
)

const singleIcon = [<Icon key="1" />]
const multipleIcons = [<Icon key="1" />, <Icon key="2" />]

storiesOf("Components|Text input/Standard", module)
  .add("Empty", () => {
    return <InputComponent type="text" />
  })
  .add("With label", () => {
    return <InputComponent type="text" placeholder="Name" />
  })
  .add("With value", () => {
    return <InputComponent defaultValue="John" type="text" placeholder="Name" />
  })
  .add(
    "Focused with value but as search type (with native clear button)",
    () => {
      return (
        <InputComponent
          autoFocus
          placeholder="Name"
          defaultValue={"John"}
          type="search"
        />
      )
    }
  )
  .add("Disabled with value", () => {
    return (
      <InputComponent
        defaultValue="John"
        type="text"
        placeholder="Name"
        disabled
      />
    )
  })
  .add("Focused", () => {
    return <InputComponent type="text" autoFocus placeholder="Name" />
  })
  .add("With label and leading icon", () => {
    return (
      <InputComponent
        type="text"
        leadingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With label and trailing icon", () => {
    return (
      <InputComponent
        type="text"
        trailingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With label, leading and trailing icon", () => {
    return (
      <InputComponent
        type="text"
        leadingIcons={singleIcon}
        trailingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With label and multiple leading and trailing icons", () => {
    return (
      <InputComponent
        type="text"
        leadingIcons={multipleIcons}
        trailingIcons={multipleIcons}
        placeholder="Name"
      />
    )
  })

storiesOf("Components|Text input/Outlined", module)
  .add("Empty", () => {
    return <InputComponent type="text" outlined />
  })
  .add("With placeholder", () => {
    return <InputComponent placeholder="Name" type="text" outlined />
  })
  .add("Focused with placeholder", () => {
    return <InputComponent autoFocus placeholder="Name" type="text" outlined />
  })
  .add("With value", () => {
    return (
      <InputComponent
        placeholder="Name"
        defaultValue={"John Doe"}
        type="text"
        outlined
      />
    )
  })
  .add(
    "Focused with value but as search type (with native clear button)",
    () => {
      return (
        <InputComponent
          autoFocus
          placeholder="Name"
          defaultValue={"John Doe"}
          type="search"
          outlined
        />
      )
    }
  )
  .add("Disabled with value", () => {
    return (
      <InputComponent
        placeholder="Name"
        defaultValue={"John Doe"}
        type="text"
        outlined
        disabled
      />
    )
  })
  .add("With placeholder and leading icon", () => {
    return (
      <InputComponent
        type="text"
        outlined
        leadingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and trailing icon", () => {
    return (
      <InputComponent
        type="text"
        outlined
        trailingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder, leading and trailing icon", () => {
    return (
      <InputComponent
        type="text"
        outlined
        leadingIcons={singleIcon}
        trailingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and multiple leading and trailing icons", () => {
    return (
      <InputComponent
        type="text"
        outlined
        leadingIcons={multipleIcons}
        trailingIcons={multipleIcons}
        placeholder="Name"
      />
    )
  })

storiesOf("Components|Text input/Outlined condensed", module)
  .add("Empty", () => {
    return <InputComponent type="text" outlined condensed />
  })
  .add("With placeholder", () => {
    return <InputComponent placeholder="Name" type="text" outlined condensed />
  })
  .add("Focused with placeholder", () => {
    return (
      <InputComponent
        type="text"
        autoFocus
        placeholder="Name"
        outlined
        condensed
      />
    )
  })
  .add("With value", () => {
    return (
      <InputComponent
        type="text"
        placeholder="Name"
        defaultValue={"John Doe"}
        outlined
        condensed
      />
    )
  })
  .add("Disabled With value", () => {
    return (
      <InputComponent
        placeholder="Name"
        defaultValue={"John Doe"}
        type="text"
        outlined
        condensed
        disabled
      />
    )
  })
  .add("With placeholder and leading icon", () => {
    return (
      <InputComponent
        type="text"
        outlined
        condensed
        leadingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and trailing icon", () => {
    return (
      <InputComponent
        type="text"
        outlined
        condensed
        trailingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder, leading and trailing icon", () => {
    return (
      <InputComponent
        type="text"
        outlined
        condensed
        leadingIcons={singleIcon}
        trailingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and multiple leading and trailing icons", () => {
    return (
      <InputComponent
        type="text"
        outlined
        condensed
        leadingIcons={multipleIcons}
        trailingIcons={multipleIcons}
        placeholder="Name"
      />
    )
  })

storiesOf("Components|Text input/Textarea", module)
  .addDecorator(withKnobs)
  .add("Basic test", () => {
    const [value, setValue] = useState("Lorem\nipsum\ndolor\nsit\namet\nsit")
    const [maxRows, setMaxRows] = useState(5)

    const updateValue = (event: any) => setValue(event.target.value)

    const setPredefinedValue = () => setValue("Lorem\nipsum\ndolor\nsit")

    const decreaseMaxRows = () => setMaxRows(maxRows > 1 ? maxRows - 1 : 1)

    const increaseMaxRows = () => setMaxRows(maxRows + 1)

    const infiniteMaxRows = () => setMaxRows(0)

    button("decrease max rows", decreaseMaxRows)
    button("increase max rows", increaseMaxRows)
    button("infinite max rows", infiniteMaxRows)
    button("set predefined value", setPredefinedValue)

    return (
      <>
        <InputComponent
          type="textarea"
          value={value}
          onChange={updateValue}
          maxRows={maxRows}
        />
        <pre>
          MAX ROWS: {maxRows === 0 ? "inf" : maxRows}
          <br />
          VALUE:
          <br />
          {value}
        </pre>
      </>
    )
  })
  .add("Basic", () => <InputComponent type="textarea" />)
  .add("With placeholder", () => (
    <InputComponent type="textarea" placeholder="Message" />
  ))
  .add("Focused with placeholder", () => {
    return <InputComponent autoFocus type="textarea" placeholder="Message" />
  })
  .add("With content", () => {
    return (
      <InputComponent
        type="textarea"
        placeholder="Message"
        defaultValue={
          "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.\n\nCurabitur aliquet quam id dui posuere blandit."
        }
      />
    )
  })
  .add("Disabled with content", () => {
    return (
      <InputComponent
        type="textarea"
        placeholder="Message"
        defaultValue={
          "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.\n\nCurabitur aliquet quam id dui posuere blandit."
        }
        disabled
      />
    )
  })
  .add("With content and rows limit set to 6", () => {
    return (
      <InputComponent
        type="textarea"
        placeholder="Message"
        defaultValue={
          "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.\n\nCurabitur aliquet quam id dui posuere blandit."
        }
        maxRows={6}
      />
    )
  })
  .add("With small content and rows limit set to 6", () => {
    return (
      <InputComponent
        type="textarea"
        placeholder="Message"
        defaultValue={
          "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus."
        }
        maxRows={6}
      />
    )
  })
  .add("Disabled with content and rows limit set to 6", () => {
    return (
      <InputComponent
        type="textarea"
        placeholder="Message"
        defaultValue={
          "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.\n\nCurabitur aliquet quam id dui posuere blandit."
        }
        maxRows={6}
        disabled
      />
    )
  })
  .add("With placeholder and leading icon", () => {
    return (
      <InputComponent
        type="textarea"
        leadingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With content and leading and trailing icon", () => {
    return (
      <InputComponent
        type="textarea"
        leadingIcons={singleIcon}
        trailingIcons={singleIcon}
        placeholder="Name"
        defaultValue={
          "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.\n\nCurabitur aliquet quam id dui posuere blandit."
        }
      />
    )
  })
  .add("With placeholder and trailing icon", () => {
    return (
      <InputComponent
        type="textarea"
        trailingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder, leading and trailing icon", () => {
    return (
      <InputComponent
        type="textarea"
        leadingIcons={singleIcon}
        trailingIcons={singleIcon}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and multiple leading and trailing icons", () => {
    return (
      <InputComponent
        type="textarea"
        leadingIcons={multipleIcons}
        trailingIcons={multipleIcons}
        placeholder="Name"
      />
    )
  })
