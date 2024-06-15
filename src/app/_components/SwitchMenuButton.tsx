import { type Dispatch, type SetStateAction } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import MenuIcon from "@mui/icons-material/Menu";
import { MenuEntry } from "./MenuEntry";

interface Props{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const SwitchMenuButton = ({open, setOpen}: Props) => 
  <MenuEntry 
    text={open ? "Close" : "Open" }
    open={open}
    icon={open ? <ChevronLeftIcon /> : <MenuIcon />}
    clickCallback={() => {open ? setOpen(false) : setOpen(true)}}
  />
