import "@testing-library/jest-dom/extend-expect"
import "jest-styled-components"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Avatar, {
  AvatarProps,
  AvatarSize,
  getSize,
} from "Renderer/components/core/avatar/avatar.component"
import { pieknaPaniJPG } from "Renderer/components/core/avatar/avatar.stories"

const renderAvatar = ({ ...props }: Partial<AvatarProps> = {}) => {
  return renderWithThemeAndIntl(<Avatar {...props} />)
}

const sizeTest = (size: AvatarSize) => {
  const { container } = renderAvatar({ size })
  expect(container.firstChild).toHaveStyleRule("width", getSize(size) + "rem")
  expect(container.firstChild).toHaveStyleRule("height", getSize(size) + "rem")
}

test("avatar renders in small size properly", () => {
  sizeTest(AvatarSize.Small)
})

test("avatar renders in medium size properly", () => {
  sizeTest(AvatarSize.Medium)
})

test("avatar renders in big size properly", () => {
  sizeTest(AvatarSize.Big)
})

test("avatar renders text content properly", () => {
  const { container } = renderAvatar({ text: "abc" })
  expect(container).toHaveTextContent("abc")
})

test("avatar renders image properly", () => {
  const { getByTestId } = renderAvatar({ imageSrc: pieknaPaniJPG })
  expect(getByTestId("avatar-image")).toBeInTheDocument()
})

test("avatar renders default image properly", () => {
  const { getByTestId } = renderAvatar()
  expect(getByTestId("icon-Contacts")).toBeInTheDocument()
})
