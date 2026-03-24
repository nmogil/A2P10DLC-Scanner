export const URL_SHORTENER_DOMAINS = new Set([
  'bit.ly',
  'bitly.com',
  'tinyurl.com',
  't.co',
  'goo.gl',
  'ow.ly',
  'is.gd',
  'buff.ly',
  'adf.ly',
  'bit.do',
  'mcaf.ee',
  'su.pr',
  'db.tt',
  'qr.ae',
  'lnkd.in',
  'cur.lv',
  'ity.im',
  'q.gs',
  'po.st',
  'bc.vc',
  'twitthis.com',
  'u.to',
  'j.mp',
  'buzurl.com',
  'cutt.us',
  'u.bb',
  'yourls.org',
  'x.co',
  'prettylinkpro.com',
  'scrnch.me',
  'filourl.com',
  'vzturl.com',
  'qr.net',
  '1url.com',
  'tweez.me',
  'v.gd',
  'tr.im',
  'link.zip.net',
  'tinycc.com',
  'shorturl.at',
  'rb.gy',
  'clck.ru',
  'short.io',
  'tiny.cc',
  'shorturl.me',
  'rebrand.ly',
  'bl.ink',
  'soo.gd',
  's.id',
  'clicky.me',
  'budurl.com',
]);

const SHORTENER_PATTERN = new RegExp(
  `(?:https?://)?(?:www\\.)?(?:${[...URL_SHORTENER_DOMAINS]
    .map((d) => d.replace(/\./g, '\\.'))
    .join('|')})/\\S*`,
  'gi'
);

export function findShortenerUrls(text: string): string[] {
  const matches = text.match(SHORTENER_PATTERN);
  return matches ? [...new Set(matches)] : [];
}

export function containsShortenerUrl(text: string): boolean {
  return SHORTENER_PATTERN.test(text);
}
