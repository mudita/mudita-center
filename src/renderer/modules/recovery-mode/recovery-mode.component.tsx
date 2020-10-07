import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  BoldOptionText,
  OptionBox,
  OptionBoxIcon,
  OptionText,
  TextWrapper,
} from "Renderer/components/rest/recovery-mode/recovery-mode.styled"
import { Link } from "react-router-dom"
import { URL_MAIN } from "Renderer/constants/urls"
import { IconSize } from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"

const RecoveryMode: FunctionComponent<{}> = () => (
  <div>
    <Link to={URL_MAIN.messages}>
      <OptionBox>
        <OptionBoxIcon type={Type.Delete} size={IconSize.Bigger} />
        <TextWrapper>
          <BoldOptionText displayStyle={TextDisplayStyle.TertiaryHeading}>
            Backup
          </BoldOptionText>
          <OptionText displayStyle={TextDisplayStyle.MediumFadedLightText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
            deleniti enim esse fuga ipsum non quae unde ut! Atque dolor ipsum
            laboriosam molestias voluptatem voluptatum.
          </OptionText>
        </TextWrapper>
      </OptionBox>
    </Link>
  </div>
)

export default RecoveryMode
