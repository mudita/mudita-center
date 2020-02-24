import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { PhoneProps } from "Renderer/components/rest/overview/phone/phone.interface"
import Card, {
  CardAction,
  CardActionButton,
  CardText,
} from "Renderer/components/rest/overview/card.elements"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import Image from "Renderer/components/core/image/image.component"
import PureImage from "Renderer/images/pure-render.png"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { useHistory } from "react-router"

const PhoneCard = styled(Card)`
  grid-template-areas: "Text" "Buttons";
  grid-template-columns: 1fr;
  height: auto;
  padding: 10.4rem 0 6.4rem 0;
  justify-items: center;

  ${CardAction} {
    justify-self: center;
  }
`

const PhoneInfo = styled(CardText)`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 25rem;
  }
`

const BatteryStats = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-top: 0.8rem;
    margin-bottom: 0.4rem;
  }
`

const SignalStats = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 0.8rem;
  }
`

const Phone: FunctionComponent<PhoneProps> = ({
  batteryLevel,
  className,
  network,
  onDisconnect,
}) => {
  const history = useHistory()
  const handleClick = () => {
    onDisconnect()
    history.push("/news")
  }
  return (
    <PhoneCard className={className}>
      <PhoneInfo>
        <Image src={PureImage} />
        <BatteryStats>
          {/* TODO: Replace with animated icon component */}
          <Icon type={Type.Battery} width={1.6} />
          <Text displayStyle={TextDisplayStyle.LargeBoldText} element={"h2"}>
            {batteryLevel * 100} %
          </Text>
          <Text displayStyle={TextDisplayStyle.SmallFadedText}>
            <FormattedMessage id={"view.name.overview.phone.battery"} />
          </Text>
        </BatteryStats>
        <SignalStats>
          {/* TODO: Replace with animated icon component */}
          <Icon type={Type.Signal} width={1.6} />
          <Text displayStyle={TextDisplayStyle.LargeBoldText}>{network}</Text>
        </SignalStats>
      </PhoneInfo>
      <CardAction>
        <CardActionButton
          active
          label={intl.formatMessage({
            id: "view.name.overview.phone.disconnectAction",
          })}
          onClick={handleClick}
        />
      </CardAction>
    </PhoneCard>
  )
}

export default Phone
