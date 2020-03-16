import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import BatteryIcon from "Renderer/components/core/icon/battery-icon.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BatteryWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StoryText = styled(Text)`
  margin-right: 1rem;
`

storiesOf("Components|Battery Icon", module).add("All States", () => {
  return (
    <Container>
      <BatteryWrapper>
        <StoryText displayStyle={TextDisplayStyle.SmallText}>
          No Battery
        </StoryText>
        <BatteryIcon level={0} />
      </BatteryWrapper>
      <BatteryWrapper>
        <StoryText displayStyle={TextDisplayStyle.SmallText}>
          Very Low Battery
        </StoryText>
        <BatteryIcon level={0.1} />
      </BatteryWrapper>
      <BatteryWrapper>
        <StoryText displayStyle={TextDisplayStyle.SmallText}>
          Low Battery
        </StoryText>
        <BatteryIcon level={0.3} />
      </BatteryWrapper>
      <BatteryWrapper>
        <StoryText displayStyle={TextDisplayStyle.SmallText}>
          Medium Battery
        </StoryText>
        <BatteryIcon level={0.5} />
      </BatteryWrapper>
      <BatteryWrapper>
        <StoryText displayStyle={TextDisplayStyle.SmallText}>
          High Battery
        </StoryText>
        <BatteryIcon level={0.7} />
      </BatteryWrapper>
      <BatteryWrapper>
        <StoryText displayStyle={TextDisplayStyle.SmallText}>
          Very High Battery
        </StoryText>
        <BatteryIcon level={0.9} />
      </BatteryWrapper>
      <BatteryWrapper>
        <StoryText displayStyle={TextDisplayStyle.SmallText}>
          Charging Battery
        </StoryText>
        <BatteryIcon charging level={0.5} />
      </BatteryWrapper>
    </Container>
  )
})
