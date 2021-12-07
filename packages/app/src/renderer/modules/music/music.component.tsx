/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { connect } from "react-redux"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Button from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size as ButtonSize,
} from "Renderer/components/core/button/button.config"
import { ReduxRootState, RootState, TmpDispatch } from "Renderer/store"
import { mtpConnect } from "Renderer/modules/music/mtp-connect.action"
import { MusicState } from "Renderer/modules/music/music.reducer"

interface Props extends Pick<MusicState, "files"> {
  mtpConnect: () => void
}

const Music: FunctionComponent<Props> = ({ mtpConnect, files }) => (
  <div>
    <Button
      displayStyle={DisplayStyle.Primary}
      size={ButtonSize.FixedBig}
      label={"MTP Connect"}
      onClick={mtpConnect}
    />
    {files.map((file) => {
      const value = JSON.stringify(file)
      return <div key={value}>{value}</div>
    })}
  </div>
)

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  files: state.music.files,
})

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  mtpConnect: (): void => dispatch(mtpConnect()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Music)
