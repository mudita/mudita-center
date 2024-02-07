/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { MenuGroupTestIds } from "Core/__deprecated__/renderer/components/rest/menu/menu-group-test-ids.enum"
import Loader from "Core/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "Core/__deprecated__/renderer/components/core/loader/loader.interface"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import styled from "styled-components"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import { useSelector, useDispatch } from "react-redux"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { useHistory } from "react-router-dom"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { getDeviceInitializationStatus } from "Core/device-initialization/selectors/get-device-initialization-status.selector"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { setSelectDeviceDrawerOpen } from "Core/device-select/actions/set-select-device-drawer-open.action"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
import { useCustomerSupportIsSending } from "Core/__deprecated__/renderer/components/rest/menu/hooks/use-customer-support-is-sending"

const SyncProgressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3.2rem;
  margin-top: 0.8rem;
`
const LoaderWrapper = styled.div`
  margin: 0 1.6rem;
`

const DeviceButton = styled(ButtonComponent)`
  width: auto;
`

const DeviceButtonWrapper = styled.div`
  ${DeviceButton} {
    margin-left: 0;
    justify-content: flex-start;
    margin-bottom: 3.2rem;
    padding: 0.4rem;
  }
`

interface Props {
  dataSyncInProgress?: boolean
}

const MenuBottom: FunctionComponent<Props> = ({ dataSyncInProgress }) => {
  const history = useHistory()
  const devices = useSelector(getDevicesSelector)
  const dispatch = useDispatch<Dispatch>()
  const deviceInitializationStatus = useSelector(getDeviceInitializationStatus)
  const activeDeviceId = useSelector(activeDeviceIdSelector)
  const deviceInitialized =
    deviceInitializationStatus === DeviceInitializationStatus.Initialized
  const isCustomerSupportSending = useCustomerSupportIsSending()

  const handleSelectDeviceClick = () => {
    history.push(URL_DISCOVERY_DEVICE.availableDeviceListModal)
  }

  const isSelectDevice = !deviceInitialized && devices.length > 1

  const SelectDeviceButton = (
    <DeviceButtonWrapper>
      <DeviceButton
        label={intl.formatMessage({
          id: "component.deviceSelection.selectDevice",
        })}
        displayStyle={DisplayStyle.BorderlessButton}
        Icon={IconType.DotsInBox}
        iconBadgeCountIndicator={devices.length}
        onClick={handleSelectDeviceClick}
      />
    </DeviceButtonWrapper>
  )

  const isChangeDevice =
    !dataSyncInProgress && devices.length > 1 && activeDeviceId

  const ChangeDeviceButton = (
    <DeviceButtonWrapper>
      <DeviceButton
        label={intl.formatMessage({
          id: "component.deviceSelection.changeDevice",
        })}
        disabled={isCustomerSupportSending}
        displayStyle={DisplayStyle.BorderlessButton}
        Icon={IconType.DotsInBox}
        iconBadgeCountIndicator={devices.length}
        onClick={() => {
          dispatch(setSelectDeviceDrawerOpen(true))
        }}
      />
    </DeviceButtonWrapper>
  )

  return (
    <>
      {dataSyncInProgress && (
        <SyncProgressWrapper data-testid={MenuGroupTestIds.Sync}>
          <LoaderWrapper>
            <Loader type={LoaderType.Spinner} size={1.5} />
          </LoaderWrapper>
          <Text displayStyle={TextDisplayStyle.Paragraph1}>
            {intl.formatMessage({ id: "component.menuHeaderSync" })}
          </Text>
        </SyncProgressWrapper>
      )}
      {isSelectDevice && SelectDeviceButton}
      {isChangeDevice && ChangeDeviceButton}
    </>
  )
}

export default MenuBottom
