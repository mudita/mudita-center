/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const mockResponseTomasz = {
  summary: {
    showImg: false,
    imgVariant: "white",
    showSerialNumber: false,
    serialNumberLabel: "Serial Number Label",
    about: {
      serialNumber: { text: "01234sss56789ABCDEF" },
      imei1: { text: "8640550301sss38811" },
      imei2: { text: "8640550301sss38829" },
      sar: {
        text: "### SAR\n\nLorem ipsssssum dolor sit amet, consectetur adipiscing elit. Donec sed aliquet ligula, viverra feugiat massa. In hac habitasse platea dictumst.\n\n1. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n2. Suspendisse consectetur, nibh non consequat hendrerit, nibh felis commodo lacus, id auctor ante purus vitae justo.\n3. Cras purus neque, pharetra vitae nulla ac, mollis facilisis felis. Sed sit amet ex diam.\n\n> Sed accumsan sem nec iaculis euismod.",
      },
    },
  },
  sections: {
    battery: { icon: "battery-charging-5", text: "30%", subText: "" },
    update: { text: "ANDROID 11", version: "0.2.0" },
    "airplane-mode": { icon: "airplane-mode", text: "Airplane mode TOMASZ" },
  },
}
