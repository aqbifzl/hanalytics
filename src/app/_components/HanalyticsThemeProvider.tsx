"use client"

import { ThemeProvider } from "@emotion/react"
import { type ReactNode } from "react"
import { hanalyticsTheme } from "~/utils/theme"

interface Props{
  children: ReactNode
}

export const HanalyticsThemeProvider = ({children}: Props) => 
  <ThemeProvider theme={hanalyticsTheme}>
    {children}
  </ThemeProvider>
