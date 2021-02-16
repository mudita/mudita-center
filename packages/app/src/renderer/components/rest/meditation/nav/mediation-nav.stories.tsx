/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import moment from "moment"
import { storiesOf } from "@storybook/react"

import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

import Nav from "Renderer/components/rest/meditation/nav/meditation-nav.component"
import { DateFormatItems } from "Renderer/components/rest/meditation/nav/meditation-nav.helpers"

storiesOf("Components/Rest/Meditation", module).add("Navigation", () => (
  <>
    <StoryContainer>
      <Story title="With date passed as string">
        <Nav startDate="10.15.10" endDate="10.20.10" />
      </Story>
      <Story title="With date passed as Date">
        <Nav
          startDate={new Date("2020-07-13")}
          endDate={new Date("2020-07-19")}
        />
      </Story>
      <Story title="With date passed as microtime">
        <Nav startDate={1594591200000} endDate={1595109600000} />
      </Story>
      <Story title="With longest date possible">
        <Nav
          startDate={new Date("2020-09-20")}
          endDate={new Date("2020-09-30")}
        />
      </Story>
      <Story title="Always show current week">
        <Nav
          startDate={moment().subtract(0, "weeks").startOf("isoWeek").toDate()}
          endDate={moment().subtract(0, "weeks").endOf("isoWeek").toDate()}
        />
      </Story>
    </StoryContainer>
    <StoryContainer>
      <Story title="With date as month">
        <Nav startDate="09.01.2020" show={[DateFormatItems.Month]} />
      </Story>
      <Story title="With date as year">
        <Nav startDate="09.01.2020" show={[DateFormatItems.Year]} />
      </Story>
    </StoryContainer>
  </>
))
