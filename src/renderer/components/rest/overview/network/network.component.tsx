import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { NetworkProps } from "Renderer/components/rest/overview/network/network.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import styled from "styled-components"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { intl } from "Renderer/utils/intl"
import SimInfo from "Common/interfaces/sim-info.interface"
import {
  backgroundColor,
  borderRadius,
  textColor,
} from "Renderer/styles/theming/theme-getters"

const TextInfo = styled.div`
  grid-area: Text;
  p {
    margin-top: 0.8rem;
    color: ${textColor("placeholder")};
  }
`

const Buttons = styled(ButtonToggler)`
  grid-area: Buttons;
  justify-self: end;
  min-width: 17rem;

  button {
    padding: 0 1.6rem;
    width: 50%;
  }
`

const Section = styled.section`
  display: grid;
  align-items: center;
  grid-template-areas: "Text Buttons";
  grid-template-columns: auto minmax(17rem, 1fr);
  height: 14.4rem;
  padding: 0 4.8rem;
  box-sizing: border-box;
  border-radius: ${borderRadius("medium")};
  background-color: ${backgroundColor("light")};
`

const SimButton = ({ slot, number: phone, active }: SimInfo) => {
  const label = intl.formatMessage(
    {
      id: "view.name.overview.network.simInfo",
    },
    { slot, phone }
  )
  return <ButtonTogglerItem label={label} active={active} />
}

const NoSimButton = () => {
  const label = intl.formatMessage({
    id: "view.name.overview.network.noSimInserted",
  })
  return <ButtonTogglerItem label={label} disabled />
}

const Network: FunctionComponent<NetworkProps> = ({
  className,
  simCards = [],
}) => {
  const noActiveCard = simCards.every(({ active }) => !active)
  const activatingAvailable =
    (simCards.length && noActiveCard) || simCards.length > 1
  return (
    <Section className={className}>
      <TextInfo>
        <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
          <FormattedMessage id="view.name.overview.network.name" />
        </Text>
        {activatingAvailable && (
          <Text displayStyle={TextDisplayStyle.MediumText}>
            <FormattedMessage id="view.name.overview.network.description" />
          </Text>
        )}
      </TextInfo>
      <Buttons>
        {Boolean(simCards.length) ? (
          simCards.map(simCard => (
            <SimButton key={simCard.number} {...simCard} />
          ))
        ) : (
          <NoSimButton />
        )}
      </Buttons>
    </Section>
  )
}

export default Network
