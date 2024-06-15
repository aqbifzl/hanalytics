import { TRPCReactProvider } from "~/trpc/react"
import "../styles/globals.css"
import { HanalyticsThemeProvider } from "./_components/HanalyticsThemeProvider"

export const metadata = {
  title: "Hanalytics",
  description: "Self hosted replacement for tracking user activity",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <HanalyticsThemeProvider>
            {children}
          </HanalyticsThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
