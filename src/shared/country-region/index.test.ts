import { expect, test } from 'vite-plus/test';

import { parseCountryRegionParam } from './index';

test('normalises country lists while keeping overlapping country and region codes as countries', () => {
   expect(parseCountryRegionParam(' au, invalid, NZ,au ')).toEqual({ kind: 'countries', countries: ['AU', 'NZ'] });
   expect(parseCountryRegionParam('NA')).toEqual({ kind: 'countries', countries: ['NA'] });
   expect(parseCountryRegionParam('AS')).toEqual({ kind: 'countries', countries: ['AS'] });
   expect(parseCountryRegionParam(' eu ')).toEqual({ kind: 'region', region: 'EU' });
});

test('recognises persisted region country lists and validates typed filter inputs', () => {
   expect(parseCountryRegionParam('US,CA,MX,GT,BZ,HN,SV,NI,CR,PA,CU,JM,HT,DO,PR,TT,BS,BB,AG,DM,GD,KN,LC,VC')).toEqual({
      kind: 'region',
      region: 'NA'
   });
   expect(parseCountryRegionParam({ kind: 'countries', countries: ['AU'], ignored: true })).toEqual({ kind: 'countries', countries: ['AU'] });
});

test('treats malformed or empty persisted filters as absent', () => {
   for (const value of [undefined, null, '', ' , ', 123, ['AU'], { kind: 'countries', countries: [] }, { kind: 'region', region: 'invalid' }]) {
      expect(parseCountryRegionParam(value)).toBeUndefined();
   }
});
