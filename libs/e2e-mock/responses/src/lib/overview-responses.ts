/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const overviewDataWithoutBadge = {
  summary: {
    about: {
      serialNumber: { text: "0123456789ABCDEF" },
      imei1: { text: "864055030138811" },
      imei2: { text: "864055030138829" },
      sar: {
        text: "### SAR\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed aliquet ligula, viverra feugiat massa. In hac habitasse platea dictumst.\n\n1. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n2. Suspendisse consectetur, nibh non consequat hendrerit, nibh felis commodo lacus, id auctor ante purus vitae justo.\n3. Cras purus neque, pharetra vitae nulla ac, mollis facilisis felis. Sed sit amet ex diam.\n\n> Sed accumsan sem nec iaculis euismod.",
      },
    },
  },
  sections: {
    battery: { icon: "battery-charging-5", text: "100%", subText: "" },
    update: { text: "ANDROID 12", version: "0.3.0" },
    "airplane-mode": { icon: "airplane-mode", text: "Airplane mode" },
  },
}

export const overviewDataWithOneSimCard = {
  summary: {
    about: {
      serialNumber: { text: "0123456789ABCDEF" },
      imei1: { text: "864055030138811" },
      imei2: { text: "864055030138829" },
      sar: {
        text: "### SAR\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed aliquet ligula, viverra feugiat massa. In hac habitasse platea dictumst.\n\n1. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n2. Suspendisse consectetur, nibh non consequat hendrerit, nibh felis commodo lacus, id auctor ante purus vitae justo.\n3. Cras purus neque, pharetra vitae nulla ac, mollis facilisis felis. Sed sit amet ex diam.\n\n> Sed accumsan sem nec iaculis euismod.",
      },
    },
  },
  sections: {
    battery: { icon: "battery-charging-5", text: "100%", subText: "SIM 1" },
    update: { text: "ANDROID 12", version: "0.3.0" },
    "airplane-mode": { icon: "network-signal-2", text: "T-Mobile" },
  },
}

export const overviewDataWithOneSimCard2nd = {
  summary: {
    about: {
      serialNumber: { text: "1123456789ABCDEF" },
      imei1: { text: "064055030138811" },
      imei2: { text: "064055030138829" },
      sar: {
        text: "### SAR\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed aliquet ligula, viverra feugiat massa. In hac habitasse platea dictumst.\n\n1. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n2. Suspendisse consectetur, nibh non consequat hendrerit, nibh felis commodo lacus, id auctor ante purus vitae justo.\n3. Cras purus neque, pharetra vitae nulla ac, mollis facilisis felis. Sed sit amet ex diam.\n\n> Sed accumsan sem nec iaculis euismod.",
      },
    },
  },
  sections: {
    battery: {
      icon: "battery-charging-2",
      text: "40%",
      subText: "SIM 1",
    },
    update: { text: "ANDROID 13", version: "0.3.1" },
    "airplane-mode": { icon: "network-signal-4", text: "Play" },
  },
}
