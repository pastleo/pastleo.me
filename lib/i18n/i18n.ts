type DefaultLocale = 'zh';
type Locale = DefaultLocale | 'en';

export const defaultLocale: DefaultLocale = 'zh';
export const locales: { localeName: Locale, displayName: string }[] = [
  { localeName: defaultLocale, displayName: '中' },
  { localeName: 'en', displayName: 'EN' },
];

type TranslationRecord = Record<string, any>;
type TranslationRecords = TranslationRecord[];
type TranslationValue = string | boolean | string[] | TranslationRecords;

type TranslationDataPartial<T = TranslationValue> = Partial<Record<Exclude<Locale, DefaultLocale>, T>>;
type TranslationData = Record<DefaultLocale, TranslationValue> & TranslationDataPartial;
type TranslationDatas = Record<string, TranslationData>;

type TranslationCollection<T extends TranslationDatas> = {
  [Name in keyof T]: T[Name] extends Record<DefaultLocale, infer R> & TranslationDataPartial ? (
    T[Name] extends Record<DefaultLocale, R> & TranslationDataPartial<R> ? (
      Record<Locale, R>
    ) : never
  ) : never;
};

const otherLocales = locales.filter(l => l.localeName !== defaultLocale).map(l => l.localeName);

export function createI18n<T extends TranslationDatas>(translationsDatas: TranslationDatasNoExtraLocale<T>): TranslationCollection<T> {
  return Object.fromEntries(
    Object.entries(translationsDatas).map(([key, { [defaultLocale]: defaultTranslation, ...otherTranslations }]) => ([
      key,
      {
        [defaultLocale]: defaultTranslation,
        ...Object.fromEntries(
          otherLocales.map(l => ([l, otherTranslations[l] || defaultTranslation])),
        ),
      },
    ])),
  ) as TranslationCollection<T>;
}

type Impossible<K extends keyof any> = { [P in K]: never; };
type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;
type TranslationDatasNoExtraLocale<T, U extends T = T> = {
  [Name in keyof T]: NoExtraProperties<T[Name], U[Name]>;
}

export type Line = string | { line: string; href?: string; bold?: boolean; };
