import { connect } from "react-redux"
import MemoryChart from "Renderer/components/rest/files-manager/memory-chart.component"
import { select } from "Renderer/store"

const mapStateToProps = select(({ filesManager }) => ({
  data: filesManager.withConvertedBytes,
}))

export default connect(mapStateToProps, null)(MemoryChart)
