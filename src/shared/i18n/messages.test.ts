import { expect, test } from 'vite-plus/test';

import { mergeMessages } from './messages';

test('falls back to English for blank and missing translations without dropping nested keys', () => {
   const base = { title: 'Title', actions: { save: 'Save', cancel: 'Cancel' } };
   const override = { title: '  ', actions: { save: 'Speichern' }, extra: 'Extra' };

   expect(mergeMessages(base, override)).toEqual({ title: 'Title', actions: { save: 'Speichern', cancel: 'Cancel' } });
   expect(base.actions.save).toBe('Save');
});

test('ignores translations whose leaf and group shapes differ from English', () => {
   expect(mergeMessages({ title: 'Title', actions: { save: 'Save' } }, { title: { nested: 'Wrong' }, actions: 'Wrong' })).toEqual({
      title: 'Title',
      actions: { save: 'Save' }
   });
});

test('merges message groups without an Object prototype', () => {
   const actions = { save: 'Speichern' };
   Object.setPrototypeOf(actions, null);

   expect(mergeMessages({ actions: { save: 'Save', cancel: 'Cancel' } }, { actions })).toEqual({
      actions: { save: 'Speichern', cancel: 'Cancel' }
   });
});
