import axios from 'axios';

export async function getSalesforceAccessToken() {
  const {
    SALESFORCE_USERNAME,
    SALESFORCE_PASSWORD,
    SALESFORCE_CLIENT_ID,
    SALESFORCE_CLIENT_SECRET,
    SALESFORCE_TOKEN_URL,
  } = process.env;

  const response = await axios.post(SALESFORCE_TOKEN_URL!, new URLSearchParams({
    grant_type: 'password',
    client_id: SALESFORCE_CLIENT_ID!,
    client_secret: SALESFORCE_CLIENT_SECRET!,
    username: SALESFORCE_USERNAME!,
    password: SALESFORCE_PASSWORD!,
  }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return {
    accessToken: response.data.access_token,
    instanceUrl: response.data.instance_url
  };
}
