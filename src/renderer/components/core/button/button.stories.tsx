import React from "react"
import { storiesOf } from "@storybook/react"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"
import Button from "Renderer/components/core/button/button.component"
import styled, { css } from "styled-components"
import { Type } from "Renderer/components/core/icon/icon.config"

const fullWidthButtonStory = css`
  width: 30rem;
  align-items: stretch;
`

export const FullWidthButton = styled(Button)`
  width: 100%;
`

storiesOf("Components/Core/Button", module)
  .add("Default", () => (
    <>
      <StoryContainer title="Themes">
        <Story title="Primary (default)">
          <Button label="Button" />
        </Story>
        <Story title="Primary disabled">
          <Button disabled label="Button" />
        </Story>
        <Story title="Secondary">
          <Button displayStyle={DisplayStyle.Secondary} label="Button" />
        </Story>
        <Story title="Secondary disabled">
          <Button
            displayStyle={DisplayStyle.Secondary}
            disabled
            label="Button"
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Sizes">
        <Story title="Big">
          <Button size={Size.FixedBig} label="Button" />
        </Story>
        <Story title="Medium">
          <Button size={Size.FixedMedium} label="Button" />
        </Story>
        <Story title="Small">
          <Button size={Size.FixedSmall} label="Button" />
        </Story>
        <Story title="Custom" customStyle={fullWidthButtonStory}>
          <FullWidthButton label="Button" />
        </Story>
      </StoryContainer>
      <StoryContainer title="Modifiers (icon)">
        <Story title="Primary (default)">
          <Button Icon={Type.Upload} label="Button" />
        </Story>
        <Story title="Primary disabled">
          <Button Icon={Type.Upload} disabled label="Button" />
        </Story>
        <Story title="Secondary">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Secondary}
            label="Button"
          />
        </Story>
        <Story title="Secondary disabled">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Secondary}
            disabled
            label="Button"
          />
        </Story>
      </StoryContainer>
    </>
  ))
  .add("Link", () => (
    <>
      <StoryContainer title="Style 1">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.Link1}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Link1}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Style 2">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.Link2}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Link2}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Style 3">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.Link3}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Link3}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Style 4">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.Link4}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Link4}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Tab">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.Tab}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Tab}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Dropdown">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.Dropdown}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Dropdown}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
      </StoryContainer>
    </>
  ))
  .add("Icon", () => (
    <>
      <StoryContainer title="Themes">
        <Story title="Style 1">
          <Button Icon={Type.Upload} displayStyle={DisplayStyle.IconOnly1} />
        </Story>
        <Story title="Style 2">
          <Button Icon={Type.Upload} displayStyle={DisplayStyle.IconOnly2} />
        </Story>
        <Story title="Style 3">
          <Button Icon={Type.Upload} displayStyle={DisplayStyle.IconOnly3} />
        </Story>
        <Story title="Style 4">
          <Button Icon={Type.Upload} displayStyle={DisplayStyle.InputIcon} />
        </Story>
      </StoryContainer>
    </>
  ))
