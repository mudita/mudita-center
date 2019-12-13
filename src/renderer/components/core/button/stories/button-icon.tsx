import * as React from "react"
import Upload from "Renderer/svg/upload.svg"
import { TextDisplayStyle } from "../../text/text.component"
import Button, { DisplayStyle } from "../button.component"

import { ButtonHeader, StoryWrapper } from "./styled-elements"

export default () => {
  const clickAlert = () => alert("You clicked me")
  return (
    <StoryWrapper>
      <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
        Button with icon only, style 1
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.IconOnly1}
        onClick={clickAlert}
        Icon={Upload}
      />
      <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
        Button with icon only, style 2
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.IconOnly2}
        onClick={clickAlert}
        Icon={Upload}
      />
      <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
        Button with icon only, style 3
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.IconOnly3}
        onClick={clickAlert}
        Icon={Upload}
      />
    </StoryWrapper>
  )
}
