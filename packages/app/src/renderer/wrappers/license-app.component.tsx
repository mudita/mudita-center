/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { History } from "history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { URL_MAIN } from "Renderer/constants/urls"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import licenseEn from "../../../resources/license_En.js"
import styled from "styled-components"

const LicenseContainer = styled.div`
  margin: 4.2rem 21rem 3.4rem;
  min-width: 5.9rem;
`
const LicenseHeader = styled(Text)`
  font-weight: normal;
  margin-bottom: 4rem;
`
const LicenseTitle = styled(Text)`
  margin: 1.8rem 0 1.6rem;
`

const LightText = styled(Text)`
  font-weight: 300;
  line-height: 1.57;
  margin-bottom: 1.6rem;
`

const LightTextNested = styled(Text)`
  font-weight: 300;
  line-height: 1.57;
  margin-bottom: 1.6rem;
  margin-left: 3rem;
`

interface Props {
  history: History
}

const LicenseApp: FunctionComponent<Props> = ({ history }) => {
  const licenseArray = licenseEn.split(/\n/).filter(item => item !== "")
  return (<Router history={history}>
    <Route path={URL_MAIN.license}>
      <LicenseContainer>
        <LicenseHeader displayStyle={TextDisplayStyle.SecondaryHeading}>
          {licenseArray[0]}
        </LicenseHeader>
        <LightText displayStyle={TextDisplayStyle.MediumFadedTextUppercased}>
          {licenseArray[1]}
        </LightText>
        <LicenseTitle displayStyle={TextDisplayStyle.MediumText}>
          {licenseArray[2]}
        </LicenseTitle>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[3]}
        </LightText>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[4]}
        </LightText>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[5]}
        </LightText>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[6]}
        </LightText>
        <LicenseTitle displayStyle={TextDisplayStyle.MediumText}>
          {licenseArray[7]}
        </LicenseTitle>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[8]}
        </LightText>
        <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[9]}
        </LightTextNested>
        <LightTextNested displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[10]}
        </LightTextNested>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[11]}
        </LightText>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[12]}
        </LightText>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[13]}
        </LightText>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[14]}
        </LightText>
        <LicenseTitle displayStyle={TextDisplayStyle.MediumText}>
          {licenseArray[15]}
        </LicenseTitle>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[16]}
        </LightText>
        <LicenseTitle displayStyle={TextDisplayStyle.MediumText}>
          {licenseArray[17]}
        </LicenseTitle>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[18]}
        </LightText>
        <LicenseTitle displayStyle={TextDisplayStyle.MediumText}>
          {licenseArray[19]}
        </LicenseTitle>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[20]}
        </LightText>
        <LicenseTitle displayStyle={TextDisplayStyle.MediumText}>
          {licenseArray[21]}
        </LicenseTitle>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[22]}
        </LightText>
        <LicenseTitle displayStyle={TextDisplayStyle.MediumText}>
          {licenseArray[23]}
        </LicenseTitle>
        <LightText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {licenseArray[24]}
        </LightText>
      </LicenseContainer>
    </Route>
  </Router>
)}

export default LicenseApp
