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
import { MusicState, ResultState } from "Renderer/modules/music/music.reducer"
import { downloadFile } from "Renderer/modules/music/download-file.action"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

interface Props extends Pick<MusicState, "files" | "state" | "downloadState"> {
  mtpLocation?: string
  downloadFile: (id: string) => void
  mtpConnect: () => void
}

const Row = styled.div`
  padding: 10px 0;
  opacity: 0.8;

  transition: background-color 0.5s, opacity 0.5s;

  &:hover{
    cursor: pointer;
    opacity: 1;
    background-color: ${backgroundColor("row")};
  }
`

const Music: FunctionComponent<Props> = ({mtpLocation = "", mtpConnect, files, state, downloadState, downloadFile }) => (
  <div>
    <Button
      displayStyle={DisplayStyle.Primary}
      size={ButtonSize.FixedBig}
      label={"MTP Connect"}
      onClick={mtpConnect}
    />
    <div>Download files location: {mtpLocation}</div>
    {state === ResultState.Loading && <div>Loading...</div>}
    {state === ResultState.Error && <div>Error</div>}
    {downloadState === ResultState.Loading && <div>Downloading File...</div>}
    {downloadState === ResultState.Error && <div>Downloading Error</div>}
    {downloadState === ResultState.Loaded && <div>Downloading Success</div>}
    {files.map((file) => {
      const value = JSON.stringify(file)
      const handleClick = () => {
        downloadFile(file.id)
      }
      return <Row key={value} onClick={handleClick}>{value}</Row>
    })}
  </div>
)

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  files: state.music.files,
  state: state.music.state,
  downloadState: state.music.downloadState,
  mtpLocation: state.settings.pureFilesLocation,
})
333
const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  mtpConnect: (): void => dispatch(mtpConnect()),
  downloadFile: (id: string): void => dispatch(downloadFile(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Music)
