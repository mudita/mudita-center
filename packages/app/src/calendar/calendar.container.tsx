/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import { connect } from "react-redux"
import CalendarComponent from "App/calendar/calendar.component"

const selector = select(({ calendar }) => ({
  events: calendar.sortedEvents,
}))

const mapStateToProps = (state: RootModel) => {
  const { calendar } = state
  return {
    ...calendar,
    ...selector(state, {}),
  }
}

const mapDispatch = ({ calendar }: any) => ({
  ...calendar,
})

export default connect(mapStateToProps, mapDispatch)(CalendarComponent)
