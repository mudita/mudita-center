import { storiesOf } from "@storybook/react"
import * as React from "react"
import Text, { TextDisplayStyle } from "./text.component"

storiesOf("Theme|Text", module).add("Text", () => {
  return (
    <>
      <Text displayStyle={TextDisplayStyle.PrimaryHeading}>TYPOGRAPHY</Text>
      <Text displayStyle={TextDisplayStyle.PrimaryHeading}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.TertiaryBoldHeading}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.TertiaryHeading}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.LargeBoldText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.LargeText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.LargeFadedText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.LargeTextCapitalLetters}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.LargeFadedTextCapitalLetters}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.LargeFadedDimTextCapitalLetters}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.MediumBoldText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.MediumLightText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.MediumFadedLightText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.MediumText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.MediumFadedText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.MediumFadedTextUppercased}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.SmallText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.SmallSupplementaryText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.SmallTextInverted}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.SmallFadedText}>
        I’m at the meetining now. I will call you later
      </Text>
      <Text displayStyle={TextDisplayStyle.SmallFadedDimText}>
        I’m at the meetining now. I will call you later
      </Text>
    </>
  )
})
