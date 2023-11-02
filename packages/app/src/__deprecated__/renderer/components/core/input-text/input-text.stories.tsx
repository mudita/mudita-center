/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { button, withKnobs } from "@storybook/addon-knobs"
import React, { useState } from "react"
import InputComponent from "App/__deprecated__/renderer/components/core/input-text/input-text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import {
  storyContainerStyles,
  textAreaContainerStyles,
} from "App/__deprecated__/renderer/components/core/input-text/input-text-shared.stories"
import { RowsView } from "App/__deprecated__/renderer/components/core/table/table-parts.stories"

export const Icon: FunctionComponent = () => (
  <svg width="14" height="14" viewBox="0 0 14 14">
    <g fill="#000" fillRule="evenodd">
      <path d="M5.306 10.148A4.857 4.857 0 01.444 5.296 4.857 4.857 0 015.306.444a4.857 4.857 0 014.86 4.852 4.857 4.857 0 01-4.86 4.852zm0-1.167A3.69 3.69 0 009 5.296 3.69 3.69 0 005.306 1.61 3.69 3.69 0 001.61 5.296 3.69 3.69 0 005.306 8.98z" />
      <path d="M8.568 8.137l4.32 4.313a.61.61 0 010 .862.612.612 0 01-.863 0L7.703 9a.61.61 0 010-.863.612.612 0 01.865 0z" />
    </g>
  </svg>
)

export default {
  title: 'Components|Core/Text input',
  decorators: [withKnobs],
  excludeStories: ['Icon'],
};

export const TextInputView = () => (
    <>
      <StoryContainer title="Themes" customStyle={storyContainerStyles}>
        <Story title="Default">
          <InputComponent type="text" label="First name" />
        </Story>
        <Story title="Condensed">
          <InputComponent type="text" condensed label="First name" />
        </Story>
      </StoryContainer>
      <StoryContainer title="Modifiers" customStyle={storyContainerStyles}>
        <Story title="With label">
          <InputComponent type="text" label="Name" />
        </Story>
        <Story title="With value">
          <InputComponent defaultValue="John" type="text" label="Name" />
        </Story>
        <Story title="With error">
          <InputComponent
            defaultValue="John5"
            type="text"
            label="Name"
            errorMessage="May contain letters only"
          />
        </Story>
        <Story title="With clear button">
          <InputComponent
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            label="Name"
            defaultValue={"John"}
            type="search"
          />
        </Story>
        <Story title="Disabled with value">
          <InputComponent
            defaultValue="John"
            type="text"
            label="Name"
            disabled
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Customizations" customStyle={storyContainerStyles}>
        <Story title="With leading icon">
          <InputComponent
            type="text"
            leadingIcons={[<Icon key="1" />]}
            label="Name"
          />
        </Story>
        <Story title="With trailing icon">
          <InputComponent
            type="text"
            trailingIcons={[<Icon key="1" />]}
            label="Name"
          />
        </Story>
        <Story title={"With leading \n and trailing icons"}>
          <InputComponent
            type="text"
            leadingIcons={[<Icon key="1" />]}
            trailingIcons={[<Icon key="1" />]}
            label="Name"
          />
        </Story>
        <Story title={"With multiple leading \n and trailing icons"}>
          <InputComponent
            type="text"
            leadingIcons={[<Icon key="1" />, <Icon key="2" />]}
            trailingIcons={[<Icon key="1" />, <Icon key="2" />]}
            label="Name"
          />
        </Story>
      </StoryContainer>
    </>
  );

TextInputView.story = {
  name: "Text Input view",
}

export const OutlinedView = () => (
    <>
      <StoryContainer title="Themes" customStyle={storyContainerStyles}>
        <Story title="Default">
          <InputComponent type="text" outlined label="First name" />
        </Story>
        <Story title="Condensed">
          <InputComponent type="text" condensed outlined label="First name" />
        </Story>
      </StoryContainer>
      <StoryContainer title="Modifiers" customStyle={storyContainerStyles}>
        <Story title="With label">
          <InputComponent type="text" label="Name" outlined />
        </Story>
        <Story title="With value">
          <InputComponent
            defaultValue="John"
            type="text"
            label="Name"
            outlined
          />
        </Story>
        <Story title="With error">
          <InputComponent
            defaultValue="John5"
            type="text"
            label="Name"
            errorMessage="May contain letters only"
            outlined
          />
        </Story>
        <Story title="With clear button">
          <InputComponent
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            label="Name"
            defaultValue={"John"}
            type="search"
            outlined
          />
        </Story>
        <Story title="Disabled with value">
          <InputComponent
            defaultValue="John"
            type="text"
            label="Name"
            disabled
            outlined
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Customizations" customStyle={storyContainerStyles}>
        <Story title="With leading icon">
          <InputComponent
            type="text"
            leadingIcons={[<Icon key="1" />]}
            label="Name"
            outlined
          />
        </Story>
        <Story title="With trailing icon">
          <InputComponent
            type="text"
            trailingIcons={[<Icon key="1" />]}
            label="Name"
            outlined
          />
        </Story>
        <Story title={"With leading \n and trailing icons"}>
          <InputComponent
            type="text"
            leadingIcons={[<Icon key="1" />]}
            trailingIcons={[<Icon key="1" />]}
            label="Name"
            outlined
          />
        </Story>
        <Story title={"With multiple leading \n and trailing icons"}>
          <InputComponent
            type="text"
            leadingIcons={[<Icon key="1" />, <Icon key="2" />]}
            trailingIcons={[<Icon key="1" />, <Icon key="2" />]}
            label="Name"
            outlined
          />
        </Story>
      </StoryContainer>
    </>
  );

OutlinedView.story = {
  name: "Outlined view",
}

export const InputLike = () => (
    <>
      <StoryContainer title="Themes" customStyle={textAreaContainerStyles}>
        <Story title="Default">
          <InputComponent type="textarea" label="Message" outlined={false} />
        </Story>
      </StoryContainer>
      <StoryContainer title="Modifiers" customStyle={textAreaContainerStyles}>
        <Story title="With label">
          <InputComponent type="textarea" label="Message" outlined={false} />
        </Story>
        <Story title="With value">
          <InputComponent
            defaultValue={
              "Curabitur ac lectus.\n\nAliquet quam id dui posuere blandit."
            }
            type="textarea"
            label="Message"
            outlined={false}
          />
        </Story>
        <Story title="With error">
          <InputComponent
            type="textarea"
            label="Message"
            defaultValue={
              "Curabitur ac lectus.\n\nAliquet quam id dui posuere blandit."
            }
            errorMessage="Text is too long"
            outlined={false}
          />
        </Story>
        <Story title="Disabled with value">
          <InputComponent
            type="textarea"
            label="Message"
            defaultValue={
              "Curabitur ac lectus.\n\nAliquet quam id dui posuere blandit."
            }
            disabled
            outlined={false}
          />
        </Story>
        <Story title="With rows limit set to 3">
          <InputComponent
            type="textarea"
            label="Message"
            defaultValue={
              "Curabitur ac lectus.\n\nAliquet quam id dui posuere blandit."
            }
            maxRows={3}
            outlined={false}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Customizations">
        <Story title="With leading icon">
          <InputComponent
            type="textarea"
            leadingIcons={[<Icon key={1} />]}
            label="Message"
            outlined={false}
          />
        </Story>
        <Story title="With trailing icon">
          <InputComponent
            type="textarea"
            trailingIcons={[<Icon key={1} />]}
            label="Message"
            outlined={false}
          />
        </Story>
        <Story title={"With leading \n and trailing icons"}>
          <InputComponent
            type="textarea"
            leadingIcons={[<Icon key={1} />]}
            trailingIcons={[<Icon key={1} />]}
            label="Message"
            outlined={false}
          />
        </Story>
        <Story title={"With multiple leading \n and trailing icons"}>
          <InputComponent
            type="textarea"
            leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
            trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
            label="Message"
            outlined={false}
          />
        </Story>
      </StoryContainer>
    </>
  );

InputLike.story = {
  name: 'Input-like',
};

export const Interactive = () => {
    const [value, setValue] = useState("Lorem\nipsum\ndolor\nsit\namet\nsit")
    const [maxRows, setMaxRows] = useState(5)

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    const updateValue = (event: any) => setValue(event.target.value)

    const setPredefinedValue = () => setValue("Lorem\nipsum\ndolor\nsit")

    const decreaseMaxRows = () => setMaxRows(maxRows > 1 ? maxRows - 1 : 1)

    const increaseMaxRows = () => setMaxRows(maxRows + 1)

    const setFiveMaxRows = () => setMaxRows(5)

    const infiniteMaxRows = () => setMaxRows(Infinity)

    button("set 5 max rows", setFiveMaxRows)
    button("decrease max rows", decreaseMaxRows)
    button("increase max rows", increaseMaxRows)
    button("infinite max rows", infiniteMaxRows)
    button("set predefined value", setPredefinedValue)

    return (
      <StoryContainer customStyle={textAreaContainerStyles}>
        <Story>
          <InputComponent
            type="textarea"
            value={value}
            onChange={updateValue}
            maxRows={maxRows}
          />
        </Story>
        <Story noCode>
          <pre>
            MAX ROWS: {maxRows === 0 ? "inf" : maxRows}
            <br />
            VALUE:
            <br />
            {value}
          </pre>
        </Story>
      </StoryContainer>
    )
  };

Interactive.story = {
  name: 'Interactive',
};
