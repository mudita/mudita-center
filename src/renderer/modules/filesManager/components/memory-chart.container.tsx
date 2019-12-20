import { connect } from "react-redux"
import MemoryChart from "Renderer/modules/filesManager/components/memory-chart.component"
import { select } from "Renderer/store"

const mapStateToProps = select(({ filesManager }) => ({
  stackedBarChartData: filesManager.stackedBarChart,
  memoryChartData: filesManager.memoryChart,
}))

export default connect(mapStateToProps, null)(MemoryChart)
