export const locales = ['zh', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';
export const localePreferenceKey = 'pastleo.locale';

export const localeInfo = {
  zh: { label: '繁體中文', lang: 'zh-TW', ogLocale: 'zh_TW' },
  en: { label: 'English', lang: 'en-US', ogLocale: 'en_US' },
  ja: { label: '日本語', lang: 'ja-JP', ogLocale: 'ja_JP' },
} satisfies Record<Locale, { label: string; lang: string; ogLocale: string }>;

// Only register translations backed by real static pages. A page may be
// translated into a subset of locales; missing entries are omitted from
// language links and hreflang alternates until implemented.
const translatedPagesData = {
  home: { zh: '/', en: '/en/', ja: '/ja/' },
  resume: { zh: '/resume/', en: '/en/resume/', ja: '/ja/resume/' },
} as const;
export type TranslatedPage = keyof typeof translatedPagesData;
export const translatedPages: Record<
  TranslatedPage,
  Partial<Record<Locale, string>>
> = translatedPagesData;
