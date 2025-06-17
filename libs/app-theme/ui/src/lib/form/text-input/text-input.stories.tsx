/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react-vite"
import styled from "styled-components"
import { TextInput } from "./text-input"
import { IconSize, IconType, TextInputVariant } from "app-theme/models"
import { IconButton } from "../../icon-button/icon-button"
import { Icon } from "../../icon/icon"
import { storybookHelper } from "app-theme/utils"
import { FunctionComponent, useMemo, useState } from "react"
import { action } from "storybook/actions"

const Decorator = styled.div`
  align-self: center;
  justify-self: center;
  width: 25rem;
`

const InnerDecorator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`

const meta: Meta<typeof TextInput> = {
  title: "UI/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `<TextInput>` component is a basic form element that allows users to input text.\n\n" +
          "It supports all standard HTML input attributes. Only the `type` property is limited to: " +
          "`date` `datetime-local` `email` `month` `number` `password` `search` `tel` `text` `time` `url` `week`.\n\n" +
          "Additionaly, styles can be customized by defining `variant`, `leftSlot` and `rightSlot` properties.\n\n" +
          "Also, basic error state is supported by the `TextInputVariant.Filled` variant, allowing to use the `error` property.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  name: "Default variant",
  argTypes: {
    variant: storybookHelper
      .assignCategory("Styles")
      .generateEnumSelector(TextInputVariant, "TextInputVariant")
      .addDescription(
        "Defines the variant of the text input.\n\n" +
          "The `TextInputVariant.Outlined` variant does not support error state.\n\n" +
          "For `TextInputVariant.Filled`, an additional `error` prop is available.\n"
      )
      .apply(),
    placeholder: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the placeholder text.")
      .apply(),
    error: storybookHelper
      .assignCategory("Functional")
      .addDescription("Defines the error message and applies proper styles.")
      .apply({
        control: {
          type: "text",
        },
        if: {
          arg: "variant",
          eq: TextInputVariant.Filled,
        },
      }),
    leftSlot: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the left slot of the text input. Its main purpose is to display visual elements like icons.\n\n" +
          "Not available for `search` type."
      )
      .setType("ReactNode")
      .apply({
        control: false,
      }),
    rightSlot: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the right slot of the text input. Its main purpose is to display interactive elements like buttons.\n\n" +
          "Not available for `password` and `search` types."
      )
      .setType("ReactNode")
      .apply({
        control: false,
      }),
    type: storybookHelper
      .addDescription(
        "Defines the type of the text input. The default value is `text`."
      )
      .apply({
        options: [
          "text",
          "password",
          "email",
          "tel",
          "url",
          "date",
          "datetime-local",
          "month",
          "number",
          "search",
          "time",
          "week",
        ],
        control: {
          type: "select",
        },
      }),
    dropdown: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "An additional slot for dropdown component. " +
          "It's highly recommended to use the predefined `<TextInput.Dropdown />` component."
      )
      .setType("ReactNode")
      .apply({
        if: {
          arg: "type",
          eq: "search",
        },
      }),
  },
  args: {
    variant: TextInputVariant.Outlined,
    placeholder: "Placeholder",
    defaultValue: "",
  },
  parameters: {
    docs: {
      source: {
        code: '<TextInput placeholder="Placeholder" />',
      },
    },
  },
}

export const Filled: Story = {
  name: "Filled variant",
  args: {
    variant: TextInputVariant.Filled,
    placeholder: "Placeholder",
  },
  parameters: {
    docs: {
      source: {
        code: '<TextInput placeholder="Placeholder" variant={TextInputVariant.Filled} />',
      },
    },
  },
}

export const FilledWithError: Story = {
  name: "Filled variant with error",
  argTypes: {
    leftSlot: storybookHelper.disableControl().apply(),
    rightSlot: storybookHelper.disableControl().apply(),
    variant: storybookHelper.disableControl().apply(),
  },
  args: {
    variant: TextInputVariant.Filled,
    placeholder: "Placeholder",
    error: "Error message",
    defaultValue: "Wrong value",
  },
  parameters: {
    docs: {
      source: {
        code:
          "<TextInput\n" +
          '  placeholder="Placeholder"\n' +
          '  error="Error message"\n' +
          '  value={"Wrong value"}\n' +
          "  variant={TextInputVariant.Filled}\n" +
          "/>",
      },
    },
  },
}

export const WithIconInLeftSlot: Story = {
  name: "With icon in left slot",
  argTypes: {
    leftSlot: storybookHelper.disableControl().apply(),
    rightSlot: storybookHelper.disableControl().apply(),
    variant: storybookHelper.disableControl().apply(),
  },
  parameters: {
    docs: {
      source: {
        code:
          "<TextInput\n" +
          '  type="text"\n' +
          "  leftSlot={<Icon type={IconType.Search} size={IconSize.Medium} />}\n" +
          '  placeholder="Placeholder"\n' +
          "/>\n" +
          "<TextInput\n" +
          '  type="text"\n' +
          "  leftSlot={<Icon type={IconType.Search} size={IconSize.Medium} />}\n" +
          '  placeholder="Placeholder"\n' +
          "  variant={TextInputVariant.Filled}\n" +
          "/>",
      },
    },
  },
  render: () => {
    return (
      <InnerDecorator>
        <TextInput
          type="text"
          leftSlot={<Icon type={IconType.Search} size={IconSize.Medium} />}
          placeholder="Placeholder"
        />
        <TextInput
          type="text"
          variant={TextInputVariant.Filled}
          leftSlot={<Icon type={IconType.Search} size={IconSize.Medium} />}
          placeholder="Placeholder"
        />
      </InnerDecorator>
    )
  },
}

export const WithButtonInRightSlot: Story = {
  name: "With button in right slot",
  argTypes: {
    leftSlot: storybookHelper.disableControl().apply(),
    rightSlot: storybookHelper.disableControl().apply(),
    variant: storybookHelper.disableControl().apply(),
  },
  args: {
    placeholder: "Placeholder",
  },
  parameters: {
    docs: {
      source: {
        code:
          "<TextInput\n" +
          "  rightSlot={<IconButton icon={IconType.MuditaLogo} />}\n" +
          '  placeholder="Placeholder"\n' +
          "/>\n\n" +
          "<TextInput\n" +
          "  rightSlot={<IconButton icon={IconType.MuditaLogo} />}\n" +
          '  placeholder="Placeholder"\n' +
          "  variant={TextInputVariant.Filled}\n" +
          "/>",
      },
    },
  },
  render: () => {
    return (
      <InnerDecorator>
        <TextInput
          type={"text"}
          rightSlot={<IconButton icon={IconType.MuditaLogo} />}
          placeholder="Placeholder"
        />
        <TextInput
          type={"text"}
          variant={TextInputVariant.Filled}
          rightSlot={<IconButton icon={IconType.MuditaLogo} />}
          placeholder="Placeholder"
        />
      </InnerDecorator>
    )
  },
}

export const WithPasswordType: Story = {
  name: "With password type",
  argTypes: {
    leftSlot: storybookHelper.disableControl().apply(),
    rightSlot: storybookHelper.disableControl().apply(),
    variant: storybookHelper.disableControl().apply(),
  },
  args: {
    type: "password",
    placeholder: "Placeholder",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The input with `password` type has a predefined mechanism for showing/hiding the password.\n\n" +
          "The `rightSlot` is not available in this case.",
      },
      source: {
        code:
          "<TextInput\n" +
          '  type="password"\n' +
          '  placeholder="Placeholder"\n' +
          "/>" +
          "\n\n" +
          "<TextInput\n" +
          '  type="password"\n' +
          '  placeholder="Placeholder"\n' +
          "  variant={TextInputVariant.Filled}\n" +
          "/>",
      },
    },
  },
  render: () => {
    return (
      <InnerDecorator>
        <TextInput type="password" placeholder="Placeholder" />
        <TextInput
          type="password"
          placeholder="Placeholder"
          variant={TextInputVariant.Filled}
        />
      </InnerDecorator>
    )
  },
}

export const WithSearchType: Story = {
  name: "With search type",
  argTypes: {
    leftSlot: storybookHelper.disableControl().apply(),
    rightSlot: storybookHelper.disableControl().apply(),
    variant: storybookHelper.disableControl().apply(),
  },
  args: {
    type: "search",
    placeholder: "Placeholder",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The input with `search` type has a predefined mechanism for clearing the value and showing the dropdown list.\n" +
          "Both `leftSlot` and `rightSlot` are not available in this case.\n\n" +
          "The input comes with additional UI components:\n\n" +
          "- `<TextInput.Dropdown>` for dropdown wrapper,\n" +
          "- `<TextInput.Dropdown.Item>` for each selectable item inside the dropdown,\n" +
          "- `<TextInput.Dropdown.EmptyState>` for predefined empty state with customizable text by the `text` prop.\n\n" +
          "Using them guarantees that showing and navigating through search results will be handled properly.\n" +
          "**Note:** The implementation of getting the searched phrase, getting the results and filtering them must be done separately.",
      },
      source: {
        code:
          "const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)\n" +
          'const [value, setValue] = useState("")\n' +
          "\n" +
          "const filteredItems = useMemo(() => {\n" +
          '  if (value === "") return []\n' +
          "  return items.filter((item) =>\n" +
          "    item.toLowerCase().includes(value.toLowerCase())\n" +
          "  )\n" +
          "}, [items, value])\n" +
          "\n" +
          "const dropdown = useMemo(() => {\n" +
          "  return (\n" +
          '    <TextInput.Dropdown style={{ maxHeight: "20rem" }}>\n' +
          "      {value.length > 0 && filteredItems.length === 0 ? (\n" +
          "        <TextInput.Dropdown.EmptyState />\n" +
          "      ) : (\n" +
          "        <>\n" +
          "          {filteredItems.length > 0 && (\n" +
          '            <em style={{ padding: "1rem 2rem" }}>\n' +
          '              Found {filteredItems.length} results for "{value}"\n' +
          "            </em>\n" +
          "          )}\n" +
          '          <div style={{ overflow: "auto", flex: 1 }}>\n' +
          "            {filteredItems.map((item) => (\n" +
          "              <TextInput.Dropdown.Item\n" +
          "                key={item}\n" +
          "                onClick={action(`${item} clicked`)}\n" +
          '                style={{ padding: "1rem 2rem" }}\n' +
          "              >\n" +
          "                {item}\n" +
          "              </TextInput.Dropdown.Item>\n" +
          "            ))}\n" +
          "          </div>\n" +
          "        </>\n" +
          "      )}\n" +
          "    </TextInput.Dropdown>\n" +
          "  )\n" +
          "}, [value, filteredItems])\n\n" +
          "return (\n" +
          "  <TextInput\n" +
          '    type={"search"}\n' +
          "    dropdown={dropdown}\n" +
          "    onChange={(e) => setValue(e.target.value)}\n" +
          '    placeholder={"Type number 1 - 1000"}\n' +
          "  />\n" +
          ")",
      },
    },
  },
  render: () => {
    return (
      <InnerDecorator style={{ minHeight: "35rem" }}>
        <div>
          <SearchStory />
        </div>
        <div>
          <SearchStory variant={TextInputVariant.Filled} />
        </div>
      </InnerDecorator>
    )
  },
}

const SearchStory: FunctionComponent<{
  variant?: TextInputVariant
}> = ({ variant }) => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)
  const [value, setValue] = useState("")

  const filteredItems = useMemo(() => {
    if (value === "") return []
    return items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    )
  }, [items, value])

  const dropdown = useMemo(() => {
    return (
      <TextInput.Dropdown style={{ maxHeight: "20rem" }}>
        {value.length > 0 && filteredItems.length === 0 ? (
          <TextInput.Dropdown.EmptyState />
        ) : (
          <>
            {filteredItems.length > 0 && (
              <em style={{ padding: "1rem 2rem" }}>
                Found {filteredItems.length} results for "{value}"
              </em>
            )}
            <div style={{ overflow: "auto", flex: 1 }}>
              {filteredItems.map((item) => (
                <TextInput.Dropdown.Item
                  key={item}
                  onClick={action(`${item} clicked`)}
                  style={{ padding: "1rem 2rem" }}
                >
                  {item}
                </TextInput.Dropdown.Item>
              ))}
            </div>
          </>
        )}
      </TextInput.Dropdown>
    )
  }, [value, filteredItems])

  return (
    <TextInput
      type={"search"}
      dropdown={dropdown}
      onChange={(e) => setValue(e.target.value)}
      placeholder={"Type number 1 - 1000"}
      variant={variant}
    />
  )
}
