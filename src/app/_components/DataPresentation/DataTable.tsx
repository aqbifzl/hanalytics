import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow } from "@mui/material"
import { DataPresentationItem } from "./DataPresentationItem"

interface Props{
  headers: string[]
  rows: Record<string, string>[]
  title: string
}

export const DataTable = ({title, headers, rows}: Props) => {
  return(
    <DataPresentationItem title={title}>
     <TableContainer>
      {rows.length > 0 ?
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(h => (
                <>
                  <TableCell  align="right">{h}</TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowKey) => (
              <TableRow
                key={rowKey}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {headers.map((header, headerKey) => {
                  return <TableCell key={headerKey} align="right">{row[header]}</TableCell>
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        : "No data"
      }
      </TableContainer>
    </DataPresentationItem>
  )
}
