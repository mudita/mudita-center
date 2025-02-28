/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export function getEmptyTransferData(): { [key: string]: string } {
    return {
        CONTACTS_LIST: "eyJkYXRhIjpbXX0",
        CALL_LOG: "eyJkYXRhIjpbXX0",
        MESSAGES: "eyJkYXRhIjpbXX0",
        ALARMS: "eyJkYXRhIjpbXX0",
        NOTES: "eyJkYXRhIjpbXX0",
    }
}

export function getInvalidTransferData(): { [key: string]: string } {
    return {
        CONTACTS_LIST: "TG9yZW0gaXBzdW0=",
        CALL_LOG: "TG9yZW0gaXBzdW0=",
        MESSAGES: "TG9yZW0gaXBzdW0=",
        ALARMS: "TG9yZW0gaXBzdW0=",
        NOTES: "TG9yZW0gaXBzdW0=",
    }
}

export function getFullTransferData(): { [key: string]: string } {
    return {
        CONTACTS_LIST: "eyJkYXRhIjpbeyJpZCI6IjIzIiwiZmlyc3ROYW1lIjoiUmlsZXkiLCJsYXN0TmFtZSI6IkFndWlycmUiLCJwaG9uZU51bWJlcnMiOlt7ImlkIjoxNzcsInR5cGUiOiJob21lIiwidmFsdWUiOiI5NjY1NDUwNTk3IiwicHJlZmVyZW5jZSI6MH1dLCJlbWFpbEFkZHJlc3NlcyI6W3siaWQiOjE3OCwidHlwZSI6Im90aGVyIiwidmFsdWUiOiJwYXR0b25zeWRuZXlAZ3JhaGFtLmNvbSIsInByZWZlcmVuY2UiOjF9XSwiYWRkcmVzc2VzIjpbeyJ0eXBlIjoiaG9tZSIsImNpdHkiOiJFYXN0IFNhbGx5IiwiY291bnRyeSI6IlNlbmVnYWwifV0sIm9yZ2FuaXphdGlvbnMiOlt7Im5hbWUiOiJIaWNrcyBQTEMifV0sIm5vdGUiOiJJbmRleDogNDAwXG5DdXN0b21lciBJZDogYzg2ZUJjQzVDRTIzZjFFXG5QaG9uZSAxOiAwMDEtNTAwLTA1Ny01MDQxeDQ2ODgxXG5TdWJzY3JpcHRpb24gRGF0ZTogMjAyMi0wNS0wN1xuIiwidXJscyI6W3sidmFsdWUiOiJodHRwczovL3RhcGlhLWVyaWNrc29uLmNvbS8iLCJwcmVmZXJlbmNlIjoxfV0sInZlcnNpb24iOjAsInN0YXJyZWQiOmZhbHNlfV19",
        CALL_LOG: "eyJkYXRhIjpbeyJwaG9uZSI6IjUxMjM3MDAxNCIsImNhbGxEYXRlIjoxNzM2OTQ0OTc4MzQ3LCJjYWxsRHVyYXRpb24iOjAsImNhbGxUeXBlIjoiVFlQRV9PVVRHT0lORyIsImlzUmVhZCI6ZmFsc2UsInByZXNlbnRhdGlvbiI6IlBSRVNFTlRBVElPTl9BTExPV0VEIn0seyJwaG9uZSI6IjYwMDYwMTAwMDkiLCJjYWxsRGF0ZSI6MTMxMDM0MjQwMDAwMCwiY2FsbER1cmF0aW9uIjozMCwiY2FsbFR5cGUiOiJUWVBFX1ZPSUNFTUFJTCIsImlzUmVhZCI6dHJ1ZSwicHJlc2VudGF0aW9uIjoiUFJFU0VOVEFUSU9OX0FMTE9XRUQifV19",
        MESSAGES: "eyJkYXRhIjpbeyJpZCI6IjEiLCJ0aHJlYWRJZCI6IjUiLCJhZGRyZXNzIjpbeyJhZGRyZXNzIjoiNjAwNjAwOTg3In1dLCJib2R5IjoiQ3p5IHNtcyBkb3Rhcmw/IiwiZGF0ZSI6MTczMDExNjQyMTAwMCwidHlwZSI6IlNNUyIsInN0YXR1cyI6IlNFTlQiLCJyZWFkIjp0cnVlLCJzZWVuIjp0cnVlLCJkZWxpdmVyeVN0YXR1cyI6IkRFTElWRVJFRCJ9XX0",
        ALARMS: "eyJkYXRhIjpbeyJpZCI6MywibmFtZSI6IkFsYXJtIiwiem9uZUlkIjoiRXVyb3BlL1dhcnNhdyIsInJlcGVhdERheXMiOltdLCJzb3VuZE5hbWUiOiJTdW5yaXNlIEd1aXRhciIsImlzRW5hYmxlZCI6dHJ1ZSwiaG91ciI6OCwibWludXRlIjowfV19",
        NOTES: "eyJkYXRhIjpbeyJpZCI6MywidGl0bGUiOiJUZXN0IiwiY29udGVudCI6IiIsImlzUGlubmVkIjpmYWxzZSwiY3JlYXRlRGF0ZSI6MTczNzAwOTI3MDY2OCwidXBkYXRlRGF0ZSI6MTczODE1Njc0MDUyOH1dfQ"
    }
}