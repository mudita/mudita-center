import { storiesOf } from "@storybook/react"
import React from "react"
import InputText, {
  TextInputLayouts,
} from "Renderer/components/core/input-text/input-text.component"
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

storiesOf("Components|InputText/Standard", module)
  .add("Empty", () => {
    return <InputText layout={TextInputLayouts.Standard} />
  })
  .add("With label", () => {
    return <InputText layout={TextInputLayouts.Standard} placeholder="Name" />
  })
  .add("With value", () => {
    return (
      <InputText
        defaultValue="John"
        layout={TextInputLayouts.Standard}
        placeholder="Name"
      />
    )
  })
  .add("Disabled with value", () => {
    return (
      <InputText
        defaultValue="John"
        layout={TextInputLayouts.Standard}
        placeholder="Name"
        disabled
      />
    )
  })
  .add("Focused", () => {
    return (
      <InputText
        layout={TextInputLayouts.Standard}
        autoFocus
        placeholder="Name"
      />
    )
  })
  .add("With label and leading icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Standard}
        leadingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With label and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Standard}
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With label, leading and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Standard}
        leadingIcons={[<Icon key={1} />]}
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With label and multiple leading and trailing icons", () => {
    return (
      <InputText
        layout={TextInputLayouts.Standard}
        leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
        trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
        placeholder="Name"
      />
    )
  })

storiesOf("Components|InputText/Outlined", module)
  .add("Empty", () => {
    return <InputText layout={TextInputLayouts.Outlined} />
  })
  .add("With placeholder", () => {
    return <InputText placeholder="Name" layout={TextInputLayouts.Outlined} />
  })
  .add("Focused with placeholder", () => {
    return (
      <InputText
        autoFocus
        placeholder="Name"
        layout={TextInputLayouts.Outlined}
      />
    )
  })
  .add("With value", () => {
    return (
      <InputText
        placeholder="Name"
        defaultValue={"John Doe"}
        layout={TextInputLayouts.Outlined}
      />
    )
  })
  .add("Disabled with value", () => {
    return (
      <InputText
        placeholder="Name"
        defaultValue={"John Doe"}
        layout={TextInputLayouts.Outlined}
        disabled
      />
    )
  })
  .add("With placeholder and leading icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        leadingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder, leading and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        leadingIcons={[<Icon key={1} />]}
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and multiple leading and trailing icons", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
        trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
        placeholder="Name"
      />
    )
  })

storiesOf("Components|InputText/Outlined condensed", module)
  .add("Empty", () => {
    return <InputText layout={TextInputLayouts.Outlined} condensed />
  })
  .add("With placeholder", () => {
    return (
      <InputText
        placeholder="Name"
        layout={TextInputLayouts.Outlined}
        condensed
      />
    )
  })
  .add("Focused with placeholder", () => {
    return (
      <InputText
        autoFocus
        placeholder="Name"
        layout={TextInputLayouts.Outlined}
        condensed
      />
    )
  })
  .add("With value", () => {
    return (
      <InputText
        placeholder="Name"
        defaultValue={"John Doe"}
        layout={TextInputLayouts.Outlined}
        condensed
      />
    )
  })
  .add("Disabled With value", () => {
    return (
      <InputText
        placeholder="Name"
        defaultValue={"John Doe"}
        layout={TextInputLayouts.Outlined}
        condensed
        disabled
      />
    )
  })
  .add("With placeholder and leading icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        condensed
        leadingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        condensed
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder, leading and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        condensed
        leadingIcons={[<Icon key={1} />]}
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and multiple leading and trailing icons", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        condensed
        leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
        trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
        placeholder="Name"
      />
    )
  })
