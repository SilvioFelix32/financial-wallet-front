
export const environment = {
  aws: {
    cognitoRegion: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
    userPoolsId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
    userPoolsWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
    identityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
  },
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  },
  cron: {
    secret: process.env.CRON_SECRET,
  },
};
