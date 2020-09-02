import styled from "styled-components"
import { AdditionalInfo as BaseAdditionalInfo } from "Renderer/components/rest/phone/contact-details.styled"

export const AdditionalInfo = styled(BaseAdditionalInfo)<{
  large?: boolean
  heading?: boolean
}>`
  margin-top: ${({ large }) => large && "0"};

  & > div {
    margin-bottom: ${({ heading }) => heading && "0"};
  }

  & > p {
    margin-bottom: 0;
  }
`

export const CallWrapper = styled.div`
  margin-bottom: var(--header-height);
`

export const ButtonWrapper = styled.div<{ small?: boolean }>`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${({ small }) => (small ? "flex-end" : "center")};
  margin-top: ${({ small }) => (small ? "0" : "1rem")};

  button {
    width: auto;
  }
`
