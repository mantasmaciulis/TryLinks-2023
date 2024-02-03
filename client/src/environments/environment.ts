// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serviceUrl: 'https://dev.trylinks.net',
  envName: "Dev",
  auth: {
    domain: '${AUTH_DOMAIN}',
    clientId: '${AUTH_CLIENT_ID}',
    redirectUri: '${AUTH_REDIRECT_URI}',
    jwt_check_audiance: '${JWT_CHECK_AUDIENCE}'
  },
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
