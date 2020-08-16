/** @jsx jsx */
import { jsx, Container, Flex, Box, Styled, MenuButton, Image } from "theme-ui"
import { Sidenav } from "@theme-ui/sidenav"
import NavLink from "./nav_link"
import { useState, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import _ from "lodash"

import Head from "./head"
import Sidebar from "./sidebar.mdx"

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const nav = useRef(null)

  const logoData = useStaticQuery(graphql`
    query logoQuery {
      allImageSharp {
        nodes {
          fluid {
            originalName
            src
          }
        }
      }
    }
  `)

  const logoGraphic = _.find(
    logoData.allImageSharp.nodes,
    (node) => node.fluid.originalName === "logo_graphic.png"
  ).fluid.src
  const logoText = _.find(
    logoData.allImageSharp.nodes,
    (node) => node.fluid.originalName === "logo_text_horizontal.png"
  ).fluid.src

  return (
    <Styled.root>
      <Head />
      <Flex
        sx={{
          p: [3, 4],
          // height: "64px",
          alignItems: "center",
        }}
        as="header"
      >
        <MenuButton
          sx={{ display: [null, "none"], mr: 3 }}
          onClick={() => {
            setSidebarOpen(!sidebarOpen)
            if (!nav.current) return
            const navLink = nav.current.querySelector("a")
            if (navLink) navLink.focus()
          }}
        />
        <Image sx={{ height: "32px", mr: 3 }} src={logoGraphic} />
        <Image sx={{ height: "32px", mt: 2 }} src={logoText} />
      </Flex>
      <Flex
        sx={{
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            flex: "1 1 auto",
            display: ["block", "flex"],
          }}
        >
          <div
            ref={nav}
            role="navigation"
            onBlur={() => {
              setSidebarOpen(false)
            }}
            onClick={() => {
              setSidebarOpen(false)
            }}
            onKeyPress={() => {
              setSidebarOpen(false)
            }}
          >
            <Sidebar
              open={sidebarOpen}
              components={{
                wrapper: Sidenav,
                a: NavLink,
              }}
              sx={{
                display: [null, "block"],
                width: 256,
                flex: "none",
                top: [3, 4],
                pl: [3, 4],
                pr: 2,
                mt: [64, 0],
              }}
            />
          </div>
          <Container
            sx={{
              p: 3,
              width: "100%",
              minWidth: 0,
              maxWidth: 768,
              mx: "auto",
            }}
            as="main"
          >
            {children}
          </Container>
        </Box>
      </Flex>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
}

export default Layout
