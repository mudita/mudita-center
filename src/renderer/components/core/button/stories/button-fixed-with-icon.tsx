import * as React from "react"
import Upload from "Renderer/svg/upload.svg"
import { TextDisplayStyle } from "../../text/text.component"
import Button from "../button.component"
import { DisplayStyle, Size } from "../button.config"

import {
  Button100,
  ButtonElement,
  ButtonHeader,
  ButtonsColumn,
  ButtonsRow,
  ButtonsWidthRow,
  SectionHeader,
  StoryWrapper,
} from "./styled-elements"

export default () => {
  const clickAlert = () => alert("You clicked me")
  return (
    <StoryWrapper>
      <ButtonsWidthRow>
        <SectionHeader displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
          Buttons with fixed width and icons
        </SectionHeader>
        <ButtonsRow>
          <ButtonsColumn>
            <ButtonHeader displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
              100% width
            </ButtonHeader>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Primary button
              </ButtonHeader>
              <Button100
                displayStyle={DisplayStyle.Primary}
                size={Size.FixedBig}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Primary disabled button
              </ButtonHeader>
              <Button100
                displayStyle={DisplayStyle.Primary}
                size={Size.FixedBig}
                label="Click"
                onClick={clickAlert}
                disabled
                Icon={Upload}
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Secondary button
              </ButtonHeader>
              <Button100
                displayStyle={DisplayStyle.Secondary}
                size={Size.FixedBig}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Secondary disabled button
              </ButtonHeader>
              <Button100
                displayStyle={DisplayStyle.Secondary}
                size={Size.FixedBig}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
                disabled
              />
            </ButtonElement>
          </ButtonsColumn>
        </ButtonsRow>
        <ButtonsRow>
          <ButtonsColumn>
            <ButtonHeader displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
              Big
            </ButtonHeader>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Primary button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Primary}
                size={Size.FixedBig}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Primary disabled button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Primary}
                size={Size.FixedBig}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
                disabled
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Secondary button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Secondary}
                size={Size.FixedBig}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Secondary disabled button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Secondary}
                size={Size.FixedBig}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
                disabled
              />
            </ButtonElement>
          </ButtonsColumn>
          <ButtonsColumn>
            <ButtonHeader displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
              Medium
            </ButtonHeader>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Primary button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Primary}
                size={Size.FixedMedium}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Medium primary disabled button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Primary}
                size={Size.FixedMedium}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
                disabled
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Secondary button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Secondary}
                size={Size.FixedMedium}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Secondary disabled button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Secondary}
                size={Size.FixedMedium}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
                disabled
              />
            </ButtonElement>
          </ButtonsColumn>
          <ButtonsColumn>
            <ButtonElement>
              <ButtonHeader
                displayStyle={TextDisplayStyle.SecondaryBoldHeading}
              >
                Small
              </ButtonHeader>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Primary button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Primary}
                size={Size.FixedSmall}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Primary disabled button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Primary}
                size={Size.FixedSmall}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
                disabled
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Secondary button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Secondary}
                size={Size.FixedSmall}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
              />
            </ButtonElement>
            <ButtonElement>
              <ButtonHeader displayStyle={TextDisplayStyle.SmallText}>
                Secondary disabled button
              </ButtonHeader>
              <Button
                displayStyle={DisplayStyle.Secondary}
                size={Size.FixedSmall}
                label="Click"
                onClick={clickAlert}
                Icon={Upload}
                disabled
              />
            </ButtonElement>
          </ButtonsColumn>
        </ButtonsRow>
      </ButtonsWidthRow>
    </StoryWrapper>
  )
}
