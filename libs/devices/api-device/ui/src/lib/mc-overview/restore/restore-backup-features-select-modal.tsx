/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect } from "react"
import { BackupSectionConfig } from "devices/api-device/models"
import { Button, Checkbox, Modal, Typography } from "app-theme/ui"
import { ButtonType, IconType } from "app-theme/models"
import { useForm } from "react-hook-form"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.restore.featuresSelectModal.title",
  },
  description: {
    id: "apiDevice.restore.featuresSelectModal.description",
  },
  backButtonLabel: {
    id: "general.app.backButton.text",
  },
  confirmButtonLabel: {
    id: "apiDevice.restore.featuresSelectModal.confirmButton",
  },
})

export type FeatureToSelect = Pick<
  NonNullable<BackupSectionConfig["restoreFeatures"]>[number],
  "label" | "feature"
> & {
  itemsCount: number
  key: string
}

interface Props {
  opened?: boolean
  features: FeatureToSelect[]
  onClose?: VoidFunction
  onBack?: VoidFunction
  onConfirm?: (selectedFeatures: FeatureToSelect["feature"][]) => void
}
export const RestoreBackupFeaturesSelectModal: FunctionComponent<Props> = ({
  opened,
  features,
  onClose,
  onBack,
  onConfirm,
}) => {
  const { register, getValues, reset } = useForm<{ features: string[] }>()

  const handleConfirm = useCallback(() => {
    onConfirm?.(getValues("features"))
  }, [getValues, onConfirm])

  useEffect(() => {
    reset()
  }, [reset, opened])

  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Backup} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
      <Modal.ScrollableContent>
        <Modal.DenseContent>
          {features.map((feature) => {
            return (
              <Checkbox
                key={feature.feature}
                {...register("features")}
                value={feature.feature}
                defaultChecked={false}
              >
                {feature.label}{" "}
                <Typography.P1 color={"grey2"} as={"span"}>
                  ({feature.itemsCount})
                </Typography.P1>
              </Checkbox>
            )
          })}
        </Modal.DenseContent>
      </Modal.ScrollableContent>
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          onClick={onBack}
          message={messages.backButtonLabel.id}
        />
        <Button
          type={ButtonType.Primary}
          onClick={handleConfirm}
          message={messages.confirmButtonLabel.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
