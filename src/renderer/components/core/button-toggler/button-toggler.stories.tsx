import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import ButtonToggler from "Renderer/components/core/button-toggler/button-toggler.component"
import { ButtonTogglerProps } from "Renderer/components/core/button-toggler/button-toggler.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"

export const singleStateToggler = [{ label: "Turn on", key: "on" }]

export const twoStateToggler = [
  { label: "On", key: true },
  { label: "Off", key: false },
]

export const threeStateToggler = [
  { label: "Weekly", key: "weekly" },
  { label: "Monthly", key: "monthly" },
  { label: "Yearly", key: "yearly" },
]

export const fourStateToggler = [
  { label: "Daily", key: "daily" },
  { label: "Weekly", key: "weekly" },
  { label: "Monthly", key: "monthly" },
  { label: "Yearly", key: "yearly" },
]

export const PredefinedButtonToggler = ({
  options = twoStateToggler,
  ...props
}: Partial<ButtonTogglerProps>) => {
  const [activeKey, setActiveKey] = useState()
  return (
    <ButtonToggler
      activeKey={activeKey}
      onToggle={setActiveKey}
      options={options}
      {...props}
    />
  )
}

export const PredefinedPreselectedButtonToggler = ({
  options = twoStateToggler,
  ...props
}: Partial<ButtonTogglerProps>) => {
  const defaultActiveKey = options[options.length - 1].key
  const [activeKey, setActiveKey] = useState(defaultActiveKey)
  return (
    <ButtonToggler
      activeKey={activeKey}
      onToggle={setActiveKey}
      options={options}
      {...props}
    />
  )
}

const Wrapper = styled.div`
  margin: 2rem;
`

storiesOf("Components", module).add("ButtonToggler", () => (
  <>
    <Wrapper>
      <Text displayStyle={TextDisplayStyle.SmallText}>Single state</Text>
      <br />
      <PredefinedButtonToggler options={singleStateToggler} />
    </Wrapper>
    <Wrapper>
      <Text displayStyle={TextDisplayStyle.SmallText}>Two states</Text>
      <br />
      <PredefinedButtonToggler options={twoStateToggler} />
    </Wrapper>
    <Wrapper>
      <Text displayStyle={TextDisplayStyle.SmallText}>Three states</Text>
      <br />
      <PredefinedButtonToggler options={threeStateToggler} />
    </Wrapper>
    <Wrapper>
      <Text displayStyle={TextDisplayStyle.SmallText}>Four states</Text>
      <br />
      <PredefinedButtonToggler options={fourStateToggler} />
    </Wrapper>
    <Wrapper>
      <Text displayStyle={TextDisplayStyle.SmallText}>Two states (filled)</Text>
      <br />
      <PredefinedButtonToggler options={twoStateToggler} filled />
    </Wrapper>
    <Wrapper>
      <Text displayStyle={TextDisplayStyle.SmallText}>
        Three states (preselected)
      </Text>
      <br />
      <PredefinedPreselectedButtonToggler options={threeStateToggler} />
    </Wrapper>
  </>
))
