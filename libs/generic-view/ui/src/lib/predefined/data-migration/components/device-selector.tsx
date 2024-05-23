/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useRef, useState } from "react"
import { Device, deviceCardStyles, Image, Info, Tag } from "./device-card"
import styled, { css } from "styled-components"
import { H4, H5 } from "../../../texts/headers"
import { P3 } from "../../../texts/paragraphs"
import * as DropdownArrowSvg from "../dropdown.svg"
import * as CheckSvg from "../check.svg"
import useOutsideClick from "Core/__deprecated__/renderer/utils/hooks/useOutsideClick"
import { useDispatch, useSelector } from "react-redux"
import {
  selectDataMigrationSourceDevice,
  selectDataMigrationTargetDevice,
  setSourceDevice,
} from "generic-view/store"
import { DeviceId } from "Core/device/constants/device-id"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  sourceLabel: {
    id: "module.genericViews.dataMigration.transferSetup.deviceSelector.sourceLabel",
  },
  targetLabel: {
    id: "module.genericViews.dataMigration.transferSetup.deviceSelector.targetLabel",
  },
  serialNumber: {
    id: "module.genericViews.dataMigration.targetSelector.deviceCard.serialNumber",
  },
})

type DeviceType = "source" | "target"

interface Props {
  type: DeviceType
  devices: Device[]
}

export const DeviceSelector: FunctionComponent<Props> = ({ type, devices }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false)
  useOutsideClick(ref, () => setOpened(false))

  const sourceDevice = useSelector(selectDataMigrationSourceDevice)
  const targetDevice = useSelector(selectDataMigrationTargetDevice)
  const selectedDevice = type === "source" ? sourceDevice : targetDevice
  const dropdownVisible = devices.length > 1

  const toggleDropdown = () => {
    if (!dropdownVisible) return
    setOpened((prev) => !prev)
  }

  const selectDevice = (serialNumber: DeviceId) => {
    setOpened(false)
    if (type === "source") {
      dispatch(setSourceDevice(serialNumber))
    }
  }

  return (
    <Wrapper ref={ref}>
      <CardWrapper onClick={toggleDropdown} $opened={opened}>
        {type === "source" && (
          <BlueTag>{intl.formatMessage(messages.sourceLabel)}</BlueTag>
        )}
        {type === "target" && (
          <Tag>{intl.formatMessage(messages.targetLabel)}</Tag>
        )}
        <Image>
          <img src={selectedDevice?.image} alt={""} />
        </Image>
        <Info>
          <H4>{selectedDevice?.name}</H4>
          <P3>{intl.formatMessage(messages.serialNumber)}</P3>
          <H5>{selectedDevice?.serialNumber}</H5>
        </Info>
        <Arrow>{dropdownVisible && <DropdownArrowSvg />}</Arrow>
      </CardWrapper>
      {dropdownVisible && (
        <DropdownWrapper $opened={opened}>
          {devices.map((device) => {
            const onSelect = () => selectDevice(device.serialNumber)
            return (
              <ListItem
                key={device.serialNumber}
                image={device.image}
                name={device.name}
                serialNumber={device.serialNumber}
                onSelect={onSelect}
                active={selectedDevice?.serialNumber === device.serialNumber}
              />
            )
          })}
        </DropdownWrapper>
      )}
    </Wrapper>
  )
}

const ListItem: FunctionComponent<
  Device & { active?: boolean; onSelect: VoidFunction }
> = ({ image, name, serialNumber, onSelect, active }) => {
  return (
    <ListItemCard onClick={onSelect}>
      <Image>
        <img src={image} alt={name} />
      </Image>
      <Info>
        <H4>{name}</H4>
        <P3>{intl.formatMessage(messages.serialNumber)}</P3>
        <H5>{serialNumber}</H5>
      </Info>
      <Check>{active && <CheckSvg />}</Check>
    </ListItemCard>
  )
}

const CardWrapper = styled.div<{ $opened?: boolean }>`
  ${deviceCardStyles};
  display: grid;
  grid-template-rows: 2.2rem 9.6rem;
  grid-template-columns: 9.1rem 10.4rem 7.2rem;
  grid-template-areas:
    ". tag tag"
    "image info arrow";
  padding: 0 0 2.2rem 0.8rem;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;

  ${({ $opened }) =>
    $opened &&
    css`
      border-color: ${({ theme }) => theme.color.grey4};
    `}
`

const Wrapper = styled.div`
  position: relative;

  &:hover {
    ${CardWrapper} {
      border-color: ${({ theme }) => theme.color.grey4};
    }
  }
`

const BlueTag = styled(Tag)`
  background-color: ${({ theme }) => theme.color.blue5};
`

const Arrow = styled.div`
  align-self: center;
  grid-area: arrow;
  padding-left: 1.6rem;
`

const DropdownWrapper = styled.div<{ $opened: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  width: 100%;
  position: absolute;
  left: 0;
  top: calc(100% - 1.5rem);

  background: ${({ theme }) => theme.color.white};
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.08);
  border-radius: ${({ theme }) => theme.radius.md};

  opacity: ${({ $opened }) => ($opened ? 1 : 0)};
  visibility: ${({ $opened }) => ($opened ? "visible" : "hidden")};
  transition: all 0.2s ease-in-out;
`

const ListItemCard = styled(CardWrapper)`
  grid-template-areas: "image info check";
  grid-template-rows: 6.9rem;
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;
  border: none;
  border-radius: 0;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.color.grey5};
  }
`

const Check = styled(Arrow)`
  grid-area: check;
`
