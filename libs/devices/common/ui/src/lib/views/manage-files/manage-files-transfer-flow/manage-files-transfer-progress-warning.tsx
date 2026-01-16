/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconSize, IconType, TypographyAlign } from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import { Icon, Tooltip, Typography } from "app-theme/ui"
import { manageFilesMessages } from "../manage-files.messages"
import { interferingApps } from "../manage-files.const"

export const ManageFilesTransferProgressWarning: FunctionComponent = () => {
  return (
    <Wrapper>
      <Typography.P3
        as={"div"}
        color={"black"}
        textAlign={TypographyAlign.Center}
      >
        {formatMessage(manageFilesMessages.progressWarningFirstLineText)}{" "}
        <TextAlignPlaceholder type={IconType.InfoBold} size={IconSize.Medium} />{" "}
        <br />{" "}
        {formatMessage(manageFilesMessages.progressWarningSecondLineText)}{" "}
        <InterferingAppsTooltipIcon />
      </Typography.P3>
    </Wrapper>
  )
}

const InterferingAppsTooltipIcon: FunctionComponent = () => {
  return (
    <Tooltip
      placement={"bottom-right"}
      strategy={"element-oriented"}
      offset={{ x: 14, y: 2 }}
    >
      <Tooltip.Anchor>
        <ParagraphIcon type={IconType.InfoBold} size={IconSize.Medium} />
      </Tooltip.Anchor>
      <Tooltip.Content>
        <TooltipContentWrapper>
          {interferingApps.map((app) => (
            <TooltipContentItem key={app}>
              <TooltipContentItemTextMarker color={"grey1"} as={"span"}>
                ▪
              </TooltipContentItemTextMarker>
              <Typography.P5 color={"grey1"} as={"span"}>
                {app}
              </Typography.P5>
            </TooltipContentItem>
          ))}
        </TooltipContentWrapper>
      </Tooltip.Content>
    </Tooltip>
  )
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.app.color.grey5};
  padding: 1.2rem 0 1.2rem 1.2rem;
  margin: -1rem 1.2rem 0 1.2rem;

  p {
    text-align: center;
    white-space: pre-line;
  }
`

const ParagraphIcon = styled(Icon)`
  display: inline-block;
  position: relative;
  user-select: none;
  top: 0.6rem;
  margin: -1.2rem 0 0 0;
`

const TextAlignPlaceholder = styled(ParagraphIcon)`
  opacity: 0;
  user-select: none;
`

const TooltipContentWrapper = styled.span`
  padding: 0.6rem 0;
`

const TooltipContentItem = styled.span`
  display: flex;
  flex-direction: row;
`

const TooltipContentItemTextMarker = styled(Typography.P5)`
  margin: 0 0.6rem;
`
