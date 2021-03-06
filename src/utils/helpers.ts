export const sum = (a: number, b: number): number => a + b;

/**
 * Based on:
 * - https://stackoverflow.com/questions/20856197/remove-non-ascii-character-in-string
 * - https://gist.github.com/alisterlf/3490957
 *
 * TODO: if necessary, use a package that supports arabic, cyrillic, etc ...
 */
export function normalizeString(str: string) {
  const accents =
    "ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ";
  const out =
    "AAAAAAAAaaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIIiiiiiUUUUUuuuuuLLLlllNNNnnnRrSSSsssTtYYyyZZZzzzdGGgg";
  return (str || "")
    .toLowerCase()
    .split("")
    .map(
      (letter: string): string => {
        const index = accents.indexOf(letter);
        return index !== -1 ? out[index] : letter;
      }
    ) // remove accents
    .join("")
    .replace(/[^\x00-\x7F]/g, "") // remove non ascii chars
    .replace(/[^\w\s]/gi, "")
    .replace(/ /g, "-");
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// based on https://github.com/topheman/npm-registry-browser/blob/master/src/utils/helpers.js
export function debounce(func: any, wait: number, immediate?: boolean) {
  let timeout: number | null;
  return function debounced(...args: any[]) {
    // @ts-ignore
    const context = this as any;
    const later = function laterFn() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout as number);
    timeout = setTimeout(later, wait) as any;
    if (callNow) {
      func.apply(context, args);
    }
  };
}

export function filterHtmlProps(props: any) {
  const disallow = [
    "i18n",
    "i18nOptions",
    "defaultNS",
    "reportNS",
    "tReady",
    "innerRef",
    "translationLanguageFullCode",
    "defaultLanguageShortCode",
    "defaultLanguageFullCode",
    "switchDefaultLanguage",
    "switchTranslationLanguage",
    "resetTranslationLanguage"
  ];
  const filteredProps = {};
  Object.entries(props).forEach(([key, value]) => {
    if (!disallow.includes(key)) {
      (filteredProps as any)[key] = value;
    }
  });
  return filteredProps;
}
