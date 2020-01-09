import React from "react"
import { Link } from "react-router-dom"
import Svg from "Renderer/components/core/svg/svg.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FilesManagerData } from "Renderer/models/files-manager/files-manager.interface"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import arrow from "Renderer/svg/arrow.svg"
import FunctionComponent from "Renderer/types/function-component.interface"
import { convertBytes } from "Renderer/utils/convert-bytes"
import styled from "styled-components"

const Wrapper = styled.div<{ fileColor: string }>`
  display: flex;
  align-items: center;
  background-color: ${backgroundColor("light")};
  border-left: 0.3rem solid ${({ fileColor }) => fileColor};
`

const StyledLink = styled(Link)`
  padding: 2.4rem 0.9rem;
  border-left: 0.1rem solid ${borderColor("grey2")};
`

const Icon = styled(Svg)`
  margin: 1.9rem 2.4rem;
`

const TextWrapper = styled.div`
  margin-right: 3.2rem;
`

const FilesManagerItem: FunctionComponent<FilesManagerData> = ({
  color,
  filesAmount,
  filesType,
  occupiedMemory,
  icon,
  url,
}) => {
  return (
    <Wrapper fileColor={color}>
      <Icon Image={icon} />
      <TextWrapper>
        <Text displayStyle={TextDisplayStyle.LargeText} element={"p"}>
          {filesType}
        </Text>
        <Text displayStyle={TextDisplayStyle.SmallFadedText} element={"p"}>
          {filesAmount
            ? `${filesAmount} files (${convertBytes(occupiedMemory)})`
            : `${convertBytes(occupiedMemory)}`}
        </Text>
      </TextWrapper>
      {url && (
        <StyledLink to={url}>
          <Svg Image={arrow} />
        </StyledLink>
      )}
    </Wrapper>
  )
}

export default FilesManagerItem
