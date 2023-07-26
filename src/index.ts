import axios from "axios";
import { getAxiosClient } from "./axiosClient";

const instance = getAxiosClient('https://92bab8eb-08fa-4817-bd24-56727e0c0778.mock.pstmn.io');

export const handler = async (event: any) => {
  try {
    const response = await instance.post(`/post/${event?.status}`,
      {
        resourceType: 'CommunicationRequest',
        identifier: [
          {
            system: 'https://fhir.nhs.uk/NHSApp/request-id',
            value: 'requestReference',
          },
          {
            system: 'https://fhir.nhs.uk/NHSApp/campaign-id',
            value: 'campaignId',
          },
        ],
        status: 'active',
        payload: [
          {
            contentString: 'messageText',
          },
        ],
        requester: {
          type: 'Organization',
          identifier: {
            system: 'https://fhir.nhs.uk/Id/ods-organization-code',
            value: 'routingPlan.senderOdsCode',
          },
        },
        recipient: [
          {
            type: 'Patient',
            identifier: {
              system: 'https://fhir.nhs.uk/Id/nhs-number',
              value: 'routingPlan.recipientContactValue',
            },
          },
        ],
      },
      {
        headers: {
          requestReference: 'requestReference',
        },
      });
    console.log(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
};