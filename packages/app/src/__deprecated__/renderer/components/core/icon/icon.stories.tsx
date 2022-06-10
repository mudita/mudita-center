/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import Icon, { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import styled from "styled-components"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import BatteryIcon from "App/__deprecated__/renderer/components/core/icon/battery-icon.component"
import RangeIcon from "App/__deprecated__/renderer/components/core/icon/range-icon.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const CustomIcon = styled(Icon)`
  height: 3rem;
  width: 3rem;
`

storiesOf("Components|Core/Icon", module)
  .add("Default", () => (
    <>
      <StoryContainer title="Types">
        <Story title="Default">
          <Icon type={IconType.Message} />
        </Story>
        <Story title="With badge">
          <Icon type={IconType.Message} badge />
        </Story>
      </StoryContainer>
      <StoryContainer title="Sizes">
        <Story title="Custom (1rem)">
          <Icon type={IconType.Message} height={1} width={1} />
        </Story>
        <Story title="Default (2rem)">
          <Icon type={IconType.Message} />
        </Story>
        <Story title="Custom (3 rem)">
          <CustomIcon type={IconType.Message} />
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
