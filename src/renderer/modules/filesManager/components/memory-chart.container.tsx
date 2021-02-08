/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { connect } from "react-redux"
import MemoryChart from "Renderer/modules/filesManager/components/memory-chart.component"
import { select } from "Renderer/store"

const mapStateToProps = select(({ filesManager }) => ({
  memoryChartData: filesManager.memoryChartData,
}))

export default connect(mapStateToProps, null)(MemoryChart)
