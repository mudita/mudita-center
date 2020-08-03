import styled from "styled-components"
import {
  backgroundColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import Table from "Renderer/components/core/table/table.component"
import Text from "Renderer/components/core/text/text.component"

export const LoadingModalText = styled(Text)`
  text-align: center;
  margin: 1.2rem 0;

  strong {
    color: ${textColor("primary")};
  }
`
export const ModalIcon = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 100%;
  margin: auto auto 2rem auto;
  background: ${backgroundColor("icon")};
  position: relative;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
export const FileList = styled(Table)`
  --columnsTemplate: 3fr 1fr;

  max-height: 30rem;
  overflow: scroll;
`
