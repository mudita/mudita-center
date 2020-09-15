import { storiesOf } from "@storybook/react"
import * as React from "react"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import styled from "styled-components"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import BatteryIcon from "Renderer/components/core/icon/battery-icon.component"
import RangeIcon from "Renderer/components/core/icon/range-icon.component"

const CustomIcon = styled(Icon)`
  height: 3rem;
  width: 3rem;
`

storiesOf("Components|Core/Icon", module)
  .add("Default", () => (
    <>
      <StoryContainer title="Types">
        <Story title="Default">
          <Icon type={Type.Message} />
        </Story>
        <Story title="With badge">
          <Icon type={Type.Message} badge />
        </Story>
      </StoryContainer>
      <StoryContainer title="Sizes">
        <Story title="Custom (1rem)">
          <Icon type={Type.Message} height={1} width={1} />
        </Story>
        <Story title="Default (2rem)">
          <Icon type={Type.Message} />
        </Story>
        <Story title="Custom (3 rem)">
          <CustomIcon type={Type.Message} />
        </Story>
      </StoryContainer>
    </>
  ))
  .add("Battery", () => (
    <StoryContainer title="States">
      <Story title="Empty">
        <BatteryIcon level={0} size={IconSize.Medium} />
      </Story>
      <Story title="Very low">
        <BatteryIcon level={0.1} size={IconSize.Medium} />
      </Story>
      <Story title="Low">
        <BatteryIcon level={0.3} size={IconSize.Medium} />
      </Story>
      <Story title="Medium">
        <BatteryIcon level={0.5} size={IconSize.Medium} />
      </Story>
      <Story title="High">
        <BatteryIcon level={0.7} size={IconSize.Medium} />
      </Story>
      <Story title="Very high">
        <BatteryIcon level={0.9} size={IconSize.Medium} />
      </Story>
      <Story title="Full Battery">
        <BatteryIcon level={1} size={IconSize.Medium} />
      </Story>
      <Story title="Charging">
        <BatteryIcon charging level={0.5} size={IconSize.Medium} />
      </Story>
    </StoryContainer>
  ))
  .add("Signal", () => (
    <StoryContainer title="States">
      <Story title="No signal">
        <RangeIcon strength={0} size={IconSize.Medium} />
      </Story>
      <Story title="Very Low">
        <RangeIcon strength={6} size={IconSize.Medium} />
      </Story>
      <Story title="Low">
        <RangeIcon strength={21} size={IconSize.Medium} />
      </Story>
      <Story title="Medium">
        <RangeIcon strength={41} size={IconSize.Medium} />
      </Story>
      <Story title="High">
        <RangeIcon strength={61} size={IconSize.Medium} />
      </Story>
      <Story title="Very high">
        <RangeIcon strength={90} size={IconSize.Medium} />
      </Story>
      <Story title="Very Low with roaming">
        <RangeIcon strength={6} roaming size={IconSize.Medium} />
      </Story>
      <Story title="Low with roaming">
        <RangeIcon strength={21} roaming size={IconSize.Medium} />
      </Story>
      <Story title="Medium with roaming">
        <RangeIcon strength={41} roaming size={IconSize.Medium} />
      </Story>
      <Story title="High with roaming">
        <RangeIcon strength={61} roaming size={IconSize.Medium} />
      </Story>
      <Story title="Very high with roaming">
        <RangeIcon strength={90} roaming size={IconSize.Medium} />
      </Story>
    </StoryContainer>
  ))
