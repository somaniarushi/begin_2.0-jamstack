import React, { useState } from "react"
import { Link } from "gatsby"
import { Flex, Box } from "theme-ui"
import HamburgerMenu from "react-hamburger-menu"

export default function MenuSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const menuClicked = () => setIsOpen(!isOpen)

  return (
    <Flex flexDirection="column" alignItems="flex-end">
      <Box>
        <HamburgerMenu isOpen={isOpen} menuClicked={menuClicked} />
      </Box>
      <Box width={isOpen ? [1 / 3, 1 / 4] : 0} overflow="hidden">
        <Flex justifyContent="flex-end">
          <Link to="/">Home</Link>
        </Flex>
      </Box>
      <Box width={isOpen ? [1 / 3, 1 / 4] : 0} overflow="hidden">
        <Flex justifyContent="flex-end">
          <Link to="/roadmap">Roadmap</Link>
        </Flex>
      </Box>
      <Box width={isOpen ? [1 / 3, 1 / 4] : 0} overflow="hidden">
        <Flex justifyContent="flex-end">
          <Link to="/resources">Resources</Link>
        </Flex>
      </Box>
      <Box width={isOpen ? [1 / 3, 1 / 4] : 0} overflow="hidden">
        <Flex justifyContent="flex-end">
          <Link to="/opportunities">Opportunities</Link>
        </Flex>
      </Box>
      <Box width={isOpen ? [1 / 3, 1 / 4] : 0} overflow="hidden">
        <Flex justifyContent="flex-end">
          <Link to="/classes">Classes</Link>
        </Flex>
      </Box>
      <Box width={isOpen ? [1 / 3, 1 / 4] : 0} overflow="hidden">
        <Flex justifyContent="flex-end">
          <Link to="/events">Events</Link>
        </Flex>
      </Box>
      <Box width={isOpen ? [1 / 3, 1 / 4] : 0} overflow="hidden">
        <Flex justifyContent="flex-end">
          <Link to="/articles">Articles</Link>
        </Flex>
      </Box>
      <Box width={isOpen ? [1 / 3, 1 / 4] : 0} overflow="hidden">
        <Flex justifyContent="flex-end">
          <Link to="/social">Social</Link>
        </Flex>
      </Box>
      <Box width={isOpen ? [1 / 3, 1 / 4] : 0} overflow="hidden">
        <Flex justifyContent="flex-end">
          <Link to="/Contact">Contact</Link>
        </Flex>
      </Box>
    </Flex>
  )
}
