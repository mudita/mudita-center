/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import DataBox from "App/__deprecated__/renderer/components/rest/meditation/data-box/data-box.component"
import { TextWrapper } from "App/__deprecated__/renderer/components/rest/meditation/data-box/data-box.styled"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { convertBytes } from "App/__deprecated__/renderer/utils/convert-bytes"
import {
  RotatedArrowIcon,
  StatBoxesWrapper,
  StatTextWrapper,
  UnitText,
} from "App/__deprecated__/renderer/components/rest/tethering/stat-boxes.styled"
import { defineMessages } from "react-intl"
import Icon, { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { StatBoxesTestIds } from "App/__deprecated__/renderer/components/rest/tethering/stat-boxes-test-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  timeActive: {
    id: "module.tethering.timeActive",
  },
  dataSent: {
    id: "module.tethering.dataSent",
  },
  dataReceived: {
    id: "module.tethering.dataReceived",
  },
})

interface Props {
  timeActive?: string
  dataSent: number
  dataReceived: number
}

const StatBoxes: FunctionComponent<Props> = ({
  timeActive,
  dataSent,
  dataReceived,
}) => {
  const [dataSentValue, dataSentUnit] = convertBytes(dataSent).split(" ")
  const [dataReceivedValue, dataReceivedUnit] =
    convertBytes(dataReceived).split(" ")
  return (
    <StatBoxesWrapper>
      <DataBox>
        <TextWrapper>
          <Text
            displayStyle={TextDisplayStyle.Headline1}
            element={"span"}
            data-testid={StatBoxesTestIds.TimeActiveText}
          >
            {timeActive}
          </Text>
        </TextWrapper>
        <Text
          displayStyle={TextDisplayStyle.Label}
          color="secondary"
          message={messages.timeActive}
        />
      </DataBox>
      <DataBox>
        <StatTextWrapper>
          <RotatedArrowIcon type={IconType.LongArrow} size={IconSize.Bigger} />
          <div data-testid={StatBoxesTestIds.DataSentText}>
            <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
              {dataSentValue}
            </Text>
            <UnitText displayStyle={TextDisplayStyle.Label} element={"span"}>
              {dataSentUnit}
            </UnitText>
          </div>
        </StatTextWrapper>
        <Text
          displayStyle={TextDisplayStyle.Label}
          color="secondary"
          message={messages.dataSent}
        />
      </DataBox>
      <DataBox>
        <StatTextWrapper>
          <Icon type={IconType.LongArrow} size={IconSize.Bigger} />
          <div data-testid={StatBoxesTestIds.DataReceivedText}>
            <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
              {dataReceivedValue}
            </Text>
            <UnitText displayStyle={TextDisplayStyle.Label} element={"span"}>
              {dataReceivedUnit}
            </UnitText>
          </div>
        </StatTextWrapper>
        <Text
          displayStyle={TextDisplayStyle.Label}
          color="secondary"
          message={messages.dataReceived}
        />
      </DataBox>
    </StatBoxesWrapper>
  )
}

export default StatBoxes
