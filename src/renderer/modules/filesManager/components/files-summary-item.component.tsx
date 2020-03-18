import React from "react"
import { Link } from "react-router-dom"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { DiskSpaceCategory } from "Renderer/models/files-manager/files-manager.interface"
import {
  backgroundColor,
  borderColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import { convertBytes } from "Renderer/utils/convert-bytes"
import styled from "styled-components"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"

const Wrapper = styled.div<{ fileColor: string }>`
  display: flex;
  align-items: center;
  background-color: ${backgroundColor("light")};
  border-left: 0.3rem solid ${({ fileColor }) => fileColor};
`

const StyledLink = styled(Link)`
  padding: 2.4rem 1.25rem;
  border-left: 0.1rem solid ${borderColor("grey2")};
  &:hover {
    .arrow {
      fill: ${textColor("hover")};
    }
  }
`

const SummaryIcon = styled(Icon)`
  margin: 1.9rem 2.4rem;
`

const TextWrapper = styled.div`
  margin-right: 3.2rem;
`

const FilesSummaryItem: FunctionComponent<DiskSpaceCategory> = ({
  color,
  filesAmount,
  filesType,
  occupiedMemory,
  icon,
  url,
}) => {
  return (
    <Wrapper fileColor={color} data-testid="files-manager-item">
      <SummaryIcon type={icon} />
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
          <Icon type={Type.Arrow} />
        </StyledLink>
      )}
    </Wrapper>
  )
}

export default FilesSummaryItem
