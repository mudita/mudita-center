/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useCallback } from "react"
import { H4 } from "../../../texts/headers"
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
  [DataMigrationFeature.Multimedia]: {
    id: "module.genericViews.dataMigration.features.multimedia",
  },
  selectAll: {
    id: "module.genericViews.dataMigration.features.selectAll",
  },
})

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
      <H4>Select the data you want to transfer</H4>
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
          const onToggle = () => toggleFeature(feature)
          return (
            <Form.CheckboxInput
              key={feature}
              config={{
                name: "features",
                value: feature,
                label: intl.formatMessage(messages[feature]),
                disabled: !features.includes(feature),
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
`
