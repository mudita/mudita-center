/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, ReactNode } from "react"
import styled, { css } from "styled-components"
import {
  DeviceImageColor,
  DeviceImageSize,
  DeviceImageType,
} from "devices/common/models"
import { DeviceImage } from "../../device-image/device-image"
import { OverviewBlock } from "./overview-block"
import { Button, Typography } from "app-theme/ui"
import { defineMessages, formatMessage } from "app-localize/utils"
import { ButtonType, IconType } from "app-theme/models"
import { ApiDevicePaths } from "devices/api-device/models"

const messages = defineMessages({
  serialNumber: {
    id: "page.overview.serialNumber",
  },
  deviceType: {
    id: "page.overview.deviceType",
  },
})

export type OverviewDetailsSection =
  | {
      title?: string
      description?: string
      badgeText?: string
      children?: ReactNode
    }
  | undefined

interface Props {
  deviceImageType: DeviceImageType
  deviceImageColor?: DeviceImageColor
  serialNumberLabel?: string
  serialNumber?: string
  deviceTypeLabel?: string
  deviceType?: string
  detailsSections?: OverviewDetailsSection[]
  aboutSection?: {
    icon: IconType
    buttonText: string
  }
}

export const Overview: FunctionComponent<Props> = ({
  deviceImageType,
  deviceImageColor,
  serialNumberLabel,
  serialNumber,
  deviceTypeLabel,
  deviceType,
  detailsSections,
  aboutSection,
  ...rest
}) => {
  return (
    <Wrapper {...rest}>
      <BaseInfo $alignedToLeft={!!(serialNumber && deviceType)}>
        <BaseInfoImage>
          <DeviceImage
            type={deviceImageType}
            size={DeviceImageSize.Big}
            color={deviceImageColor}
          />
        </BaseInfoImage>
        <BaseInfoBlocks>
          {Boolean(serialNumber) && (
            <BaseInfoBlock>
              <Typography.P4>
                {serialNumberLabel || formatMessage(messages.serialNumber)}
              </Typography.P4>
              <Typography.P1 color={"black"}>{serialNumber}</Typography.P1>
            </BaseInfoBlock>
          )}
          {Boolean(deviceType) && (
            <BaseInfoBlock>
              <Typography.P4>
                {deviceTypeLabel || formatMessage(messages.deviceType)}
              </Typography.P4>
              <Typography.P1 color={"black"}>{deviceType}</Typography.P1>
            </BaseInfoBlock>
          )}
        </BaseInfoBlocks>
        {aboutSection && (
          <BaseInfoBottomSection>
            <Button
              type={ButtonType.Text}
              icon={aboutSection.icon}
              to={{
                pathname: `${ApiDevicePaths.Index}/mc-overview/mc-about`,
              }}
            >
              {aboutSection.buttonText}
            </Button>
          </BaseInfoBottomSection>
        )}
      </BaseInfo>
      {(
        detailsSections?.filter(
          Boolean
        ) as NonNullable<OverviewDetailsSection>[]
      ).map((section, index) => {
        return (
          <DetailsBlock
            key={index}
            title={section.title}
            badgeText={section.badgeText}
            description={section.description}
          >
            {section.children}
          </DetailsBlock>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 28rem 1fr;
  grid-auto-rows: minmax(17.2rem, auto);
  column-gap: 3.2rem;
  row-gap: 3.2rem;
  padding: 3.2rem;
`

const BaseInfoImage = styled.div`
  flex: 1.8;
  max-height: 32rem;
  max-width: calc(100% - 8.6rem);
  margin-top: 5.8rem;
`

const BaseInfoBlocks = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.2rem;
  margin: 5.8rem 0 5.4rem;
`

const BaseInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`

const BaseInfoBottomSection = styled.div`
  height: 8rem;
  width: 100%;
  border-top: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
  display: flex;
  justify-content: center;
  align-items: center;
`

const BaseInfo = styled(OverviewBlock)<{ $alignedToLeft: boolean }>`
  padding: 0;
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
  gap: 0;
  align-items: center;
  justify-content: center;

  ${({ $alignedToLeft }) =>
    $alignedToLeft &&
    css`
      ${BaseInfoBlock} {
        min-width: 13.4rem;
        align-items: flex-start;
      }
    `}
`

const DetailsBlock = styled(OverviewBlock)`
  grid-column-start: 2;
  grid-column-end: 3;
`
