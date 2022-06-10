/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosResponse } from "axios"
import { FreshdeskTicketData } from "Renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"

const response: AxiosResponse<unknown> = {
  config: {},
  headers: {},
  statusText: "",
  data: {
    cc_emails: [],
    fwd_emails: [],
    reply_cc_emails: [],
    ticket_cc_emails: [],
    fr_escalated: false,
    spam: false,
    email_config_id: null,
    group_id: null,
    priority: 1,
    requester_id: 77051331414,
    responder_id: null,
    source: 100,
    company_id: null,
    status: 2,
    subject: "Error - UpdateOS_1000",
    support_email: null,
    to_emails: null,
    product_id: null,
    id: 2858,
    type: "Problem",
    due_by: "2021-06-23T07:38:08Z",
    fr_due_by: "2021-06-21T07:38:08Z",
    is_escalated: false,
    description: "<div>Test description</div>",
    description_text: "Test description",
    custom_fields: {
      cf_serial_number_imei: null,
      cf_product: "Mudita Pure",
      cf_fsm_contact_name: null,
      cf_fsm_phone_number: null,
      cf_fsm_service_location: null,
      cf_fsm_appointment_start_time: null,
      cf_fsm_appointment_end_time: null,
    },
    created_at: "2021-06-18T07:38:08Z",
    updated_at: "2021-06-18T07:38:08Z",
    tags: [],
    attachments: [
      {
        id: 77037935575,
        content_type: "application/octet-stream",
        size: 1152,
        name: "tmp-2021-06-18.zip",
        attachment_url:
          "https://s3.eu-central-1.amazonaws.com/euc-cdn.freshdesk.com/data/helpdesk/attachments/production/67037935575/original/tmp-2021-06-18.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2RG7BSUFP%2F20210618%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210618T073808Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=c65781ac1a95607b228adf092f535ebde44f29a96f6837364b1d42fd1526b56a",
        created_at: "2021-06-18T07:38:08Z",
        updated_at: "2021-06-18T07:38:08Z",
      },
    ],
    nr_due_by: null,
    nr_escalated: false,
  },
  status: 201,
}

export const errorResponse: AxiosResponse<unknown> = {
  data: {
    description: "Validation failed",
    errors: [
      {
        field: "type",
        message:
          "It should be one of these values: 'Question,Incident,Problem,Feature Request,Refund,Service Task'",
        code: "invalid_value",
      },
    ],
  },
  status: 400,
  statusText: "Bad Request",
  headers: {},
  config: {},
  request: {},
}

const mockCreateFreshdeskTicket = async (
  _data: FreshdeskTicketData
): Promise<AxiosResponse<unknown>> => {
  return Promise.resolve(response)
}

export default mockCreateFreshdeskTicket
