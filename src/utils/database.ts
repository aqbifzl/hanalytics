export const operatingSystemConcat = (nameProp: string) => `TRIM(${nameProp} || " " || COALESCE(t.operating_system_version, ''))`
export const browserConcat = (nameProp: string) => `TRIM(${nameProp} || " " || COALESCE(t.browser_version, ''))`
