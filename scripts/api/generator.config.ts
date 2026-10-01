import type { GenerateApiConfiguration } from 'swagger-typescript-api';

const config: Partial<GenerateApiConfiguration['config']> = {
   primitiveTypeConstructs: (constructs) => ({
      ...constructs,
      string: {
         'date-time': 'Date'
      }
   }),
   moduleNameFirstTag: true,
   extractRequestParams: true,
   extractRequestBody: true,
   httpClientType: 'fetch',
   disableThrowOnError: false,
   hooks: {
      onCreateRouteName: (routeNameInfo) => ({
         ...routeNameInfo,
         original: routeNameInfo.original.replaceAll('P' + 'p', 'PP'),
         usage: routeNameInfo.usage.replaceAll('P' + 'p', 'PP')
      }),
      onFormatTypeName: (typeName) => typeName.replaceAll('P' + 'p', 'PP')
   }
};

export default config;
