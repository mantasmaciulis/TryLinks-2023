export const environment = {
  production: false,
  serviceUrl: 'https://trylinks.net',
  auth: {
    domain: '${AUTH_DOMAIN}',
    clientId: '${AUTH_CLIENT_ID}',
    redirectUri: '${AUTH_REDIRECT_URI}',
    jwt_check_audiance: '${JWT_CHECK_AUDIENCE}'
  },
  envName: ""
};