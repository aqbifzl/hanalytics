import { ListItemButton, ListItemIcon, ListItemText, ListItem } from "@mui/material"
import { type ReactNode } from "react"

interface Props{
  text: string
  open: boolean
  icon: ReactNode
  clickCallback: () => void
}

export const MenuEntry = ({text, open, icon, clickCallback}: Props) => 
  <ListItem key={text} disablePadding sx={{ display: "block" }}>
    <ListItemButton
      onClick={clickCallback}
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>
