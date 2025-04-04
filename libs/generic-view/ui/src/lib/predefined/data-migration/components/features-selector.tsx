/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useCallback } from "react"
import { Typography } from "../../../typography"
import styled from "styled-components"
import { DataMigrationFeature } from "generic-view/models"
import { Divider } from "../../../helpers/divider"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import Form from "../../../interactive/form/form"
import { useDispatch, useSelector } from "react-redux"
import {
  selectDataMigrationFeatures,
  setDataMigrationFeatures,
} from "generic-view/store"

const messages = defineMessages({
  title: {
    id: "module.genericViews.dataMigration.features.title",
  },
  [DataMigrationFeature.Notes]: {
    id: "module.genericViews.dataMigration.features.notes",
  },
  [DataMigrationFeature.Alarms]: {
    id: "module.genericViews.dataMigration.features.alarms",
  },
  [DataMigrationFeature.CallLog]: {
    id: "module.genericViews.dataMigration.features.callLog",
  },
  [DataMigrationFeature.Contacts]: {
    id: "module.genericViews.dataMigration.features.contacts",
  },
  [DataMigrationFeature.Messages]: {
    id: "module.genericViews.dataMigration.features.messages",
  },
  selectAll: {
    id: "module.genericViews.dataMigration.features.selectAll",
  },
})

const getLabelMessage = (
  feature: DataMigrationFeature,
  featureEnabled: boolean
) => {
  const message = intl.formatMessage(messages[feature])
  return featureEnabled ? message.replace(" (coming soon!)", "") : message
}

interface Props {
  features: DataMigrationFeature[]
}

export const FeaturesSelector: FunctionComponent<Props> = ({ features }) => {
  const dispatch = useDispatch()

  const selectedFeatures = useSelector(selectDataMigrationFeatures)
  const allFeaturesSelected = selectedFeatures.length === features.length

  const toggleAll = useCallback(() => {
    dispatch(setDataMigrationFeatures(allFeaturesSelected ? [] : features))
  }, [allFeaturesSelected, dispatch, features])

  const toggleFeature = useCallback(
    (feature: DataMigrationFeature) => {
      const newSelectedFeatures = selectedFeatures.includes(feature)
        ? selectedFeatures.filter((f) => f !== feature)
        : [...selectedFeatures, feature]
      dispatch(setDataMigrationFeatures(newSelectedFeatures))
    },
    [dispatch, selectedFeatures]
  )

  return (
    <Wrapper>
      <Typography.H4>{intl.formatMessage(messages.title)}</Typography.H4>
      <AllCheckbox
        config={{
          name: "all-features",
          label: intl.formatMessage(messages.selectAll),
          value: "true",
          onToggle: toggleAll,
          checked: allFeaturesSelected,
        }}
      />
      <Divider />
      <List>
        {Object.values(DataMigrationFeature).map((feature, index) => {
          const featureEnabled = features.includes(feature)
          const onToggle = () => toggleFeature(feature)
          return (
            <Form.CheckboxInput
              key={feature}
              config={{
                name: "features",
                value: feature,
                label: getLabelMessage(feature, featureEnabled),
                disabled: !featureEnabled,
                checked: selectedFeatures.includes(feature),
                onToggle,
              }}
            />
          )
        })}
      </List>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 3.2rem 4rem;
  background-color: ${({ theme }) => theme.color.white};
`

const AllCheckbox = styled(Form.CheckboxInput)`
  margin-top: 3.2rem;
  margin-bottom: 1.5rem;
  min-height: 2.2rem;
  max-height: 2.2rem;
`

const List = styled.div`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & > * {
    min-height: 3.2rem;
  }
`
