import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import DataBox from "Renderer/components/rest/meditation/data-box/data-box.component"
import { TextWrapper } from "Renderer/components/rest/meditation/data-box/data-box.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { messages } from "Renderer/components/rest/meditation/data-box/data-boxes.component"
import { convertBytes } from "Renderer/utils/convert-bytes"
import { StatBoxesWrapper } from "Renderer/components/rest/tethering/stat-boxes.styled"

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
          <Text displayStyle={TextDisplayStyle.PrimaryHeading} element={"span"}>
            {timeActive}
          </Text>
        </TextWrapper>
        <Text
          displayStyle={TextDisplayStyle.SmallFadedText}
          element={"p"}
          message={messages.daysPracticed}
        />
      </DataBox>
      <DataBox>
        <TextWrapper>
          <Text displayStyle={TextDisplayStyle.PrimaryHeading} element={"span"}>
            {dataSentValue}
          </Text>
          <Text
            displayStyle={TextDisplayStyle.MediumLightText}
            element={"span"}
          >
            {dataSentUnit.toLowerCase()}
          </Text>
        </TextWrapper>
        <Text
          displayStyle={TextDisplayStyle.SmallFadedText}
          element={"p"}
          message={messages.totalPracticeTime}
        />
      </DataBox>
      <DataBox>
        <TextWrapper>
          <Text displayStyle={TextDisplayStyle.PrimaryHeading} element={"span"}>
            {dataReceivedValue}
          </Text>
          <Text
            displayStyle={TextDisplayStyle.MediumLightText}
            element={"span"}
          >
            {dataReceivedUnit.toLowerCase()}
          </Text>
        </TextWrapper>
        <Text
          displayStyle={TextDisplayStyle.SmallFadedText}
          element={"p"}
          message={messages.averageSessionLength}
        />
      </DataBox>
    </StatBoxesWrapper>
  )
}

export default StatBoxes
