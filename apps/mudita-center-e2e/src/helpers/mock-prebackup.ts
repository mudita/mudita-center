import { E2EMockClient } from "../../../../libs/e2e-mock/client/src"

// Helper function to mock PRE_BACKUP responses
export function mockPreBackupResponses(path: string, backupId: number) {
  // Mock initial PRE_BACKUP response with status 202 (processing)
  E2EMockClient.mockResponse({
    path,
    endpoint: "PRE_BACKUP",
    method: "POST",
    status: 202,
    body: {
      backupId,
    },
  })

  // After 10 seconds, update the response to status 200 (completed)
  setTimeout(() => {
    E2EMockClient.mockResponse({
      path,
      endpoint: "PRE_BACKUP",
      method: "POST",
      status: 200,
      body: {
        backupId,
        features: {
          CONTACTS_V1: "path/to/backup/calls.json",
          CALL_LOGS_V1: "path/to/backup/call_logs.json",
        },
      },
    })
  }, 10000)
}
