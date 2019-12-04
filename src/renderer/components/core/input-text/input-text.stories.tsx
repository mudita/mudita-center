import { storiesOf } from "@storybook/react"
import React from "react"
import InputText, {
  TextInputLayouts,
} from "Renderer/components/core/input-text/input-text.component"
import Svg from "Renderer/components/core/svg/svg.component"
import magnifier from "Renderer/svg/magnifier.svg"
import FunctionComponent from "Renderer/types/function-component.interface"

export const Icon: FunctionComponent = () => <Svg Image={magnifier} />

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
