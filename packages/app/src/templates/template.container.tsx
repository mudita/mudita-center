/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Templates } from "App/templates/components"

const mapStateToProps = (state: ReduxRootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Templates)
