/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Call, CallStatus } from "App/__deprecated__/renderer/models/calls/calls.interface"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export const todaysCall: Call = {
  id: "05ed5479-1770-44e8-9e7c-09333ddc87195",
  caller: {
    id: "1233213121",
    firstName: "Adam",
    lastName: "Malysz",
    phoneNumber: "+48 733 853 216",
  },
  duration: 164,
  date: new Date(),
  status: CallStatus.Missed,
  timesMissed: 3,
  icon: IconType.MissedCall,
  description: { id: "module.calls.missed" },
}

export const mockData: Call[] = [
  {
    id: "05ed5479-1770-44e8-9e7c-09b2ddc87195",
    caller: {
      id: "12321",
      firstName: "Judge",
      lastName: "Kris",
      phoneNumber: "+48 755 853 216",
    },
    duration: 164,
    date: new Date("2019-07-02T13:24:08.717Z"),
    status: CallStatus.Missed,
    timesMissed: 3,
    icon: IconType.MissedCall,
    description: { id: "module.calls.missed" },
  },
  {
    id: "cee9d540-8e92-4ce0-b322-cc58bc4411dc",
    caller: {
      id: "345345",
      firstName: "Judge",
      lastName: "Weber",
      phoneNumber: "+53 548 728 355",
    },
    duration: 376,
    date: new Date("2019-08-03T15:51:46.722Z"),
    status: CallStatus.Missed,
    timesMissed: 4,
    icon: IconType.MissedCall,
    description: { id: "module.calls.missed" },
  },
  {
    id: "fa2bbc67-50f9-48ea-9bb1-a53ae578ed2b",
    caller: {
      id: "34534569045",
      firstName: "",
      lastName: "",
      phoneNumber: "+87 233 198 378",
    },
    duration: 114,
    date: new Date("2020-04-17T04:17:53.229Z"),
    status: CallStatus.Missed,
    timesMissed: 2,
    icon: IconType.MissedCall,
    description: { id: "module.calls.missed" },
  },
  {
    id: "03dc3086-7610-4de9-8967-f1c25dab674f",
    caller: {
      id: "edfhs0432423",
      firstName: "Lewis",
      lastName: "Sporer",
      phoneNumber: "+61 019 141 174",
    },
    duration: 95,
    date: new Date("2020-03-08T11:23:42.226Z"),
    status: CallStatus.Missed,
    timesMissed: 3,
    icon: IconType.MissedCall,
    description: { id: "module.calls.missed" },
  },
  {
    id: "3a94a064-de00-4d8f-8cf9-56edecee0ce6",
    caller: {
      id: "324934asd",
      firstName: "Shyann",
      lastName: "Feil",
      phoneNumber: "+56 159 553 446",
    },
    duration: 85,
    date: new Date("2020-06-16T20:10:34.812Z"),
    status: CallStatus.Incoming,
    timesMissed: 0,
    icon: IconType.IncomingCall,
    description: { id: "module.calls.incoming" },
  },
  {
    id: "Z3a94a064-de00-4d8f-8cf9-56edecee0ce6",
    caller: {
      id: "Z90b36120-4d6b-4fbb-a7b1-f30398973a37",
      firstName: "Johnny",
      lastName: "Ovarb",
      phoneNumber: "+33 999 999 999",
    },
    duration: 85,
    date: new Date("2020-06-16T20:10:34.812Z"),
    status: CallStatus.Incoming,
    timesMissed: 0,
    icon: IconType.IncomingCall,
    description: { id: "module.calls.incoming" },
  },
  todaysCall,
]
