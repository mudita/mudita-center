import * as React from "react"
import { TextDisplayStyle } from "../../text/text.component"
import Button from "../button.component"
import { DisplayStyle } from "../button.config"

import { ButtonHeader, StoryWrapper } from "./styled-elements"
import { Type } from "Renderer/components/core/icon/icon.config"

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
        Icon={Type.Upload}
      />
      <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
        Button with icon only, style 2
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.IconOnly2}
        onClick={clickAlert}
        Icon={Type.Upload}
      />
      <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
        Button with icon only, style 3
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.IconOnly3}
        onClick={clickAlert}
        Icon={Type.Upload}
      />
      <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
        Button with icon only, style for text inputs
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.InputIcon}
        onClick={clickAlert}
        Icon={Type.Upload}
      />
    </StoryWrapper>
  )
}
