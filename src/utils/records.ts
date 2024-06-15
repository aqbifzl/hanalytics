import { type SingleParsedRecord } from "~/types/records";
import { type PostAllGet } from "~/types/summary";
import { ipBufferToString } from "./ip";
import geoip from "geoip-lite"
import { type getAll, updateIpCountry, updateUserAgentProperties } from "~/db/data";
import { UAParser } from "ua-parser-js";
import { isbot } from "isbot";

export const getParsedRecords = async (data: Awaited<ReturnType<typeof getAll>>) => await Promise.all(data.map((elem) => parseRecords(elem)))

export const parseRecords = async (data: Awaited<PostAllGet>[0]): Promise<SingleParsedRecord> => {
  const ip = ipBufferToString(data.ip_info.name) 

  let country: string | null = data.ip_info.country
  if(!country && !data.ip_info.checked){
    country = geoip.lookup(ip)?.country ?? null
    if(country){
      await updateIpCountry(data.ip_info.name, country);
    }
  }

  let {operating_system, operating_system_version, browser, browser_version, browser_engine, is_bot} = data.user_agent;
  
  const hasUndefined = [
    operating_system,
    operating_system_version,
    browser,
    browser_version,
    browser_engine,
    is_bot
  ].some(elem => elem === null)

  if(hasUndefined && !data.user_agent.checked){
    const uaParser = new UAParser(data.user_agent.name)
    const osInfo = uaParser.getOS()
    const browserInfo = uaParser.getBrowser()

    operating_system = osInfo.name ?? null
    operating_system_version = osInfo.version ?? null

    browser = browserInfo.name ?? null
    browser_version = browserInfo.version ?? null
    browser_engine = uaParser.getEngine().name ?? null

    is_bot = isbot(data.user_agent.name)

    await updateUserAgentProperties(
      data.user_agent.name,
      operating_system,
      operating_system_version,
      browser,
      browser_version,
      browser_engine,
      is_bot
    )
  }

  return {
    ip,
    isBot: is_bot,
    screenWidth: data.screen_width,
    screenHeight: data.screen_height,
    country: country,
    operatingSystem: operating_system,
    operatingSystemVersion: operating_system_version,
    browser: browser,
    browserVersion: browser_version,
    browserEngine: browser_engine,
    referrer: data.referrer?.name
  }
}
