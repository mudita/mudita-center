/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, ReactNode } from "react"
import styled from "styled-components"
import { DeviceImageSize, DeviceImageType } from "devices/common/models"
import { DeviceImage } from "../../device-image/device-image"
import { OverviewBlock } from "./overview-block"
import { Typography } from "app-theme/ui"
import { defineMessages } from "app-localize/utils"

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
      children?: ReactNode
    }
  | undefined

interface Props {
  deviceImageType: DeviceImageType
  serialNumber?: string
  deviceType?: string
  detailsSections?: OverviewDetailsSection[]
}

export const Overview: FunctionComponent<Props> = ({
  deviceImageType,
  serialNumber,
  deviceType,
  detailsSections,
}) => {
  return (
    <Wrapper>
      <BaseInfo>
        <BaseInfoImage>
          <DeviceImage type={deviceImageType} size={DeviceImageSize.Big} />
        </BaseInfoImage>
        {Boolean(serialNumber) && (
          <BaseInfoBlock>
            <Typography.P4 message={messages.serialNumber.id} />
            <Typography.P1 color={"black"}>{serialNumber}</Typography.P1>
          </BaseInfoBlock>
        )}
        {Boolean(deviceType) && (
          <BaseInfoBlock>
            <Typography.P4 message={messages.deviceType.id} />
            <Typography.P1 color={"black"}>{deviceType}</Typography.P1>
          </BaseInfoBlock>
        )}
      </BaseInfo>
      <Details>
        {(
          detailsSections?.filter(
            Boolean
          ) as NonNullable<OverviewDetailsSection>[]
        ).map((section, index) => {
          return (
            <OverviewBlock
              key={index}
              title={section.title}
              description={section.description}
            >
              {section.children}
            </OverviewBlock>
          )
        })}
      </Details>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 3.2rem;
  padding: 3.2rem;
  box-sizing: border-box;
`

const BaseInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`

const BaseInfo = styled(OverviewBlock)`
  flex: 1;
  max-width: 28rem;
  gap: 1.2rem;
  align-items: center;
  padding-top: 4.2rem;
  padding-bottom: 5.4rem;
  justify-content: center;

  &:has(:nth-child(3)) {
    ${BaseInfoBlock} {
      min-width: 13.4rem;
      align-items: flex-start;
    }
  }
`

const BaseInfoImage = styled.div`
  padding: 3.8rem 1.4rem 2.6rem;
`

const Details = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 3.2rem;
`
