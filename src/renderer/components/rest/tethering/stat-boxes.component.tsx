import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import DataBox from "Renderer/components/rest/meditation/data-box/data-box.component"
import { TextWrapper } from "Renderer/components/rest/meditation/data-box/data-box.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { convertBytes } from "Renderer/utils/convert-bytes"
import {
  RotatedArrowIcon,
  StatBoxesWrapper,
  StatTextWrapper,
} from "Renderer/components/rest/tethering/stat-boxes.styled"
import { defineMessages } from "react-intl"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { StatBoxesTestIds } from "Renderer/components/rest/tethering/stat-boxes-test-ids.enum"

const messages = defineMessages({
  timeActive: {
    id: "view.name.tethering.timeActive",
  },
  dataSent: {
    id: "view.name.tethering.dataSent",
  },
  dataReceived: {
    id: "view.name.tethering.dataReceived",
  },
})

interface Props {
  timeActive?: any
  dataSent: number
  dataReceived: number
}

const StatBoxes: FunctionComponent<Props> = ({
  timeActive,
  dataSent,
  dataReceived,
}) => {
  const [dataSentValue, dataSentUnit] = convertBytes(dataSent).split(" ")
  const [dataReceivedValue, dataReceivedUnit] = convertBytes(
    dataReceived
  ).split(" ")
  return (
    <StatBoxesWrapper>
      <DataBox>
        <TextWrapper>
          <Text
            displayStyle={TextDisplayStyle.PrimaryHeading}
            element={"span"}
            data-testid={StatBoxesTestIds.TimeActiveText}
          >
            {timeActive}
          </Text>
        </TextWrapper>
        <Text
          displayStyle={TextDisplayStyle.SmallFadedText}
          element={"p"}
          message={messages.timeActive}
        />
      </DataBox>
      <DataBox>
        <StatTextWrapper>
          <RotatedArrowIcon type={Type.LongArrow} size={IconSize.Bigger} />
          <div data-testid={StatBoxesTestIds.DataSentText}>
            <Text
              displayStyle={TextDisplayStyle.PrimaryHeading}
              element={"span"}
            >
              {dataSentValue}
            </Text>
            <Text
              displayStyle={TextDisplayStyle.MediumLightText}
              element={"span"}
            >
              {dataSentUnit.toLowerCase()}
            </Text>
          </div>
        </StatTextWrapper>
        <Text
          displayStyle={TextDisplayStyle.SmallFadedText}
          element={"p"}
          message={messages.dataSent}
        />
      </DataBox>
      <DataBox>
        <StatTextWrapper>
          <Icon type={Type.LongArrow} size={IconSize.Bigger} />
          <div data-testid={StatBoxesTestIds.DataReceivedText}>
            <Text
              displayStyle={TextDisplayStyle.PrimaryHeading}
              element={"span"}
            >
              {dataReceivedValue}
            </Text>
            <Text
              displayStyle={TextDisplayStyle.MediumLightText}
              element={"span"}
            >
              {dataReceivedUnit.toLowerCase()}
            </Text>
          </div>
        </StatTextWrapper>
        <Text
          displayStyle={TextDisplayStyle.SmallFadedText}
          element={"p"}
          message={messages.dataReceived}
        />
      </DataBox>
    </StatBoxesWrapper>
  )
}

export default StatBoxes
