import { Summary } from "./Content/Summary"
import { Ranking } from "./Content/Ranking"
import { AllRecords } from "./Content/AllRecords"

export enum Content{
  SUMMARY,
  RANKING,
  ALL_RECORDS
}

interface Props{
  content: Content
}

export const ContentManager = ({content}: Props) => {
  return(
    <div className="max-w-full w-full ">
      {content == Content.SUMMARY && <Summary/>}
      {content == Content.RANKING && <Ranking/>}
      {content == Content.ALL_RECORDS && <AllRecords/>}
    </div>
  )
}
