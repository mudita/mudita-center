import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import DataBox from "Renderer/components/rest/meditation/data-box/data-box.component"
import { TextWrapper } from "Renderer/components/rest/meditation/data-box/data-box.styled"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"

export const messages = defineMessages({
  daysPracticed: {
    id: "view.name.meditation.dataBox.daysPracticed",
  },
  totalPracticeTime: {
    id: "view.name.meditation.dataBox.totalPracticeTime",
  },
  averageSessionLength: {
    id: "view.name.meditation.dataBox.averageSessionLength",
  },
})

export const DataBoxesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
  max-width: 90.5rem;
`

const DataBoxes: FunctionComponent<{}> = () => (
  <DataBoxesWrapper>
    <DataBox>
      <TextWrapper>
        <Text displayStyle={TextDisplayStyle.PrimaryHeading} element={"span"}>
          6
        </Text>
        <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
          /7
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
          1
        </Text>
        <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
          h
        </Text>
        <Text displayStyle={TextDisplayStyle.PrimaryHeading} element={"span"}>
          11
        </Text>
        <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
          m
        </Text>
        <Text displayStyle={TextDisplayStyle.PrimaryHeading} element={"span"}>
          14
        </Text>
        <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
          s
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
          17
        </Text>
        <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
          m
        </Text>
        <Text displayStyle={TextDisplayStyle.PrimaryHeading} element={"span"}>
          32
        </Text>
        <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
          s
        </Text>
      </TextWrapper>
      <Text
        displayStyle={TextDisplayStyle.SmallFadedText}
        element={"p"}
        message={messages.averageSessionLength}
      />
    </DataBox>
  </DataBoxesWrapper>
)

export default DataBoxes
