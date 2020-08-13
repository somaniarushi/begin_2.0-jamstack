import React from "react"
import { ThemeProvider } from "theme-ui"
import theme from "@rebass/preset"
import MenuSidebar from "../components/MenuSidebar"

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <MenuSidebar />
    </ThemeProvider>
  )
}
