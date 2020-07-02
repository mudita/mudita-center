import { AdditionalInfo as BaseAdditionalInfo } from "Renderer/components/rest/phone/contact-details.component"
import styled from "styled-components"

export const TypeHolder = styled.div`
  position: relative;

  & > label {
    padding-left: 3rem;
  }

  & > div {
    position: absolute;
    top: 50%;
    transform: translateY(-30%);
  }
`

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

  & > label:first-of-type {
    width: 70rem;
  }
`
export const CallWrapper = styled.div`
  margin-bottom: var(--header-height);
`
