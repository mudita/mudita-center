/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import * as process from "process"
import styled from "styled-components"
import { IconType } from "generic-view/utils"
import { Typography } from "../../typography/typography"
import { Icon } from "../../icon/icon"
import Tooltip from "../../interactive/tooltip/tooltip"

export const FilesManagerUploadProgressWarning: FunctionComponent = () => {
  return (
    <Wrapper>
      <Typography.P3
        className="modal-content-original-paragraph"
        config={{ color: "black" }}
      >
        Some apps slow down transfer, it’s better <TextAlignPlaceholder />{" "}
        <br /> to close them if you have them open.{" "}
        <InterferingAppsTooltipIcon />
      </Typography.P3>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.grey5};
  padding: 1.2rem 0 1.2rem 1.2rem;
  margin: -1rem 1.2rem 0 1.2rem;

  p {
    text-align: center;
    white-space: pre-line;
  }
`

const ParagraphIcon = styled(Icon).attrs({
  config: {
    type: IconType.Information2,
    size: "tiny",
  },
})`
  display: inline-block;
  position: relative;
  user-select: none;
  top: 0.3rem;
`

const TextAlignPlaceholder = styled(ParagraphIcon)`
  opacity: 0;
  user-select: none;
`

const WindowsInterferingApps: string[] = [
  "Slack",
  "Google Chrome",
  "Google Drive",
  "Dropbox",
  "OneDrive",
  "WhatsApp",
  "Lightroom",
]

const MacInterferingApps: string[] = [
  "Android File Transfer",
  "Google Chrome",
  "Google Drive",
  "PhotoSync",
  "Preview",
  "Dropbox",
  "Photos",
  "Image Capture",
  "OneDrive",
  "WhatsApp",
  "Slack",
  "Lightroom",
]
const interferingApps =
  process.platform === "win32" ? WindowsInterferingApps : MacInterferingApps

const InterferingAppsTooltipIcon: FunctionComponent = () => {
  return (
    <Tooltip
      config={{
        placement: "bottom-right",
        strategy: "element-oriented",
        offset: { x: 14, y: 2 },
      }}
    >
      <Tooltip.Anchor>
        <ParagraphIcon />
      </Tooltip.Anchor>
      <Tooltip.Content>
        <TooltipContentWrapper>
          {interferingApps.map((app) => (
            <TooltipContentItem key={app}>
              <TooltipContentItemTextMarker>▪</TooltipContentItemTextMarker>
              <TooltipContentItemText>{app}</TooltipContentItemText>
            </TooltipContentItem>
          ))}
        </TooltipContentWrapper>
      </Tooltip.Content>
    </Tooltip>
  )
}

const TooltipContentWrapper = styled.div`
  padding: 0.6rem 0;
`

const TooltipContentItem = styled.div`
  display: flex;
  flex-direction: row;
`

const TooltipContentItemText = styled(Typography.P5).attrs({
  className: "modal-content-original-paragraph",
  config: {
    color: "grey1",
  },
})``

const TooltipContentItemTextMarker = styled(TooltipContentItemText)`
  margin: 0 0.6rem;
`
