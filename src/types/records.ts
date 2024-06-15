export interface SingleParsedRecord {
  ip: string,
  isBot: boolean | null
  screenWidth: number,
  screenHeight: number,
  country: string | null,
  operatingSystem: string | null,
  operatingSystemVersion: string | null,
  browser: string | null,
  browserVersion: string | null,
  browserEngine: string | null,
  referrer: string | undefined,
};
