import {
  OtherLocale,
  createI18n, defaultLocale, otherLocales,
} from '../../../lib/i18n/i18n';

describe('createI18n', () => {
  it('fill out non-default locale translations', () => {
    expect(
      createI18n({
        name: {
          [defaultLocale]: 'PastLeo | 西瓜',
          ...makeOtherTranslations('PastLeo / Leo'),
        },
        back: {
          [defaultLocale]: '回首頁',
        },
      }),
    ).toEqual({
      name: {
        [defaultLocale]: 'PastLeo | 西瓜',
        ...makeOtherTranslations('PastLeo / Leo'),
      },
      back: {
        [defaultLocale]: '回首頁',
        ...makeOtherTranslations('回首頁'),
      },
    });
  });
});

function makeOtherTranslations(translation: string) {
  return Object.fromEntries(otherLocales.map(l => [
    l, translation,
  ])) as Record<OtherLocale, string>;
}
