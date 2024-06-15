import { List, ListItem, ListItemText, Typography } from "@mui/material"
import { DataPresentationItem } from "./DataPresentationItem"
import { type kv } from "~/types/generic"

interface Props{
  title: string
  data: kv[] | string
}

export const DataList = ({title, data}: Props) =>
  <DataPresentationItem title={title}>
    {data.length > 0 ? 
     <List>
        {typeof data == "string" ? data : data.map((kv, i) => {
          return (
            <ListItem
              key={i}
              secondaryAction={
                <Typography>{kv.v}</Typography>
              }
              disablePadding
            >
              <ListItemText primary={<Typography>{kv.k}</Typography>} />
            </ListItem>
          );
        })}
      </List>
      : "No data"
    }
  </DataPresentationItem>
