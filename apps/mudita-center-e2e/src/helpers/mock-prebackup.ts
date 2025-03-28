import { E2EMockClient } from "../../../../libs/e2e-mock/client/src"

// Helper function to mock PRE_BACKUP responses
export function mockPreBackupResponses(path: string) {
  // Mock initial PRE_BACKUP response with status 202 (processing)
  E2EMockClient.mockResponses([
    {
      path,
      body: { backupId: 12345, progress: 0 },
      endpoint: "PRE_BACKUP",
      method: "POST",
      status: 202,
    },
    // {
    //   path,
    //   endpoint: "PRE_BACKUP",
    //   status: 200,
    //   method: "POST",
    //   body: {
    //     backupId: 12345,
    //     features: {
    //       calls: "path/to/backup/calls.json",
    //       call_logs: "path/to/backup/call_logs.json",
    //     },
    //   },
    // },
    // {
    //   path,
    //   body: { backupId: 12345 },
    //   endpoint: "PRE_BACKUP",
    //   method: "GET",
    //   status: 202,
    // },
    {
      path,
      body: {
        backupId: 12345,
        progress: 100,
        features: {
          CONTACTS_V1: "path/to/backup/calls.json",
          CALL_LOGS_V1: "path/to/backup/call_logs.json",
        },
      },
      endpoint: "PRE_BACKUP",
      method: "GET",
      status: 200,
    },
  ])

  // After 10 seconds, update the response to status 200 (completed)
  //   setTimeout(() => {
  //     E2EMockClient.mockResponse({
  //       path,
  //       endpoint: "PRE_BACKUP",
  //       method: "POST",
  //       status: 200,
  //       body: {
  //         backupId,
  //         features: {
  //           CONTACTS_V1: "path/to/backup/calls.json",
  //           CALL_LOGS_V1: "path/to/backup/call_logs.json",
  //         },
  //       },
  //     })
  //   }, 10000)
}
