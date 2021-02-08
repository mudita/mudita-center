import { storiesOf } from "@storybook/react"
import React from "react"
import Phone from "Renderer/components/rest/overview/phone/phone.component"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

storiesOf("Views|Overview/Phone", module).add("Phone", () => {
  return (
    <div style={{ maxWidth: "31.5rem" }}>
      <Part>
        <Phone
          onDisconnect={action("disconnect phone")}
          batteryLevel={0.75}
          network={"Play"}
        />
      </Part>
    </div>
  )
})
