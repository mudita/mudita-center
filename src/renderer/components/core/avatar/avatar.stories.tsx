import { storiesOf } from "@storybook/react"
import React from "react"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

export const pieknaPaniJPG = `data:image/jpg;base64,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`

const Wrapper = styled.div`
  padding: 2rem;
`

const WrapperWithBG = styled(Wrapper)`
  background-color: rgba(0, 0, 0, 0.1);
`

storiesOf("Components|Avatar", module)
  .add("Dark with text", () => {
    return (
      <>
        <Wrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Small</Text>
          <br />
          <Avatar size={AvatarSize.Small} text={"MK"} />
        </Wrapper>
        <Wrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>
            Medium (default)
          </Text>
          <br />
          <Avatar text={"MK"} />
        </Wrapper>
        <Wrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Big</Text>
          <br />
          <Avatar size={AvatarSize.Big} text={"MK"} />
        </Wrapper>
      </>
    )
  })
  .add("Light with text", () => {
    return (
      <>
        <WrapperWithBG>
          <Text displayStyle={TextDisplayStyle.SmallText}>Small</Text>
          <br />
          <Avatar size={AvatarSize.Small} text={"MK"} light />
        </WrapperWithBG>
        <WrapperWithBG>
          <Text displayStyle={TextDisplayStyle.SmallText}>
            Medium (default)
          </Text>
          <br />
          <Avatar text={"MK"} light />
        </WrapperWithBG>
        <WrapperWithBG>
          <Text displayStyle={TextDisplayStyle.SmallText}>Big</Text>
          <br />
          <Avatar size={AvatarSize.Big} text={"MK"} light />
        </WrapperWithBG>
      </>
    )
  })
  .add("With image", () => {
    return (
      <>
        <Wrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Small</Text>
          <br />
          <Avatar size={AvatarSize.Small} imageSrc={pieknaPaniJPG} />
        </Wrapper>
        <Wrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>
            Medium (default)
          </Text>
          <br />
          <Avatar imageSrc={pieknaPaniJPG} />
        </Wrapper>
        <Wrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Big</Text>
          <br />
          <Avatar size={AvatarSize.Big} imageSrc={pieknaPaniJPG} />
        </Wrapper>
      </>
    )
  })
  .add("With default image", () => {
    return (
      <>
        <Wrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Small</Text>
          <br />
          <Avatar size={AvatarSize.Small} />
        </Wrapper>
        <Wrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>
            Medium (default)
          </Text>
          <br />
          <Avatar />
        </Wrapper>
        <Wrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Big</Text>
          <br />
          <Avatar size={AvatarSize.Big} />
        </Wrapper>
      </>
    )
  })
