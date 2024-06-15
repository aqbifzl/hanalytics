import { type z } from "zod";
import { db } from "~/server/db";
import { type TopDataFunctionCallParams } from "~/types/database";
import { stringToIpBuffer } from "~/utils/ip";
import { type insertInput } from "~/zod/api/insert";

export const getAll = async (application: string) => await db.data.findMany({
  where:{
    application: {
      name: application
    }
  },
  include: {
    user_agent: true,
    referrer: true,
    ip_info: true
  }
})

export const getMostRecentRecords = async (application: string, limit=10) => await db.data.findMany({
  where:{
    application: {
      name: application
    }
  },
  include: {
    user_agent: true,
    referrer: true,
    ip_info: true
  },
  orderBy: [{createdAt: "desc"}],
  take: limit
})

export const getRecordsNumber = async (
  application: string,
  start: Date,
  end: Date,
  excludeBots: boolean,
  startIndex=0,
  limit: number | undefined=undefined
) => await db.data.count({
  where: {
    createdAt: {
      gte: start,
      lte: end 
    },
    user_agent: {
      is_bot: excludeBots ? false : undefined
    },
    application: {
      name: application
    }
  },
  skip: startIndex,
  take: limit,
})

export const getRecords = async (
  application: string,
  start: Date,
  end: Date,
  excludeBots: boolean,
  startIndex=0,
  limit: number | undefined=undefined
) => await db.data.findMany({
  where: {
    createdAt: {
      gte: start,
      lte: end 
    },
    user_agent: {
      is_bot: excludeBots ? false : undefined
    },
    application: {
      name: application
    }
  },
  include: {
    user_agent: true,
    referrer: true,
    ip_info: true
  },
  skip: startIndex,
  take: limit,
})

export const updateIpCountry = async (ip: Buffer, country: string) => await db.ipInfo.update({
  where: {
    name: ip
  },
  data: {
    country,
    checked: true
  },
})

export const updateUserAgentProperties = async (
  name: string, 
  operatingSystem: string | null,
  operatingSystemVersion: string | null,
  browser: string | null,
  browserVersion: string | null,
  browserEngine: string | null,
  isBot: boolean | undefined
) => await db.userAgent.update({
  where:{
    name
  },
  data: {
    operating_system: operatingSystem,
    operating_system_version: operatingSystemVersion,
    browser,
    is_bot: isBot,
    browser_version: browserVersion,
    browser_engine: browserEngine,
    checked: true
  }
})

export const getApplicationsNames = async () => await db.application.findMany({
  select: {
    name: true
  }
})

export const ensuredApplicationId = async (application: string): Promise<string | undefined> => {
  const applicationId = await db.application.findFirst({ // do it for the safety reasons
    where: {
      name: application
    },
    select: {
      name: true
    }
  })

  return applicationId?.name
}

export const groupByProperty = async ({property, application, limit=null}: TopDataFunctionCallParams) => {
  let name = `t.${property.targetProperty}`
  const limitString: string = limit != null ? `LIMIT ${limit.toString()}` : ''

  const applicationId = await ensuredApplicationId(application)

  if(!applicationId)
    throw new Error("Invalid applicationId")

  if(property.concatRule)
    name = property.concatRule(name)

  const query = 
    `SELECT COUNT(d.${property.dataProperty}) as count, ${name} as data_res from Data d join ${property.targetDB} t on d.${property.dataProperty} = t.name join Application a on a.name = d.application_name where a.name = "${applicationId}" and data_res is not null group by data_res order by count desc ${limitString};`
  return await db.$queryRawUnsafe<Array<{count: number, data_res: string}>>(query)
}

export const createReferrerIfNotExist = async (name: string) => await db.referrer.upsert({
    where: {name},
    update: {name},
    create: {name},
})

export const createUserAgentIfNotExist = async (name: string) => await db.userAgent.upsert({
    where: {name},
    update: {name},
    create: {name},
})

export const createIpIfNotExist = async (name: Buffer) => await db.ipInfo.upsert({
    where: {name},
    update: {name},
    create: {name},
})

export const insertData = async (data: z.infer<typeof insertInput>) => {
  const applicationId = await ensuredApplicationId(data.application)
  if(!applicationId)
    throw new Error("Invalid application id")

  const ipBuffer = stringToIpBuffer(data.ip)
  await createReferrerIfNotExist(data.referrer)
  await createUserAgentIfNotExist(data.userAgent)
  await createIpIfNotExist(stringToIpBuffer(data.ip))

  await db.data.create({
    data: {
      ip: ipBuffer,
      referrer_name: data.referrer,
      application_name: applicationId,
      user_agent_name: data.userAgent,
      screen_height: data.screenHeight,
      screen_width: data.screenWidth
    }
  })
}
