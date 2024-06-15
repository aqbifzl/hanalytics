import { Card, CardContent, Typography } from "@mui/material"
import { type ReactNode } from "react"
import { DataItem } from "~/styled/DataPresentation"

interface Props{
  title: string
  children: ReactNode
}

export const DataPresentationItem = ({title, children}: Props) => {
  return(
    <DataItem>
       <Card>
        <CardContent>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <div className="text-xl">{children}</div>
        </CardContent>
      </Card>
    </DataItem>
  )
}
