import "@testing-library/jest-dom/extend-expect"
import "jest-styled-components"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { AvatarProps } from "Renderer/components/core/avatar/avatar.interface"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import { pieknaPaniJPG } from "Renderer/components/core/avatar/avatar.stories"

const renderAvatar = ({ ...props }: Partial<AvatarProps> = {}) => {
  const outcome = renderWithThemeAndIntl(<Avatar {...props} />)
  return {
    ...outcome,
  }
}

test("avatar renders in small size properly", () => {
  const { container } = renderAvatar({ size: AvatarSize.Small })
  expect(container.firstChild).toHaveStyleRule(
    "width",
    AvatarSize.Small + "rem"
  )
  expect(container.firstChild).toHaveStyleRule(
    "height",
    AvatarSize.Small + "rem"
  )
})

test("avatar renders in default size properly", () => {
  const { container } = renderAvatar()
  expect(container.firstChild).toHaveStyleRule(
    "width",
    AvatarSize.Medium + "rem"
  )
  expect(container.firstChild).toHaveStyleRule(
    "height",
    AvatarSize.Medium + "rem"
  )
})

test("avatar renders in big size properly", () => {
  const { container } = renderAvatar({ size: AvatarSize.Big })
  expect(container.firstChild).toHaveStyleRule("width", AvatarSize.Big + "rem")
  expect(container.firstChild).toHaveStyleRule("height", AvatarSize.Big + "rem")
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
