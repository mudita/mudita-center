import { AdditionalInfo as BaseAdditionalInfo } from "Renderer/components/rest/phone/contact-details.component"
import styled from "styled-components"

export enum IconHolderPosition {
  Left,
  Right,
}

export const IconHolder = styled.div<{ iconPosition: IconHolderPosition }>`
  position: relative;

  & > label {
    padding-left: ${({ iconPosition }) =>
      iconPosition === IconHolderPosition.Left ? "3rem" : "0"};
  }

  & > div {
    position: absolute;
    top: 50%;
    transform: translateY(-30%);
    left: ${({ iconPosition }) =>
      iconPosition === IconHolderPosition.Left ? "0" : "auto"};
    right: ${({ iconPosition }) =>
      iconPosition === IconHolderPosition.Right ? "0" : "auto"};
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
