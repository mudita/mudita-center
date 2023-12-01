/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// export const generateOverviewLayout: ViewGenerator<OverviewConfig> = (
//   config
// ) => {
//   return {
//     main: {
//       component: "block-vanilla",
//       parameters: {
//         layout: {
//           gridLayout: {
//             rows: [1, 1, 1],
//             columns: [1, 2],
//           },
//         },
//       },
//       childrenKeys: ["summary", "status"],
//     },
//     summary: {
//       component: "device-about-button",
//       parameters: {
//         layout: {
//           gridPlacement: {
//             row: 1,
//             column: 1,
//             width: 1,
//             height: 3,
//           },
//         },
//         buttonLabel: "asdf",
//         modalContent: "2134234",
//       },
//     },
//     status: {
//       component: "block-box",
//       parameters: {
//         layout: {
//           gridPlacement: {
//             row: 1,
//             column: 1,
//             width: 1,
//             height: 3,
//           },
//         },
//       },
//       childrenKeys: ["battery-status", "imei1", "imei2"],
//     },
//     "battery-status": {
//       component: "icon-text-row",
//       parameters: {
//         icon: "asd",
//         text: "text - asads",
//       },
//     },
//     imei1: {
//       component: "icon-text-row",
//       parameters: {
//         icon: "asd",
//         text: "text - asads",
//       },
//     },
//     imei2: {
//       component: "icon-text-row",
//       parameters: {
//         icon: "asd",
//         text: "text - asads",
//       },
//     },
//   }
// }
