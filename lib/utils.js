const EXTERNAL_URL_REGEX = new RegExp('^https?://');
export const isExternalUrl = str => str.match(EXTERNAL_URL_REGEX);

