import { type getParsedRecords } from "./records";

export const parsedRecordsToTable = (records: Awaited<ReturnType<typeof getParsedRecords>>): 
  {
    headers: string[],
    rows: Record<string, string>[]
  } => 
  {
  return {
    headers: ["IP", "Screen", "Country", "OS", "Browser", "Engine", "Referrer", "Bot"],
    rows: records.map(r => (
      {
        IP: r.ip,
        Screen: `${r.screenWidth}x${r.screenHeight}`,
        Country: r.country ?? "unknown",
        OS: r.operatingSystem && r.operatingSystemVersion ? `${r.operatingSystem} ${r.operatingSystemVersion}`.trim() : "unknown",
        Browser: r.browser && r.browserVersion ? `${r.browser} ${r.browserVersion}`.trim() : "unknown",
        Engine: r.browserEngine ?? "unknown",
        Referrer: r.referrer ?? "unknown",
        Bot: r.isBot ? 'Y' : 'N'
      }
    ))
  }
}
