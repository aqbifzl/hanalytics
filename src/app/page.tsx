"use client"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { LoginGuard } from "./_components/LoginGuard";

export default async function Home() {
  return(
    <SessionProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <LoginGuard/>
      </LocalizationProvider>
    </SessionProvider>
  )
}
