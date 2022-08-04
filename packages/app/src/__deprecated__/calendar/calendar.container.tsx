/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { select } from "App/__deprecated__/renderer/store"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import { connect } from "react-redux"
import CalendarUI from "App/__deprecated__/calendar/components/calendar/calendar.component"

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

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
const mapDispatch = ({ calendar }: any) => ({
  ...calendar,
})

export default connect(mapStateToProps, mapDispatch)(CalendarUI)
