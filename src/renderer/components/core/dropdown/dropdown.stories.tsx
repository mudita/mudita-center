import { storiesOf } from "@storybook/react"
import * as React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import Upload from "Renderer/svg/upload.svg"
import styled from "styled-components"
import Button, { DisplayStyle } from "../button/button.component"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("Components|Dropdown", module).add("Dropdown", () => {
  return (
    <Wrapper>
      <Dropdown toggler={<ButtonComponent label={"Click dropdown"} />}>
        <Button displayStyle={DisplayStyle.Link1} label="Click" Icon={Upload} />
        <Button
          displayStyle={DisplayStyle.Link1}
          label="Contact Details / Add to Contacts"
          Icon={Upload}
        />
        <Button
          displayStyle={DisplayStyle.Link2}
          label="I open Google in new tab"
          href="http://www.google.pl"
          target="_blank"
        />
      </Dropdown>
    </Wrapper>
  )
})
